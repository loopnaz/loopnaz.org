/**
 * @file Configuration file for Eleventy
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 * @since 2.0.0
 * @see {@link https://www.11ty.dev/docs/config/ Eleventy configuration}
 */

// Import native Node.js modules
import fs from 'node:fs/promises'

// Import Eleventy plugins
import {EleventyI18nPlugin} from '@11ty/eleventy'

// Import local modules
import i18n from './_data/i18n.js'
import toCamelCase from './_includes/filters/to-camel-case.js'

/** @type {Object} Destructure internationalization data */
var {defaultLanguage: {tag}} = i18n

/**
 * Configure Eleventy
 * @module .eleventy
 * @param {Object} eleventyConfig Eleventy’s Config API
 * @returns {void|Object} Eleventy’s optional `config` object
 */
export default async eleventyConfig => {
  /**
   * Set the directory for layouts
   * @see {@link https://www.11ty.dev/docs/config/#directory-for-layouts-optional Layouts directory in Eleventy}
   */
  eleventyConfig.setLayoutsDirectory('_layouts')

  /**
   * Configure Eleventy’s internationalization (i18n) plugin
   * @see _data/i18n
   */
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: tag
  })

  /**
   * Import default modules from a directory and configure them with Eleventy
   * @since 2.0.0
   * @param {string} dir Directory path from which to import files
   * @param {function} [callback=addJavaScriptFunction] `eleventyConfig` method
   * @return {Promise<function>} Passes each default export to the `callback`
   * @see toCamelCase
   * @see {@link https://discord.com/channels/741017160297611315/1276983631184662663 Eleventy Discord}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import Dynamic `import()` on MDN}
   */
  async function importFromDir(dir, callback = 'addJavaScriptFunction') {
    /** @type {string[]} List the files in a directory */
    var files = await fs.readdir(dir)

    // Run on each of the files
    return await Promise.all(files.map(async fileName => {
      /** @type {string} Format fileName to pass to eleventyConfig[callback] */
      var name = toCamelCase(fileName)

      /** @type {Promise<function>} Import the module dynamically */
      var module = await import(`${dir}/${fileName}`)

      eleventyConfig[callback](name, module.default)
    }))
  }

  /*
   * Configure Filters
   */
  await importFromDir('./_includes/filters')

  /**
   * Copy files directly to Eleventy output
   * @see {@link https://www.11ty.dev/docs/copy/ Passtrough files in Eleventy}
   */
  eleventyConfig.addPassthroughCopy('favicons')
}
