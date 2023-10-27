import { expect, test } from 'vitest'
import { isDefined, isUndefined, notUndefined } from '../src'

test('notUndefined', () => {
  expect(notUndefined(true)).toBe(true)
  expect(notUndefined(false)).toBe(true)
  expect(notUndefined(null)).toBe(true)
  expect(notUndefined(1)).toBe(true)
  expect(notUndefined([])).toBe(true)
  expect(notUndefined({})).toBe(true)
  expect(notUndefined(undefined)).toBe(false)
})

test('isDefined', () => {
  expect(isDefined({})).toBe(true)
  expect(isDefined({ a: 1 })).toBe(true)
  expect(isDefined('1')).toBe(true)
  expect(isDefined(1)).toBe(true)
  expect(isDefined(false)).toBe(true)
  expect(isDefined(true)).toBe(true)
  expect(isDefined(undefined)).toBe(false)
  expect(isDefined(null)).toBe(false)
})

test('isUndefined', () => {
  expect(isUndefined({})).toBe(false)
  expect(isUndefined({ a: 1 })).toBe(false)
  expect(isUndefined('1')).toBe(false)
  expect(isUndefined(1)).toBe(false)
  expect(isUndefined(false)).toBe(false)
  expect(isUndefined(true)).toBe(false)
  expect(isUndefined(undefined)).toBe(true)
  expect(isUndefined(null)).toBe(true)
})
