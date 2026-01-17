import { describe, expect, test } from 'vitest'
import { getYoutubeId, getYoutubeEmbed, getYoutubeThumbnail } from '../src'

describe('getYoutubeId', () => {
  test('should extract ID from various URL formats', () => {
    expect(getYoutubeId('https://www.youtube.com/watch?v=jCYoCa3--Sk')).toBe('jCYoCa3--Sk')
    expect(getYoutubeId('https://youtu.be/jCYoCa3--Sk')).toBe('jCYoCa3--Sk')
    expect(getYoutubeId('https://www.youtube.com/embed/jCYoCa3--Sk')).toBe('jCYoCa3--Sk')
  })

  test('should return null for invalid URL', () => {
    expect(getYoutubeId('https://example.com')).toBeNull()
    expect(getYoutubeId('invalid')).toBeNull()
  })
})

describe('getYoutubeEmbed', () => {
  test('should return embed URL for valid youtube URL', () => {
    expect(getYoutubeEmbed('https://www.youtube.com/watch?v=jCYoCa3--Sk'))
      .toBe('https://www.youtube.com/embed/jCYoCa3--Sk')
    expect(getYoutubeEmbed('https://youtu.be/jCYoCa3--Sk'))
      .toBe('https://www.youtube.com/embed/jCYoCa3--Sk')
  })

  test('should return null for invalid URL', () => {
    expect(getYoutubeEmbed('https://example.com')).toBeNull()
    expect(getYoutubeEmbed('invalid')).toBeNull()
  })
})

describe('getYoutubeThumbnail', () => {
  test('should return thumbnail URL with default quality', () => {
    expect(getYoutubeThumbnail('https://www.youtube.com/watch?v=jCYoCa3--Sk'))
      .toBe('https://img.youtube.com/vi/jCYoCa3--Sk/default.jpg')
  })

  test('should return thumbnail URL with specified quality', () => {
    expect(getYoutubeThumbnail('https://www.youtube.com/watch?v=jCYoCa3--Sk', 'maxresdefault'))
      .toBe('https://img.youtube.com/vi/jCYoCa3--Sk/maxresdefault.jpg')
    expect(getYoutubeThumbnail('https://youtu.be/jCYoCa3--Sk', 'hqdefault'))
      .toBe('https://img.youtube.com/vi/jCYoCa3--Sk/hqdefault.jpg')
  })

  test('should return null for invalid URL', () => {
    expect(getYoutubeThumbnail('https://example.com')).toBeNull()
    expect(getYoutubeThumbnail('invalid')).toBeNull()
  })
})
