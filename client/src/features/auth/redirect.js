/**
 * Evita "open redirect": solo se permiten rutas internas de la propia app.
 * Rechaza cosas como "//sitio-malo.com" o "https://sitio-malo.com".
 */
export function safeRedirect(target, fallback = '/') {
  return typeof target === 'string' && target.startsWith('/') && !target.startsWith('//')
    ? target
    : fallback;
}
