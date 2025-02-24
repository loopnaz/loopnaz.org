# content/

This directory contains templates for individual pages, posts, and the like. Additional content is stored in either `_data/`, `_layouts`, or `_includes/shortcodes`.

## Template syntax

Eleventy offers a variety of templating options. This project uses two:

1. [Markdown](https://www.11ty.dev/docs/languages/markdown/) (ending with `*.md`) for basic pages and posts
2. [JavaScript](https://www.11ty.dev/docs/languages/javascript/) (ending with `*.11ty.js`) for added functionality

[Markdown is also available inside JavaScript templates](https://www.11ty.dev/docs/languages/javascript/#markdown-and-java-script). Thanks to [`markdownTemplateEngine`](https://www.11ty.dev/docs/config/#default-template-engine-for-markdown-files) in `.eleventy.js`, there’s no need to use `templateEngineOverride` within `*.11ty.js` files.

Instead of JavaScript classes, this project prefers separate exports for Eleventy’s [`data` and `render` methods](https://www.11ty.dev/docs/languages/javascript/#optional-data-method), most often treating `data` as an object. Among other reasons, this format helps reduce indentation and repetition. For example:

```js
/**
 * @file content/example.11ty.js
 */

/** @type {Object} Acts as front matter in JavaScript templates */
export var data = {
  title: 'Example JavaScript Template in Eleventy'
}

/**
 * Markup for the template
 * @param {Object} data Eleventy’s `data` object
 * @returns {string} HTML
 */
export function render(data) {
  return `<!--content/example.11ty.js-->
# ${data.title}

Now you can write Markdown in JavaScript!`
}
```

## Directory structure

This directory organizes content first by locale (human language) then by conent type. The only pages not stored in a locale directory are `404.md` (for page not found errors) and `index.md` (the home page).

Each directory level may also contain a [JavaScript data file](https://www.11ty.dev/docs/data-js/) (ending with `*.11tydata.js`), which further helps reduce repetition by defining [data that applies to all the files in that directory](https://www.11ty.dev/docs/data-template-dir/) in one place.

```cli
📁 content/
  📁 en/
    📁 pages/
    📁 posts/
    … etc.
    📄 404.md
    📄 en.11tydata.js (applies to all English content)
    📄 index.md (home page in English)
  📁 es/
    📁 pages/
    📁 posts/
    … etc.
    📄 404.md
    📄 es.11tydata.js (applies to all Spanish content)
    📄 index.md (home page in Spanish)
  📁 es/
  content.11tydata.js (applies to all content)
```
