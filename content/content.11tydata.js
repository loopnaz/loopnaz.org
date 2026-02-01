/**
 * @file Data common to all content in this and nested directories
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 * @since 2.0.0
 * @see {@link https://www.11ty.dev/docs/data-template-dir/ Template and directory data files in Eleventy}
 */

/**
 * Directory data
 * @module content
 */
export default {
  /**
   * Wrap all content with the base layout
   * @see {@link https://www.11ty.dev/docs/layouts/ Layouts in Eleventy}
   * @see {@link https://www.11ty.dev/docs/layout-chaining/ Layout chaining in Eleventy}
   */
  layout: 'base',

  /**
   * BCP 47 language tag
   * @see {@link https://www.langtag.net/ Language tag registry }
   * */
  lang: 'en',

  /**
   * Set dynamic properties at the end of {@link https://www.11ty.dev/docs/data-cascade/ Eleventy’s Data Cascade}
   * @see {@link https://www.11ty.dev/docs/data-computed/#using-a-template-string Computed data in Eleventy}
   */
  eleventyComputed: {
    /**
     * Format permalinks by content language (localization [l10n])
     * @see {@link https://www.11ty.dev/docs/i18n/#choose-your-url-style Internationalization (i18n) in Eleventy}a
     */
    permalink: data => {
      // Check if there is a custom slug, otherwise use the file slug from Eleventy
      var slug = data.slug ? data.slug : data.page.fileSlug

      // Check if the content is in the default language
      var l10n = data.lang !== data.i18n.defaultLanguage.tag
        // If not, then prepend then localize the slug
        ? `${data.lang}/${slug}`
        // Otherwise, use the file slug without the language tag
        : slug

      return `/${l10n}/index.html`
    }
  }
}
