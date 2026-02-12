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

  // El/la propietario/a del sitio (utilizada en el aviso de derechos de autor)
  siteOwner: 'Iglesia del Nazarene en el Loop',
  // El nombre del sitio
  siteName: 'Iglesia del Nazareno en el Loop',
  // La lema del sitio
  tagline: 'Sirvamos al corazón de Chicago',
  // Logo description used in SVG `<title>` tags and image `alt` attributes
  logoAlt: 'Estrella de Chicago blasonada con una paloma en llamas que posada sobre una Biblia abierta',

  /* Interfaz de usuario */

  // Texto del lector de pantalla
  screenReader: {
    goToHomePage: 'Ir a la página principal',
    // Usado en <header> de las páginas
    skipToMain: 'Saltar al contenido principal',
    // Language switcher
    selectLanguage: 'Elige otro idioma',
    // Navegación principal
    primaryNav: 'Navegación principal',
    // Navegación en <footer> de las páginas
    footerNav: 'Navegación del pie de página',
    // Navegación legal
    legalNav: 'Navegación legal'
  },

  // Encabezados de seccion en la navegación del pie de página
  footer_1: 'Únete a nosostros',
  footer_2: 'Descubre',
  footer_3: 'Involúcrese',
  footer_4: 'Aprende más',

  // Cadenas de texto para el formulario de contacto
  contact: {
    // Etiquetas de formulario
    labels: {
      // Campo de entrada oculto para atrapar a los bots de spam
      honeyPot: 'Omita esta entrada si es un humano',
      // Campo de nombre
      name: 'Nombre',
      // Campo de correo electrónico
      email: 'Correo electrónico',
      // Campo de mensaje
      message: 'Mensaje',
      // Botón de enviar
      sendButton: 'Enviar'
    }
  }
}
