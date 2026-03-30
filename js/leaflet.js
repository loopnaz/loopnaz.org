/**
 * @file Leaflet map setup with accessible tile switcher
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 * @since 2.0.0
 * @see {@link https://leafletjs.com/reference-2.0.0.html Leaflet Documentation}
 */

// Import Leaflet
import L, {
  Map,
  TileLayer,
  LatLngBounds,
  LayerGroup,
  Control,
  DomEvent,
  DomUtil,
  Marker,
  Icon,
  GeoJSON
} from 'https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.js'

// Import local GeoJSON data
import data from '/_data/geojson/location.json' with {type: 'json'}

/**
 * Data
 */

/** @type {number[]} Coordinates for the location */
var [lng, lat] = data.geometry.coordinates

/** @type {number[]} Cooridinates for the map bounds */
var bounds = [
  // southwest corner: south of Vermilion, west to Putnam
  [40.0, -89.0],
  // northeast corner: north of Kenosha, east to eastern edge of Central Time in NW Indiana
  [42.7, -86.0]
]

// Original tight bounds as arrays
var bounds = [
  [40.0, -89.0], // southwest
  [43.1, -86.0]  // northeast
]

/** @type {string} Content language */
var lang = document.documentElement.lang.split('-')[0]

/**
 * Base layers
 */

/** @type {TileLayer} Street map tiles from CARTO */
var baseStreet = new TileLayer(
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd'
  }
)

/** @type {TileLayer} Satellite image tiles */
var satelliteImagery = new TileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/' +
  'World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: '&copy; Esri, Maxar, Earthstar Geographics'
  }
)

/** @type {TileLayer} Map labels from CARTO Positron (for consistency) */
var positronLabels = new TileLayer(
  'https://{s}.basemaps.cartocdn.com/light_only_labels/' +
  '{z}/{x}/{y}{r}.png',
  {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd'
  }
)

/** @type {LayerGroup} Tile layer group placeholder */
var baseSatellite

var baseSatellite = new LayerGroup([satelliteImagery, positronLabels])

/**
 * Initialize map
 */

/** @type {Map} Map placeholder */
var map = new Map('map', {
  center: [lat, lng],
  zoom: 15,
  minZoom: 8,
  maxZoom: 18,
  /* @see {@link https://leafletjs.com/reference-2.0.0.html#bounds} */
  maxBounds: bounds,
  maxBoundsViscosity: 1,
  layers: [baseStreet]
})

/**
 * Tile switcher control
 * @see {@link https://leafletjs.com/reference-2.0.0.html#map-methods-for-layers-and-controls Leaflet Layer and controls}
 * @see {@link https://leafletjs.com/reference-2.0.0.html#control Control}
 */

var TileSwitcher = Control.extend({
  options: {position: 'topright'},

  onAdd(mapInstance) {
    /** @type {string} Active layer */
    var activeKey = 'street'

    /** @type {object} Localized labels for tile layers*/
    var tileLabels = {
      en: {
        street: 'Street Map',
        satellite: 'Satellite Map'
      },
      es: {
        street: 'Mapa Claro',
        satellite: 'Mapa Satélite'
      }
    }

    // Fallback to English if current language not defined
    var {
      street: streetLabel,
      satellite: satelliteLabel
    } = tileLabels[lang] || tileLabels.en

    /** @type {Object[]} Layer config */
    var layers = [
      {
        key: 'street',
        name: '🗺️',
        label: streetLabel,
        layer: baseStreet
      },
      {
        key: 'satellite',
        name: '🏙️',
        label: satelliteLabel,
        layer: baseSatellite
      }
    ]

    /** @type {HTMLElement[]} Buttons */
    var buttons = []

    /** @type {DomUtil} Create tile switcher element */
    var switcher = new DomUtil.create(
      'div',
      'leaflet-control tile-switcher'
    )

    /**
     * Helper functions
     */

    /**
     * Set the active tile layer
     * @callback
     * @param {string} key Matches property in button dataset
     * @returns {void}
     */
    var setActive = key => {
      buttons.forEach(button => {
        var isActive = button.dataset.key === key

        button.classList.toggle('active', isActive)
        button.setAttribute('aria-checked', isActive)
        button.tabIndex = isActive ? 0 : -1
      })
    }

    /**
     * Switch base layer
     * @callback
     * @param {string} layer Matches property in button dataset
     * @param {string} key Matches property in button dataset
     * @returns {void}
     */
    var switchBase = (layer, key) => {
      if (key === activeKey) return

      var current = layers.find(
        item => item.key === activeKey
      )?.layer

      current && mapInstance.removeLayer(current)

      layer.addTo(mapInstance)

      activeKey = key
      setActive(key)
    }

    /**
     * Handle keyboard navigation
     * @callback
     * @param {Event} event The keydown event
     * @param {number} index For the target element
     * @returns {void}
     */
    var handleKeydown = (event, index) => {
      var lastIndex = buttons.length - 1

      var nextIndex =
        event.key === 'ArrowRight' || event.key === 'ArrowDown'
          ? (index + 1) % buttons.length
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? (index - 1 + buttons.length) % buttons.length
        : event.key === 'Home'
          ? 0
        : event.key === 'End'
          ? lastIndex
        : null

      if (nextIndex !== null) {
        event.preventDefault()
        buttons[nextIndex].focus()
      }

      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        buttons[index].click()
      }
    }

    /**
     * Define UI
     */

    // Set attributes and styles for switcher
    switcher.setAttribute('role', 'radiogroup')
    switcher.setAttribute('aria-label', 'Map style')

    switcher.style.background = 'white'
    switcher.style.boxShadow = '0 1px 4px rgba(0,0,0,0.65)'

    // Prevent map events when clicking the switcher
    DomEvent.disableClickPropagation(switcher)

    // Add buttons for each tile layer
    layers.forEach((item, index) => {
      var button = document.createElement('button')

      button.type = 'button'
      button.textContent = item.name
      button.dataset.key = item.key

      button.setAttribute('role', 'radio')
      button.setAttribute('aria-checked', 'false')
      button.setAttribute('aria-label', item.label)
      button.title = item.label

      button.style.display = 'flex'
      button.style.margin = '0 0'

      DomEvent.on(button, 'click', () =>
        switchBase(item.layer, item.key)
      )

      DomEvent.on(button, 'keydown', event =>
        handleKeydown(event, index)
      )

      buttons.push(button)
      switcher.appendChild(button)
    })

    setActive(activeKey)

    return switcher
  }
})

map.addControl(new TileSwitcher())

/**
 * Marker
 * @see {@link https://leafletjs.com/reference-2.0.0.html#marker Leaflet Docs}
 */

/** @type {Icon} SVG icon placeholder */
var svgIcon = new Icon({
  iconUrl: `/img/${lang}/icon.svg`,
  iconSize: [60, 60],
  iconAnchor: [30, 60],
  popupAnchor: [0, -60]
})

/** @type {GeoJSON} Maker and popup for the physical location */
var point = new GeoJSON(data, {
  pointToLayer: (feature, latlng) =>
    new Marker(latlng, {icon: svgIcon}),

  onEachFeature: (feature, layer) =>
    layer.bindPopup(popupHtml(feature, lang), {
      maxWidth: 400
    })
}).addTo(map)

/**
 * Popup
 * @see {@link https://leafletjs.com/reference-2.0.0.html#popup Leaflet Docs}
 */

/**
 * Define HTML for a popup when the marker is clicked
 * @param {object} feature GeoJSON feature
 * @param {string} lang[=en] Language code (defaults to English)
 * @returns {string} HTML
 */
function popupHtml(feature, lang = 'en') {
  /** @type {object} Destructure feature properities */
  var {
    properties: {
      [lang]: {name = ''} = {},
      address: {
        street = '',
        city = '',
        state: {abbr: stateAbbr = ''} = {},
        postalCode: postal = ''
      } = {},
      phone: {
        tel: phoneRaw = '',
        formatted: phoneFormatted = ''
      } = {}
    } = {}
  } = feature ?? {}

  /** @type {string} Markup for postal address */
  var postalAddress = `<!--postalAddress()-->
    <div class="flex gap">
      📌 <span>${street}<br/>
        ${city}${stateAbbr ? `, ${stateAbbr}` : ''} ${postal ? ` ${postal}` : ''}</span>
    </div>`

  /** @type {string} Markup for phone number */
  var phoneNumber = `<!--phoneNumber()-->
    <div class="flex gap">
      📞 <a href="tel:${phoneRaw}">${phoneFormatted}</a>
    </div>`

  return `<!--popupHtml()-->
    <div class="popup-content">
      <h3>${name}</h3>
      <address class="flex flex-column small-gap">
        ${postalAddress || ''}
        ${phoneNumber || ''}
      </address>
    </div>`
}

/**
 * City boundary
 */

/** @type {GeoJSON} MultiPolygon for the city boundary */
var cityBoundary = new GeoJSON(
  /*
   * @see {@link https://data.cityofchicago.org/Facilities-Geographic-Boundaries/Boundaries-City-Map/ewy2-6yfk Chicago Data Portal}
   */
  await fetch('/_data/geojson/city.json').then(response => response.json()),
  {
    style: () => ({
      color: 'var(--accent-color, red)',
      /* Stroke thickness in px */
      weight: 1.5,
      fill: false
    })
  }
).addTo(map)
