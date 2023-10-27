import { expect, test } from 'vitest'
import { formatCurrency } from '../src'

test('formatCurrency', () => {
  expect(formatCurrency(1000)).toBe('1.000')
})
