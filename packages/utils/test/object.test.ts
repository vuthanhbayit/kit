import { expect, test } from 'vitest'
import { get, hasOwnProperty, omit, pick } from '../src'

test('hasOwnProperty', () => {
  expect(hasOwnProperty({ a: 1 }, 'a')).toBe(true)
  expect(hasOwnProperty({ a: 1 }, 'b')).toBe(false)
  expect(hasOwnProperty(null, 'null')).toBe(false)
  expect(hasOwnProperty(['a', 'b'], 'a')).toBe(false)
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
