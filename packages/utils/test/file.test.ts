import { describe, expect, test } from 'vitest'
import { bytesToSize, isImage, isVideo, getFileExtension, getFileName } from '../src'

describe('getFileExtension', () => {
  test('should return file extension', () => {
    expect(getFileExtension('document.txt')).toBe('txt')
    expect(getFileExtension('image.png')).toBe('png')
    expect(getFileExtension('archive.tar.gz')).toBe('gz')
  })

  test('should return empty for files without extension', () => {
    expect(getFileExtension('README')).toBe('README')
  })
})

describe('getFileName', () => {
  test('should return file name without extension', () => {
    expect(getFileName('document.txt')).toBe('document')
    expect(getFileName('image.png')).toBe('image')
    expect(getFileName('archive.tar.gz')).toBe('archive.tar')
  })

  test('should return empty for files without extension', () => {
    expect(getFileName('README')).toBe('')
  })
})

describe('bytesToSize', () => {
  test('returns "0 Byte" when given 0 bytes', () => {
    expect(bytesToSize(0)).toBe('0 Byte')
  })

  test('returns the expected result for various byte values', () => {
    expect(bytesToSize(500)).toBe('500 Bytes')
    expect(bytesToSize(1500)).toBe('1 KB')
    expect(bytesToSize(3_500_000)).toBe('3 MB')
    expect(bytesToSize(8_000_000_000)).toBe('7 GB')
    expect(bytesToSize(2_500_000_000_000)).toBe('2 TB')
  })

  test('returns the expected result when the unit value is changed', () => {
    expect(bytesToSize(2048, 1000)).toBe('2 KB')
    expect(bytesToSize(1_048_576, 1000)).toBe('1 MB')
    expect(bytesToSize(1_073_741_824, 1000)).toBe('1 GB')
  })

  test('should return true for image files', () => {
    expect(isImage('picture.png')).toBe(true)
    expect(isImage('photo.jpg')).toBe(true)
    expect(isImage('image.jpeg')).toBe(true)
    expect(isImage('graphic.gif')).toBe(true)
    expect(isImage('vector.svg')).toBe(true)
    expect(isImage('art.webp')).toBe(true)
  })

  test('should return false for non-image files', () => {
    expect(isImage('video.mp4')).toBe(false)
    expect(isImage('document.pdf')).toBe(false)
    expect(isImage('music.mp3')).toBe(false)
    expect(isImage('archive.zip')).toBe(false)
  })

  test('should return false for invalid inputs', () => {
    expect(isImage('')).toBe(false)
    expect(isImage('noextension')).toBe(false)
  })

  test('should return true for video files', () => {
    expect(isVideo('movie.mp4')).toBe(true)
    expect(isVideo('clip.mkv')).toBe(true)
    expect(isVideo('animation.avi')).toBe(true)
    expect(isVideo('film.mov')).toBe(true)
    expect(isVideo('recording.wmv')).toBe(true)
    expect(isVideo('stream.flv')).toBe(true)
    expect(isVideo('video.webm')).toBe(true)
    expect(isVideo('old.mpeg')).toBe(true)
  })

  test('should return false for non-video files', () => {
    expect(isVideo('picture.png')).toBe(false)
    expect(isVideo('document.docx')).toBe(false)
    expect(isVideo('sound.mp3')).toBe(false)
    expect(isVideo('spreadsheet.xlsx')).toBe(false)
  })

  test('should return false for invalid inputs', () => {
    expect(isVideo('')).toBe(false)
    expect(isVideo('noextension')).toBe(false)
  })
})
