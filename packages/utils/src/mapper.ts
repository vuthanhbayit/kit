/**
 * Creates a mapper function that maps keys to values based on a provided mapping object or individual values.
 * If a key is not found in the mapping object or individual values, it returns a default missing value.
 *
 * @template T
 * @template K
 * @param {Mapper<T> | T} map - The mapping object or individual values to map keys to values.
 * @param {T[K]} [missingValue] - The default value to return when the key is missing (optional).
 * @returns {(key: K) => T[K]} - A function that takes a key and returns the corresponding value or the missing value.
 *
 * @example
 * // Create a mapper with a mapping object
 * const mapperWithObject = createMapper({ apple: 'fruit', banana: 'fruit', carrot: 'vegetable' }, 'unknown');
 * const result1 = mapperWithObject('banana'); // Returns 'fruit'
 * const result2 = mapperWithObject('grape');  // Returns 'unknown'
 *
 * @example
 * // Create a mapper with individual values
 * const mapperWithValues = createMapper('value', 'default');
 * const result3 = mapperWithValues('value');   // Returns 'value'
 * const result4 = mapperWithValues('missing'); // Returns 'default'
 */

export function createMapper<T, K extends keyof T>(map: T, missingValue?: T[K]): (key: K) => T[K] {
  return (key: K): any => {
    return key ? map[key] : missingValue
  }
}
