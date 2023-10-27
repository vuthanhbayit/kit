/**
 * Checks if a given path is an absolute path (e.g., starts with a protocol like "http:" or "file:").
 *
 * @param {string} path - The path to check.
 * @returns {boolean} - True if the path is an absolute path, otherwise false.
 *
 * @example
 * // Check if a path is absolute
 * const absolutePath = 'https://example.com/images/image.jpg';
 * const isAbsolute = isAbsolutePath(absolutePath); // Returns true
 *
 * @example
 * // Check if a path is not absolute
 * const relativePath = 'images/image.jpg';
 * const isAbsolute = isAbsolutePath(relativePath); // Returns false
 */
export const isAbsolutePath = (path: string): boolean => {
  return /^([a-z]+:)/gi.test(path)
}

/**
 * Checks if a given path is a relative path (not an absolute path).
 *
 * @param {string} path - The path to check.
 * @returns {boolean} - True if the path is a relative path, otherwise false.
 *
 * @example
 * // Check if a path is relative
 * const relativePath = 'images/image.jpg';
 * const isRelative = isRelativePath(relativePath); // Returns true
 *
 * @example
 * // Check if a path is not relative
 * const absolutePath = 'https://example.com/images/image.jpg';
 * const isRelative = isRelativePath(absolutePath); // Returns false
 */
export const isRelativePath = (path: string): boolean => {
  return !isAbsolutePath(path)
}

/**
 * Removes a specific parameter and its value from a URL query string.
 *
 * @param {string} url - The URL with the parameter to be removed.
 * @param {string} parameter - The parameter name to remove.
 * @returns {string} - The modified URL with the specified parameter removed.
 *
 * @example
 * // Remove a parameter from a URL
 * const originalUrl = 'https://example.com/page?param1=value1&param2=value2#section';
 * const updatedUrl = removeParameterFromUrl(originalUrl, 'param1');
 * // Returns 'https://example.com/page?param2=value2#section'
 */
export const removeQueryParam = (url: string, parameter: string): string => {
  return url
    .replace(new RegExp(`[?&]${parameter}=[^&#]*(#.*)?$`), '$1')
    .replace(new RegExp(`([?&])${parameter}=[^&]*&`), '$1')
}

/**
 * Removes multiple parameters and their values from a URL query string.
 *
 * @param {string} url - The URL with the parameters to be removed.
 * @param {...string} parameters - The parameter names to remove.
 * @returns {string} - The modified URL with the specified parameters removed.
 *
 * @example
 * // Remove multiple parameters from a URL
 * const originalUrl = 'https://example.com/page?param1=value1&param2=value2#section';
 * const updatedUrl = removeParameterFromUrls(originalUrl, 'param1', 'param2');
 * // Returns 'https://example.com/page#section'
 */
export const removeQueryParams = (url: string, ...parameters: string[]): string => {
  for (const parameter of parameters) {
    url = removeQueryParam(url, parameter)
  }

  return url
}
