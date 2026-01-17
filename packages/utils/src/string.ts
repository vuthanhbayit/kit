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

const VIETNAMESE_TONE_MAP: Record<string, string> = {
  àáâãăạảấầẩẫậắằẳẵặ: 'a',
  èéêẹẻẽếềểễệ: 'e',
  ìíĩỉị: 'i',
  òóôõơọỏốồổỗộớờởỡợ: 'o',
  ùúũưụủứừửữự: 'u',
  ýỳỵỷỹ: 'y',
  đ: 'd',
  ÀÁÂÃĂẠẢẤẦẨẪẬẮẰẲẴẶ: 'A',
  ÈÉÊẸẺẼẾỀỂỄỆ: 'E',
  ÌÍĨỈỊ: 'I',
  ÒÓÔÕƠỌỎỐỒỔỖỘỚỜỞỠỢ: 'O',
  ÙÚŨƯỤỦỨỪỬỮỰ: 'U',
  ÝỲỴỶỸ: 'Y',
  Đ: 'D',
}

const VIETNAMESE_CHAR_MAP = new Map<string, string>()
for (const [chars, replacement] of Object.entries(VIETNAMESE_TONE_MAP)) {
  for (const char of chars) {
    VIETNAMESE_CHAR_MAP.set(char, replacement)
  }
}

const VIETNAMESE_TONE_REGEX = new RegExp(`[${Object.keys(VIETNAMESE_TONE_MAP).join('')}]`, 'g')

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
  return (
    str
      .replace(VIETNAMESE_TONE_REGEX, char => VIETNAMESE_CHAR_MAP.get(char) || char)
      .replace(/\u0300/g, '') // huyền
      .replace(/\u0301/g, '') // sắc
      .replace(/\u0303/g, '') // ngã
      .replace(/\u0309/g, '') // hỏi
      .replace(/\u0323/g, '') // nặng
      .replace(/\u02C6/g, '') // Â, Ê
      .replace(/\u0306/g, '') // Ă
      .replace(/\u031B/g, '') // Ơ, Ư
      .replace(/ +/g, ' ')
      .trim()
      .replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~-]/g, ' ')
  )
}

/**
 * Cắt ngắn văn bản
 * @param text Văn bản cần cắt ngắn
 * @param maxLength Độ dài tối đa (mặc định: 40)
 * @param ellipsis Chuỗi dấu chấm lửng (mặc định: "...")
 * @param preserveExtension Có giữ lại phần mở rộng file không (mặc định: true)
 * @returns Văn bản đã được cắt ngắn
 */
export function truncateText(text: string, maxLength = 40, ellipsis = '...', preserveExtension = true): string {
  // Nếu văn bản đã ngắn hơn độ dài tối đa, không cần cắt
  if (text.length <= maxLength) {
    return text
  }

  // Nếu không cần giữ lại phần mở rộng hoặc không có dấu chấm
  if (!preserveExtension || !text.includes('.')) {
    // Cắt đơn giản, thêm dấu chấm lửng ở cuối
    return text.slice(0, Math.max(0, maxLength - ellipsis.length)) + ellipsis
  }

  // Tìm vị trí dấu chấm cuối cùng để xác định phần mở rộng
  const lastDotIndex = text.lastIndexOf('.')

  // Nếu dấu chấm ở cuối cùng hoặc không có phần mở rộng
  if (lastDotIndex === text.length - 1 || lastDotIndex === -1) {
    return text.slice(0, Math.max(0, maxLength - ellipsis.length)) + ellipsis
  }

  // Lấy phần mở rộng (bao gồm cả dấu chấm)
  const extension = text.slice(Math.max(0, lastDotIndex))

  // Tính số ký tự có thể hiển thị ở phần tên
  const availableCharsForName = maxLength - extension.length - ellipsis.length

  // Nếu không đủ chỗ cho phần tên
  if (availableCharsForName <= 0) {
    // Cắt phần mở rộng để vừa với độ dài tối đa
    return text.slice(0, Math.max(0, maxLength - ellipsis.length)) + ellipsis
  }

  // Kết hợp phần tên + dấu chấm lửng + phần mở rộng
  return text.slice(0, Math.max(0, availableCharsForName)) + ellipsis + extension
}
