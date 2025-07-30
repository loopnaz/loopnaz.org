/**
 * @file Defines a client-side script for the second stage of the font loading process
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 * @since 2.0.0
 * @see css/fonts.css
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API#basic_font_loading CSS Font Loading on MDN}
 * @see Leatherman, Zach. 2019. “{@link https://www.zachleat.com/web/css-tricks-web-fonts/ Developing a Robust Font Loading Strategy for CSS-Tricks}.” June 26, 2019.
 */

/**
 * Loads fonts based on client support
 *
 * @async
 * @returns {function|void} The function to add the fonts to the client or void if client doesn’t support either method
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/IIFE Immediated Invoked Function Expression (IIFE) on MDN}
 */
(async () => {
  /*
   * Check if the client supports the CSS Font Loading API
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API CSS Font Loading API on MDN}
   * @see {@link https://caniuse.com/font-loading Can I use CSS Font Loading?}
   */
  if('fonts' in document) {
    /** @type {Object.<sting, FontFace>} Fonts to load */
    var fonts = {
      bold: new FontFace('Lato', 'url(/fonts/lato/Lato-Bold-hint-all.woff2) format("woff2")', {weight: '700'}),
      boldItalic: new FontFace('Lato', 'url(/fonts/lato/Lato-BoldItalic-hint-all.woff2) format("woff2")', {style: 'italic', weight: '700'}),
      italic: new FontFace('Lato', 'url(/fonts/lato/Lato-Italic-hint-all.woff2) format("woff2")', {sytle: 'italic'}),
      regular: new FontFace('Lato', 'url(/fonts/lato/Lato-Regular-hint-all.woff2) format("woff2")')
    }

    /** @type {Promise.<FontFace[]>} Load each font */
    var loaded = await Promise.all(Object.keys(fonts).map(key => fonts[key].load()))

    // Then, add each font to the DOM
    return loaded.forEach(font => document.fonts.add(font))
  }

  /*
   * Otherwise, check that the DOM has a `head` element
   */
  if(!('fonts' in document) && 'head' in document) {
    // Awkwardly dump the second stage @font-face blocks in the head
    var style = document.createElement('style')

    style.innerHTML = '@font-face {font-family: Lato; src: url(/fonts/lato/Lato-Regular-hint-all.woff2) format("woff2");} @font-face {font-family: Lato; font-weight: 700; src: url(/fonts/lato/Lato-Bold-hint-all.woff2) format("woff2");} @font-face {font-family: Lato; style: italic; src: url(/fonts/lato/Lato-Italic-hint-all.woff2) format("woff2");} @font-face {font-family: Lato; font-weight: 700; style: italic; src: url(/fonts/lato/Lato-BoldItalic-hint-all.woff2) format("woff2");}'

    return document.head.appendChild(style)
  }

  // The client doesn’t support either method
  return
})()
