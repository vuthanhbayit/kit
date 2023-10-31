import { forEach } from './object'
import { Flatten, Replace } from './types'

type EnumType = {
  [key: string]: Record<string, any>
}

type Result<Enum extends EnumType, IndexKey extends keyof Enum[keyof Enum]> = Enum & {
  [Key in keyof Enum as Enum[Key][IndexKey]]: Flatten<Replace<Enum[Key], IndexKey, Key>>
}

/**
 * Creates an enumeration object with keys based on a specified index from the input constants.
 *
 * @template {EnumType} Enum - The enumeration type definition.
 * @template {keyof Enum[keyof Enum]} IndexKey - The key to be used as the index.
 *
 * @param {Enum} constants - The enumeration constants to be processed.
 * @param {IndexKey} keyIndex - The key to be used as the index.
 *
 * @returns {Result<Enum, IndexKey>} An enumeration object with keys generated from the specified index.
 *
 * @example
 * const constants = {
 *   A: { id: 1, name: 'Item A' },
 *   B: { id: 2, name: 'Item B' },
 * };
 *
 * const enumResult = createEnum(constants, 'id');
 * // The 'enumResult' will be:
 * // {
 * //   A: { id: 'A', name: 'Item A' },
 * //   1: { id: 1, name: 'Item A' },
 * //   B: { id: 'B', name: 'Item B' },
 * //   2: { id: 2, name: 'Item B' }
 * // }
 */
export const createEnum = <Enum extends EnumType, IndexKey extends keyof Enum[keyof Enum]>(
  constants: Enum,
  keyIndex: IndexKey,
): Result<Enum, IndexKey> => {
  const mapper = new Map()

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
