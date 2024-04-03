import { forEach } from '@vt7/utils'
// @ts-ignore
import { SVG } from '@iconify/json-tools'
import { encodeSvgForCss } from '@iconify/utils'

import type { ExtendedIconifyIcon, IconifyJSON } from '@iconify/types'

export const getValues = (collections: Record<string, IconifyJSON>) => {
  const values = {} as Record<string, string>

  forEach(collections, (collection, name) => {
    forEach(collection.icons, (_, key) => {
      const value = name + '-' + key
      values[value] = value
    })
  })

  return values
}

const REGEX_COLLECTION_AND_NAME_ICON = /^([a-z]+)-([\d:a-z-]+)$/

export const getCollectionAndName = (value: string) => {
  return value.match(REGEX_COLLECTION_AND_NAME_ICON)
}

export const renderCSSByIconData = (iconData: ExtendedIconifyIcon, lazyload = false) => {
  const _svg = new SVG(iconData)
  const svg = _svg.getSVG()
  const url = `url("data:image/svg+xml;utf8,${encodeSvgForCss(svg)}")`

  return {
    [lazyload ? '--data-icon' : '--icon']: url,
  }
}
