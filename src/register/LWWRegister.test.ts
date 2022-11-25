import {LWWRegister, mergeRegister, mergeRegisters, Register, Registers} from "./LWWRegister";

describe('Register', () => {
    test('should merge and use later', () => {
        const a: Register = {
            ts: 1,
            value: 'a'
        }
        const b: Register = {
            ts: 2,
            value: 'b'
        }
        expect(mergeRegister(a, b)).toStrictEqual(b)
    })
    test('should merge with same timestamp', () => {
        const a: Register = {
            ts: 3,
            value: 'a'
        }
        const b: Register = {
            ts: 3,
            value: 'b'
        }
        expect(mergeRegister(a, b)).toStrictEqual(a)
    })
})

describe('Registers', () => {
    test('should merge with empty', () => {
        const a: Registers = {
            'a': {
                ts: 1,
                value: 'a'
            }
        }
       expect(mergeRegisters(a, {})).toStrictEqual(a)
    })
    test('should merge different registers', () => {
        const a: Registers = {
            'a': {
                ts: 1,
                value: 'a'
            }
        }
        const b: Registers = {
            'b': {
                ts: 1,
                value: 'b'
            }
        }
       expect(mergeRegisters(a, b)).toStrictEqual({
           'a': {
                ts: 1,
                value: 'a'
            },
           'b': {
                ts: 1,
                value: 'b'
            }
       })
    })
    test('should merge and use later', () => {
        const a: Registers = {
            'a': {
                ts: 1,
                value: 'a'
            }
        }
        const b: Registers = {
            'a': {
                ts: 2,
                value: 'a'
            }
        }
       expect(mergeRegisters(a, b)).toStrictEqual(b)
    })
})


describe('LWWRegister', () => {
   test('set and get value', () => {
       const lwwr = new LWWRegister({})
       expect(lwwr.set('a', 'a')).toBeTruthy()
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
                ts: 1
            }
        })
        expect(lwwr.get('a')).toBeTruthy()
   })
    test('should merge registers', () => {
       const lwwr = new LWWRegister({
           'a': {
               value: 'a',
               ts: 1
           }
       })
       const lwwr2 = new LWWRegister({
           'a': {
               value: 'a',
               ts: 2
           }
       })
       lwwr.merge(lwwr2.registers)
       expect(lwwr.registers).toStrictEqual({
           'a': {
               value: 'a',
               ts: 2
           }
       })
   })
})