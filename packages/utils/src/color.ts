/**
 * Converts a hexadecimal color code to an object representing the RGB values.
 *
 * @param {string} hex - The hexadecimal color code (e.g., "#FF5733").
 * @returns {{ r: number; g: number; b: number } | null} - An object containing the RGB values or null if the input is invalid.
 *
 * @example
 * // Convert a valid hex color to RGB format
 * const hexColor = '#FF5733';
 * const rgbColor = hexToRGB(hexColor); // Returns { r: 255, g: 87, b: 51 }
 *
 * @example
 * // Handle invalid hex color input
 * const invalidHexColor = 'invalid';
 * const invalidRGBColor = hexToRGB(invalidHexColor); // Returns null
 */
export const hexToRGB = (hex: string): { r: number; g: number; b: number } | null => {
  hex = hex.replace(/^#/, '')

  if (!/^(?:[\dA-Fa-f]{3}){1,2}$/.test(hex)) {
    return null
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  const bigint = Number.parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return {
    r,
    g,
    b,
  }
}

/**
 * Converts RGB values to a hexadecimal color code.
 *
 * @param {number} r - The red component (0-255).
 * @param {number} g - The green component (0-255).
 * @param {number} b - The blue component (0-255).
 * @returns {string | null} - The hexadecimal color code (e.g., "#FF5733") or null if the input values are out of range.
 *
 * @example
 * // Convert RGB values to a hex color code
 * const red = 255;
 * const green = 87;
 * const blue = 51;
 * const hexColor = rgbToHex(red, green, blue); // Returns "#FF5733"
 *
 * @example
 * // Handle out-of-range RGB values
 * const invalidHexColor = rgbToHex(300, 128, -10); // Returns null
 */
export const rgbToHex = (r: number, g: number, b: number): string | null => {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    return null
  }

  const hexR = r.toString(16).padStart(2, '0')
  const hexG = g.toString(16).padStart(2, '0')
  const hexB = b.toString(16).padStart(2, '0')

  return `#${hexR}${hexG}${hexB}`
}
