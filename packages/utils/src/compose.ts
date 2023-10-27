type FirstFn<A extends any[], B> = (...args: A) => B
type Fn<A, B> = (a: A) => B

/**
 * Creates a function that pipes a series of functions together,
 * passing the result of each function as an argument to the next.
 *
 * @template A - The input argument types.
 * @template B - The output type of the first function.
 * @param {(...args: A) => B} fn1 - The first function in the pipeline.
 * @param {...((b: B) => any)} fns - Additional functions to be applied sequentially.
 * @returns {(...args: A) => ReturnType<typeof fns[number]>} - A function that applies the pipeline to the input arguments.
 *
 * @example
 * const add = (a, b) => a + b;
 * const square = (x) => x * x;
 * const double = (x) => x * 2;
 *
 * const pipeAddSquareDouble = pipe(add, square, double);
 * const result = pipeAddSquareDouble(2, 3); // Result: double(square(add(2, 3))) = double(square(5)) = double(25) = 50
 */
export function pipe<A extends any[], B>(ab: FirstFn<A, B>): FirstFn<A, B>
export function pipe<A extends any[], B, C>(ab: FirstFn<A, B>, bc: Fn<B, C>): FirstFn<A, C>
export function pipe<A extends any[], B, C, D>(ab: FirstFn<A, B>, bc: Fn<B, C>, cd: Fn<C, D>): FirstFn<A, D>
export function pipe<A extends any[], B, C, D, E>(
  ab: FirstFn<A, B>,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>,
): FirstFn<A, E>
export function pipe<A extends any[], B, C, D, E, F>(
  ab: FirstFn<A, B>,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>,
  ef: Fn<E, F>,
): FirstFn<A, F>
export function pipe<A extends any[], B, C, D, E, F, G>(
  ab: FirstFn<A, B>,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>,
  ef: Fn<E, F>,
  fg: Fn<F, G>,
): FirstFn<A, G>
export function pipe(fn1: FirstFn<any, any>, ...fns: Fn<any, any>[]) {
  const piped = fns.reduce(
    (prevFn, nextFn) => value => nextFn(prevFn(value)),
    value => value,
  )
  return (...args: any[]) => piped(fn1(...args))
}
