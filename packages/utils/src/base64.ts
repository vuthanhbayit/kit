import { toBlob } from './file'
import { isString } from './is'

const regexBase64 =
  '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?'

const regexMimeBase64 = 'data:(.*);base64,'

export const REGEXP_BASE_64 = new RegExp(`^${regexBase64}$`, 'i')

export const REGEX_MIME_BASE_64 = new RegExp(`^(${regexMimeBase64})(${regexBase64})$`, 'i')

const mimeTypeSignatures: Record<string, string> = {
  JVBERi0: 'application/pdf',
  R0lGODdh: 'image/gif',
  R0lGODlh: 'image/gif',
  iVBORw0KGgo: 'image/png',
  '/9j/': 'image/jpg',
}

/**
 * Detects the MIME type of string by checking its signature against a list of known MIME types.
 *
 * @param {string} string - The string to detect the MIME type of.
 * @returns {string|undefined} The detected MIME type (if found), or `undefined` if not found.
 */
export const detectMimeType = (string: string): string | undefined => {
  for (const key in mimeTypeSignatures) {
    if (string.startsWith(key)) {
      return mimeTypeSignatures[key]
    }
  }
}

/**
 * Converts a string or blob to a base64-encoded string.
 *
 * @param {string | Blob} data - The input data to be converted to base64.
 * @returns {Promise<string>} A promise that resolves to the base64-encoded string.
 */
export const toBase64 = async (data: string | Blob): Promise<string> => {
  const blob = isString(data) ? await toBlob(data) : data

  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
}

/**
 * Checks if a string is base64-encoded.
 *
 * @param {string} string - The string to be checked.
 * @returns {boolean} `true` if the string is base64-encoded, `false` otherwise.
 */
export const isBase64 = (string: string): boolean => REGEXP_BASE_64.test(string)

/**
 * Checks if a string is base64-encoded and has a valid MIME type prefix.
 *
 * @param {string} string - The string to be checked.
 * @returns {boolean} `true` if the string is base64-encoded and has a valid MIME type prefix, `false` otherwise.
 */
export const isMimeBase64 = (string: string): boolean => REGEX_MIME_BASE_64.test(string)

/**
 * Adds a valid MIME type prefix to a base64-encoded string if it doesn't already have one.
 *
 * @param {string} base64 - The base64-encoded string to modify.
 * @returns {string} The modified string with a valid MIME type prefix (if needed).
 */
export const withMimeBase64 = (base64: string): string => {
  if (isMimeBase64(base64)) {
    return base64
  }

  const mimeType = detectMimeType(base64)

  return mimeType ? `data:${mimeType};base64,${base64}` : base64
}

/**
 * Extracts the MIME type from a base64-encoded string.
 *
 * @param {string} base64 - The base64-encoded string to extract the MIME type from.
 * @returns {string|undefined} The MIME type of the base64-encoded string (if found), or `undefined` if not found.
 */
export const getMimeBase64 = (base64: string): string | undefined => {
  const matches = REGEX_MIME_BASE_64.exec(base64)

  return matches ? matches[2] : undefined
}
