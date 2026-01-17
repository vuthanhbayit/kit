import { describe, expect, test } from 'vitest'
import { pipe } from '../src'

describe('pipe', () => {
  test('should pipe single function', () => {
    const double = (x: number) => x * 2
    const piped = pipe(double)

    expect(piped(5)).toBe(10)
  })

  test('should pipe two functions', () => {
    const add = (a: number, b: number) => a + b
    const double = (x: number) => x * 2
    const piped = pipe(add, double)

    expect(piped(2, 3)).toBe(10) // (2 + 3) * 2 = 10
  })

  test('should pipe multiple functions', () => {
    const add = (a: number, b: number) => a + b
    const square = (x: number) => x * x
    const double = (x: number) => x * 2
    const piped = pipe(add, square, double)

    expect(piped(2, 3)).toBe(50) // ((2 + 3) ^ 2) * 2 = 50
  })

  test('should work with different types', () => {
    const toString = (x: number) => x.toString()
    const addPrefix = (s: string) => `Value: ${s}`
    const piped = pipe((x: number) => x * 2, toString, addPrefix)

    expect(piped(5)).toBe('Value: 10')
  })
})
