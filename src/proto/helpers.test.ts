import {IRegistersToRegisters} from "./helpers";
import {Registers as RegistersPB} from "./gossip";
import {Registers} from "../register/LWWRegister";


describe('', () => {
    test('should convert protobuf interface', () => {
        const pb: RegistersPB = new RegistersPB({
            registers: {
                'a': {
                    value: 'a',
                    ts: 1
                },
                'b': {
                    value: 'b',
                    ts: 1
                }
            }
        })
        const exp: Registers = {
            'a': {
                value: 'a',
                ts: 1
            },
            'b': {
                value: 'b',
                ts: 1
            }
        }
        expect(IRegistersToRegisters(pb)).toEqual(exp)
    })
})