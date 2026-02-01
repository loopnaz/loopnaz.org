/**
 * @file Global metadata
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 * @since 2.0.0
 * @see {@link https://www.11ty.dev/docs/data-global/ Global Data Files in Eleventy}
 */

/**
 * Define global metadata for the site
 * @module _data/meta
 */
export default {
  // The base URL for the site, but without a trailing slash
  baseUrl: 'https://loopnaz.org',
  // The domain name without the protocol or extension (used for name spacing)
  domain: 'loopnaz',
  // Copyright information
  copyright: {
    // The current year
    year: new Date().getFullYear()
  }
}
