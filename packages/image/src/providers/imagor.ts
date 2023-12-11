import { joinURL } from 'ufo'
import { clearUndefined, reduce, size as getSize, createMapper } from '@vt7/utils'
import type { ImageModifiers, ProviderGetImage } from '@nuxt/image/dist/types'

export const filterMapper = createMapper({
  format: 'format',
  quality: 'quality',
  backgroundColor: 'background_color',
  blur: 'blur',
  brightness: 'brightness',
  contrast: 'contrast',
  fill: 'fill',
  hue: 'hue',
  maxBytes: 'max_bytes',
  maxFrames: 'max_frames',
  orient: 'orient',
  rgb: 'rgb',
  saturation: 'saturation',
})

export const operationsGenerator = (modifiers: Partial<ImageModifiers>) => {
  const { width, height, ...tail } = clearUndefined(modifiers)

  const size = width && height ? `${width}x${height}` : ''
  const filters = getSize(tail)
    ? reduce(
        tail as Record<string, string>,
        (acc, value, key) => {
          return acc + ':' + `${filterMapper(key)}(${value})`
        },
        'filters',
      )
    : ''

  return joinURL('/unsafe/fit-in/', size, filters)
}

export const getImage: ProviderGetImage = (src, options = {}) => {
  const operations = operationsGenerator(options.modifiers || {})
  return {
    url: joinURL(options.imageBaseURL, operations, options.mediaBaseURL, src),
  }
}
