/**
 * @file Defines a module to find a data value based on an object key
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 */

/**
 * Find object values for certain content based on a specified property key
 * @param {item} A piece of content
 * @param {string} key Name of an object key
 * @param {function} [dataAccessor=item => item.data] Top-level object from which the key will be accessed (defaults to `item.data`)
 * @returns {*} Value for the specified key
 */
export default (item, key, dataAccessor = item => item.data) => {
  var root = dataAccessor(item)
  return key.includes('.')
    // If the key parameter is nested, chain each level to the default object
    ? key.split('.').reduce((obj, k) => (obj ? obj[k] : undefined), root)
    // Otherwise, look among the first children of the default object
    : root[key]
}
