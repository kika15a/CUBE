import helmet from 'helmet';
import { env } from '../config/env.js';

const CDN = 'https://cdnjs.cloudflare.com'; // Font Awesome (sitio legacy)

/**
 * Cabeceras de seguridad (helmet + CSP estricta).
 * TODO (Fase 2): al migrar a Vue/Vite se eliminan los estilos inline y se quita
 * 'unsafe-inline' de style-src.
 */
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", CDN],
      fontSrc: ["'self'", CDN],
      imgSrc: ["'self'", 'data:'],
      mediaSrc: ["'self'"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: env.isProduction ? [] : null,
    },
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  crossOriginEmbedderPolicy: false, // permite cargar la hoja de Font Awesome del CDN
});

/** Las respuestas de la API nunca deben guardarse en caché (datos de sesión). */
export const noStore = (_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
};
