
// VersionVector is a map that holds the version for a specific node id
export interface VersionVector {
    [key: string]: number
}


export enum VersionVectorOrder {
    BEFORE,
    AFTER,
    CONCURRENT
}
export function intersection(v1: VersionVector, v2: VersionVector): string[] {
    const ids: Record<string, boolean> = {}
    Object.keys(v1).forEach(k => ids[k] = true)
    Object.keys(v2).forEach(k => ids[k] = true)
    return Object.keys(ids)
}

// compare returns whether v1 dominates (comes after) v2
export function compare(v1: VersionVector, v2: VersionVector): VersionVectorOrder {
    // get common node ids
    const commonIds = intersection(v1, v2)
    let v1Bigger = Object.keys(v1).length > commonIds.length
    let v2Bigger = Object.keys(v2).length > commonIds.length

    for (let id of commonIds) {
        const v1Version = getVersion(v1, id)
        const v2Version = getVersion(v2, id)
        if (v1Version > v2Version) {
            v1Bigger = true
        }else if (v2Version > v1Version) {
            v2Bigger = true
        }
    }

    if (!v1Bigger && !v2Bigger) {
        return VersionVectorOrder.BEFORE
    } else if (v1Bigger && !v2Bigger) {
        return VersionVectorOrder.AFTER
    } else if (!v1Bigger && v2Bigger) {
        return VersionVectorOrder.BEFORE
    }
    // v1 and v2 are both bigger in some way, concurrent writes
    return VersionVectorOrder.CONCURRENT
}

// increment increases the version for id or adds it if it doesn't exist in the version vector
export function increment(v: VersionVector, id: string): VersionVector {
    const v2: VersionVector = {...v}
    if (id in v2) {
        v2[id] = v2[id] + 1
    } else {
        v2[id] = 1
    }
    return v2
}

export function getVersion(v: VersionVector, id: string): number {
    if (id in v) {
        return v[id]
    }
    return 0
}