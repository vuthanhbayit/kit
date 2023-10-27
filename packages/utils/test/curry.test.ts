import { describe, expect, test } from 'vitest'
import { curry } from '../src'

const add = (a: number, b: number, c: number): number => {
  return a + b + c
}

const multiply = (a: number, b: number) => {
  return a * b
}

describe('curry', () => {
  test('should correctly curry a function', () => {
    const curriedAdd = curry(add)

    expect(curriedAdd(2)(3)(4)).toBe(9)
    expect(curriedAdd(2, 3)(4)).toBe(9)
    expect(curriedAdd(2)(3, 4)).toBe(9)
    expect(curriedAdd(2, 3, 4)).toBe(9)
  })

  test('should work with functions of different arities', () => {
    const curriedMultiply = curry(multiply)

    expect(curriedMultiply(2)(3)).toBe(6)
    expect(curriedMultiply(2, 3)).toBe(6)
  })
})
