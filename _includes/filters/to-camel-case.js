/**
 * @file Defines a module to format hyphenated text camel case
 * @author Reuben L. Lillie <reuben@earnsavegive.co>
 */

// Import native Node.js modules
import {parse} from 'path'

/**
 * Convert a hyphenated string to camel case
 * @module _includes/filters/to-camel-case
 * @since 0.1.0
 * @param {string} string A hyphenated string (e.g., file-name.js)
 * @return {string} camelCase (e.g. fileName)
 * @see {@link https://nodejs.org/api/path.html#pathparsepath Node.js `path.parse(path)`}
 */
export default str => {
  /** @type {string} Convert the string to camel case */
  var camelCase = str.replace(/-([a-z0-9])/g, str => str[1].toUpperCase())

  // Is there a file extension?
  return camelCase.split('.').length > 1
    // If so, remove it.
    ? parse(camelCase).name
    // If not, return the string as is.
    : camelCase
}
