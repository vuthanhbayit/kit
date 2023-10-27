import { clearUndefined, cloneDeep } from './function'
import { isDefined } from './guards'
import { has } from './object'

export const isObject = (val: any): val is object => toString.call(val) === '[object Object]'

export const isRegex = (val: any): val is RegExp => toString.call(val) === '[object RegExp]'

export const isArray = (val: unknown): val is any[] => Array.isArray(val)

export const isNumber = (val: any): val is number => typeof val === 'number'

export const isNumeric = (val: any) => isNumber(val) || /^-?\d+(\.\d+)?$/.test(val)

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

export const isFunction = <T extends () => any>(val: any): val is T => typeof val === 'function'

export const isBrowser = typeof window !== 'undefined'

export const isArrayLike = (object: any): boolean => {
  if (!object) {
    return false
  }
  if (isString(object)) {
    return false
  }
  if (typeof object !== 'object') {
    return false
  }
  if (object.nodeType === 1) {
    return object.length > 0
  }
  if (object.length === 0) {
    return true
  }
  if (object.length > 0) {
    return has(object, 0) && has(object, object.length - 1)
  }
  return false
}

export const isEqual = <T>(value: T, other: T) => {
  if (typeof value !== typeof other) {
    return false
  }

  if (isArray(value) && isArray(other)) {
    return clearUndefined(value).sort().toString() === clearUndefined(other).sort().toString()
  }

  if (isObject(value) && isObject(other)) {
    return (
      JSON.stringify(Object.entries(clearUndefined(value)).sort()) ===
      JSON.stringify(Object.entries(clearUndefined(other)).sort())
    )
  }

  return value === other
}

export const isStrictEqual = <T>(value: T, other: T) => {
  if (typeof value !== typeof other) {
    return false
  }

  if (isArray(value) && isArray(other)) {
    return cloneDeep(value).sort().toString() === cloneDeep(other).sort().toString()
  }

  if (isObject(value) && isObject(other)) {
    return JSON.stringify(Object.entries(value).sort()) === JSON.stringify(Object.entries(other).sort())
  }

  return value === other
}

export const isEmpty = <T>(val: T) => {
  if (!isDefined(val)) {
    return true
  }
  if (isString(val) && val.trim() === '') {
    return true
  }
  if (isNumber(val) && (val === 0 || Number.isNaN(val))) {
    return true
  }
  if (isBoolean(val) && !val) {
    return true
  }
  if (isArray(val) && val.length === 0) {
    return true
  }
  if (isObject(val)) {
    const values = Object.values(clearUndefined(val))

    return values.length === 0
  }

  return false
}

export const isExist = <T>(val: T) => !isEmpty(val)
