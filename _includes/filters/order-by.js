/**
 * @file Defines a module to sort an array by a specified data key
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 */

// Import local modules
import getValueByKey from './get-value-by-key.js'

/**
 * Sorts an array of items based on a specified data key
 * @param {Array} items The array of items to sort
 * @param {string} key The key to sort by (e.g., 'order')
 * @returns {Array} The sorted array
 */
export default (items, key) => items.sort((a, b) => {
  // Get data values to compare
  var aValue = getValueByKey(a, key)
  var bValue = getValueByKey(b, key)

  // Sort strings using localeCompare if both are strings
  return typeof aValue === 'string' && typeof bValue === 'string'
    ? aValue.localeCompare(bValue)
    : aValue - bValue
})
