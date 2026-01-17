/**
 * Generates a random string of the specified length.
 *
 * @param {number} length - The length of the random string to generate.
 * @returns {string} A random string of the specified length.
 */
export const randomString = (length = 5): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  const result: string[] = Array.from({ length })

  for (let i = 0; i < length; i++) {
    result[i] = characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result.join('')
}
