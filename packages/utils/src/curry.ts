/**
 * Type representing an array with the same length as the input tuple.
 * @template T - Tuple type
 */
type SameLength<T extends any[]> = Extract<{ [K in keyof T]: any }, any[]>

/**
 * Type representing a curried function.
 * @template A - Tuple of input arguments
 * @template R - Return type
 */
type Curried<A extends any[], R> = <P extends Partial<A>>(
  ...args: P
) => P extends A ? R : A extends [...SameLength<P>, ...infer S] ? (S extends any[] ? Curried<S, R> : never) : never

/**
 * Curries a given function.
 *
 * @template A - Tuple of input arguments
 * @template R - Return type
 * @param {(...args: A) => R} fn - The function to curry
 * @returns {Curried<A, R>} The curried function
 */
export const curry = <A extends any[], R>(fn: (...args: A) => R): Curried<A, R> => {
  return (...args: any[]): any => {
    return args.length >= fn.length ? fn(...(args as any)) : curry((fn as any).bind(undefined, ...args))
  }
}
