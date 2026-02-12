/**
 * @file Defines the base template to reduce repetition
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 * @since 2.0.0
 * @see {@link https://www.11ty.dev/docs/languages/javascript/#function JavaScript functions as templates in Eleventy}
 * @see {@link https://www.11ty.dev/docs/data/ Using data in Eleventy}
 * @see {@link https://www.11ty.dev/docs/layout-chaining/ Layout chaining in Eleventy}
 */

import catharticons from '@shenangopress/catharticons'

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
    collections,
    content,
    faviconPath,
    fontScript,
    geojson,
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

  /** @type {Object} Address and phone number from GeoJSON data */
  var {address, phone} = geojson.location.properties

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
   * Markup for navigation menu items
   * @callback navItem
   * @param {Object[]} link Destructured link data
   */
  var navItem = ({
    url,
    data: {
      // Used by content/links/*.md
      linkText,
      // Used by pages
      nav: {navTitle},
      title,
      // Used by content/links/*.md
      urlOverride}
    }) => {
    // Is the data is for an external link?
    linkText = linkText
        // Use the localized link text
        ? linkText[lang]
        // Does the page have a shortened navigation title?
        : navTitle
          ? navTitle
          // Otherwise, use the page title
          : title

    // Is the data for an external link? Otherwise, use the normal URL
    url = urlOverride ? urlOverride : url

    return `<!--navItem()--><li>
      <a href="${url}">${linkText}</a>
    </li>`
  }

  /**
   * Links for the social menu (used by @shenangopress/catharticons)
   * @callback socialIcon
   * @param {string} name Name of social network
   * @param {string} url  Social network profile URL
   */
  var socialIcon = (name, url) => `<!--socialIcon()-->
  <a href="${url}">${catharticons(name)}</a>`

  /**
   * Function for sorting items by their `nav.weight` property (ascending).
   * @param {Object} a Compare with item b
   * @param {Object} b Compare with item a
   * @return {Object[]} Items
   */
  var byWeight = (a, b) => a.data.nav.weight - b.data.nav.weight

  /**
   * Navigation markup from a specified collection
   * @param {string} menuName Menu name to filter (see in admin/config.yaml)
   * @param {function} [callback= navItem] A callback to define each menu item’s markup (defaults to `navItem`)
   * @param {string} [separator= '\n'] An optional separator when joining menu items (defaults to a line break)
   * @throws {Error} If the specified collection does not exist in the data
   * @throws {Error} If the menu parameter is not a non-empty string
   * @throws {Error} If the template parameter is not a function
   * @returns {string} HTML
   */
  var navList = (menuName, callback = navItem, separator = '\n') => {
    // Validate parameters
    this.validate(menuName, 'string', `Menu "${menuName}" must be a non-empty string.`)
    this.validate(callback, 'function')

    // Filter and sort menu items from collections
    return collections.all.filter(item => item.data?.nav?.menu?.includes(menuName)
      && this.inLocale(item, lang))
      .sort(byWeight)
      .map(navItem)
      .join(separator)
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

      /* Layout */
      #legal_nav {
        display: inline;
      }

      .flex,
      #app_nav ul li {
        display: flex;
      }

      .flex-column,
      #app_nav ul li {
        flex-direction: column;
      }
    </style>
    ${this.fileExists(fontScript)
      ? `<!--JavaScript for font loading second stage-->
        <script>
          ${this.fileToString(fontScript)}
        </script>`
      : `<!--No file at ${fontScript}-->`
    }
    <!--Zeffy donation form script-->
    <script src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js"></script>
  </head>
  <body>
    <header id="site_header">
      <a class="screen-reader" href="#main">${screenReader.skipToMain}</a>
      ${languageSwitcher(this.locale_links(page.url), screenReader.selectLanguage)}
      <nav id="primary_nav" aria-label="${screenReader.primaryNav}">
        <a href="${home}"><span class="screen-reader">${screenReader.goToHomePage}</span><svg width="405" height="96"><use href="/img/${lang}/logo.svg"></use></svg></a>
        <ul>${navList('main')}</ul>
      </nav>
    </header>
    <!--${page.inputPath}-->
    ${content}
    <footer id="site_footer">
      <nav id="footer_nav" aria-label="${screenReader.footerNav}">
        <!--Contact Information-->
        <section id="footer_0">
          <a href="${home}"><span class="screen-reader">${screenReader.goToHomePage}</span><svg width="270" height="64"><use href="/img/${lang}/logo.svg"></use></svg></a>
          <ul>
            ${data.social.map(({name, url}) => `<li>${socialIcon(name, url)}</li>`).join('')}
          </ul>
        </section>
        <!--Join Us-->
        <section id="footer_1">
          <h2>${locale.footer_1}</h2>
          <ul>${navList('join_us')}</ul>
          <address>
            <p>${address.street}<br>
              ${address.city}, ${address.state.name}&nbsp;${address.postalCode}
            </p>
            <p><a href="tel:${phone.tel}">${phone.formatted}</a></p>
          </address>
        </section>
        <!--Discover-->
        <section id="footer_2">
          <h2>${locale.footer_2}</h2>
          <ul>${navList('discover')}</ul>
        </section>
        <!--Get Involved-->
        <section id="footer_3">
          <h2>${locale.footer_3}</h2>
          <ul>${navList('get_involved')}</ul>
        </section>
        <!--Learn More-->
        <section id="footer_4">
          <h2>${locale.footer_4}</h2>
          <ul>${navList('learn_more')}</ul>
        </section>
      </nav>
      <!--Copyright notice and legal navigation-->
      &copy; ${copyright.year} ${locale.siteOwner}<span aria-hidden="true"> | </span><nav id="legal_nav" aria-label="${screenReader.legalNav}">
        <ul>
          ${navList('legal', navItem, '<span aria-hidden="true"> | </span>')}
        </ul>
      </nav>
    </footer>
  </body>
</html>`
}
