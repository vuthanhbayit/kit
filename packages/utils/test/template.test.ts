import { expect, test, describe } from 'vitest'
import { template } from '../src'

describe('template', () => {
  test('should replace placeholders in a string with data values', () => {
    const inputString = 'Hello, {{ name }}! You are {{age}} years old.'
    const data = { name: 'John', age: 30 }
    const expectedOutput = 'Hello, John! You are 30 years old.'

    const result = template(inputString, data)
    expect(result).toBe(expectedOutput)
  })

  test('should handle custom delimiters', () => {
    const inputString = 'Hello, %{name}! You are %{age} years old.'
    const data = { name: 'Jane', age: 25 }
    const config = { delimiters: ['%{', '}'] as [string, string] }
    const expectedOutput = 'Hello, Jane! You are 25 years old.'

    const result = template(inputString, data, config)
    expect(result).toBe(expectedOutput)
  })

  test('should leave placeholders unchanged if data is missing', () => {
    const inputString = 'Hello, {{name}}! You are {{age}} years old.'
    const data = { name: 'Alice' }
    const expectedOutput = 'Hello, Alice! You are {{age}} years old.'

    const result = template(inputString, data)
    expect(result).toBe(expectedOutput)
  })

  test('should handle nested placeholders', () => {
    const inputString = 'User: {{user.name}}, Username: {{user.username}}'
    const data = {
      user: {
        name: 'Alex',
        username: 'alex123',
      },
    }
    const expectedOutput = 'User: Alex, Username: alex123'

    const result = template(inputString, data)
    expect(result).toBe(expectedOutput)
  })

  test('should replace placeholders with data', () => {
    const compiled = template('Hello, {{ name }}!')
    const result = compiled({ name: 'John' })
    expect(result).toBe('Hello, John!')
  })
})
