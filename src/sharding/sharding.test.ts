import {hash, rank, rendezvousHash, nodeURL, getNeighbors, getNeighborsRR} from "./sharding";

describe('shardURL', function () {
    test('should create url with shard name', () => {
        expect(nodeURL('shard:1')).toEqual('https://ring.broswen.com/shard:1')
    })
    test('should create url with shard name and key', () => {
        expect(nodeURL('shard:1', 'b')).toEqual('https://ring.broswen.com/shard:1/b')
    })
})

describe('hash', function () {
    test('should hash strings', async () => {
        expect(await hash('test')).toEqual(2840236005)
        expect(await hash('example data')).toEqual(2680433370)
    })
});

describe('rank', function () {
    test('should rank shards', async () => {
        expect(await rank('a', 1)).toBeTruthy()
    })
})

describe('rendezvous hash', function () {
   test('highest random weight', async () => {
       expect(await rendezvousHash('a', 10)).toEqual(1)
       expect(await rendezvousHash('a', 11)).toEqual(1)
       expect(await rendezvousHash('a', 12)).toEqual(1)
       expect(await rendezvousHash('a', 100)).toEqual(31)
       expect(await rendezvousHash('a', 101)).toEqual(31)
       expect(await rendezvousHash('a', 102)).toEqual(31)
   })
})

describe('getNeighbors', () => {
    test('generate random neighbors', () => {
        const neighbors = getNeighbors('1', 10)
        expect(neighbors.length).toBe(Math.ceil(Math.log2(10)))
        expect(neighbors).not.toContain('1')
    })
    test('large cluster', () => {
        const neighbors = getNeighbors('1', 64)
        expect(neighbors.length).toBe(Math.ceil(Math.log2(64)))
        expect(neighbors).not.toContain('1')
    })
})

describe('getNeighborsRR', () => {
    test('generate all neighbors', () => {
        expect(getNeighborsRR('0', 10, 0)).toEqual(['1','2','3','4'])
    })
    test('generate subset', () => {
        expect(getNeighborsRR('4', 10, 3)).toEqual(['3','5','6','7'])
    })
    test('generate one', () => {
        expect(getNeighborsRR('4', 10, 4)).toEqual(['5', '6', '7', '8'])
    })
    test('generate others', () => {
        expect(getNeighborsRR('4', 10, 5)).toEqual(['5', '6', '7', '8'])
    })
    test('generate larger cluster', () => {
        expect(getNeighborsRR('4', 32, 0)).toEqual(['0', '1', '2', '3', '5'])
    })
    test('handle wrap', () => {
        expect(getNeighborsRR('0', 32, 30)).toEqual(['30', '31', '1', '2', '3'])
    })
})