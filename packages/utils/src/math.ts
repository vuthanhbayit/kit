/**
 * Returns the sum of two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} - The sum of a and b.
 */
export const add = (a: number, b: number): number => a + b

/**
 * Returns the sum of all values in an array after applying a transform function to each element.
 * @template T
 * @param {T[]} array - The array to calculate the sum of.
 * @param {function(props: T): number} [transform] - The function to apply to each element.
 * If not provided, the default function returns the element cast as a number.
 * @returns {number} - The sum of all the values in the transformed array.
 */
export const sum = <T>(array: T[], transform = (props: T) => props as unknown as number): number => {
  return array.map(element => transform(element)).reduce((accumulator, element) => add(accumulator, element), 0)
}

/**
 * Returns the average of all values in an array after applying a transform function to each element.
 * @template T
 * @param {T[]} array - The array to calculate the average of.
 * @param {function(props: T): number} [transform] - The function to apply to each element.
 * If not provided, the default function returns the element cast as a number.
 * @returns {number} - The average of all the values in the transformed array.
 */
export const average = <T>(array: T[], transform = (props: T) => props as unknown as number): number => {
  return sum(array, transform) / array.length
}

/**
 * Returns the minimum value in an array after applying a transform function to each element.
 * @template T
 * @param {T[]} array - The array to find the minimum value in.
 * @param {function(props: T): number} [transform] - The function to apply to each element.
 * If not provided, the default function returns the element cast as a number.
 * @returns {number} - The minimum value in the transformed array.
 */
export const min = <T>(array: T[], transform = (props: T) => props as unknown as number): number => {
  if (array.length === 0) {
    return Number.POSITIVE_INFINITY
  }

  let minValue = transform(array[0])
  for (let i = 1; i < array.length; i++) {
    const value = transform(array[i])
    if (value < minValue) {
      minValue = value
    }
  }

  return minValue
}

/**
 * Returns the maximum value in an array after applying a transform function to each element.
 * @template T
 * @param {T[]} array - The array to find the maximum value in.
 * @param {function(props: T): number} [transform] - The function to apply to each element.
 * If not provided, the default function returns the element cast as a number.
 * @returns {number} - The maximum value in the transformed array.
 */
export const max = <T>(array: T[], transform = (props: T) => props as unknown as number): number => {
  if (array.length === 0) {
    return Number.NEGATIVE_INFINITY
  }

  let maxValue = transform(array[0])
  for (let i = 1; i < array.length; i++) {
    const value = transform(array[i])
    if (value > maxValue) {
      maxValue = value
    }
  }

  return maxValue
}
