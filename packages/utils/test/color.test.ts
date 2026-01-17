import { describe, expect, test } from 'vitest'
import { hexToRGB, rgbToHex } from '../src'

describe('hexToRGB', () => {
  test('should convert 6-char hex to RGB', () => {
    expect(hexToRGB('#FF5733')).toStrictEqual({ r: 255, g: 87, b: 51 })
    expect(hexToRGB('#000000')).toStrictEqual({ r: 0, g: 0, b: 0 })
    expect(hexToRGB('#FFFFFF')).toStrictEqual({ r: 255, g: 255, b: 255 })
  })

  test('should convert 3-char hex to RGB', () => {
    expect(hexToRGB('#FFF')).toStrictEqual({ r: 255, g: 255, b: 255 })
    expect(hexToRGB('#000')).toStrictEqual({ r: 0, g: 0, b: 0 })
    expect(hexToRGB('#F00')).toStrictEqual({ r: 255, g: 0, b: 0 })
  })

  test('should handle hex without #', () => {
    expect(hexToRGB('FF5733')).toStrictEqual({ r: 255, g: 87, b: 51 })
    expect(hexToRGB('FFF')).toStrictEqual({ r: 255, g: 255, b: 255 })
  })

  test('should handle lowercase hex', () => {
    expect(hexToRGB('#ff5733')).toStrictEqual({ r: 255, g: 87, b: 51 })
    expect(hexToRGB('#fff')).toStrictEqual({ r: 255, g: 255, b: 255 })
  })

  test('should return null for invalid hex', () => {
    expect(hexToRGB('invalid')).toBeNull()
    expect(hexToRGB('#GGG')).toBeNull()
    expect(hexToRGB('#12')).toBeNull()
    expect(hexToRGB('#12345')).toBeNull()
  })
})

describe('rgbToHex', () => {
  test('should convert RGB to hex', () => {
    expect(rgbToHex(255, 87, 51)).toBe('#ff5733')
    expect(rgbToHex(0, 0, 0)).toBe('#000000')
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff')
  })

  test('should pad single digit values', () => {
    expect(rgbToHex(0, 0, 0)).toBe('#000000')
    expect(rgbToHex(15, 15, 15)).toBe('#0f0f0f')
  })

  test('should return null for out of range values', () => {
    expect(rgbToHex(256, 0, 0)).toBeNull()
    expect(rgbToHex(0, 256, 0)).toBeNull()
    expect(rgbToHex(0, 0, 256)).toBeNull()
    expect(rgbToHex(-1, 0, 0)).toBeNull()
    expect(rgbToHex(0, -1, 0)).toBeNull()
    expect(rgbToHex(0, 0, -1)).toBeNull()
  })
})
