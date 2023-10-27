import { expect, test } from 'vitest'
import { sum, average } from '../src'

test('sum', () => {
  expect(sum([1, 2])).toStrictEqual(3)
  expect(sum([{ a: 1 }, { a: 2 }, { a: 3 }], item => item.a)).toStrictEqual(6)
})

test('average', () => {
  expect(average([1, 2])).toStrictEqual(1.5)
  expect(average([{ a: 1 }, { a: 2 }, { a: 3 }], item => item.a)).toStrictEqual(2)
})
