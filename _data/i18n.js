/**
 * @file Global data for internationalization (i18n)
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 * @since 2.0.0
 * @see {@link https://www.11ty.dev/docs/data-global/ Global data files in Eleventy}
 * @see {@link https://www.11ty.dev/docs/plugins/i18n/ i18n in Eleventy}
 */

/**
 * Define global data for translating content in multiple languages
 * @module _data/i18n
 */
export default {
  /**
   * BCP 47 language tag
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang lang on MDN}
   */
  defaultLanguage: {
    tag: 'en',
    subtag: 'US',
  },
  /**
   * Text direction
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir dir on MDN}
   */
  dir: 'ltr'
}
