import { promises as fs } from 'node:fs'
import { cleanupSVG, importDirectory, isEmptyColor, parseColors, runSVGO } from '@iconify/tools'
import { compareColors, stringToColor } from '@iconify/utils'

export const generateIconToJSON = async (inputDir: string, outputDir: string, prefix: string) => {
  const iconSet = await importDirectory(inputDir, { prefix: prefix + '-' })

  await iconSet.forEach(async (name, type) => {
    if (type !== 'icon') {
      return
    }

    const svg = iconSet.toSVG(name)

    if (!svg) {
      // Invalid icon
      iconSet.remove(name)
      return
    }

    // Clean up and optimise icons
    try {
      // Clean up icon code
      await cleanupSVG(svg)

      // Assume icon is monotone: replace color with currentColor, add if missing
      // If icon is not monotone, remove this code
      await parseColors(svg, {
        defaultColor: 'currentColor',
        callback: (attr, colorStr, color) => {
          if (!color) {
            // color === null, so color cannot be parsed
            // Return colorStr to keep old value
            return colorStr
          }

          if (isEmptyColor(color)) {
            // Color is empty: 'none' or 'transparent'
            // Return color object to keep old value
            return color
          }

          // Black color: change to 'currentColor'
          if (compareColors(color, stringToColor('black')!)) {
            return 'currentColor'
          }

          // White color: belongs to white background rectangle: remove rectangle
          if (compareColors(color, stringToColor('white')!)) {
            return 'remove'
          }

          return colorStr
        },
      })

      // Optimise
      await runSVGO(svg)
    } catch {
      iconSet.remove(name)
      return
    }

    // Update icon
    iconSet.fromSVG(name, svg)
  })

  const exported = JSON.stringify(iconSet.export(), null, '\t') + '\n'

  // Save to file
  await fs.writeFile(outputDir, exported, 'utf8')
}
