import tailwindPlugin from 'tailwindcss/plugin'
import { defaultIconProps, getIconData } from '@iconify/utils'
import type { IconifyJSON } from '@iconify/types'

import { getCollectionAndName, getValues, renderCSSByIconData } from './utils'

interface Options {
  collections: Record<string, IconifyJSON>
  prefix: string
}

const purgeIconPlugin = ({ collections, prefix }: Options) => {
  return tailwindPlugin(
    function ({ addComponents, matchUtilities }) {
      const styleMaskIcon = {
        mask: 'var(--icon) no-repeat',
        'mask-size': '100% 100%',
        'background-color': 'currentColor',
        display: 'inline-block',
      }

      const imageIcon = {
        display: 'inline-block',
        'background-image': 'var(--icon)',
        'background-repeat': 'no-repeat',
        'background-size': '100% 100%',
      }

      addComponents({
        '.mask-icon': styleMaskIcon,
        [`i[class*="${prefix}-"]`]: styleMaskIcon,
        '.image-icon': imageIcon,
        [`span[class*="${prefix}-"]`]: imageIcon,
        [`div[class*="${prefix}-"]`]: imageIcon,
      })

      const getIconDataByCollection = (value: string) => {
        const matches = getCollectionAndName(value)

        if (!matches) {
          return null
        }

        const [, _collectionName, _name] = matches
        const collection = collections[_collectionName]
        return getIconData(collection, _name)
      }

      matchUtilities(
        {
          [prefix]: (value: string) => {
            const iconData = getIconDataByCollection(value)

            if (!iconData) {
              return null
            }

            return renderCSSByIconData({ ...defaultIconProps, ...iconData })
          },
        },
        {
          values: getValues(collections),
        },
      )

      matchUtilities(
        {
          [`${prefix}-lazy`]: (value: string) => {
            const iconData = getIconDataByCollection(value)

            if (!iconData) {
              return null
            }

            return renderCSSByIconData({ ...defaultIconProps, ...iconData }, true)
          },
        },
        {
          values: getValues(collections),
        },
      )
    },
    {
      variants: {
        aspectRatio: ['responsive'],
      },
    },
  )
}

export { purgeIconPlugin }
