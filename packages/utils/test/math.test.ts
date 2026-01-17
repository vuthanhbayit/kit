import { describe, expect, test } from 'vitest'
import { sum, average, min, max } from '../src'

test('sum', () => {
  expect(sum([1, 2])).toStrictEqual(3)
  expect(sum([{ a: 1 }, { a: 2 }, { a: 3 }], item => item.a)).toStrictEqual(6)
})

test('average', () => {
  expect(average([1, 2])).toStrictEqual(1.5)
  expect(average([{ a: 1 }, { a: 2 }, { a: 3 }], item => item.a)).toStrictEqual(2)
})

describe('min', () => {
  test('should return min value from array of numbers', () => {
    expect(min([3, 1, 4, 1, 5, 9])).toBe(1)
    expect(min([10, 20, 30])).toBe(10)
    expect(min([-5, 0, 5])).toBe(-5)
  })

  test('should return min value with transform function', () => {
    const items = [{ value: 10 }, { value: 5 }, { value: 15 }]
    expect(min(items, item => item.value)).toBe(5)
  })

  test('should return Infinity for empty array', () => {
    expect(min([])).toBe(Number.POSITIVE_INFINITY)
  })

  test('should handle single element', () => {
    expect(min([42])).toBe(42)
  })
})

describe('max', () => {
  test('should return max value from array of numbers', () => {
    expect(max([3, 1, 4, 1, 5, 9])).toBe(9)
    expect(max([10, 20, 30])).toBe(30)
    expect(max([-5, 0, 5])).toBe(5)
  })

  test('should return max value with transform function', () => {
    const items = [{ value: 10 }, { value: 5 }, { value: 15 }]
    expect(max(items, item => item.value)).toBe(15)
  })

  test('should return -Infinity for empty array', () => {
    expect(max([])).toBe(Number.NEGATIVE_INFINITY)
  })

  test('should handle single element', () => {
    expect(max([42])).toBe(42)
  })
})
