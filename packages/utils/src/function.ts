import { isArray, isFunction, isObject, isString } from './is'

/**
 * Recursively removes undefined values from an object or array and its nested properties or elements.
 *
 * @param object
 * @param {function(value: any): boolean} [checkDefineFn] - A custom function to determine if a value is defined. Defaults to checking if the value is not undefined.
 * @returns {object|unknown[]} - The object or array with undefined values removed.
 *
 * @example
 * // Remove undefined values from an object
 * const inputObject = { a: 1, b: undefined, c: { d: 2, e: undefined } };
 * const resultObject = compact(inputObject);
 * // Returns { a: 1, c: { d: 2 } }
 *
 * @example
 * // Remove undefined values from an array
 * const inputArray = [1, 2, undefined, 3, [4, undefined, 5]];
 * const resultArray = compact(inputArray);
 * // Returns [1, 2, 3, [4, 5]]
 *
 * @example
 * // Use a custom checkDefineFn to remove null values
 * const inputArray = [1, 2, null, 3];
 * const customCheck = (value) => value !== null;
 * const resultArray = compact(inputArray, customCheck);
 * // Returns [1, 2, 3]
 */
export function compact<T extends object>(object: T, checkDefineFn?: (value: any) => boolean): T
export function compact<T extends unknown[]>(array: T, checkDefineFn?: (value: any) => boolean): T
export function compact(objectOrArray: any, checkDefineFn = (value: any) => value !== undefined) {
  if (isArray(objectOrArray)) {
    return objectOrArray.map(value => clearUndefined(value, checkDefineFn)).filter(element => checkDefineFn(element))
  }

  if (isObject(objectOrArray)) {
    return Object.fromEntries(
      Object.entries(objectOrArray)
        .map(value => clearUndefined(value, checkDefineFn))
        .filter(([_, value]) => clearUndefined(value, checkDefineFn)),
    )
  }

  return objectOrArray
}

/**
 * Recursively removes undefined values from an object or array and its nested properties or elements.
 *
 * @param object
 * @param {function(value: any): boolean} [checkDefineFn] - A custom function to determine if a value is defined. Defaults to checking if the value is not undefined.
 * @returns {object|unknown[]} - The object or array with undefined values removed.
 *
 * @example
 * // Remove undefined values from an object
 * const inputObject = { a: 1, b: undefined, c: { d: 2, e: undefined } };
 * const resultObject = clearUndefined(inputObject);
 * // Returns { a: 1, c: { d: 2 } }
 *
 * @example
 * // Remove undefined values from an array
 * const inputArray = [1, 2, undefined, 3, [4, undefined, 5]];
 * const resultArray = clearUndefined(inputArray);
 * // Returns [1, 2, 3, [4, 5]]
 *
 * @example
 * // Use a custom checkDefineFn to remove null values
 * const inputArray = [1, 2, null, 3];
 * const customCheck = (value) => value !== null;
 * const resultArray = clearUndefined(inputArray, customCheck);
 * // Returns [1, 2, 3]
 */
export function clearUndefined<T extends object>(object: T, checkDefineFn?: (value: any) => boolean): T
export function clearUndefined<T extends unknown[]>(array: T, checkDefineFn?: (value: any) => boolean): T
export function clearUndefined(objectOrArray: any, checkDefineFn = (value: any) => value !== undefined) {
  if (isArray(objectOrArray)) {
    return objectOrArray.map(value => clearUndefined(value, checkDefineFn)).filter(element => checkDefineFn(element))
  }

  if (isObject(objectOrArray)) {
    return Object.fromEntries(
      Object.entries(objectOrArray)
        .map(value => clearUndefined(value, checkDefineFn))
        .filter(([_, value]) => clearUndefined(value, checkDefineFn)),
    )
  }

  return objectOrArray
}

/**
 * Creates a deep copy of an object or array by serializing it to JSON and then parsing it back.
 *
 * @param {any} value - The value to be deep-copied.
 * @returns {any} - A deep copy of the input value.
 *
 * @example
 * // Create a deep copy of an object
 * const originalObject = { a: 1, b: { c: 2 } };
 * const clonedObject = cloneDeep(originalObject);
 * // Returns a new object with the same structure and values
 *
 * @example
 * // Create a deep copy of an array
 * const originalArray = [1, [2, [3, 4]]];
 * const clonedArray = cloneDeep(originalArray);
 * // Returns a new array with the same elements and nested arrays
 */
export const cloneDeep = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value))
}

/**
 * Asynchronously sleeps for a specified duration.
 *
 * @param {number} timeout - The duration, in milliseconds, to sleep for.
 * @returns {Promise<void>} - A Promise that resolves after the specified sleep duration.
 *
 * @example
 * // Sleep for 2 seconds (2000 milliseconds)
 * async function exampleSleep() {
 *   console.log('Start');
 *   await sleep(2000); // Sleep for 2 seconds
 *   console.log('End'); // This line will be executed after the sleep
 * }
 *
 * exampleSleep();
 */
export const sleep = (timeout: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

/**
 * Converts a value or a function to a function. If the input is already a function, it is returned as-is.
 * If the input is a value, it is wrapped in a function that returns the value.
 *
 * @template T
 * @param {T | ((...args: any[]) => T)} callback - The value or function to convert to a function.
 * @returns {(...args: any[]) => T} - A function that returns the input value or invokes the input function.
 *
 * @example
 * // Convert a value to a function
 * const value = 42;
 * const valueFunction = toFunction(value);
 * console.log(valueFunction()); // Prints 42
 *
 * @example
 * // Convert a function to a function
 * const func = (a, b) => a + b;
 * const funcFunction = toFunction(func);
 * console.log(funcFunction(5, 7)); // Prints 12
 */
export const toFunction = <T>(callback: T | ((...args: any[]) => T)): ((...args: any[]) => T) => {
  return isFunction(callback) ? callback : () => callback
}

/**
 * Returns the size (number of elements) of an object, array, or string. Optionally, you can trim strings or compact arrays before calculating the size.
 *
 * @param {object|unknown[]|string} data - The object, array, or string to measure the size of.
 * @param {boolean} [isCompact=false] - Whether to trim strings or compact arrays before calculating the size.
 * @returns {number} - The size of the input object, array, or string.
 *
 * @example
 * // Get the size of an object
 * const object = { a: 1, b: 2, c: 3 };
 * const objectSize = size(object, true); // Returns 3 (number of keys with isCompact option)
 * const originalObjectSize = size(object, false); // Returns 3 (number of keys without isCompact option)
 *
 * @example
 * // Get the size of an array
 * const array = [1, 2, undefined, 4, 5];
 * const arraySize = size(array, true); // Returns 4 (number of elements with isCompact option)
 * const originalArraySize = size(array, false); // Returns 5 (number of elements without isCompact option)
 *
 * @example
 * // Get the size of a string
 * const string = 'Hello, World! ';
 * const stringSize = size(string, true); // Returns 12 (number of characters without trailing spaces with isCompact option)
 * const originalStringSize = size(string, false); // Returns 13 (number of characters with trailing spaces without isCompact option)
 */
export function size<T extends object>(object: T, isCompact?: boolean): number
export function size<T extends unknown[]>(array: T, isCompact?: boolean): number
export function size<T extends string>(string: T, isCompact?: boolean): number
export function size(data: any, isCompact = false): number {
  if (isCompact) {
    data = isString(data) ? data.trim() : compact(data)
  }

  if (isObject(data)) {
    return Object.keys(data).length
  }

  return data.length
}

/**
 * Omit specified keys from an object or an array of objects.
 *
 * @template T - The type of the input object or objects.
 * @template K - The keys to omit from the object or objects.
 * @param {T[] | Record<any, any>} obj - The input object or an array of objects.
 * @param {...K} keys - The keys to omit from the object or objects.
 * @returns {Omit<T, K>[] | Omit<T, K>} - The object with specified keys omitted or an array of objects with specified keys omitted.
 */
export function omit<T extends object, K extends Extract<keyof T, string>>(obj: T[], ...keys: K[]): Omit<T, K>[]
export function omit<T extends object, K extends Extract<keyof T, string>>(obj: T, ...keys: K[]): Omit<T, K>
export function omit(obj: unknown[] | Record<any, any>, ...keys: any[]): any {
  if (isArray(obj)) {
    return obj.reduce((acc, currentValue) => {
      const _item = omit(currentValue, ...keys)

      acc.push(_item)

      return acc
    }, [])
  } else if (isObject(obj)) {
    const _obj = { ...obj }
    for (const key of keys) {
      delete _obj[key]
    }
    return _obj
  }

  return obj
}

/**
 * Pick specified keys from an object or an array of objects.
 *
 * @template T - The type of the input object or objects.
 * @template K - The keys to pick from the object or objects.
 * @param {T[] | Record<any, any>} obj - The input object or an array of objects.
 * @param {...K} keys - The keys to pick from the object or objects.
 * @returns {Pick<T, K>[] | Pick<T, K>} - The object with specified keys picked or an array of objects with specified keys picked.
 */
export function pick<T extends object, K extends Extract<keyof T, string>>(obj: T[], ...keys: K[]): Pick<T, K>[]
export function pick<T extends object, K extends Extract<keyof T, string>>(obj: T, ...keys: K[]): Pick<T, K>
export function pick(obj: unknown[] | Record<any, any>, ...keys: any[]): any {
  if (isArray(obj)) {
    return obj.map(item => pick(item, ...keys))
  } else if (isObject(obj)) {
    const _obj: Record<any, any> = {}

    for (const key of keys) {
      _obj[key] = obj[key]
    }

    return _obj
  }

  return obj
}
