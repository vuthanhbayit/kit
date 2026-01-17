import { describe, expect, test } from 'vitest'
import {
  toString,
  toLowerCase,
  toUpperCase,
  toKebabCase,
  toSnakeCase,
  toCapitalize,
  toCamelCase,
  truncateText,
  toWords,
  removeVietnameseTones,
} from '../src'

test('toString', () => {
  expect(toString({})).toBe('[object Object]')
  expect(toString([])).toBe('')
  expect(toString('')).toBe('')
  expect(toString(true)).toBe('true')
  expect(toString(false)).toBe('false')
  expect(toString(1)).toBe('1')
  expect(toString(Symbol('a'))).toBe('Symbol(a)')
  expect(toString('is string')).toBe('is string')
  // Test undefined with default value (lines 22-24)
  expect(toString(undefined)).toBe('')
  expect(toString(undefined, 'default')).toBe('default')
})

test('toWords', () => {
  expect(toWords('hello world')).toStrictEqual(['hello', 'world'])
  expect(toWords('HelloWorld')).toStrictEqual(['Hello', 'World'])
  // Test with custom pattern (lines 54-58)
  expect(toWords('apple,banana,orange', /\w+/g)).toStrictEqual(['apple', 'banana', 'orange'])
  expect(toWords('no-match', /\d+/g)).toStrictEqual([])
})

test('removeVietnameseTones', () => {
  expect(removeVietnameseTones('Xin chào Việt Nam')).toBe('Xin chao Viet Nam')
  expect(removeVietnameseTones('Thầy giáo dạy kỹ thuật')).toBe('Thay giao day ky thuat')
  expect(removeVietnameseTones('ÀÁÂÃĂẠẢẤẦẨẪẬẮẰẲẴẶ')).toBe('AAAAAAAAAAAAAAAAA')
  expect(removeVietnameseTones('đường Đống Đa')).toBe('duong Dong Da')
  expect(removeVietnameseTones('test@email.com')).toBe('test email com')
})

test('toLowerCase', () => {
  expect(toLowerCase('gravity can cross dimensions')).toBe('gravity can cross dimensions')
  expect(toLowerCase('GravityCanCrossDimensions')).toBe('gravitycancrossdimensions')
  expect(toLowerCase('Gravity - can cross dimensions!')).toBe('gravity - can cross dimensions!')
})

test('toUpperCase', () => {
  expect(toUpperCase('gravity')).toBe('GRAVITY')
})

test('toKebabCase', () => {
  expect(toKebabCase('goodbye blue sky')).toBe('goodbye-blue-sky')
  expect(toKebabCase('Goodbye Blue Sky')).toBe('goodbye-blue-sky')
  expect(toKebabCase('-Goodbye-Blue-Sky-')).toBe('goodbye-blue-sky')
})

test('toSnakeCase', () => {
  expect(toSnakeCase('goodbye blue sky')).toBe('goodbye_blue_sky')
  expect(toSnakeCase('GoodbyeBlueSky!')).toBe('goodbye_blue_sky')
  expect(toSnakeCase('-Goodbye-Blue-Sky-')).toBe('goodbye_blue_sky')
})

test('toCapitalize', () => {
  expect(toCapitalize('goodbye blue sky')).toBe('Goodbye blue sky')
  expect(toCapitalize('GoodbyeBlueSky!')).toBe('Goodbyebluesky!')
  expect(toCapitalize('-Goodbye-Blue-Sky-')).toBe('-goodbye-blue-sky-')
})

test('toCamelCase', () => {
  expect(toCamelCase('goodbye blue sky')).toBe('goodbyeBlueSky')
  expect(toCamelCase('GoodbyeBlueSky!')).toBe('goodbyeBlueSky')
  expect(toCamelCase('-Goodbye-Blue-Sky-')).toBe('goodbyeBlueSky')
})

describe('truncateText', () => {
  test('should return original text when length is less than maxLength', () => {
    const text = 'Short text'
    expect(truncateText(text, 20)).toBe(text)
  })

  test('should truncate text with ellipsis when text has no extension', () => {
    const text = 'This is a long text without extension'
    expect(truncateText(text, 15)).toBe('This is a lo...')
  })

  test('should preserve file extension when truncating', () => {
    const filename = 'very_long_filename_that_needs_truncating.txt'
    expect(truncateText(filename, 20)).toBe('very_long_fil....txt')
  })

  test('should use custom ellipsis when provided', () => {
    const filename = 'document_with_very_long_name.pdf'
    expect(truncateText(filename, 20, '[...]')).toBe('document_wi[...].pdf')
  })

  test('should not preserve extension when preserveExtension is false', () => {
    const filename = 'important_document.docx'
    expect(truncateText(filename, 15, '...', false)).toBe('important_do...')
  })

  test('should handle dots within filename correctly', () => {
    const filename = 'report.v1.2.final.xlsx'
    expect(truncateText(filename, 15)).toBe('report.....xlsx')
  })

  test('should handle cases where extension is too long for maxLength', () => {
    const filename = 'x.veryLongExtension'
    expect(truncateText(filename, 10)).toBe('x.veryL...')
  })

  test('should handle filenames with dots at the end', () => {
    const filename = 'strange.filename.'
    expect(truncateText(filename, 10)).toBe('strange...')
  })

  test('should handle case with very long extension and short available space', () => {
    const filename = 'a.verylongextension'
    // Với maxLength = 10 và ellipsis "...", không đủ chỗ cho cả "a" + "..." + ".verylongextension"
    expect(truncateText(filename, 10)).toBe('a.veryl...')
  })

  test('should truncate text with Unicode characters', () => {
    const filename = 'Báo_cáo_tài_chính_năm_2024.xlsx'
    expect(truncateText(filename, 20)).toBe('Báo_cáo_tài_....xlsx')
  })

  test('should handle paths with both slashes and extensions', () => {
    const path = 'C:\\Users\\Admin\\Documents\\long_report.pdf'
    expect(truncateText(path, 25)).toBe('C:\\Users\\Admin\\Doc....pdf')
  })
})
