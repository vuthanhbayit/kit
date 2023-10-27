import { forEach } from './object'

/**
 * Creates an enumeration (enum-like) object based on the input constants and a key index.
 *
 * @template U - A record type representing the constant values.
 * @template V - The value type of the constants.
 * @template T - The value type of the enumeration.
 * @template K - The key type for the key index.
 *
 * @param {U} constants - An object containing the constants as key-value pairs.
 * @param {K} keyIndex - The key index used to create the enumeration.
 *
 * @return {Record<keyof U | V[K], T>} An object representing the enumeration, where keys can be from the original constants or the values indexed by keyIndex.
 */
export const createEnum = <U extends Record<any, any>, V extends U[keyof U], T extends V, K extends keyof T>(
  constants: U,
  keyIndex: K,
): Record<keyof U | V[K], T> => {
  const mapper = new Map<keyof U | V[K], T>()

  forEach(constants, (data, key) => {
    if (!mapper.has(key)) {
      mapper.set(key, data)
    }

    const newKey = data[keyIndex]
    if (!mapper.has(newKey)) {
      mapper.set(newKey, {
        ...data,
        [keyIndex]: key,
      })
    }
  })

  return Object.fromEntries(mapper)
}
