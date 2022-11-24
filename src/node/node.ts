import {Env} from "../index";
import {LWWRegister, Registers} from "../register/LWWRegister";

export const FLUSH_DELAY = 5 * 1000
export const GOSSIP_DELAY = 3 * 1000

export class Node implements DurableObject {
    state: DurableObjectState
    env: Env
    registers: LWWRegister = new LWWRegister({})
    // how long to wait before flushing
    // created by setTimeout when scheduling a data flush
    flushTimeout: ReturnType<typeof setTimeout> | undefined
    constructor(state: DurableObjectState, env: Env) {
        this.state = state
        this.env = env
        this.state.blockConcurrencyWhile(async () => {
            this.registers = new LWWRegister(await this.state.storage?.get<Registers>('registers') ?? {})
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
        // GET returns the value of the register at this node
        //  GET should gossip if the last gossip is old enough
        // PUT sets the value for the register at this node
        //  always tries to gossip after updating state
        // PATCH receives the state from another node, merges it, then returns the local state
        if (request.method === 'GET') {
            const r = this.registers.get(key)
            if (r === undefined) {
                return new Response('not found', {status: 404})
            }
            return new Response(JSON.stringify(r))
        } else if (request.method === 'PUT') {
            this.maybeGossip()
            return new Response('')
        } else if (request.method === 'PATCH') {
            const data = await request.json<Registers>()
            this.registers.merge(data)
            return new Response(JSON.stringify(this.registers.registers))
        }
        return new Response('not allowed', {status: 405})
    }

    // maybeGossip attempts to gossip if the node hasn't gossiped in GOSSIP_DELAY
    // otherwise it schedules a flush to gossip if this node has been partitioned
    async maybeGossip(): Promise<void> {
    }

    // gossip picks log(n) neighbors to gossip with and exchange/merge state
    // it sends all requests asynchronously and merges with each as the are returned
    async gossip(): Promise<void> {

    }
}