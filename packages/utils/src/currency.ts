import { toNumber } from './number'

/**
 * Formats a numeric value as a currency string using the Vietnamese locale ('vi-VN').
 *
 * @param {number | string} value - The numeric value to be formatted as currency.
 * @returns {string} - The formatted currency string.
 *
 * @example
 * // Format a numeric value as currency
 * const currencyValue = 1234567.89;
 * const formattedCurrency = formatCurrency(currencyValue);
 * // Returns '1.234.567,89' (for example)
 *
 * @example
 * // Format a numeric value provided as a string
 * const currencyValueAsString = '9876543.21';
 * const formattedCurrencyFromString = formatCurrency(currencyValueAsString);
 * // Returns '9.876.543,21' (for example)
 */
export const formatCurrency = (value: number | string): string => {
  return new Intl.NumberFormat('vi-VN').format(toNumber(value))
}
