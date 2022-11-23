import {shardName, shardURL} from "./sharding/sharding";
import Toucan from "toucan-js";

export { Counter } from './counter/counter'
export interface Config {
	// how many durable objects to shard writes/reads to
	shardCount: number
	// how long to wait before flushing updates
	flushDelay: number
	// how long to wait before sending another update
	syncDelay: number
}

export const DefaultConfig: Config = {
	shardCount: 10,
	flushDelay: 5 * 1000,
	syncDelay: 2 * 1000
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
	COUNTER: DurableObjectNamespace
	COUNTER_DATA: WorkerAnalyticsNamespace
	WORKER_DATA: WorkerAnalyticsNamespace
	SENTRY_DSN: string
	environment: string
}

const MAIN_SHARD = 'SHARD'

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
}
