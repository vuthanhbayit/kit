import { describe, expect, test } from 'vitest'
import { get, hasOwnProperty, omit, pick, has, map, filter, forEach, reduce } from '../src'

test('hasOwnProperty', () => {
  expect(hasOwnProperty({ a: 1 }, 'a')).toBe(true)
  expect(hasOwnProperty({ a: 1 }, 'b')).toBe(false)
  expect(hasOwnProperty(null, 'null')).toBe(false)
  expect(hasOwnProperty(['a', 'b'], 'a')).toBe(false)
})

test('has', () => {
  expect(has({ a: 1 }, 'a')).toBe(true)
  expect(has({ a: undefined }, 'a')).toBe(false)
  expect(has({ a: null }, 'a')).toBe(true)
  expect(has({ a: 0 }, 'a')).toBe(true)
})

describe('get', () => {
  const object = {
    a: {
      b: {
        c: 1,
      },
      d: {
        e: 2,
      },
      f: [1, 2, 3],
    },
  }

  test('should get nested values', () => {
    expect(get(object, 'a.b')).toStrictEqual({ c: 1 })
    expect(get(object, 'a.b.c')).toStrictEqual(1)
    expect(get(object, ['a', 'd', 'e'])).toStrictEqual(2)
    expect(get(object, ['a', 'f', '2'])).toStrictEqual(3)
    expect(get(object, 'a.f[0]')).toStrictEqual(1)
    expect(get(object, 'a.f.1')).toStrictEqual(2)
  })

  test('should return default value for undefined path', () => {
    expect(get(object, 'a.x.y', 'default')).toBe('default')
    expect(get(object, 'notexist', 42)).toBe(42)
    expect(get(undefined, 'a.b', 'fallback')).toBe('fallback')
  })

  test('should return undefined for missing path without default', () => {
    expect(get(object, 'a.x.y')).toBeUndefined()
  })
})

describe('map', () => {
  test('should map object values', () => {
    const result = map({ a: 1, b: 2, c: 3 }, value => value * 2)
    expect(result).toStrictEqual({ a: 2, b: 4, c: 6 })
  })

  test('should provide key and object in callback', () => {
    const keys: string[] = []
    map({ x: 10, y: 20 }, (value, key) => {
      keys.push(key)
      return value
    })
    expect(keys).toStrictEqual(['x', 'y'])
  })
})

describe('filter', () => {
  test('should filter object by value', () => {
    const result = filter({ a: 1, b: 2, c: 3 }, value => value > 1)
    expect(result).toStrictEqual({ b: 2, c: 3 })
  })

  test('should filter object by key', () => {
    const result = filter({ include: 1, exclude: 2, include2: 3 }, (_value, key) => key.startsWith('include'))
    expect(result).toStrictEqual({ include: 1, include2: 3 })
  })
})

describe('forEach', () => {
  test('should iterate over object entries', () => {
    const collected: Array<{ key: string, value: number, index: number }> = []
    forEach({ a: 1, b: 2 }, (value, key, index) => {
      collected.push({ key, value, index })
    })
    expect(collected).toStrictEqual([
      { key: 'a', value: 1, index: 0 },
      { key: 'b', value: 2, index: 1 },
    ])
  })
})

describe('reduce', () => {
  test('should reduce object to sum of values', () => {
    const result = reduce({ a: 1, b: 2, c: 3 }, (acc, value) => acc + value, 0)
    expect(result).toBe(6)
  })

  test('should reduce object to array of keys', () => {
    const result = reduce({ x: 10, y: 20 }, (acc, _value, key) => [...acc, key], [] as string[])
    expect(result).toStrictEqual(['x', 'y'])
  })
})
