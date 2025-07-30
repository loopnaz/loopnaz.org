/**
 * @file Defines a module to convert a file’s contents to a string
 * @author Reuben L. Lillie <reuben@earnsavegive.co>
 */

// Import Node.js native fs module for interacting with the file system
import {readFileSync} from 'fs'

/**
 * Convert a file’s contents to a string
 * @module _includes/filters/file-to-string
 * @since 0.1.0
 * @param {string} path The path of the file to convert (relative to project root)
 * @return {string} The file’s contents
 * @see {@link `fs.readFileSync(path) in Node.js`}
 * @example
 * // In an Eleventy template
 * `${this.fileToString('./img/logo.svg')}`
 */
export default path => readFileSync(`${path}`).toString()
