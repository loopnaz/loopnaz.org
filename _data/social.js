/**
 * @file Global data for social media accounts
 * @author Reuben L. Lillie <rlilie@loopnaz.org>
 */

// Import local module
import pkg from './../package.json' with {type: 'json'}

/**
 * Social media global data
 *
 * @module _data/social
 * @see {@link https://www.11ty.dev/docs/data-global/ Global data files in Eleventy}
 */
export default [
  {
    name: 'Facebook',
    icon: 'facebook',
    url: 'https://facebook.com/loopnaz/'
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    url: 'https://instagram.com/loopnaz/'
  },
  {
    name: 'Messenger',
    icon: 'messenger',
    url: 'https://m.me/loopnaz/'
  },
  {
    name: 'Git',
    icon: 'git',
    url: `${pkg.repository.home}`
  }
]
