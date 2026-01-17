import { describe, expect, test } from 'vitest'
import { randomString } from '../src'

describe('randomString', () => {
  test('should generate string of default length 5', () => {
    const result = randomString()
    expect(result).toHaveLength(5)
  })

  test('should generate string of specified length', () => {
    expect(randomString(10)).toHaveLength(10)
    expect(randomString(1)).toHaveLength(1)
    expect(randomString(100)).toHaveLength(100)
  })

  test('should only contain alphanumeric characters', () => {
    const result = randomString(100)
    expect(result).toMatch(/^[\dA-Za-z]+$/)
  })

  test('should generate different strings on each call', () => {
    const results = new Set<string>()
    for (let i = 0; i < 10; i++) {
      results.add(randomString(10))
    }
    // With 10 random strings of length 10, they should all be different
    expect(results.size).toBe(10)
  })

  test('should handle length 0', () => {
    expect(randomString(0)).toBe('')
  })
})
