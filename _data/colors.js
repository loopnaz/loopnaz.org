/**
 * @file Global data for the color palette
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 */

/**
 * Define global color data from the {@link https://resources.nazarene.org/index.php/s/z78Bm8z8fiTyyEz Church of the Nazarene Brand Guide}
 *
 * Please avoid colors that are not described here.
 *
 * - `cmyk` for print materials
 * - `hex` for web design
 * - `rgb` for digital materials
 *
 * Colors follow the order in the guide.
 * Shades are arranged from lightest to darkest, with object keys 100–900.
 * One `shade` of each color also has a value of `main`.
 *
 * @module _data/colors
 * @see {@link https://www.11ty.dev/docs/data-global/ Global data files in Eleventy}
 */
export default {
  // Denominational seal colors
  black: {
    900: {
      cmyk: [0, 0, 0, 100],
      hex: '#231f20',
      rgb: [35, 31, 32],
      shade: 'main'
    }
  },
  gold: {
    800: {
      cmyk: [41, 46, 76, 16],
      hex: '#8e774d',
      rgb: [142, 199, 77],
      shade: 'main'
    }
  },
  // Brand colors
  gray: {
    100: {
      cmyk: [0, 0, 0, 14],
      hex: '#dedfe0',
      rgb: [222, 223, 224]
    },
    300: {
      cmyk: [0, 0, 0, 38],
      hex: '#abadb0',
      rgb: [171, 173, 176]
    },
    500: {
      cmyk: [0, 0, 0, 62],
      hex: '#7d7e81',
      rgb: [125, 126, 129]
    },
    700: {
      cmyk: [0, 0, 0, 86],
      hex: '#4a4b4c',
      rgb: [74, 75, 76],
      shade: 'main'
    },
    800: {
      cmyk: [0, 0, 0, 90],
      hex: '#414042',
      rgb: [65, 64, 66]
    }
  },
  purple: {
    100: {
      cmyk: [36, 5, 0, 0],
      hex: '#a688bf',
      rgb: [166, 136, 191]
    },
    300: {
      cmyk: [55, 64, 9, 0],
      hex: '#836aa3',
      rgb: [131, 106, 163]
    },
    500: {
      cmyk: [67, 73, 25, 7],
      hex: '#695683',
      rgb: [105, 86, 131]
    },
    700: {
      cmyk: [73, 79, 33, 18],
      hex: '#57446c',
      rgb: [87, 68, 108]
    },
    900: {
      cmyk: [78, 80, 47, 50],
      hex: '#332940',
      rgb: [51, 41, 64]
    }
  },
  green: {
    100: {
      cmyk: [49, 0, 48, 0],
      hex: '#84cba0',
      rgb: [132, 203, 160]
    },
    300: {
      cmyk: [63, 0, 61, 0],
      hex: '#5dbf8b',
      rgb: [93, 191, 139]
    },
    500: {
      cmyk: [70, 7, 68, 0],
      hex: '#4daf7c',
      rgb: [77, 175, 124]
    },
    700: {
      cmyk: [75, 18, 72, 3],
      hex: '#40996d',
      rgb: [64, 153, 109],
      shade: 'main'
    },
    900: {
      cmyk: [81, 44, 79, 43],
      hex: '#265039',
      rgb: [38, 80, 57]
    }
  },
  blue: {
    100: {
      cmyk: [45, 0, 5, 0],
      hex: '#83d3eb',
      rgb: [131, 211, 235]
    },
    300: {
      cmyk: [63, 7, 13, 0],
      hex: '#50b8d4',
      rgb: [80, 184, 212]
    },
    500: {
      cmyk: [67, 23, 20, 0],
      hex: '#54a0ba',
      rgb: [84, 160, 186]
    },
    700: {
      cmyk: [72, 41, 29, 3],
      hex: '#53819a',
      rgb: [83, 129, 154],
      shade: 'main'
    },
    900: {
      cmyk: [88, 64, 49, 38],
      hex: '#214351',
      rgb: [33, 67, 81]
    }
  },
  red: {
    300: {
      cmyk: [0, 76, 71, 0],
      hex: '#f2644e',
      rgb: [242, 100, 78]
    },
    500: {
      cmyk: [0, 89, 84, 0],
      hex: '#ef4237',
      rgb: [239, 66, 55],
      shade: 'main'
    },
    700: {
      cmyk: [14, 96, 100, 5],
      hex: '#c72d27',
      rgb: [199, 45, 39]
    }
  },
  orange: {
    300: {
      cmyk: [0, 35, 84, 0],
      hex: '#fbb042',
      rgb: [251, 176, 66]
    },
    500: {
      cmyk: [0, 49, 96, 0],
      hex: '#f89626',
      rgb: [248, 150, 38],
      shade: 'main'
    },
    700: {
      cmyk: [0, 64, 100, 0],
      hex: '#f47b20',
      rgb: [244, 123, 32]
    }
  },
  yellow: {
    300: {
      cmyk: [4, 0, 70, 0],
      hex: '#faf06f',
      rgb: [250, 240, 111]
    },
    500: {
      cmyk: [6, 12, 100, 0],
      hex: '#f4d40f',
      rgb: [244, 212, 15],
      shade: 'main'
    },
    700: {
      cmyk: [10, 23, 100, 0],
      hex: '#e8be1f',
      rgb: [232, 190, 31]
    }
  }
}
