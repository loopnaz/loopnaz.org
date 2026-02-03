/**
 * @file Defines a module to chain a callback before or after template content
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 */

/**
 * Chain a template of a callback based on a specified order
 * @module _includes/filters/chain-layouts
 * @since 2.0.0
 * @param {function} callback Processes the data
 * @param {('before'|'after'|null)} order Relative to the content string
 * @returns {string} Combined HTML
 * @example
 * // In an Eleventy template
 * `${this.chainLayouts(contactForm, chainOrder, data)}`
 */
export default (callback, order, {content, ...data}) => (order === 'after' || order === null)
  ? content + callback(data)
  : callback(data) + content
