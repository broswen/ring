
export interface Register {
    value: string
    ts: number
}

export interface Registers {
    [key: string]: Register
}

export function mergeRegister(a: Register, b: Register): Register {
    if (a.ts >= b.ts) {
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
    set(key: string, value: string): Register {
        const r = {
            value: value,
            ts: new Date().getTime()
        }
        this.registers[key] = r
        return r
    }
    merge(b: Registers) {
        this.registers = mergeRegisters(this.registers, b)
    }
}