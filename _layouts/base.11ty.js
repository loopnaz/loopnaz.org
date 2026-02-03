/**
 * @file Defines the base template to reduce repetition
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 * @since 2.0.0
 * @see {@link https://www.11ty.dev/docs/languages/javascript/#function JavaScript functions as templates in Eleventy}
 * @see {@link https://www.11ty.dev/docs/data/ Using data in Eleventy}
 * @see {@link https://www.11ty.dev/docs/layout-chaining/ Layout chaining in Eleventy}
 */

/** @type {Object} Acts as front matter data in JavaScript templates */
export var data = {
  /** @type {string} File path for favicon markup */
  faviconPath: 'favicons/html_code.html',
  fontScript: 'js/fonts.js'
}

/**
 * Wrap other templates with this base template
 * @param {Object} data Eleventy’s `data` object
 * @returns {string} HTML
 */
export function render(data) {
  /** @type {Object} Destructured template data */
  var {
    faviconPath,
    fontScript,
    i18n: {defaultLanguage},
    lang,
    meta: {copyright},
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

  /**
   * Links for the legal menu (used in the footer)
   * @callback legalNavLink
   * @param {Object[]} link Destructured link data
   */
  var legalNavLink = ({url, data: {nav: {navTitle}, title}}) => {
    var linkText = navTitle ? navTitle : title
    return `<!--legalNavLink()--><span>
      <a href="${url}">${linkText}</a>
    </span>`
  }

  /**
   * Generates an HTML menu from a specified collection of items based on provided criteria.
   * @param {string} collection Name of the collection to filter
   * @param {string} menu The menu ID to filter (see in admin/config.yaml)
   * @param {function} callback A callback function to define menu HTML
   * @param {string} [separator= ] An optional separator when joining menu items (defaults to a non-breaking space)
   * @throws {Error} If the specified collection does not exist in the data
   * @throws {Error} If the menu parameter is not a non-empty string
   * @throws {Error} If the template parameter is not a function
   * @returns {string} HTML
   */
  var menuFromCollection = (collection = all, menu, callback, separator = '&nbsp;') => {
    // Validate parameters
    this.validate(data.collections?.[collection], 'object', `Collection "${collection}" does not exist.`)
    this.validate(menu, 'string', `Menu "${menu}" must be a non-empty string.`)
    this.validate(callback, 'function')

    // Filter and sort items before reduction
    var filteredItems = data.collections[collection].filter(currentItem =>
      currentItem.data?.nav?.menu === menu && this.inLocale(currentItem, lang)
    )

    // Sort items by the specified key
    var sortedItems = this.orderBy(filteredItems, 'nav.order')
    return sortedItems.map(item => callback(item)).join(separator)
  }

  return `<!--./_layouts/base.11ty.js-->
<!DOCTYPE html>
<html lang="${lang}-${defaultLanguage.subtag}" dir="${data.dir}">
  <head>
    <title>${title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial scale=1.0">
    ${this.fileExists(faviconPath)
      ? `<!--favicons-->
        ${this.fileToString(faviconPath)}`
      : `<!--No favicon markup at ${faviconPath}-->`
    }
    <!-- Preload HTML for font loading first stage-->
    <link rel="preload" href="fonts/lato/Lato-Bold-kern-latin.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="fonts/lato/Lato-Regular-kern-latin.woff2" as="font" type="font/woff2" crossorigin>
  <style>
    /* CSS for font loading first stage */
    @font-face {
      font-family: Lato;
      src: local('Lato'),
        url(/fonts/lato/Lato-Bold-kern-latin.woff2) format("woff2");
      font-weight: 700;
      font-display: swap;
    }
    @font-face {
        font-family: Lato;
        src: local('Lato'),
          url(/fonts/lato/Lato-Regular-kern-latin.woff2) format("woff2");
        font-weight: 400;
        font-display: swap;
    }
    html {
      font-family: Lato;
    }
    #legal_nav {
      display: inline;
    }
  </style>
  ${this.fileExists(fontScript)
    ? `<!--JavaScript for font loading second stage-->
      <script>
        ${this.fileToString(fontScript)}
      </script>`
    : `<!--No file at ${fontScript}-->`
  }
  </head>
  <body>
    <header>
      <a class="screen-reader" href="#main">${screenReader.skipToMain}</a>
      ${languageSwitcher(this.locale_links(page.url), screenReader.selectLanguage)}
      <nav id="primary_nav" aria-label="${locale.screenReader.primaryNav}">
        <a href="${home}"><span class="screen-reader">${locale.screenReader.goToHomePage}</span><svg width="405" height="96"><use href="/img/${lang}/logo.svg"></use></svg></a>
      </nav>
    </header>
    <main id="main" tabindex="-1">
      <!--${page.inputPath}-->
      ${data.content}
    </main>
    <footer>
      <!--Copyright notice and legal navigation-->
      &copy; ${copyright.year} ${locale.siteOwner} | <nav id="legal_nav" aria-label="Legal navigation">
        ${menuFromCollection('policies', 'legal', legalNavLink, ' | ')}
      </nav>
    </footer>
  </body>
</html>`
}
