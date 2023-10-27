import type { IconifyJSON } from '@iconify/types'
import { IconSet } from '@iconify/tools'
import { optimize } from 'svgo'
import { forEach, isUndefined } from '@vt7/utils'

export const parseIconifyJSON = (collection: IconifyJSON, transformAttrs: Record<string, any>) => {
  const iconSet = new IconSet(collection)

  iconSet.forEachSync((name, type) => {
    if (type !== 'icon') {
      return
    }

    const svg = iconSet.toSVG(name)

    if (!svg) {
      // Invalid icon
      iconSet.remove(name)
      return
    }

    try {
      const result = optimize(svg.toString(), {
        plugins: [
          {
            name: 'replaceAttribute',
            fn: root => {
              return {
                element: {
                  enter(node) {
                    const attributes = node.attributes

                    forEach(transformAttrs, (value, key) => {
                      if (!attributes[key]) {
                        return
                      }

                      if (isUndefined(value)) {
                        delete node.attributes[key]
                      } else {
                        node.attributes[key] = value
                      }
                    })
                  },
                },
              }
            },
          },
        ],
      })

      svg.load(result.data)
    } catch {
      iconSet.remove(name)
      return
    }

    // Update icon
    iconSet.fromSVG(name, svg)
  })

  return iconSet.export()
}
