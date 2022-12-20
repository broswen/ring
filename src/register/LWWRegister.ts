import {compare, VersionVector, VersionVectorOrder} from "../versionvector/versionvector";

export interface Register {
    value: string
    ts: number
    version: VersionVector
}

export interface Registers {
    [key: string]: Register
}

export function mergeRegister(a: Register, b: Register): Register {
    const order = compare(a.version, b.version)
    if (order === VersionVectorOrder.AFTER) {
        return a
    } else if (order === VersionVectorOrder.BEFORE) {
        return b
    }

    // if versions are concurrent resolve conflict with local write timestamp
    // TODO resolve with something else
    if (a.ts > b.ts) {
        return a
    }
    return b
}

export function mergeRegisters(a: Registers, b: Registers): Registers {
    const c: Registers = {}
    for (let [k, v] of Object.entries(a)) {
        c[k] = v
    }
    for (let [k, v] of Object.entries(b)) {
        if (k in c) {
            c[k] = mergeRegister(c[k], v)
        } else {
            c[k] = v
        }
    }
    return c
}

export class LWWRegister {
    registers: Registers
    constructor(registers: Registers) {
        this.registers = registers
    }

    get(key: string): Register | undefined {
        if (!(key in this.registers)) {
            return undefined
        }
        return this.registers[key]
    }
    set(id: string, key: string, value: string): Register {
        let r: Register | undefined = undefined
        if (key in this.registers) {
            r = this.registers[key]
        } else {
            r = {
                value: value,
                ts: new Date().getTime(),
                version: {[id]: 1}
            }
        }

        this.registers[key] = r
        return r
    }
    merge(b: Registers) {
        this.registers = mergeRegisters(this.registers, b)
    }
}