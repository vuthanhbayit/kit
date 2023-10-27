import { expect, test } from 'vitest'
import { toNumber, toNumberic } from '../src'

test('toNumber', () => {
  expect(toNumber('1')).toBe(1)
  expect(toNumber('1.2')).toBe(1.2)
  expect(toNumber('-1.3')).toBe(-1.3)
  expect(toNumber('0')).toBe(0)
  expect(toNumber('null')).toBe(Number.NaN)
  expect(toNumber('abc')).toBe(Number.NaN)
  expect(toNumber(1)).toBe(1)
  expect(toNumber(2.2)).toBe(2.2)
  expect(toNumber(0)).toBe(0)
  expect(toNumber(-0)).toBe(-0)
  expect(toNumber(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY)
  expect(toNumber(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY)
})

test('toNumberic', () => {
  expect(toNumberic('1')).toBe(1)
  expect(toNumberic('1.2')).toBe(1.2)
  expect(toNumberic('-1.3')).toBe(-1.3)
  expect(toNumberic('0')).toBe(0)
  expect(toNumberic('null')).toBe('null')
  expect(toNumberic(1)).toBe(1)
  expect(toNumberic(2.2)).toBe(2.2)
  expect(toNumberic(0)).toBe(0)
  expect(toNumberic('abc')).toBe('abc')
})
