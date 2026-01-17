import { describe, expect, test } from 'vitest'
import { defineConstant } from '../src'

describe('defineConstant', () => {
  const constants = {
    ACTIVE: { id: 1, name: 'Active', color: 'green' },
    INACTIVE: { id: 2, name: 'Inactive', color: 'gray' },
    PENDING: { id: 3, name: 'Pending', color: 'yellow' },
  }

  test('should create constant with original keys', () => {
    const result = defineConstant(constants, 'id')

    expect(result.ACTIVE).toStrictEqual({ id: 1, name: 'Active', color: 'green' })
    expect(result.INACTIVE).toStrictEqual({ id: 2, name: 'Inactive', color: 'gray' })
    expect(result.PENDING).toStrictEqual({ id: 3, name: 'Pending', color: 'yellow' })
  })

  test('should create constant with indexed keys', () => {
    const result = defineConstant(constants, 'id')

    expect(result[1]).toStrictEqual({ id: 'ACTIVE', name: 'Active', color: 'green' })
    expect(result[2]).toStrictEqual({ id: 'INACTIVE', name: 'Inactive', color: 'gray' })
    expect(result[3]).toStrictEqual({ id: 'PENDING', name: 'Pending', color: 'yellow' })
  })

  test('should provide getRaw method', () => {
    const result = defineConstant(constants, 'id')

    expect(result.getRaw()).toBe(constants)
  })

  test('should provide getRawValues method', () => {
    const result = defineConstant(constants, 'id')
    const values = result.getRawValues()

    expect(values).toHaveLength(3)
    expect(values).toContainEqual({ id: 1, name: 'Active', color: 'green' })
    expect(values).toContainEqual({ id: 2, name: 'Inactive', color: 'gray' })
    expect(values).toContainEqual({ id: 3, name: 'Pending', color: 'yellow' })
  })

  test('should provide count method', () => {
    const result = defineConstant(constants, 'id')

    expect(result.count()).toBe(3)
  })
})
