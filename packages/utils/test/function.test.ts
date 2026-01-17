import { describe, expect, test } from 'vitest'
import { clearUndefined, compact, omit, pick, cloneDeep, sleep, toFunction, size } from '../src'

describe('clearUndefined', () => {
  test('should remove undefined from object', () => {
    expect(clearUndefined({ a: 1, b: 2 })).toStrictEqual({ a: 1, b: 2 })
    expect(clearUndefined({ a: 1, b: 2, c: undefined })).toStrictEqual({ a: 1, b: 2 })
  })

  test('should remove undefined from array', () => {
    expect(clearUndefined([])).toStrictEqual([])
    expect(clearUndefined([1, 2])).toStrictEqual([1, 2])
    expect(clearUndefined([1, 2, undefined])).toStrictEqual([1, 2])
  })

  test('should handle nested structures', () => {
    expect(clearUndefined([1, 2, { a: 1, b: 2 }])).toStrictEqual([1, 2, { a: 1, b: 2 }])
    expect(clearUndefined([1, 2, { a: 1, b: 2, c: undefined }])).toStrictEqual([1, 2, { a: 1, b: 2 }])
    expect(clearUndefined([1, 2, { a: 1, b: 2, c: undefined, d: [1, 2, 3, undefined] }])).toStrictEqual([
      1,
      2,
      { a: 1, b: 2, d: [1, 2, 3] },
    ])
  })

  test('should use custom check function', () => {
    expect(clearUndefined([1, 2, null, 3], value => value !== null)).toStrictEqual([1, 2, 3])
  })

  test('should return primitive values as-is', () => {
    expect(clearUndefined('hello' as any)).toBe('hello')
    expect(clearUndefined(42 as any)).toBe(42)
  })
})

describe('compact', () => {
  test('should remove undefined from array', () => {
    expect(compact([1, 2, undefined, 3])).toStrictEqual([1, 2, 3])
  })

  test('should remove undefined from object', () => {
    expect(compact({ a: 1, b: undefined, c: 3 })).toStrictEqual({ a: 1, c: 3 })
  })

  test('should use custom check function', () => {
    expect(compact([1, 2, null, 3], value => value !== null)).toStrictEqual([1, 2, 3])
  })

  test('should return primitive values as-is', () => {
    expect(compact('hello' as any)).toBe('hello')
  })
})

describe('omit', () => {
  test('should omit keys from object', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, 'c')).toStrictEqual({ a: 1, b: 2 })
    expect(omit({ a: 1, b: 2, c: 3 }, 'a', 'b')).toStrictEqual({ c: 3 })
    expect(omit({ a: 1, b: 2, c: 3 }, 'a', 'b', 'c')).toStrictEqual({})
  })

  test('should omit keys from array of objects', () => {
    expect(
      omit(
        [
          { a: 1, b: 2 },
          { a: 2, b: 3 },
          { a: 3, b: 'x', d: 'z' },
        ],
        'b',
        'd',
      ),
    ).toStrictEqual([{ a: 1 }, { a: 2 }, { a: 3 }])
  })

  test('should return primitive values as-is', () => {
    expect(omit('hello' as any, 'a')).toBe('hello')
  })
})

describe('pick', () => {
  test('should pick keys from object', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, 'a')).toStrictEqual({ a: 1 })
    expect(pick({ a: 1, b: 2, c: 3 }, 'b', 'c')).toStrictEqual({ b: 2, c: 3 })
    expect(pick({ a: 1, b: 2, c: 3 }, 'a', 'b', 'c')).toStrictEqual({ a: 1, b: 2, c: 3 })
  })

  test('should pick keys from array of objects', () => {
    expect(
      pick(
        [
          { a: 1, b: 2 },
          { a: 2, b: 3 },
          { a: 3, b: 'x', d: 'z' },
        ],
        'a',
      ),
    ).toStrictEqual([{ a: 1 }, { a: 2 }, { a: 3 }])
    expect(
      pick(
        [
          { a: 1, b: 2 },
          { a: 2, b: 3 },
          { a: 3, b: 'x', d: 'z' },
        ],
        'a',
        'b',
      ),
    ).toStrictEqual([
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 'x' },
    ])
  })

  test('should return primitive values as-is', () => {
    expect(pick('hello' as any, 'a')).toBe('hello')
  })
})

describe('cloneDeep', () => {
  test('should create deep copy of object', () => {
    const original = { a: 1, b: { c: 2 } }
    const cloned = cloneDeep(original)

    expect(cloned).toStrictEqual(original)
    expect(cloned).not.toBe(original)
    expect(cloned.b).not.toBe(original.b)
  })

  test('should create deep copy of array', () => {
    const original = [1, [2, [3, 4]]]
    const cloned = cloneDeep(original)

    expect(cloned).toStrictEqual(original)
    expect(cloned).not.toBe(original)
    expect(cloned[1]).not.toBe(original[1])
  })
})

describe('sleep', () => {
  test('should resolve after timeout', async () => {
    const start = Date.now()
    await sleep(50)
    const elapsed = Date.now() - start

    expect(elapsed).toBeGreaterThanOrEqual(40)
  })
})

describe('toFunction', () => {
  test('should return function as-is', () => {
    const fn = (a: number, b: number) => a + b
    const result = toFunction(fn)

    expect(result).toBe(fn)
    expect(result(2, 3)).toBe(5)
  })

  test('should wrap value in function', () => {
    const result = toFunction(42)

    expect(typeof result).toBe('function')
    expect(result()).toBe(42)
  })
})

describe('size', () => {
  test('should return size of array', () => {
    expect(size([1, 2, 3])).toBe(3)
    expect(size([])).toBe(0)
  })

  test('should return size of object', () => {
    expect(size({ a: 1, b: 2 })).toBe(2)
    expect(size({})).toBe(0)
  })

  test('should return length of string', () => {
    expect(size('hello')).toBe(5)
    expect(size('')).toBe(0)
  })

  test('should compact before measuring with isCompact option', () => {
    expect(size([1, 2, undefined, 3], true)).toBe(3)
    expect(size({ a: 1, b: undefined, c: 3 }, true)).toBe(2)
    expect(size('  hello  ', true)).toBe(5)
  })
})
