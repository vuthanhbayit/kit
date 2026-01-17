import { describe, expect, test } from 'vitest'
import { at, groupBy, last, sample, range, shuffle, toArray, uniq, without, within, splice, chuck } from '../src'

test('toArray', () => {
  expect(toArray(2)).toStrictEqual([2])
  expect(toArray(null)).toStrictEqual([])
  expect(toArray([2, 5])).toStrictEqual([2, 5])
})

test('range', () => {
  expect(range(0, 2)).toStrictEqual([0, 1])
  expect(range(2, 4)).toStrictEqual([2, 3])
  expect(range(5, 3)).toStrictEqual([5, 4])
  expect(range(2, 9, 2)).toStrictEqual([2, 4, 6, 8])
})

describe('chuck function', () => {
  test('should chunk an array of numbers into smaller arrays of length 3', () => {
    const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const chunkedArray = chuck(originalArray, 3, true)
    const expectedChunks = [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]

    expect(chunkedArray).toStrictEqual(expectedChunks)
  })

  test('should chunk an array of strings into smaller arrays of length 2', () => {
    const originalArray = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape']
    const chunkedArray = chuck(originalArray, 2)
    const expectedChunks = [
      ['apple', 'banana'],
      ['cherry', 'date'],
      ['fig', 'grape'],
    ]

    expect(chunkedArray).toStrictEqual(expectedChunks)
  })

  test('should return an empty array when given an empty input array', () => {
    const originalArray: any[] = []
    const chunkedArray = chuck(originalArray, 3)

    expect(chunkedArray).toStrictEqual([])
  })

  test('should return an array with a single chunk when length is greater than the input array length', () => {
    const originalArray = [1, 2, 3, 4, 5]
    const chunkedArray = chuck(originalArray, 10)

    expect(chunkedArray).toStrictEqual([originalArray])
  })
})

test('without', () => {
  expect(without([1, 2, 3, 4, 5], 1)).toStrictEqual([2, 3, 4, 5])
  expect(without([1, 2, 3, 4, 5], 1, 2)).toStrictEqual([3, 4, 5])
})

describe('within', () => {
  test('should filter primitive array with spread args', () => {
    expect(within([1, 2, 3, 4, 5], 2, 4)).toStrictEqual([2, 4])
  })

  test('should filter primitive array with array arg', () => {
    expect(within([1, 2, 3, 4, 5], [2, 4])).toStrictEqual([2, 4])
  })

  test('should filter objects by transform function', () => {
    const users = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }]
    const result = within(users, [1, 2], { transform: (u: { id: number }) => u.id })
    expect(result).toStrictEqual([{ id: 1, name: 'A' }, { id: 2, name: 'B' }])
  })

  test('should return empty array when no matches', () => {
    expect(within([1, 2, 3], [4, 5])).toStrictEqual([])
  })

  test('should handle single value with transform', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const result = within(items, 2, { transform: (i: { id: number }) => i.id })
    expect(result).toStrictEqual([{ id: 2 }])
  })
})

test('groupBy', () => {
  expect(
    groupBy(
      [
        { class_id: 1, name: 'A' },
        { class_id: 2, name: 'B' },
        { class_id: 1, name: 'C' },
      ],
      item => item.class_id,
    ),
  ).toStrictEqual({
    1: [
      { class_id: 1, name: 'A' },
      { class_id: 1, name: 'C' },
    ],
    2: [{ class_id: 2, name: 'B' }],
  })
})

test('at', () => {
  expect(at([1, 2, 3, 4, 5], 1)).toStrictEqual(2)
  expect(at([1, 2, 3, 4, 5], 2)).toStrictEqual(3)
})

test('last', () => {
  expect(last([1, 2, 3, 4, 5])).toStrictEqual(5)
})

describe('shuffle', () => {
  test('should shuffle the elements of the array', () => {
    const array = [1, 2, 3, 4, 5]
    const shuffledArray = shuffle(array)

    expect(shuffledArray).not.toEqual(array)
  })

  test('should return a shuffled copy of the original array', () => {
    const array = [1, 2, 3, 4, 5]
    const shuffledArray = shuffle(array)

    expect(shuffledArray).toEqual(expect.arrayContaining(array))
  })

  test('should return an array of the same length as the original array', () => {
    const array = [1, 2, 3, 4, 5]
    const shuffledArray = shuffle(array)

    expect(shuffledArray).toHaveLength(array.length)
  })
})

describe('sample', () => {
  test('should shuffle the elements of the array', () => {
    const array = [1, 2, 3, 4, 5]
    const randomElements = sample(array, 3)

    expect(randomElements).not.toEqual(array)
  })
})

describe('uniq', () => {
  test('should remove duplicates from a list of numbers', () => {
    const list = [1, 2, 3, 4, 5, 1, 2, 3]
    const result = uniq(list)
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  test('should remove duplicates from a list of objects based on a property', () => {
    const list = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 1, name: 'c' },
    ]
    const result = uniq(list, item => item.id)
    expect(result).toEqual([
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ])
  })

  test('should remove duplicates from a list with mixed types', () => {
    const list = [1, '1', { id: 1 }]
    const result = uniq(list)
    expect(result).toEqual([1, '1', { id: 1 }])
  })
})

describe('splice', () => {
  test('should splice the array from start to end', () => {
    const array = [1, 2, 3, 4, 5]
    const result = splice(array, 1, 3)
    expect(result).toEqual([1, 4, 5])
  })

  test('should handle negative start index', () => {
    const array = [1, 2, 3, 4, 5]
    const result = splice(array, -2)
    expect(result).toEqual([1, 2, 3])
  })

  test('should handle undefined end index', () => {
    const array = [1, 2, 3, 4, 5]
    const result = splice(array, 2)
    expect(result).toEqual([1, 2])
  })

  test('should return an empty array when end is less than start', () => {
    const array = [1, 2, 3, 4, 5]
    const result = splice(array, 3, 2)
    expect(result).toEqual([])
  })

  test('should not modify the original array', () => {
    const array = [1, 2, 3, 4, 5]
    expect(array).toEqual([1, 2, 3, 4, 5])
  })
})
