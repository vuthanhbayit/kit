import { describe, expect, test } from 'vitest'
import { REGEXP_VN_PHONE, REGEXP_EMAIL, toRegex } from '../src'

describe('REGEXP_VN_PHONE', () => {
  test('should match valid Vietnamese phone numbers', () => {
    expect(REGEXP_VN_PHONE.test('0912345678')).toBe(true)
    expect(REGEXP_VN_PHONE.test('0323456789')).toBe(true)
    expect(REGEXP_VN_PHONE.test('0523456789')).toBe(true)
    expect(REGEXP_VN_PHONE.test('0703456789')).toBe(true)
    expect(REGEXP_VN_PHONE.test('0812345678')).toBe(true)
  })

  test('should match phone with +84 prefix', () => {
    expect(REGEXP_VN_PHONE.test('+84912345678')).toBe(true)
    expect(REGEXP_VN_PHONE.test('+84323456789')).toBe(true)
  })

  test('should match phone with dots or spaces in valid positions', () => {
    // The regex supports separators between specific digit groups
    expect(REGEXP_VN_PHONE.test('0912.345.678')).toBe(true)
    expect(REGEXP_VN_PHONE.test('0912 345 678')).toBe(true)
  })

  test('should not match invalid phone numbers', () => {
    expect(REGEXP_VN_PHONE.test('012345678')).toBe(false)
    expect(REGEXP_VN_PHONE.test('091234567')).toBe(false)
    expect(REGEXP_VN_PHONE.test('09123456789')).toBe(false)
    expect(REGEXP_VN_PHONE.test('1234567890')).toBe(false)
  })
})

describe('REGEXP_EMAIL', () => {
  test('should match valid emails', () => {
    expect(REGEXP_EMAIL.test('test@example.com')).toBe(true)
    expect(REGEXP_EMAIL.test('user.name@domain.org')).toBe(true)
    expect(REGEXP_EMAIL.test('user+tag@gmail.com')).toBe(true)
  })

  test('should not match invalid emails', () => {
    expect(REGEXP_EMAIL.test('invalid')).toBe(false)
    expect(REGEXP_EMAIL.test('@domain.com')).toBe(false)
    expect(REGEXP_EMAIL.test('user@')).toBe(false)
  })
})

describe('toRegex', () => {
  test('should return same regex if input is regex', () => {
    const regex = /test/i
    expect(toRegex(regex)).toBe(regex)
  })

  test('should convert string to regex', () => {
    const result = toRegex('test')
    expect(result).toBeInstanceOf(RegExp)
    expect(result.test('TEST')).toBe(true)
    expect(result.test('test')).toBe(true)
  })

  test('should convert number to regex', () => {
    const result = toRegex(123)
    expect(result).toBeInstanceOf(RegExp)
    expect(result.test('123')).toBe(true)
  })
})
