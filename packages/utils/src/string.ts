import { isString } from './is'
import { isDefined, isUndefined } from './guards'
import { REGEXP_EXTENDED_ASCII, REGEXP_LATIN_WORD, REGEXP_WORD } from './regex'

/**
 * Converts a value to a string or returns a default value if the input is undefined.
 *
 * @param {unknown} str - The value to convert to a string.
 * @param {string} [defaultValue=""] - The default value to return if the input is undefined (optional).
 * @returns {string} - The string representation of the input value or the default value if undefined.
 *
 * @example
 * // Convert a value to a string
 * const stringValue = toString(42); // Returns "42"
 *
 * @example
 * // Convert an undefined value to a default value
 * const undefinedValue = undefined;
 * const result = toString(undefinedValue, "default"); // Returns "default"
 */
export const toString = (str: unknown, defaultValue = ''): string => {
  if (isUndefined(str)) {
    return defaultValue
  }

  if (isString(str)) {
    return str
  }

  return String(str)
}

/**
 * Splits a string into an array of words based on the provided pattern or default word patterns.
 *
 * @param {unknown} string - The string to split into words.
 * @param {RegExp} [pattern] - The optional regular expression pattern to split words (optional).
 * @returns {string[]} - An array of words obtained from the input string.
 *
 * @example
 * // Split a string into words using default word patterns
 * const text = "Hello, world!";
 * const words = toWords(text); // Returns ["Hello", "world"]
 *
 * @example
 * // Split a string into words using a custom pattern
 * const text = "apple,banana,orange";
 * const customPattern = /,/g;
 * const words = toWords(text, customPattern); // Returns ["apple", "banana", "orange"]
 */
export const toWords = (string: unknown, pattern?: RegExp): string[] => {
  const subjectString = toString(string)

  const patternRegExp = isDefined(pattern)
    ? pattern
    : REGEXP_EXTENDED_ASCII.test(subjectString)
    ? REGEXP_LATIN_WORD
    : REGEXP_WORD

  return subjectString.match(patternRegExp) || []
}

/**
 * Converts a string to lowercase.
 *
 * @param {string} string - The string to convert to lowercase.
 * @returns {string} - The lowercase string.
 *
 * @example
 * // Convert a string to lowercase
 * const originalString = "Hello, World";
 * const lowercaseString = toLowerCase(originalString); // Returns "hello, world"
 */
export const toLowerCase = (string: string): string => {
  return toString(string).toLowerCase()
}

/**
 * Converts a string to uppercase.
 *
 * @param {string} string - The string to convert to uppercase.
 * @returns {string} - The uppercase string.
 *
 * @example
 * // Convert a string to uppercase
 * const originalString = "Hello, World";
 * const uppercaseString = toUpperCase(originalString); // Returns "HELLO, WORLD"
 */
export const toUpperCase = (string: string): string => {
  return toString(string).toUpperCase()
}

/**
 * Converts a string to kebab case by converting spaces to hyphens and making it lowercase.
 *
 * @param {string} string - The string to convert to kebab case.
 * @returns {string} - The kebab case string.
 *
 * @example
 * // Convert a string to kebab case
 * const originalString = "Hello, World";
 * const kebabString = toKebabCase(originalString); // Returns "hello,-world"
 */
export const toKebabCase = (string: string): string => {
  return toWords(string)
    .map(element => toLowerCase(element))
    .join('-')
}

/**
 * Converts a string to snake case by converting spaces to underscores and making it lowercase.
 *
 * @param {string} string - The string to convert to snake case.
 * @returns {string} - The snake case string.
 *
 * @example
 * // Convert a string to snake case
 * const originalString = "Hello, World";
 * const snakeString = toSnakeCase(originalString); // Returns "hello_world"
 */
export const toSnakeCase = (string: string): string => {
  return toWords(string)
    .map(element => toLowerCase(element))
    .join('_')
}

/**
 * Capitalizes the first letter of a string and converts the rest of the string to lowercase.
 *
 * @param {string} string - The string to capitalize.
 * @returns {string} - The capitalized string.
 *
 * @example
 * // Capitalize the first letter of a string
 * const originalString = "hello, world";
 * const capitalizedString = toCapitalize(originalString); // Returns "Hello, world"
 */
export const toCapitalize = (string: string): string => {
  const subjectString = toLowerCase(string)

  return toUpperCase(subjectString[0]) + subjectString.slice(1)
}

/**
 * Converts a string to camel case by capitalizing the first letter of each word except the first word.
 *
 * @param {string} string - The string to convert to camel case.
 * @returns {string} - The camel case string.
 *
 * @example
 * // Convert a string to camel case
 * const originalString = "hello, world";
 * const camelString = toCamelCase(originalString); // Returns "helloWorld"
 */
export const toCamelCase = (string: string): string => {
  return toWords(string)
    .map((string: string, index: number) => {
      return index === 0 ? toLowerCase(string) : toCapitalize(string)
    })
    .join('')
}

/**
 * Removes Vietnamese tones and special characters from a string, while preserving the basic Latin alphabet.
 *
 * @param {string} str - The string from which to remove Vietnamese tones and special characters.
 * @returns {string} - The string with Vietnamese tones and special characters removed.
 *
 * @example
 * // Remove Vietnamese tones and special characters
 * const originalString = "Thầy giáo dạy kỹ thuật lập trình";
 * const cleanedString = removeVietnameseTones(originalString); // Returns "Thay giao day ky thuat lap trinh"
 */
export const removeVietnameseTones = (str: string) => {
  str = str.replace(/[àáâãăạảấầẩẫậắằẳẵặ]/g, 'a')
  str = str.replace(/[èéêẹẻẽếềểễệ]/g, 'e')
  str = str.replace(/[ìíĩỉị]/g, 'i')
  str = str.replace(/[òóôõơọỏốồổỗộớờởỡợ]/g, 'o')
  str = str.replace(/[ùúũưụủứừửữự]/g, 'u')
  str = str.replace(/[ýỳỵỷỹ]/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/[ÀÁÂÃĂẠẢẤẦẨẪẬẮẰẲẴẶ]/g, 'A')
  str = str.replace(/[ÈÉÊẸẺẼẾỀỂỄỆ]/g, 'E')
  str = str.replace(/[ÌÍĨỈỊ]/g, 'I')
  str = str.replace(/[ÒÓÔÕƠỌỎỐỒỔỖỘỚỜỞỠỢ]/g, 'O')
  str = str.replace(/[ÙÚŨƯỤỦỨỪỬỮỰ]/g, 'U')
  str = str.replace(/[ÝỲỴỶỸ]/g, 'Y')
  str = str.replace(/Đ/g, 'D')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/[\u0300\u0301\u0303\u0309\u0323]/g, '') // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  // eslint-disable-next-line no-misleading-character-class
  str = str.replace(/[\u02C6\u0306\u031B]/g, '') // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ')
  str = str.trim()
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/[!"#$%&'()*+,./:;<=>?@[\\]^_`{|}~-]/g, ' ')

  return str
}
