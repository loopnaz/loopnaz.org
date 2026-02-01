/**
 * @file Global data for color gradients
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 */

import colors from './colors.js'

/**
 * Define global gradient data from the {@link https://resources.nazarene.org/index.php/s/z78Bm8z8fiTyyEz Church of the Nazarene Brand Guide}
 *
 * Please avoid gradients that are not described here.
 *
 * @module _data/gradients
 * @see {@link https://www.11ty.dev/docs/data-global/ Global data files in Eleventy}
 */
export default () => {
  /** @type {Object} Destructure color objects */
  var {red, orange, yellow, green, blue, purple} = colors

  /** @type {Object} Gradients should only be at these angles */
  var angles = {
    acute: 45,
    obtuse: 135
  }

  /**
   * Get a comma separated list of formatted color values
   * @callback colorValues
   * @param {Object[]} arr Color objects to format
   * @param {string} format Color format (e.g., `'hex'`)
   * @returns {string}
   */
  var colorValues = (arr, format) => arr.map(color => color[format]).join(', ')

  /**
   * Format angle and color values for CSS gradient declaration
   * @callback css
   * @param {string} angle Key from `angles` to use (i.e., `acute` or `obtuse`)
   * @param {Object[]} colorStops Colors within the gradient
   * @param {string} [format=hex] Color format (i.e., `hex` or `rgb`)
   */
  var css = (angle, colorStops, format = 'hex') => [
    angles[angle], colorValues(colorStops, format)
  ].join(', ')

  return {
    purpleGreenBlue: css('obtuse', [purple[300], green[300], blue[300]]),
    blueToPurple: css('acute', [blue[500], purple[300]]),
    greenToBlue: css('acute', [green[100], blue[500]]),
    redToYellow: css('obtuse', [red[700], red[300], yellow[700], yellow[300]]),
    redToOrange: css('acute', [red[500], orange[300]]),
    // NB, green[500] differs from p. 13 of the guide, #2db674
    orangeToGreen: css('acute', [orange[300], green[500]]),
  }
}
