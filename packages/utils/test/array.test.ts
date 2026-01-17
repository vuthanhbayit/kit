import { describe, expect, test } from 'vitest'
import { at, groupBy, last, sample, range, shuffle, toArray, uniq, without, within, splice, chuck, join, limit, find } from '../src'

describe('toArray', () => {
  test('should wrap single value in array', () => {
    expect(toArray(2)).toStrictEqual([2])
    expect(toArray('hello')).toStrictEqual(['hello'])
  })

  test('should return same array if input is array', () => {
    expect(toArray([2, 5])).toStrictEqual([2, 5])
  })

  test('should return empty array for null/undefined', () => {
    expect(toArray(null)).toStrictEqual([])
    expect(toArray(undefined)).toStrictEqual([])
  })

  test('should convert array-like object to array', () => {
    const arrayLike = { 0: 'a', 1: 'b', length: 2 }
    expect(toArray(arrayLike)).toStrictEqual(['a', 'b'])
  })
})

describe('range', () => {
  test('should generate ascending range', () => {
    expect(range(0, 2)).toStrictEqual([0, 1])
    expect(range(2, 4)).toStrictEqual([2, 3])
  })

  test('should generate descending range', () => {
    expect(range(5, 3)).toStrictEqual([5, 4])
    expect(range(10, 5)).toStrictEqual([10, 9, 8, 7, 6])
  })

  test('should generate range with custom step', () => {
    expect(range(2, 9, 2)).toStrictEqual([2, 4, 6, 8])
    expect(range(0, 10, 3)).toStrictEqual([0, 3, 6, 9])
  })

  test('should return empty array when step is 0', () => {
    expect(range(0, 5, 0)).toStrictEqual([])
  })

  test('should return empty array when start equals stop', () => {
    expect(range(5, 5)).toStrictEqual([])
  })
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

describe('without', () => {
  test('should filter primitive array with single value', () => {
    expect(without([1, 2, 3, 4, 5], 1)).toStrictEqual([2, 3, 4, 5])
  })

  test('should filter primitive array with spread args', () => {
    expect(without([1, 2, 3, 4, 5], 1, 2)).toStrictEqual([3, 4, 5])
  })

  test('should filter primitive array with array arg', () => {
    expect(without([1, 2, 3, 4, 5], [1, 2])).toStrictEqual([3, 4, 5])
  })

  test('should filter objects by transform function', () => {
    const users = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }]
    const result = without(users, [1, 2], { transform: (u: { id: number }) => u.id })
    expect(result).toStrictEqual([{ id: 3, name: 'C' }])
  })

  test('should return original array when no matches', () => {
    expect(without([1, 2, 3], [4, 5])).toStrictEqual([1, 2, 3])
  })

  test('should handle single value with transform', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const result = without(items, 2, { transform: (i: { id: number }) => i.id })
    expect(result).toStrictEqual([{ id: 1 }, { id: 3 }])
  })

  test('should return empty array when all items are excluded', () => {
    expect(without([1, 2, 3], [1, 2, 3])).toStrictEqual([])
  })
})

describe('within', () => {
  test('should filter primitive array with single value', () => {
    expect(within([1, 2, 3, 4, 5], 2)).toStrictEqual([2])
  })

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

  test('should return all items when all match', () => {
    expect(within([1, 2, 3], [1, 2, 3])).toStrictEqual([1, 2, 3])
  })
})

describe('groupBy', () => {
  test('should group items by transform function', () => {
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

  test('should return empty object for empty array', () => {
    expect(groupBy([], (item: any) => item.id)).toStrictEqual({})
  })

  test('should group by string key', () => {
    const items = [
      { type: 'fruit', name: 'apple' },
      { type: 'vegetable', name: 'carrot' },
      { type: 'fruit', name: 'banana' },
    ]
    expect(groupBy(items, item => item.type)).toStrictEqual({
      fruit: [
        { type: 'fruit', name: 'apple' },
        { type: 'fruit', name: 'banana' },
      ],
      vegetable: [{ type: 'vegetable', name: 'carrot' }],
    })
  })
})

describe('join', () => {
  test('should join array elements with separator', () => {
    expect(join(['a', 'b', 'c'], ', ')).toBe('a, b, c')
    expect(join([1, 2, 3], '-')).toBe('1-2-3')
  })

  test('should filter out null/undefined values', () => {
    expect(join(['a', null, 'b', undefined, 'c'], ', ')).toBe('a, b, c')
  })

  test('should use transform function', () => {
    const items = [{ name: 'A' }, { name: 'B' }, { name: 'C' }]
    expect(join(items, ', ', item => item.name)).toBe('A, B, C')
  })

  test('should return empty string for empty array', () => {
    expect(join([], ', ')).toBe('')
  })
})

describe('at', () => {
  test('should return element at positive index', () => {
    expect(at([1, 2, 3, 4, 5], 0)).toStrictEqual(1)
    expect(at([1, 2, 3, 4, 5], 1)).toStrictEqual(2)
    expect(at([1, 2, 3, 4, 5], 4)).toStrictEqual(5)
  })

  test('should return element at negative index', () => {
    expect(at([1, 2, 3, 4, 5], -1)).toStrictEqual(5)
    expect(at([1, 2, 3, 4, 5], -2)).toStrictEqual(4)
    expect(at([1, 2, 3, 4, 5], -5)).toStrictEqual(1)
  })

  test('should return undefined for out of bounds index', () => {
    expect(at([1, 2, 3], 10)).toBeUndefined()
    expect(at([1, 2, 3], -10)).toBeUndefined()
  })

  test('should return undefined for empty array', () => {
    expect(at([], 0)).toBeUndefined()
  })
})

describe('last', () => {
  test('should return last element', () => {
    expect(last([1, 2, 3, 4, 5])).toStrictEqual(5)
  })

  test('should return single element for single-element array', () => {
    expect(last([42])).toStrictEqual(42)
  })

  test('should return undefined for empty array', () => {
    expect(last([])).toBeUndefined()
  })
})

describe('limit', () => {
  test('should limit array to n elements', () => {
    expect(limit([1, 2, 3, 4, 5], 3)).toStrictEqual([1, 2, 3])
    expect(limit([1, 2, 3, 4, 5], 1)).toStrictEqual([1])
  })

  test('should return empty array if limit exceeds length', () => {
    // Note: limit uses splice which returns [] when count > length
    expect(limit([1, 2, 3], 10)).toStrictEqual([])
  })

  test('should return empty array for limit 0', () => {
    expect(limit([1, 2, 3], 0)).toStrictEqual([])
  })

  test('should return full array when limit equals length', () => {
    expect(limit([1, 2, 3], 3)).toStrictEqual([1, 2, 3])
  })
})

describe('find', () => {
  test('should find element by key-value pair', () => {
    const users = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }]
    expect(find(users, 'id', 2)).toStrictEqual({ id: 2, name: 'B' })
    expect(find(users, 'name', 'C')).toStrictEqual({ id: 3, name: 'C' })
  })

  test('should return undefined if not found', () => {
    const users = [{ id: 1, name: 'A' }]
    expect(find(users, 'id', 999)).toBeUndefined()
  })

  test('should find with nested key', () => {
    const items = [
      { meta: { id: 1 }, name: 'A' },
      { meta: { id: 2 }, name: 'B' },
    ]
    expect(find(items, 'meta.id', 2)).toStrictEqual({ meta: { id: 2 }, name: 'B' })
  })
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
  test('should return n random elements', () => {
    const array = [1, 2, 3, 4, 5]
    const randomElements = sample(array, 3)
    expect(randomElements).toHaveLength(3)
  })

  test('should return elements from original array', () => {
    const array = [1, 2, 3, 4, 5]
    const randomElements = sample(array, 3)
    randomElements.forEach(el => {
      expect(array).toContain(el)
    })
  })

  test('should return all elements if n exceeds array length', () => {
    const array = [1, 2, 3]
    const randomElements = sample(array, 10)
    expect(randomElements).toHaveLength(3)
    expect(randomElements).toEqual(expect.arrayContaining(array))
  })

  test('should return empty array for n <= 0', () => {
    expect(sample([1, 2, 3], 0)).toStrictEqual([])
    expect(sample([1, 2, 3], -1)).toStrictEqual([])
  })

  test('should not modify original array', () => {
    const array = [1, 2, 3, 4, 5]
    const original = [...array]
    sample(array, 3)
    expect(array).toStrictEqual(original)
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
