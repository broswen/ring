import {Node, parsePath} from "./node"
import {Registers} from "../register/LWWRegister";

const env = getMiniflareBindings()

describe('parsePath', () => {
    test('should parse id and key', () => {
        expect(parsePath('/a/b')).toStrictEqual({id: 'a', key: 'b'})
    })
    test('should parse id and blank key', () => {
        expect(parsePath('/a')).toStrictEqual({id: 'a', key: ''})
    })
})

describe('Node', () => {
    test('get', async () => {
        const id = env.RING.newUniqueId()
        const storage = await getMiniflareDurableObjectStorage(id)
        await storage.put<Registers>('registers', {
            'a': {
                value: 'a',
                ts: 1
            }
        })
        const stub = env.RING.get(id)
        const res = await stub.fetch('https://example.com/id/a')
        expect(res.status).toEqual(200)
    })
    test('set', async () => {
        const id = env.RING.newUniqueId()
        const storage = await getMiniflareDurableObjectStorage(id)
        const stub = env.RING.get(id)
        const res = await stub.fetch('https://example.com/id/a', {method: 'PUT', body: 'a'})
        expect(res.status).toEqual(200)
    })

})

describe('flush', () => {
    test('schedule flush', async () => {
        const id = env.RING.newUniqueId()
        const state = await getMiniflareDurableObjectState(id)
        jest.useFakeTimers()
        const shard = new Node(state, env)
        const mockFlush = jest.fn()

        await shard.scheduleFlush(() => mockFlush())

        jest.advanceTimersByTime(4000)
        expect(shard.flushTimeout).not.toBeUndefined()

        jest.advanceTimersByTime(2000)
        expect(mockFlush).toHaveBeenCalled()
    })
    test('schedule and cancel flush', async () => {
        const id = env.RING.newUniqueId()
        const state = await getMiniflareDurableObjectState(id)
        jest.useFakeTimers()
        const shard = new Node(state, env)
        const mockFlush = jest.fn()

        await shard.scheduleFlush(() => mockFlush())

        jest.advanceTimersByTime(4000)
        expect(shard.flushTimeout).not.toBeUndefined()

        shard.cancelFlush()
        expect(shard.flushTimeout).toBeUndefined()

        jest.advanceTimersByTime(2000)
        expect(mockFlush).not.toHaveBeenCalled()
    })
})