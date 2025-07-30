/**
 * @file Defines a module to check if a file exists
 * @author Reuben L. Lillie <reuben@earnsavegive.co>
 */

// Import Node.js native fs module for interacting with the file system
import {existsSync} from 'fs'

/**
 * Check if a file exists
 * @module _includes/filters/file-exists
 * @since 0.1.0
 * @return {string} The file’s contents
 * @see {@link `fs.existsSync(path) in Node.js`}
 * @example
 * // In an Eleventy template
 * `${this.fileExists('_includes/assets/css/internal.css')}`
 */
export default path =>
  typeof path === 'string'
    ? existsSync(`${path}`)
    : console.error(`Cannot read path ${path} in ./_includes/filters/fileExists()`)
