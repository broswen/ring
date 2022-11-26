import Toucan from "toucan-js"
import {nodeURL, rendezvousHash} from "./sharding/sharding";
import {jsonResponse} from "./node/node";
export {Node} from './node/node'

export interface Config {
	// how many nodes in the cluster
	clusterSize: number
}

export const DefaultConfig: Config = {
	clusterSize: 10
}

export interface WorkerAnalyticsNamespace {
	writeDataPoint(data: DataPoint): void
}

export interface DataPoint {
	blobs?: string[]
	doubles?: number[]
	indexes?: string[]
}

export interface Env {
	CONFIG: KVNamespace
	RING: DurableObjectNamespace
	NODE_DATA: WorkerAnalyticsNamespace
	CLUSTER_DATA: WorkerAnalyticsNamespace
	SENTRY_DSN: string
	environment: string
}

export async function getConfig(env: Env): Promise<Config> {
	let data = '{}'
	try {
		data = await env.CONFIG.get('worker') ?? '{}'
	} catch (e) {
		console.log('couldnt get config from kv')
	}
	const parsedConfig = JSON.parse(data)
	let config = DefaultConfig
	Object.assign(config, DefaultConfig, parsedConfig)
	return config
}

export default {
	fetch: handler
};


export async function handler(
	request: Request,
	env: Env,
	ctx: ExecutionContext
): Promise<Response> {
	const sentry = new Toucan({
		dsn: env.SENTRY_DSN,
		request,
		context: ctx,
		tracesSampleRate: 1.0,
		environment: env.environment
	})
	const config = await getConfig(env)
	const url = new URL(request.url)
	const key = url.pathname.slice(1)
	const ip = request.headers.get('cf-connecting-ip')
	if (key.length < 1) {
		return jsonResponse({error: 'invalid key'}, 400, '-1')
	}
	const nodeId = `${await rendezvousHash(key+ip, config.clusterSize)}`
	const nodeUrl = nodeURL(nodeId, key)
	if (request.method === 'GET') {
		const id = env.RING.idFromName(nodeId)
		const obj = env.RING.get(id)
		return obj.fetch(new Request(nodeUrl, {body: request.body, cf: {cacheTtl: 5}}))
	} else if (request.method === 'PUT') {
		const id = env.RING.idFromName(nodeId)
		const obj = env.RING.get(id)
		return obj.fetch(new Request(nodeUrl, {body: request.body, method: 'PUT'}))
	}
	return jsonResponse({error: 'not allowed'}, 405, '-1')
}
