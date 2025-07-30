# `./_includes/`

This directory contains files for extending Eleventy’s functionality (links are to [Eleventy documentation](https://www.11ty.dev/docs/config/#directory-for-includes)).

* [Filters](https://www.11ty.dev/docs/filters/) for modifying template content—that is, before Eleventy process them
* [Shortcodes](https://www.11ty.dev/docs/shortcodes/) for reusable content
* [Transforms](https://www.11ty.dev/docs/config/#transforms) for modifying template output, that is, after Eleventy initially processes them

You can also `import` `./filters/`, `./functions/`, and `./shortcodes/` outside of Eleventy templates, for example, in Eleventy data files or client-side scripts.

Files named `index.js` call that directory’s various functions in one place and configure them with Eleventy.
