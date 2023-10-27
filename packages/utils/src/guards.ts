/**
 * Checks if a value is not `undefined`.
 *
 * @template T
 * @param {T} val - The value to check.
 * @returns {val is Exclude<T, undefined>} - True if the value is not `undefined`, otherwise false.
 *
 * @example
 * // Check if a value is not undefined
 * const value = "Hello, world";
 * if (notUndefined(value)) {
 *   console.log("Value is not undefined:", value);
 * }
 */
export const notUndefined = <T>(val: T): val is Exclude<T, undefined> => val !== undefined

/**
 * Checks if a value is defined (not `undefined` or `null`).
 *
 * @template T
 * @param {T} val - The value to check.
 * @returns {val is NonNullable<T>} - True if the value is defined, otherwise false.
 *
 * @example
 * // Check if a value is defined
 * const value = 42;
 * if (isDefined(value)) {
 *   console.log("Value is defined:", value);
 * }
 */
export const isDefined = <T>(val: T): val is NonNullable<T> => val !== undefined && val !== null

/**
 * Checks if a value is `undefined`.
 *
 * @template T
 * @param {T | null | undefined} val - The value to check.
 * @returns {val is undefined} - True if the value is `undefined`, otherwise false.
 *
 * @example
 * // Check if a value is undefined
 * const value = undefined;
 * if (isUndefined(value)) {
 *   console.log("Value is undefined");
 * }
 */
export const isUndefined = <T>(val: T | null | undefined): val is undefined => !isDefined(val)
