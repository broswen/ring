import Toucan from "toucan-js";

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
	return new Response('ok')
}
