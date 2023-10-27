import { isNumber, isNumeric } from './is'

/**
 * Converts a value to a number if possible, otherwise returns the original value.
 *
 * @param {string | number} value - The value to convert to a number.
 * @returns {number} - The converted number or the original value if conversion is not possible.
 *
 * @example
 * // Convert a string to a number
 * const stringValue = "42";
 * const numericValue = toNumber(stringValue); // Returns 42 (number)
 *
 * @example
 * // Keep a number unchanged
 * const numberValue = 123;
 * const numericValue = toNumber(numberValue); // Returns 123 (number)
 *
 * @example
 * // Handle an invalid string
 * const invalidString = "abc";
 * const numericValue = toNumber(invalidString); // Returns "NaN"
 */
export const toNumber = (value: string | number): number => {
  return isNumber(value) ? value : Number(value)
}

/**
 * Converts a value to a number if it is numeric, otherwise returns the original value.
 *
 * @param {string | number} value - The value to convert to a number if numeric.
 * @returns {number | string} - The converted number or the original value if it is not numeric.
 *
 * @example
 * // Convert a string to a number
 * const stringValue = "42";
 * const numericValue = toNumberic(stringValue); // Returns 42 (number)
 *
 * @example
 * // Keep a number unchanged
 * const numberValue = 123;
 * const numericValue = toNumberic(numberValue); // Returns 123 (number)
 *
 * @example
 * // Handle a non-numeric string
 * const nonNumericString = "abc";
 * const numericValue = toNumberic(nonNumericString); // Returns "abc" (string)
 */
export const toNumberic = (value: string | number): number | string => {
  return isNumeric(value) ? Number(value) : value
}
