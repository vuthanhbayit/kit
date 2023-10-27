import { expect, test } from 'vitest'
import { clearUndefined } from '../src'

test('clearUndefined', () => {
  expect(clearUndefined({ a: 1, b: 2 })).toStrictEqual({ a: 1, b: 2 })
  expect(clearUndefined({ a: 1, b: 2, c: undefined })).toStrictEqual({
    a: 1,
    b: 2,
  })
  expect(clearUndefined([])).toStrictEqual([])
  expect(clearUndefined([1, 2])).toStrictEqual([1, 2])
  expect(clearUndefined([1, 2, undefined])).toStrictEqual([1, 2])
  expect(clearUndefined([1, 2, { a: 1, b: 2 }])).toStrictEqual([1, 2, { a: 1, b: 2 }])
  expect(clearUndefined([1, 2, { a: 1, b: 2, c: undefined }])).toStrictEqual([1, 2, { a: 1, b: 2 }])
  expect(clearUndefined([1, 2, { a: 1, b: 2, c: undefined, d: [1, 2, 3, undefined] }])).toStrictEqual([
    1,
    2,
    { a: 1, b: 2, d: [1, 2, 3] },
  ])
})
