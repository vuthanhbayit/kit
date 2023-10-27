import { expect, test } from 'vitest'
import { get, hasOwnProperty, omit, pick } from '../src'

test('hasOwnProperty', () => {
  expect(hasOwnProperty({ a: 1 }, 'a')).toBe(true)
  expect(hasOwnProperty({ a: 1 }, 'b')).toBe(false)
  expect(hasOwnProperty(null, 'null')).toBe(false)
  expect(hasOwnProperty(['a', 'b'], 'a')).toBe(false)
})

test('omit', () => {
  expect(omit({ a: 1, b: 2, c: 3 }, 'c')).toStrictEqual({ a: 1, b: 2 })
  expect(omit({ a: 1, b: 2, c: 3 }, 'a', 'b')).toStrictEqual({ c: 3 })
  expect(omit({ a: 1, b: 2, c: 3 }, 'a', 'b', 'c')).toStrictEqual({})
})

test('pick', () => {
  expect(pick({ a: 1, b: 2, c: 3 }, 'a')).toStrictEqual({ a: 1 })
  expect(pick({ a: 1, b: 2, c: 3 }, 'b', 'c')).toStrictEqual({ b: 2, c: 3 })
  expect(pick({ a: 1, b: 2, c: 3 }, 'a', 'b', 'c')).toStrictEqual({ a: 1, b: 2, c: 3 })
})

test('get', () => {
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

  expect(get(object, 'a.b')).toStrictEqual({ c: 1 })
  expect(get(object, 'a.b.c')).toStrictEqual(1)
  expect(get(object, ['a', 'd', 'e'])).toStrictEqual(2)
  expect(get(object, ['a', 'f', '2'])).toStrictEqual(3)
  expect(get(object, 'a.f[0]')).toStrictEqual(1)
  expect(get(object, 'a.f.1')).toStrictEqual(2)
})
