/**
 * @file Configuration file for Eleventy
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 * @since 2.0.0
 * @see {@link https://www.11ty.dev/docs/config/ Eleventy configuration}
 */

// Import Eleventy plugins
import {EleventyI18nPlugin} from '@11ty/eleventy'

// Import local data for configuration
import i18n from './_data/i18n.js'

/** @type {Object} Destructure internationalization data */
var {defaultLanguage: {tag}} = i18n

/**
 * Configure Eleventy
 * @module .eleventy
 * @param {Object} eleventyConfig Eleventy’s Config API
 * @returns {void|Object} Eleventy’s optional `config` object
 */
export default eleventyConfig => {
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
}

/**
 * Use Markdown inside JavaScript template files
 * @see {@link https://www.11ty.dev/docs/config/#default-template-engine-for-markdown-files Default template engine for Markdown files}
 * @see {@link https://www.11ty.dev/docs/config-shapes/#optional-export-config-object Configuration shapes}
 */
export var config = {
  htmlTemplateEngine: '11ty.js',
  markdownTemplateEngine: '11ty.js'
}
