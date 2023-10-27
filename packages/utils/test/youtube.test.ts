import { describe, expect, test } from 'vitest'
import { getYoutubeId } from '../src'

describe('getYoutubeId', () => {
  test('if true', () => {
    expect(getYoutubeId('https://www.youtube.com/watch?v=jCYoCa3--Sk')).toBe('jCYoCa3--Sk')
    expect(getYoutubeId('https://youtu.be/jCYoCa3--Sk')).toBe('jCYoCa3--Sk')
    expect(getYoutubeId('https://www.youtube.com/embed/jCYoCa3--Sk')).toBe('jCYoCa3--Sk')
  })
})
