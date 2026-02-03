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
  layout: 'base'
}

/**
 * Wrap other templates with this base template
 * @param {Object} data Eleventy’s `data` object
 * @returns {string} HTML
 */
export function render(data) {
  /** @type {Object} Destructured template data */
  var {
    content,
    title
  } = data

  // Title fallback to `name` from `_data/meta.js`
  return `<!--_layouts/page.11ty.js-->
<main id="main" class="page" tabindex="-1">
  <article>
    <header>
      <h1>${title}</h1>
    </header>
    ${content}
  </article>
</main>`
}
