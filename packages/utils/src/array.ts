import { get, hasOwnProperty } from './object'
import { isArray, isArrayLike, isExist, isObject } from './is'
import { isDefined, isUndefined } from './guards'
import { cloneDeep } from './function'

/**
 * Converts a value to an array. If the value is already an array, it is returned as-is.
 * If the value is an array-like object, it is converted to an array using `Array.prototype.slice.call()`.
 * If the value is null or undefined, an empty array is returned. Otherwise, the value is wrapped in an array.
 *
 * @template T
 * @param {T | T[] | null} value - The value to convert to an array.
 * @returns {T[]} - An array representation of the input value.
 *
 * @example
 * // Convert a single value to an array
 * const singleValue = 42;
 * const singleValueArray = toArray(singleValue); // Returns [42]
 *
 * @example
 * // Convert an array to itself
 * const existingArray = [1, 2, 3];
 * const newArray = toArray(existingArray); // Returns [1, 2, 3]
 *
 * @example
 * // Convert an array-like object to an array
 * const arrayLikeObject = { 0: 'apple', 1: 'banana', length: 2 };
 * const arrayFromObject = toArray(arrayLikeObject); // Returns ['apple', 'banana']
 *
 * @example
 * // Convert null to an empty array
 * const nullValue = null;
 * const emptyArray = toArray(nullValue); // Returns []
 */
export const toArray = <T>(value: T | T[] | null): T[] => {
  if (!isDefined(value)) {
    return []
  }
  if (isArray(value)) {
    return value
  }
  if (isArrayLike(value)) {
    return Array.prototype.slice.call(value)
  }

  return [value]
}

/**
 * Generates an array of numbers within a specified range.
 *
 * @param {number} start - The starting value of the range. If only one argument is provided, this is set to 0.
 * @param {number} stop - The ending value (exclusive) of the range.
 * @param step = 1 - The step or increment between values in the range. Defaults to 1.
 * @returns {number[]} - An array of numbers in the specified range.
 *
 * @example
 * // Generate a range of numbers from 0 to 9 (exclusive) with the default step (1).
 * const result1 = range(0, 10); // Returns [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * @example
 * // Generate a range of numbers from 1 to 10 (exclusive) with a step of 2.
 * const result2 = range(1, 10, 2); // Returns [1, 3, 5, 7, 9]
 *
 * @example
 * // Generate a range of numbers from 10 to 1 (exclusive) with a negative step of -1.
 * const result3 = range(10, 1, -1); // Returns [10, 9, 8, 7, 6, 5, 4, 3, 2]
 */
export function range(start: number, stop: number, step = 1): number[] {
  const arr: number[] = []
  let current = start
  const isReversed = start > stop

  if (isReversed) {
    while (current > stop) {
      arr.push(current)
      current -= step
    }
  } else {
    while (current < stop) {
      arr.push(current)
      current += step
    }
  }

  return arr
}

/**
 * Splits an array into smaller chunks of a specified length. You can choose to split the array in a zigzag pattern.
 *
 * @param {T[]} array - The array to be split into chunks.
 * @param {number} length - The length of each chunk.
 * @param {boolean} [zigzag=false] - Whether to split the array in a zigzag pattern. If true, elements are distributed across chunks one by one before moving to the next chunk.
 * @returns {T[][]} - An array of chunks containing the elements from the input array.
 *
 * @example
 * // Split an array into chunks
 * const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const chunkedArray = chuck(inputArray, 3);
 * // Returns [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 *
 * @example
 * // Split an array into chunks with zigzag pattern
 * const zigzagArray = chuck(inputArray, 3, true);
 * // Returns [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
 */
export const chuck = <T>(array: T[], length: number, zigzag = false): T[][] => {
  const chucks: T[][] = []

  if (zigzag) {
    for (const [i, element] of array.entries()) {
      const chunkIndex = i % length
      if (!chucks[chunkIndex]) {
        chucks[chunkIndex] = []
      }
      chucks[chunkIndex].push(element)
    }
  } else {
    for (let i = 0; i < array.length; i += length) {
      chucks.push(array.slice(i, i + length))
    }
  }

  return chucks
}

/**
 * Removes specified items from an array.
 *
 * @template T - The type of elements in the array.
 * @template V - The type of items to ignore (default is the same as T).
 * @param {T[]} array - The array to remove items from.
 * @param {...V[]} ignoreItems - The items to be removed from the array.
 * @returns {T[]} - A new array with the specified items removed.
 */
export function without<T, V = T>(array: T[], ...ignoreItems: V[]): T[]
export function without<T, V = T>(array: T[], ignoreItems: V, options?: { transform: (item: T) => V }): T[]
export function without<T, V = T>(array: T[], ignoreItems: V[], options?: { transform: (item: T) => V }): T[]
export function without<T, V = T>(array: T[], ...args: any[]): T[] {
  let transform: (item: T) => V
  let ignoreItems: V[]

  const [_ignoreItems, options] = args

  const isRealOptions = isObject(options) && hasOwnProperty(options, 'transform')

  if (!options || !isRealOptions) {
    transform = (item: T) => item as unknown as V
    ignoreItems = isArray(_ignoreItems) ? _ignoreItems : args
  } else if (isRealOptions) {
    // @ts-ignore
    transform = options.transform
    ignoreItems = toArray(_ignoreItems)
  }

  return array.filter(item => !ignoreItems.includes(transform(item)))
}

/***
 * @param array
 * @param transform
 * @return array
 * @example const students: [ { class_id: 1, name: 'A' }, { class_id: 2, name: 'B' }, { class_id: 1, name: 'C' } ]
 * groupBy(students, 'class_id')
 * result: [ [{ class_id: 1, name: 'A' }, { class_id: 1, name: 'C' }], [{ class_id: 2, name: 'B' }] ]
 */
export const groupBy = <T, K extends keyof any>(array: T[], transform: (item: T) => K): Record<K, T[]> => {
  return array.reduce(
    (group, item) => {
      const key = transform(item)
      group[key] = group[key] || []
      group[key].push(item)

      return group
    },
    {} as Record<K, T[]>,
  )
}

export const join = <T, K extends keyof any>(
  array: T[],
  separator: string,
  transform = (item: T) => item as unknown as K,
): string => {
  return array
    .map(element => transform(element))
    .filter(element => isExist(element))
    .join(separator)
}

/**
 * Get nth item of Array. Negative for backward
 *
 * @category Array
 */
export function at(array: readonly [], index: number): undefined
export function at<T>(array: readonly T[], index: number): T
export function at<T>(array: readonly T[] | [], index: number): T | undefined {
  const length = array.length
  if (!length) {
    return undefined
  }

  if (index < 0) {
    index += length
  }

  return array[index]
}

/**
 * Get last item
 *
 * @category Array
 */
export function last(array: readonly []): undefined
export function last<T>(array: readonly T[]): T
export function last<T>(array: readonly T[]): T | undefined {
  return at(array, -1)
}

/**
 * Shuffles the elements of an array using the Fisher-Yates shuffle algorithm.
 *
 * @param {T[]} array - The array to shuffle.
 * @returns {T[]} A shuffled copy of the original array.
 */
export const shuffle = <T>(array: T[]): T[] => {
  // Create a copy of the original array
  const copy = [...array]

  // Shuffle the copy using the Fisher-Yates shuffle algorithm
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}

/**
 * Removes duplicate elements from an array based on the value of a specified property.
 * @template T The type of elements in the array.
 * @template K The type of the property to compare.
 * @param {T[]} array The array to remove duplicates from.
 * @param {(item: T) => K} [transform=(item) => item as unknown as K] The property to compare.
 * @returns {T[]} A new array with duplicate elements removed.
 */
export const uniq = <T, K extends keyof T>(array: T[], transform = (item: T) => item as unknown as T[K]): T[] => {
  const map = new Map<T[K], T>()

  for (const item of array) {
    const key = transform(item)
    if (!map.has(key)) {
      map.set(key, item)
    }
  }

  return [...map.values()]
}

/**
 * Creates a new array by slicing a given array from a specified start index
 * to an optional end index. The original array remains unchanged.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to be sliced.
 * @param {number} start - The index at which to begin slicing. If negative,
 *                        it represents an offset from the end of the array.
 * @param {number} [end] - The index at which to end slicing. If omitted,
 *                        the slice extends to the end of the array.
 * @returns {T[]} A new array containing the sliced elements.
 */
export const splice = <T>(array: T[], start: number, end?: number): T[] => {
  const length = array.length

  if (isUndefined(end)) {
    end = length
  }

  if (start < 0) {
    start += length
  }

  if (end < start) {
    return []
  }

  const _newArray = cloneDeep(array)
  _newArray.splice(start, end - start)

  return _newArray
}

/**
 * Limits the number of elements in an array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The input array to limit.
 * @param {number} count - The maximum number of elements to keep in the array.
 * @returns {T[]} - A new array containing up to 'count' elements from the input array.
 */
export const limit = <T>(array: T[], count: number): T[] => {
  return splice(array, count)
}

/**
 * Shuffles an array and picks n random elements from the shuffled array.
 *
 * @param {T[]} array - The array to shuffle and pick elements from.
 * @param {number} n - The number of elements to pick.
 * @returns {T[]} An array containing n random elements from the shuffled array. If n is greater than the length of the array, returns an array containing all of the elements of the original array.
 */
export const sample = <T>(array: T[], n: number): T[] => {
  return limit(shuffle(array), n)
}

/**
 * Finds an element in an array of objects based on a specified key-value pair.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The input array to search.
 * @param {string} key - The key to use for comparison.
 * @param {*} value - The value to search for in the specified key.
 * @returns {T | undefined} - The first element in the array that matches the key-value pair, or undefined if not found.
 */
export const find = <T extends object>(array: T[], key: string, value: any): T | undefined => {
  return array.find(item => get(item, key) === value)
}
