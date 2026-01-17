import { describe, expect, test } from 'vitest'
import { isAbsolutePath, isRelativePath, removeQueryParam, removeQueryParams } from '../src'

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

describe('removeQueryParam', () => {
  test('should remove parameter at end of URL', () => {
    expect(removeQueryParam('https://example.com/page?param1=value1', 'param1'))
      .toBe('https://example.com/page')
  })

  test('should remove parameter with hash at end', () => {
    expect(removeQueryParam('https://example.com/page?param1=value1#section', 'param1'))
      .toBe('https://example.com/page#section')
  })

  test('should remove parameter in middle of query string', () => {
    expect(removeQueryParam('https://example.com/page?param1=value1&param2=value2', 'param1'))
      .toBe('https://example.com/page?param2=value2')
  })

  test('should return same URL if parameter not found', () => {
    expect(removeQueryParam('https://example.com/page?param1=value1', 'notfound'))
      .toBe('https://example.com/page?param1=value1')
  })
})

describe('removeQueryParams', () => {
  test('should remove multiple parameters', () => {
    expect(removeQueryParams('https://example.com/page?param1=value1&param2=value2&param3=value3', 'param1', 'param3'))
      .toBe('https://example.com/page?param2=value2')
  })

  test('should remove all parameters', () => {
    expect(removeQueryParams('https://example.com/page?param1=value1&param2=value2#section', 'param1', 'param2'))
      .toBe('https://example.com/page#section')
  })

  test('should handle single parameter removal', () => {
    expect(removeQueryParams('https://example.com/page?param=value', 'param'))
      .toBe('https://example.com/page')
  })
})
