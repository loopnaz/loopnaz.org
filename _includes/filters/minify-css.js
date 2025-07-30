/**
 * @file Defines a module to minify CSS
 * @author Reuben L. Lillie <reuben@earnsavegive.co>
 */

/*
 * Import Jakup Pawlowicz’s Clean-CSS module
 * @see {@link https://github.com/jakubpawlowicz/clean-css Clean-CSS on GitHub}
 */
import CleanCSS from 'clean-css'

/**
 * Minify CSS
 * @module _includes/filters/minify-css
 * @since 0.1.0
 * @param {string} stylesheet A raw stylesheet
 * @return {string} The minified stylesheet
 * @see {@link https://github.com/jakubpawlowicz/clean-css#minify-method clean-css on GitHub}
 * @see {@link https://www.11ty.dev/docs/data-js/#example-exposing-environment-variables Environment variables in Eleventy}
 * @example
 * // In an Eleventy template
 * `${this.minifyCSS(this.fileToString('css/inline.css'))}`
 */
export default stylesheet => {
  // Only minify stylesheets for production
  if(process.env.ELEVENTY_ENV === 'production') {
    var minified = new CleanCSS({}).minify(stylesheet).styles
    return minified
  }

  return stylesheet
}
