/**
 * @file Global data for English text strings
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 * @since 2.0.0
 * @see {@link https://www.11ty.dev/docs/data-global/ Global data files in Eleventy}
 */

/**
 * Define text for template strings that appear in English
 * @module _data/en
 */
export default {
  // Other supported languages (English names)
  languages: {
    es: 'Spanish'
  },

  /* Identity */

  // The name of the site
  siteName: 'Church of the Nazarene in the Loop',
  // The site tagline
  tagline: 'Let’s serve the heart of Chicago',
  // Logo description used in SVG `<title>` tags and image `alt` attributes
  logoAlt: 'Chicago star emblazoned with a flaming dove alighting on an open Bible',

  /* User interface */

  // Text strings to be read aloud by screen readers
  screenReader: {
    goToHomePage: 'Go to home page',
    // Screen reader link in the `<header>`
    skipToMain: 'Skip to main content',
    // Language switcher
    selectLanguage: 'Choose another language'
  }
}
