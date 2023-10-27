import { describe, expect, test } from 'vitest'
import { bytesToSize } from '../src'

describe('bytesToSize', () => {
  test('returns "0 Byte" when given 0 bytes', () => {
    expect(bytesToSize(0)).toBe('0 Byte')
  })

  test('returns the expected result for various byte values', () => {
    expect(bytesToSize(500)).toBe('500 Bytes')
    expect(bytesToSize(1500)).toBe('1 KB')
    expect(bytesToSize(3_500_000)).toBe('3 MB')
    expect(bytesToSize(8_000_000_000)).toBe('7 GB')
    expect(bytesToSize(2_500_000_000_000)).toBe('2 TB')
  })

  test('returns the expected result when the unit value is changed', () => {
    expect(bytesToSize(2048, 1000)).toBe('2 KB')
    expect(bytesToSize(1_048_576, 1000)).toBe('1 MB')
    expect(bytesToSize(1_073_741_824, 1000)).toBe('1 GB')
  })
})
