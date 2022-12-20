import {LWWRegister, mergeRegister, mergeRegisters, Register, Registers} from "./LWWRegister";

describe('Register', () => {
    test('should merge and use later version', () => {
        const a: Register = {
            ts: 1,
            value: 'a',
            version: {'a': 1}
        }
        const b: Register = {
            ts: 1,
            value: 'b',
            version: {'a': 2}
        }
        expect(mergeRegister(a, b)).toStrictEqual(b)
    })
    test('should merge with same version and resolve later timestamp', () => {
        const a: Register = {
            ts: 2,
            value: 'a',
            version: {'a': 1}
        }
        const b: Register = {
            ts: 3,
            value: 'b',
            version: {'a': 1}
        }
        expect(mergeRegister(a, b)).toStrictEqual(b)
    })
})

describe('Registers', () => {
    test('should merge with empty', () => {
        const a: Registers = {
            'a': {
                ts: 1,
                value: 'a',
                version: {'a': 1}
            }
        }
       expect(mergeRegisters(a, {})).toStrictEqual(a)
    })
    test('should merge different registers', () => {
        const a: Registers = {
            'a': {
                ts: 1,
                value: 'a',
                version: {'a': 1}
            }
        }
        const b: Registers = {
            'b': {
                ts: 1,
                value: 'b',
                version: {'a': 1}
            }
        }
       expect(mergeRegisters(a, b)).toStrictEqual({
           'a': {
                ts: 1,
                value: 'a',
               version: {'a': 1}
           },
           'b': {
                ts: 1,
                value: 'b',
               version: {'a': 1}
           }
       })
    })
    test('should merge and use later', () => {
        const a: Registers = {
            'a': {
                ts: 1,
                value: 'a',
                version: {'a': 1, 'b': 2}
            }
        }
        const b: Registers = {
            'a': {
                ts: 2,
                value: 'a',
                version: {'a': 2, 'b': 2}
            }
        }
       expect(mergeRegisters(a, b)).toStrictEqual(b)
    })
})


describe('LWWRegister', () => {
   test('set and get value', () => {
       const lwwr = new LWWRegister({})
       expect(lwwr.set('1', 'a', 'a')).toBeTruthy()
       expect(lwwr.get('a')?.value).toBe('a')
       expect(lwwr.get('a')?.ts).toBeTruthy()
       expect(lwwr.get('b')).toBeUndefined()
   })
    test('should merge registers', () => {
       const lwwr = new LWWRegister({})
       expect(lwwr.get('a')).toBeUndefined()
       lwwr.merge({
           'a': {
               value: 'a',
               ts: 1,
               version: {'1': 1}
           }
        })
        expect(lwwr.get('a')).toBeTruthy()
   })
    test('should merge registers', () => {
       const lwwr = new LWWRegister({
           'a': {
               value: 'a',
               ts: 1,
               version: {'1': 1}
           }
       })
       const lwwr2 = new LWWRegister({
           'a': {
               value: 'a',
               ts: 2,
               version: {'1': 2}
           }
       })
       lwwr.merge(lwwr2.registers)
       expect(lwwr.registers).toStrictEqual({
           'a': {
               value: 'a',
               ts: 2,
               version: {'1': 2}
           }
       })
   })
})