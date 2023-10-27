import { describe, expect, test } from 'vitest'
import { isAbsolutePath, isRelativePath } from '../src'

describe('isAbsoluteUrl', () => {
  test('if true', () => {
    expect(isAbsolutePath('https://example.com')).toBe(true)
    expect(isAbsolutePath('tel:1234567890')).toBe(true)
    expect(isAbsolutePath('http://localhost:3000')).toBe(true)
  })
  test('if false', () => {
    expect(isAbsolutePath('/example')).toBe(false)
    expect(isAbsolutePath('example')).toBe(false)
    expect(isAbsolutePath('./example')).toBe(false)
  })
})

describe('isRelativeUrl', () => {
  test('if true', () => {
    expect(isRelativePath('/example')).toBe(true)
    expect(isRelativePath('example')).toBe(true)
    expect(isRelativePath('./example')).toBe(true)
  })
  test('if false', () => {
    expect(isRelativePath('https://example.com')).toBe(false)
    expect(isRelativePath('tel:1234567890')).toBe(false)
    expect(isRelativePath('http://localhost:3000')).toBe(false)
  })
})
