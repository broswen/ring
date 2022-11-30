import {IRegisters} from "./gossip";
import {Registers} from "../register/LWWRegister";


export function IRegistersToRegisters(arg: IRegisters): Registers {
    const registers: Registers = {}
    if (!arg.registers) return registers
    for (let [k, v] of Object.entries(arg.registers)) {
        registers[k] = {
            value: v.value ?? '',
            ts: v.ts ?? 0
        }
    }
    return registers
}