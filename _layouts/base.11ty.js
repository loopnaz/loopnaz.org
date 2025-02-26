/**
 * @file Defines the base template to reduce repitition
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 * @since 2.0.0
 * @see {@link https://www.11ty.dev/docs/languages/javascript/#function JavaScript functions as templates in Eleventy}
 * @see {@link https://www.11ty.dev/docs/data/ Using data in Eleventy}
 * @see {@link https://www.11ty.dev/docs/layout-chaining/ Layout chaining in Eleventy}
 */

/**
 * Wrap other templates with this base template
 * @param {Object} data Eleventy’s `data` object
 * @returns {string} HTML
 */
export function render(data) {
  /** @type {Object} Destructured template data */
  var {
    i18n: {defaultLanguage},
    lang,
    page,
    title
  } = data

  /** @type {Object} Localized strings, for example, in `_data/en.js` */
  var locale = data[lang]

  /** @type {Object} Destructure localized screen reader template strings */
  var {screenReader} = locale

  /** @type {string} Is the current content in the default language? */
  var home = lang === defaultLanguage.tag
    /*
     * Then exclude the language tag to link back to the home page
     * @see {@link https://www.11ty.dev/docs/i18n/#content-negotiation Content negotiation in Eleventy}
     */
    ? '/'
    // Otherwise, specify that translation’s home page in the URL (e.g., `/es/`)
    : this.locale_url('/', lang)

  /** @type {string} Does the page have a specified title? */
  title = title
    // Then use it.
    ? title
    // Otherwise, use the localized site name (e.g., in `_data/en.js`)
    : locale.siteName

  /**
   * Lists other translations available for this content
   * @callback languageSwitcher
   * @param {Object} urls Filtered `locale_links`
   * @see {@link https://www.11ty.dev/docs/plugins/i18n/#locale-links-filter `locale_links` in Eleventy}
   */
  var languageSwitcher = (links, listHeader) =>
    // Is there one or more translation available?
    links.length >= 1
      // Then display the language switcher.
      ? `<!--languageSwitcher() in _layouts/base.11ty.js-->
        <nav class="languages-nav" aria-labelledby="languages-nav">
          <h2 aria-labelledby="languages-nav"
              class="screen-reader">${listHeader}</h2>
          <ul>${links.map((link) => supportedLanguage(link))
            .join(', ')}</ul>
        </nav>`
      // Otherwise, leave a comment for debugging.
      : '<!--No translations available for this content-->'

  /**
   * Links to an available translation
   * @callback supportedLanguage
   * @param {Object[]} link Destructured translation link data
   */
  var supportedLanguage = ({url, lang, label}) => `<!--supportedLanuage()-->
    <li>
      <a href="${url}"
         lang="${lang}"
         hreflang="${lang}">${label} (${locale.languages[lang]})</a>
    </li>`

  return `<!--./_layouts/base.11ty.js-->
<!DOCTYPE html>
<html lang="${lang}-${defaultLanguage.subtag}" dir="${data.dir}">
  <head>
    <title>${title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial scale=1.0">
  </head>
  <body>
    <header>
      <a class="screen-reader" href="#main">${screenReader.skipToMain}</a>
      ${languageSwitcher(this.locale_links(page.url), screenReader.selectLanguage)}
    </header>
    <main id="main" tabindex="-1">
      <!--${page.inputPath}-->
      ${data.content}
    </main>
  </body>
</html>`
}
