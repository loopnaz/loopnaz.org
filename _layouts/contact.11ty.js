/**
 * @file Defines the chained layout template for the contact form
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 * @since 2.0.0
 * @see {@link https://www.11ty.dev/docs/languages/javascript/#function JavaScript functions as templates in Eleventy}
 * @see {@link https://www.11ty.dev/docs/data/ Using data in Eleventy}
 * @see {@link https://www.11ty.dev/docs/layout-chaining/ Layout chaining in Eleventy}
 */

/** @type {Object} Acts as front matter data in JavaScript templates */
export var data = {
  layout: 'page',
  templateEngineOverride: '11ty.js,md'
}

/**
 * Wrap other templates with this base template
 * @param {Object} data Eleventy’s `data` object
 * @returns {string} HTML
 */
export function render(data) {
  /** @type {Object} Destructured template data */
  var {
    chainOrder,
    content,
    lang
  } = data

  /** @type {Object} Localized strings, for example, in `_data/en.js` */
  var locale = data[lang]

  var {contact: {labels}} = locale

  /**
   * Markup for the contact form
   * returns {string} HTML
   */
  var contactForm = () => `<!--contactForm()-->
  <form id="contact"
    class="flex flex-column"
    method="POST"
    action="${this.locale_url('/contact-thanks/')}"
    autocomplete="on"
    netlify-honeypot="bot_field"
    netlify>
    <label class="screen-reader">${labels.honeyPot} <input name="bot_field"></label>
    <label for="name">${labels.name}</label>
    <input id="name"
     name="name"
     type="text" name="name"
     required="true">
    <label for="email">${labels.email}</label>
    <input id="email"
     name="email"
     type="email"
     required="true">
    <label for="message">${labels.message}</label>
    <textarea id="message"
      name="message"
      rows="13"
      cols="47"></textarea>
    <button id="submit"
      class="glow"
      name="submit"
      type="submit">${labels.sendButton}</button>
  </form>`

  // Display content form after the page content by default
  return `<!--_layouts/contact.11ty.js-->
  ${this.chainLayouts(contactForm, chainOrder, data)}`
}
