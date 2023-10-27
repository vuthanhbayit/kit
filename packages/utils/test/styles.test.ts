import { expect, test } from 'vitest'
import { toCssUnit } from '../src'

test('toCssUnit', () => {
  expect(toCssUnit(10)).toBe('10px')
  expect(toCssUnit(10.2)).toBe('10.2px')
  expect(toCssUnit('10.2')).toBe('10.2px')
  expect(toCssUnit('5em')).toBe('5em')
  expect(toCssUnit('50%')).toBe('50%')
  expect(toCssUnit('50', '%')).toBe('50%')
})
