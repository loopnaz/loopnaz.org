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
    colors,
    content,
    faviconPath,
    fontScript,
    hasMap,
    geojson,
    gradients,
    i18n: {defaultLanguage},
    lang,
    meta: {copyright},
    page,
    tags,
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

  /** @type {string[]|null} List of tags */
  var tagList = tags ? tags.map(tag => tag).join(' ') : null

  /** @type {string} Leaflet scripts */
  var leaflet = hasMap
    ? `<!--Leaflet-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.css" crossorigin>
    <script type="module">${this.fileToString('js/leaflet.js')}</script>`
    : `No Leaflet map on ${page.fileSlug}`

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
        <nav class="languages-nav emoji-text inline small" aria-labelledby="languages-nav">
          <h2 aria-labelledby="languages-nav"
              class="screen-reader">${listHeader}</h2>
          <ul class="no-list-style">${links.map((link) => supportedLanguage(link))
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

    // Does the page have a shortened navigation title?
    linkText = navTitle
      // Use that one
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
  var socialIcon = ({name, url}) => `<!--socialIcon()-->
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${this.fileExists(faviconPath)
      ? `<!--favicons-->
        ${this.fileToString(faviconPath)}`
      : `<!--No favicon markup at ${faviconPath}-->`
    }
    <!-- Preload HTML for font loading first stage-->
    <link rel="preload" href="/fonts/lato/Lato-Bold-kern-latin.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/fonts/lato/Lato-Regular-kern-latin.woff2" as="font" type="font/woff2" crossorigin>
    <style>
      /* Root variables */
      :root {
        /* Colors */
        --black: ${colors.black[900].hex};
        --gray-100: ${colors.gray[100].hex};
        --gray-300: ${colors.gray[100].hex};
        --gray-500: ${colors.gray[500].hex};
        --gray-700: ${colors.gray[700].hex};
        --red-700: ${colors.red[700].hex};
        --blue-100: ${colors.blue[100].hex};
        --blue-300: ${colors.blue[300].hex};
        --blue-500: ${colors.blue[500].hex};
        --blue-700: ${colors.blue[700].hex};
        --blue-900: ${colors.blue[900].hex};

        /* Gradients */
        --purple-green-blue: linear-gradient(${gradients.purpleGreenBlue});
        --purple-green-blue-overlap: linear-gradient(${gradients.purpleGreenBlueOverlap});
        --blue-to-purple: linear-gradient(${gradients.blueToPurple});
        --blue-to-purple-overlap: linear-gradient(${gradients.blueToPurpleOverlap});
        --green-to-blue: linear-gradient(${gradients.greenToBlue});
        --green-to-blue-overlap: linear-gradient(${gradients.greenToBlueOverlap});
        --red-to-yellow: linear-gradient(${gradients.redToYellow});
        --red-to-yellow-overlap: linear-gradient(${gradients.redToYellowOverlap});
        --red-to-orange: linear-gradient(${gradients.redToOrange});
        --red-to-orange-overlap: linear-gradient(${gradients.redToOrangeOverlap});
        --orange-to-green: linear-gradient(${gradients.orangeToGreen});
        --orange-to-green-overlap: linear-gradient(${gradients.orangeToGreenOverlap});

        /* Units */
        --base-unit: 1em;
        --base-unit-half: calc(var(--base-unit) / 2);
        --base-unit-2x: calc(var(--base-unit) * 2);
        --base-unit-3x: calc(var(--base-unit) * 3);
        --full-width: calc(100vw - var(--base-unit-2x));
        --paragraph-width: 66ch;

        /* Variables */
        --text-color: var(--gray-700);
        --background-color: white;
        --accent-color: var(--red-700);
        --border-color: var(--gray-100);
        --border: 1px solid var(--border-color);

        /**
         * Dark mode variants
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme MDN}
         */
        @media (prefers-color-scheme: dark) {
          --text-color: white;
          --background-color: var(--black);
          --border-color: var(--gray-500);
        }
      }

      ${this.minifyCss(`<!--Inline CSS-->
        ${this.fileToString('css/fonts.css')}
        ${this.fileToString('css/layout.css')}
        ${this.fileToString('css/typography.css')}
        ${this.fileToString('css/forms.css')}
        ${this.fileToString('css/a11y.css')}
        ${this.fileToString('css/map.css')}
      `)}
    </style>
    ${this.fileExists(fontScript)
      ? `<!--JavaScript for font loading second stage-->
        <script>
          ${this.fileToString(fontScript)}
        </script>`
      : `<!--No file at ${fontScript}-->`
    }
    ${leaflet}
    <!--Zeffy donation form script-->
    <script src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js"></script>
  </head>
   <body class="no-margin" ${tags
    ? `data-tags="${tagList}"`
    : ''}>
    <header id="site_header" class="flex flex-column small-gap">
      <a class="screen-reader" href="#main">${screenReader.skipToMain}</a>
      ${languageSwitcher(this.locale_links(page.url), screenReader.selectLanguage)}
      <nav id="primary_nav" class="flex" aria-label="${screenReader.primaryNav}">
        <a href="${home}"><span class="screen-reader">${screenReader.goToHomePage}</span><svg width="405" height="96"><use href="/img/${lang}/logo.svg"></use></svg></a>
        <ul class="flex gap no-list-style bold uppercase">
          ${navList('main')}
        </ul>
      </nav>
    </header>
    <!--${page.inputPath}-->
    ${content}
    <footer id="site_footer" class="grid gap">
      <nav id="footer_nav" aria-label="${screenReader.footerNav}" class="grid gap columns">
        <!--Contact Information-->
        <section id="footer_0">
          <a href="${home}"><span class="screen-reader">${screenReader.goToHomePage}</span><svg width="270" height="64"><use href="/img/${lang}/logo.svg"></use></svg></a>
          <nav class="inline social">
            ${data.social.map(network => socialIcon(network)).join('\n')}
          </nav>
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
      <nav id="legal_nav"
           class="inline small"
           aria-label="${screenReader.legalNav}">
      <!--Copyright notice and legal navigation-->
      &copy; ${copyright.year} ${locale.siteOwner}<span aria-hidden="true"> | </span>
        <ul>
          ${navList('legal', navItem, '<span aria-hidden="true"> | </span>')}
        </ul>
      </nav>
    </footer>
  </body>
</html>`
}
