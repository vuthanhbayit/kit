import { expect, test } from 'vitest'
import {
  isArray,
  isArrayLike,
  isEmpty,
  isEqual,
  isFunction,
  isNumber,
  isNumeric,
  isObject,
  isStrictEqual,
  isString,
} from '../src'

test('isObject', () => {
  expect(isObject({})).toBe(true)
  expect(isObject({ a: 1 })).toBe(true)
  expect(isObject(null)).toBe(false)
  expect(isObject([])).toBe(false)
  expect(isObject(1)).toBe(false)
  expect(isObject(false)).toBe(false)
  expect(isObject(true)).toBe(false)
})

test('isArray', () => {
  expect(isArray({})).toBe(false)
  expect(isArray({ a: 1 })).toBe(false)
  expect(isArray(null)).toBe(false)
  expect(isArray([])).toBe(true)
  expect(isArray([1, 2])).toBe(true)
  // eslint-disable-next-line no-array-constructor
  expect(isArray([])).toBe(true)
  // eslint-disable-next-line no-array-constructor
  expect(isArray([1, 2, 3])).toBe(true)
  expect(isArray(Array.prototype)).toBe(true)
  expect(isArray(1)).toBe(false)
  expect(isArray(false)).toBe(false)
  expect(isArray(true)).toBe(false)
})

test('isNumber', () => {
  expect(isNumber({})).toBe(false)
  expect(isNumber({ a: 1 })).toBe(false)
  expect(isNumber(null)).toBe(false)
  expect(isNumber([])).toBe(false)
  expect(isNumber(1)).toBe(true)
  expect(isNumber(-1)).toBe(true)
  expect(isNumber(0)).toBe(true)
  expect(isNumber(-0)).toBe(true)
  expect(isNumber(1.1)).toBe(true)
  expect(isNumber(-1.1)).toBe(true)
  expect(isNumber('0')).toBe(false)
  expect(isNumber('1')).toBe(false)
  expect(isNumber('-1')).toBe(false)
  expect(isNumber(Number.NaN)).toBe(true)
})

test('isNumeric', () => {
  expect(isNumeric({})).toBe(false)
  expect(isNumeric({ a: 1 })).toBe(false)
  expect(isNumeric(null)).toBe(false)
  expect(isNumeric([])).toBe(false)
  expect(isNumeric(1)).toBe(true)
  expect(isNumeric(-1)).toBe(true)
  expect(isNumeric(0)).toBe(true)
  expect(isNumeric(1.1)).toBe(true)
  expect(isNumeric(-1.1)).toBe(true)
  expect(isNumeric('0')).toBe(true)
  expect(isNumeric('1')).toBe(true)
  expect(isNumeric('1.1')).toBe(true)
  expect(isNumeric('-1')).toBe(true)
  expect(isNumeric('-1.1')).toBe(true)
  expect(isNumeric(Number.NaN)).toBe(true)
})

test('isString', () => {
  expect(isString({})).toBe(false)
  expect(isString({ a: 1 })).toBe(false)
  expect(isString(null)).toBe(false)
  expect(isString(undefined)).toBe(false)
  expect(isString([])).toBe(false)
  expect(isString([1])).toBe(false)
  expect(isString(false)).toBe(false)
  expect(isString(true)).toBe(false)
  expect(isString(1)).toBe(false)
  expect(isString(Symbol('a'))).toBe(false)
  expect(isString('')).toBe(true)
  expect(isString('string')).toBe(true)
})

test('isFunction', () => {
  expect(isFunction({})).toBe(false)
  expect(isFunction({ a: 1 })).toBe(false)
  expect(isFunction('1')).toBe(false)
  expect(isFunction(1)).toBe(false)
  expect(isFunction(false)).toBe(false)
  expect(isFunction(true)).toBe(false)
  expect(isFunction(undefined)).toBe(false)
  expect(isFunction(() => {})).toBe(true)
  expect(isFunction(function () {})).toBe(true)
})

test('isArrayLike', () => {
  expect(isArrayLike([])).toBe(true)
  expect(isArrayLike({})).toBe(false)
  expect(isArrayLike(true)).toBe(false)
  expect(isArrayLike({ length: 10 })).toBe(false)
  expect(isArrayLike({ 0: 'zero', 9: 'nine', length: 10 })).toBe(true)
})

test('isEqual', () => {
  expect(isEqual([], {})).toBe(false)
  expect(isEqual([], [])).toBe(true)
  expect(isEqual([1, 2], [1, 2])).toBe(true)
  expect(isEqual([1, 2], [1, 2, undefined])).toBe(true)
  expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
  expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false)
  expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 3, c: null })).toBe(false)
  expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: undefined })).toBe(true)
  expect(isEqual(1, 2)).toBe(false)
  expect(isEqual(null, null)).toBe(true)
  expect(isEqual(undefined, undefined)).toBe(true)
  expect(isEqual(true, true)).toBe(true)
})

test('isStrictEqual', () => {
  expect(isStrictEqual([], {})).toBe(false)
  expect(isStrictEqual([], [])).toBe(true)
  expect(isStrictEqual([1, 2], [1, 2])).toBe(true)
  expect(isStrictEqual([1, 2], [1, 2, undefined])).toBe(false)
  expect(isStrictEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
  expect(isStrictEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false)
  expect(isStrictEqual({ a: 1, b: 2 }, { a: 1, b: 3, c: null })).toBe(false)
  expect(isStrictEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: undefined })).toBe(false)
  expect(isStrictEqual(1, 2)).toBe(false)
  expect(isStrictEqual(null, null)).toBe(true)
  expect(isStrictEqual(undefined, undefined)).toBe(true)
  expect(isStrictEqual(true, true)).toBe(true)
})

test('isEmpty', () => {
  expect(isEmpty([])).toBe(true)
  expect(isEmpty({})).toBe(true)
  expect(isEmpty(0)).toBe(true)
  expect(isEmpty(Number.NaN)).toBe(true)
  expect(isEmpty(false)).toBe(true)
  expect(isEmpty({ a: undefined })).toBe(true)
  expect(isEmpty('')).toBe(true)
  expect(isEmpty('   ')).toBe(true)
  expect(isEmpty(null)).toBe(true)
  expect(isEmpty(undefined)).toBe(true)
  expect(isEmpty(1)).toBe(false)
  expect(isEmpty('1')).toBe(false)
  expect(isEmpty(true)).toBe(false)
  expect(isEmpty({ a: 1 })).toBe(false)
  expect(isEmpty([1])).toBe(false)
})
