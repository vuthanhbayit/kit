import { notUndefined } from './guards'
import { get } from './object'

type Data = Record<string, any>
interface Config {
  delimiters: [string, string]
}
type Compiled = (data: Data, config?: Config) => string
const DEFAULT_CONFIG = { delimiters: ['{{', '}}'] }

/**
 * Compiles a template string by replacing placeholders with values from the provided data.
 *
 * @param {string} string - The template string containing placeholders to be replaced.
 * @param {Data} [data] - The data object containing values to replace the placeholders.
 * @param {Config} [config] - Configuration options for template compilation.
 * @returns {Compiled|string} - A compiled string if data is provided, otherwise a function
 *                               that can be used to compile the template when data is available.
 *
 * @typedef {Record<string, any>} Data - A key-value data object where keys correspond to
 *                                       placeholder names in the template.
 * @typedef {Object} Config - Configuration options for template compilation.
 * @property {string} delimiters[0] - The start delimiter for placeholders in the template.
 * @property {string} delimiters[1] - The end delimiter for placeholders in the template.
 *
 * @typedef {(data: Data, config?: Config) => string} Compiled - A function that takes data and
 *                                                              an optional config object and
 *                                                              returns the compiled string.
 *
 * @example
 * // Compiling a template with data and custom delimiters
 * const result = template('Hello, {{ name }}!', { name: 'John' }, { delimiters: ['{{', '}}'] });
 * // 'Hello, John!'
 *
 * // Creating a template function with custom delimiters
 * const compileWithCustomDelimiters = template('{{ value }}');
 * const result2 = compileWithCustomDelimiters({ value: 'Custom Value' });
 * // 'Custom Value'
 */
export function template(string: string): Compiled
export function template(string: string, data: Data, config?: Config): string
export function template(string: string, data?: Data, config?: Config): Compiled | string {
  const compiled = (data: Data, config?: Config) => {
    const _config = Object.assign({}, DEFAULT_CONFIG, config)
    const [startDelimiter, endDelimiter] = _config.delimiters
    const placeholderRegex = new RegExp(`${startDelimiter}(.*?)${endDelimiter}`, 'g')

    return string.replace(placeholderRegex, (match, key) => {
      const value = get(data, key.trim())

      return notUndefined(value) ? value : match
    })
  }

  return data ? compiled(data, config) : compiled
}
