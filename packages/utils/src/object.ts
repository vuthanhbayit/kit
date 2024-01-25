import { isArray, isObject } from './is'
import { notUndefined } from './guards'

/**
 * Checks if an object has an own property with the specified key.
 *
 * @template T
 * @param {T} obj - The object to check for the property.
 * @param {PropertyKey} v - The key of the property to check.
 * @returns {boolean} - True if the object has an own property with the specified key, otherwise false.
 */
export const hasOwnProperty = <T>(obj: T, v: PropertyKey): boolean => {
  if (!isObject(obj)) {
    return false
  }

  return Object.prototype.hasOwnProperty.call(obj, v)
}

/**
 * Checks if an object property is defined and not `undefined`.
 *
 * @template T
 * @template K
 * @param {T} object - The object to check for the property.
 * @param {K} property - The property to check for.
 * @returns {boolean} - True if the property is defined and not `undefined`, otherwise false.
 */
export const has = <T extends object, K extends keyof T>(object: T, property: K): boolean => {
  return notUndefined(object[property])
}

/**
 * @param obj
 * @param path
 * @param defaultVal
 * @example get({ a: {b: { c: 1 }} }, 'a.b') => {c: 1}
 */
export const get = <T = any>(
  obj: Record<string, any> | undefined,
  path: string | string[],
  defaultVal?: T,
): T | undefined => {
  const _path = isArray(path)
    ? path
    : path
        .replace(/(\[(\d)])/g, '.$2')
        .replace(/^\./, '')
        .split('.')
        .filter(i => i.length)

  if (obj && _path.length > 0) {
    return get(obj[_path.shift()!], _path, defaultVal)
  }

  return obj === undefined ? defaultVal : (obj as unknown as T)
}

const entries = <T extends object, K extends keyof T>(object: T): Array<[K, T[K]]> => {
  return Object.entries(object) as Array<[K, T[K]]>
}

/**
 * @return object: T
 * @example map({a: 1, b: 2, c: 3}, value => value * 2) => { a: 2, b: 4, c: 6 }
 * @param object
 * @param callback
 */
export const map = <T extends object, K extends keyof T, U>(
  object: T,
  callback: (this: T, value: T[K], key: K, data: T) => U,
) => {
  return Object.fromEntries(
    entries<T, K>(object).map(([key, value]) => {
      return [key, callback.call(object, value, key, object)]
    }),
  ) as Record<K, U>
}

/**
 * @return object: T
 * @example filter({ a: 1, b: 2, c: 3 }, value => value > 2) => { c: 3 }
 * @param object
 * @param callback
 */
export const filter = <T extends object, K extends keyof T>(
  object: T,
  callback: (this: T, value: T[K], key: K, data: T) => boolean,
) => {
  return Object.fromEntries(
    entries<T, K>(object).filter(([key, value]) => {
      return callback.call(object, value, key, object)
    }),
  ) as Record<K, T[K]>
}

/**
 * Iterates over the key-value pairs of an object and applies a callback function to each pair.
 *
 * @template T
 * @template K
 * @param {T} data - The object to iterate over.
 * @param {(this: T, value: T[K], key: K, index: number, data: T) => void} callback - The function to apply to each key-value pair.
 * @example
 * // Iterate over an object and log each key-value pair
 * const data = { a: 1, b: 2, c: 3 };
 * forEach(data, function(value, key, index) {
 *   console.log(`Index ${index}: Key '${key}' has value ${value}`);
 * });
 */
export const forEach = <T extends object, K extends keyof T>(
  data: T,
  callback: (this: T, value: T[K], key: K, index: number, data: T) => void,
) => {
  for (const [index, [key, value]] of entries<T, K>(data).entries()) {
    callback.call(data, value, key, index, data)
  }
}

/**
 * Reduces an object to a single value by applying a callback function to each key-value pair.
 *
 * @template T
 * @template K
 * @template V
 * @param {T} data - The object to reduce.
 * @param {(this: T, acc: V, value: T[K], key: K) => V} callback - The function to apply to each key-value pair for reduction.
 * @param {V} initialValue - The initial value of the accumulator.
 * @returns {V} - The reduced value.
 * @example
 * // Reduce an object to calculate the sum of values
 * const data = { a: 1, b: 2, c: 3 };
 * const initialValue = 0;
 * const total = reduce(data, add, initialValue);
 * // Result: total = 6
 */
export const reduce = <T extends object, K extends keyof T, V>(
  data: T,
  callback: (this: T, acc: V, value: T[K], key: K) => V,
  initialValue: V,
): V => {
  return entries<T, K>(data).reduce((acc, [key, value]) => {
    return callback.call(data, acc, value, key)
  }, initialValue)
}
