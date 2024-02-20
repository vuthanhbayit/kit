import { forEach } from './object'
import { Flatten, Replace } from './types'

type ConstantType = {
  [key: string]: Record<string, any>
}

type Result<Constant extends ConstantType, IndexKey extends keyof Constant[keyof Constant]> = Constant & {
  [Key in keyof Constant as Constant[Key][IndexKey]]: Flatten<Replace<Constant[Key], IndexKey, Key>>
}

/**
 * Creates a Constant object with keys based on a specified index from the input constants.
 *
 * @template {ConstantType} Constant - The Constant type definition.
 * @template {keyof Constant[keyof Constant]} IndexKey - The key to be used as the index.
 *
 * @param {Constant} constants - The Constant constants to be processed.
 * @param {IndexKey} keyIndex - The key to be used as the index.
 *
 * @returns {Result<Constant, IndexKey>} An Constant object with keys generated from the specified index.
 *
 * @example
 * const constants = {
 *   A: { id: 1, name: 'Item A' },
 *   B: { id: 2, name: 'Item B' },
 * };
 *
 * const ConstantResult = createConstant(constants, 'id');
 * // The 'ConstantResult' will be:
 * // {
 * //   A: { id: 1, name: 'Item A' },
 * //   1: { id: 'A', name: 'Item A' },
 * //   B: { id: 2, name: 'Item B' },
 * //   2: { id: 'B', name: 'Item B' }
 * // }
 */
export const buildConstants = <Constant extends ConstantType, IndexKey extends keyof Constant[keyof Constant]>(
  constants: Constant,
  keyIndex: IndexKey,
): Result<Constant, IndexKey> & { getCoreConstants: () => Constant; getCoreValues: () => Record<string, any>[] } => {
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

  const _newConstants = Object.fromEntries(mapper)

  Object.assign(_newConstants, {
    getCoreConstants: (): Constant => constants,
    getCoreValues: (): Record<string, any>[] => Object.values(constants),
    countConstants: () => Object.keys(constants).length,
  })

  return _newConstants
}
