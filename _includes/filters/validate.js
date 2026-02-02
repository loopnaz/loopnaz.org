/**
 * @file Defines a module to format hyphenated text camel case
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 */

/**
 * Checks an item against specified types and throws an error if invalid
 * @param {*} item The item to validate
 * @param {string|Array<string>} types One or more expected types for the item
 * @param {Array<string>} types An array of expected types for the item (e.g., ['string', 'number'])
 * @param {string} [errMessage] Optional custom error message for invalid items
 * @throws {Error} If the item does not match any of the specified types or is empty (for strings)
 * @returns {*} The validated item if it's valid
 */
export default (item, types, errMessage) => {
  // Convert a single string type to an array
  var typesArray = Array.isArray(types) ? types : [types];

  // Check for non-empty string, valid number, or match type
  var isValid = typesArray.some(type => (type === 'string' && typeof item === 'string' && item.trim() !== '') ||
    (type === 'number' && typeof item === 'number' && !isNaN(item)) ||
    (typeof item === type)
  )

  if (!isValid) {
    throw new Error(errMessage || `"${item}" must be one of the valid types: ${typesArray.join(', ')}.`)
  }
  // If the item is valid
  return item
}
