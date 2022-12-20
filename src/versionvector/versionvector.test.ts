import {compare, getVersion, increment, VersionVector, VersionVectorOrder} from "./versionvector";

describe('VersionVector', () => {
    test('increment node ids', () => {
        let v: VersionVector = {
        }
        v = increment(v, 'a')
        v = increment(v, 'a')
        v = increment(v, 'b')
        expect(v).toStrictEqual({
            'a': 2,
            'b': 1
        })

        expect(getVersion(v, 'a')).toEqual(2)
        expect(getVersion(v, 'c')).toEqual(0)
    })
})

describe('compare VersionVector', () => {
    test('v1 should be after v2', () => {
        const v1: VersionVector = {
            'a': 2,
            'b': 1
        }
        const v2: VersionVector = {
            'a': 1,
            'b': 1
        }
        expect(compare(v1, v2)).toEqual(VersionVectorOrder.AFTER)
    })
    test('v1 should be after empty vector', () => {
        const v1: VersionVector = {
            'a': 1,
        }
        const v2: VersionVector = {
        }
        expect(compare(v1, v2)).toEqual(VersionVectorOrder.AFTER)
    })

    test('vectors with different ids should be concurrent', () => {
        const v1: VersionVector = {
            'a': 1,
            'b': 1,
        }
        const v2: VersionVector = {
            'a': 1,
            'c': 1,
        }
        expect(compare(v1, v2)).toEqual(VersionVectorOrder.CONCURRENT)
    })
})