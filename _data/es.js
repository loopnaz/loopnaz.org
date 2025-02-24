/**
 * @file Datos globales para cadenas de texto en español
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 * @since 2.0.0
 * @see {@link https://www.11ty.dev/docs/data-global/ Archivos de datos globales en Eleventy}
 */

/**
 * Definir texto para plantillas de cadenas que aparecen en español
 * @module _data/es
 */
export default {
  // Otros idiomas soportadoes (se llaman en español)
  languages: {
    en: 'Inglés'
  },

  /* Identidad */

  // El nombre del sitio
  siteName: 'Iglesia del Nazareno en el Loop',
  // La lema del sitio
  tagline: 'Sirvamos al corazón de Chicago',

  /* Interfaz de usuario */

  // Texto del lector de pantalla
  screenReader: {
    goToHomePage: 'Ir a la página principal',
    // Usado en <header> de las páginas
    skipToMain: 'Saltar al contenido principal',
    // Language switcher
    selectLanguage: 'Elige otro idioma'
  }
}
