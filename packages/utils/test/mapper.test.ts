import { describe, expect, test } from 'vitest'
import { createMapper } from '../src'

describe('createMapper', () => {
  test('should map keys to values from mapping object', () => {
    const mapper = createMapper({ apple: 'fruit', banana: 'fruit', carrot: 'vegetable' })
    expect(mapper('apple')).toBe('fruit')
    expect(mapper('banana')).toBe('fruit')
    expect(mapper('carrot')).toBe('vegetable')
  })

  test('should return undefined for missing keys when no default', () => {
    const mapper = createMapper({ a: 1, b: 2 })
    expect(mapper('c' as any)).toBeUndefined()
  })

  test('should return undefined for missing keys (missingValue only for falsy keys)', () => {
    const mapper = createMapper({ a: 1, b: 2 }, 0)
    // Note: missingValue is only returned for falsy keys (empty string, null, etc.)
    // Not for missing keys - this returns map[key] which is undefined
    expect(mapper('c' as any)).toBeUndefined()
  })

  test('should return missing value for empty key', () => {
    const mapper = createMapper({ a: 1 }, 999)
    expect(mapper('' as any)).toBe(999)
  })

  test('should work with number values', () => {
    const statusMapper = createMapper({ active: 1, inactive: 0, pending: 2 }, -1)
    expect(statusMapper('active')).toBe(1)
    expect(statusMapper('inactive')).toBe(0)
    expect(statusMapper('pending')).toBe(2)
  })
})
