import { expect, test } from 'vitest'
import { toString, toLowerCase, toUpperCase, toKebabCase, toSnakeCase, toCapitalize, toCamelCase } from '../src'

test('toString', () => {
  expect(toString({})).toBe('[object Object]')
  expect(toString([])).toBe('')
  expect(toString('')).toBe('')
  expect(toString(true)).toBe('true')
  expect(toString(false)).toBe('false')
  expect(toString(1)).toBe('1')
  expect(toString(Symbol('a'))).toBe('Symbol(a)')
  expect(toString('is string')).toBe('is string')
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
