/**
 * @vitest-environment happy-dom
 */
import { expect, test, describe } from 'vitest'
import { detectMimeType, isBase64, isMimeBase64, withMimeBase64, getMimeBase64, toBase64 } from '../src'

const list = [
  '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',
]

describe('detectMimeType', () => {
  test('should detect PNG mime type', () => {
    expect(detectMimeType(list[0])).toStrictEqual('image/png')
  })

  test('should detect PDF mime type', () => {
    expect(detectMimeType('JVBERi0xLjQKJeLjz9MK')).toStrictEqual('application/pdf')
  })

  test('should detect GIF mime type', () => {
    expect(detectMimeType('R0lGODdhAQABAIAAAP///////ywAAAAAAQABAAACAkQBADs=')).toStrictEqual('image/gif')
    expect(detectMimeType('R0lGODlhAQABAIAAAP///////yH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==')).toStrictEqual('image/gif')
  })

  test('should detect JPG mime type', () => {
    expect(detectMimeType('/9j/4AAQSkZJRgABAQAAAQABAAD')).toStrictEqual('image/jpg')
  })

  test('should return undefined for unknown mime type', () => {
    expect(detectMimeType('unknownbase64string')).toBeUndefined()
    expect(detectMimeType('AAAA')).toBeUndefined()
  })
})

describe('isBase64', () => {
  test.each(list)('', string => {
    expect(isBase64(string)).toStrictEqual(true)
  })
})

describe('isMimeBase64', () => {
  test.each(list)('', string => {
    expect(isMimeBase64(withMimeBase64(string))).toStrictEqual(true)
  })

  test('should return false for base64 without mime prefix', () => {
    expect(isMimeBase64(list[0])).toStrictEqual(false)
  })
})

describe('withMimeBase64', () => {
  test('should add mime prefix to base64 without prefix', () => {
    const result = withMimeBase64(list[0])
    expect(result).toStrictEqual(`data:image/png;base64,${list[0]}`)
  })

  test('should return same string if already has mime prefix', () => {
    const withPrefix = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg=='
    expect(withMimeBase64(withPrefix)).toStrictEqual(withPrefix)
  })

  test('should return original string if mime type cannot be detected', () => {
    const unknownBase64 = 'unknownbase64string'
    expect(withMimeBase64(unknownBase64)).toStrictEqual(unknownBase64)
  })
})

describe('getMimeBase64', () => {
  test('should extract mime type from base64 with prefix', () => {
    expect(getMimeBase64('data:image/png;base64,iVBORw0KGgo=')).toStrictEqual('image/png')
    expect(getMimeBase64('data:application/pdf;base64,JVBERi0=')).toStrictEqual('application/pdf')
    expect(getMimeBase64('data:image/jpeg;base64,/9j/4AAQ')).toStrictEqual('image/jpeg')
  })

  test('should return undefined for base64 without mime prefix', () => {
    expect(getMimeBase64(list[0])).toBeUndefined()
    expect(getMimeBase64('randomstring')).toBeUndefined()
  })
})

describe('toBase64', () => {
  test('should convert Blob to base64', async () => {
    const blob = new Blob(['hello'], { type: 'text/plain' })
    const result = await toBase64(blob)
    expect(result).toContain('data:text/plain;base64,')
  })

  // Note: String URL input test is skipped because toBlob() requires
  // actual fetch which is not available in happy-dom environment
})
