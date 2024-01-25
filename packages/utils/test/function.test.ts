import { expect, test } from 'vitest'
import { clearUndefined, omit, pick } from '../src'

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

test('omit', () => {
  expect(omit({ a: 1, b: 2, c: 3 }, 'c')).toStrictEqual({ a: 1, b: 2 })
  expect(omit({ a: 1, b: 2, c: 3 }, 'a', 'b')).toStrictEqual({ c: 3 })
  expect(omit({ a: 1, b: 2, c: 3 }, 'a', 'b', 'c')).toStrictEqual({})
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

test('pick', () => {
  expect(pick({ a: 1, b: 2, c: 3 }, 'a')).toStrictEqual({ a: 1 })
  expect(pick({ a: 1, b: 2, c: 3 }, 'b', 'c')).toStrictEqual({ b: 2, c: 3 })
  expect(pick({ a: 1, b: 2, c: 3 }, 'a', 'b', 'c')).toStrictEqual({ a: 1, b: 2, c: 3 })
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
