import {Config, DefaultConfig, Env, getConfig} from "../index";
import {LWWRegister, Registers} from "../register/LWWRegister";
import {getNeighbors, nodeURL} from "../sharding/sharding";

export const FLUSH_DELAY = 5 * 1000
export const GOSSIP_DELAY = 3 * 1000

export function parsePath(path: string): {id: string, key: string} {
    const details = {
        id: '',
        key: ''
    }
    const parts = path.split('/')
    if (parts.length > 1) {
        details.id = parts[1]
    }
    if (parts.length > 2) {
        details.key = parts[2]
    }
    return details
}

export function jsonResponse(body: unknown, status: number, id: string): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            'RING-NODE': id,
            'Content-Type': 'application/json'
        }
    })
}

export class Node implements DurableObject {
    state: DurableObjectState
    env: Env
    config: Config = DefaultConfig
    id: string = ''
    registers: LWWRegister = new LWWRegister({})
    // how long to wait before flushing
    // created by setTimeout when scheduling a data flush
    flushTimeout: ReturnType<typeof setTimeout> | undefined
    // the timestamp of the last gossip
    lastGossip: number = 0
    constructor(state: DurableObjectState, env: Env) {
        this.state = state
        this.env = env
        this.state.blockConcurrencyWhile(async () => {
            this.registers = new LWWRegister(await this.state.storage?.get<Registers>('registers') ?? {})
            this.config = await getConfig(env)
        })
    }

    // scheduleFlush schedules f() to run FLUSH_DELAY milliseconds later
    async scheduleFlush(f: () => Promise<void>): Promise<void> {
        this.flushTimeout = setTimeout(f, FLUSH_DELAY)
    }

    // cancelFlush clears the current flushTimeout if set
    cancelFlush(): void {
        if (this.flushTimeout !== undefined) {
            clearTimeout(this.flushTimeout)
            this.flushTimeout = undefined
        }
    }

    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url)
        const {id, key} = parsePath(url.pathname)
        this.id = id
        if (request.method === 'GET') {
            const r = this.registers.get(key)
            if (r === undefined) {
                return jsonResponse({error: 'not found'}, 404, this.id)
            }
            return jsonResponse(JSON.stringify(r), 200, this.id)
        } else if (request.method === 'PUT') {
            const data = await request.text()
            const register = this.registers.set(key, data)
            this.maybeGossip()
            this.state.storage?.put<Registers>('registers', this.registers.registers)
            return jsonResponse(register, 200, this.id)
        } else if (request.method === 'PATCH') {
            const data = await request.json<Registers>()
            this.registers.merge(data)
            return jsonResponse(this.registers.registers, 200, this.id)
        }
        return jsonResponse({error: 'not allowed'}, 405, this.id)
    }

    // maybeGossip attempts to gossip if the node hasn't gossiped in GOSSIP_DELAY
    // otherwise it schedules a flush to gossip if this node has been partitioned
    async maybeGossip(): Promise<void> {
        this.cancelFlush()
        if (new Date().getTime() - this.lastGossip <= GOSSIP_DELAY) {
            this.scheduleFlush(this.gossip)
            return
        }
        await this.gossip()
    }

    // gossip picks log(n) neighbors to gossip with and exchange/merge state
    // it sends all requests asynchronously and merges with each as the are returned
    async gossip(): Promise<void> {
        if (this.id === '') return
        // prerender local registers state
        const data = JSON.stringify(this.registers.registers)
        // generate random list of neighbors to gossip with
        const ids = getNeighbors(this.id, this.config.clusterSize)
        // create list of requests
        const requests = ids.map(id => new Request(nodeURL(id), {body: data, method: 'PATCH'}))
        // create list of promises
        const promises = requests.map(async req => {
            const res = await fetch(req)
            if (!res.ok) return
            const data = await res.json<Registers>()
            this.registers.merge(data)
            this.lastGossip = new Date().getTime()
        })
        // wait for all promises
        await Promise.allSettled(promises)
        this.state.storage?.put<Registers>('registers', this.registers.registers)
    }
}