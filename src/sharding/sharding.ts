let encoder: TextEncoder | null = null

export function getNeighbors(id: string, clusterSize: number): string[] {
    // gossip with log2 of the clustersize neighbors
    const gossipCount = Math.ceil(Math.log2(clusterSize))
    let neighbors: string[] = []
    // generate list of cluster ids
    for (let i = 0; i < clusterSize; i++) {
        // don't gossip with self
        if (`${i}` === id) continue
        neighbors.push(`${i}`)
    }
    // shuffle cluster ids
    neighbors = shuffle(neighbors)
    // select log2 clustersize ids
    neighbors = neighbors.slice(0,gossipCount)
    return neighbors
}

export function getNeighborsRR(id: string, clusterSize: number, start: number): string[] {
    let neighbors: string[] = []
    const amount: number =  Math.ceil(Math.log2(clusterSize))
    for (let i = start; neighbors.length < amount; i++) {
        if (i >= clusterSize) i = 0
        if (`${i}` !== id) {
            neighbors.push(`${i}`)
        }
    }
    return neighbors
}

function shuffle(array: string[]): string[] {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function nodeURL(node: string, key?: string | null): string {
    let url = `https://ring.broswen.com/${node}`
    if (key) {
        url += '/' + key
    }
    return url
}

export async function hash(value: string): Promise<number> {
    if(encoder === null) {
        encoder = new TextEncoder()
    }
    const data = encoder.encode(value)
    const buf = await crypto.subtle.digest('SHA-1', data)
    const dv = new DataView(buf)
    return dv.getUint32(0)
}

function jumpConsistentHash(key: number, buckets: number): number {
    let k = BigInt(key)
    let b = BigInt(-1);
    let j = BigInt(0);
    while (j < buckets) {
        b = j;
        k =
            ((k * BigInt(2862933555777941757)) % BigInt(2) ** BigInt(64)) +
            BigInt(1);
        j = BigInt(
            Math.floor(
                ((Number(b) + 1) * Number(BigInt(1) << BigInt(31))) /
                Number((k >> BigInt(33)) + BigInt(1))
            )
        );
    }
    return Number(b);
}

export async function rank(key: string, shard: number): Promise<number> {
    if(encoder === null) {
        encoder = new TextEncoder()
    }
    const data = encoder.encode(`${key}${shard}`)
    const buf = await crypto.subtle.digest('SHA-1', data)
    const dv = new DataView(buf)
    return dv.getUint32(0)
}

export async function rendezvousHash(key: string, buckets: number): Promise<number> {
    let maxIndex = 0
    let maxValue = 0
    for (let i = 0; i < buckets; i++) {
        const value = await rank(key, i)
        if (value > maxValue) {
            maxIndex = i
            maxValue = value
        }
    }
    return maxIndex
}
