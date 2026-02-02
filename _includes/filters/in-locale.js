/**
 * @file Defines a module to check if some content is in a certain language
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 */

/**
 * Test if a piece of content is in a certain locale
 * @module _includes/filters/in-locale
 * @since 2.0.0
 * @param {object} item Eleventy content
 * @return {string} lang BCP 47 language tag (e.g., `es`)
 * @see {@link https://www.langtag.net/ Language tag registry}
 */
export default (item, lang) =>
  item?.data?.page?.lang === lang
