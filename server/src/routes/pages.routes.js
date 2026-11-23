import express, { Router } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const legacyRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../client/legacy');
const viewsDir = path.join(legacyRoot, 'views');

const PAGES = {
  '/': 'index.html',
  '/index.html': 'index.html',
  '/tiempos.html': 'tiempos.html',
  '/tutoriales.html': 'tutoriales.html',
  '/login.html': 'login.html',
  '/register.html': 'register.html',
  '/404.html': '404.html',
};

/**
 * Sirve el sitio actual (HTML/CSS/JS) mientras se migra a Vue.
 * En la Fase 2 este router se reemplaza por el build de Vite (client/dist).
 */
export function createPagesRouter() {
  const router = Router();

  router.use(express.static(path.join(legacyRoot, 'public'), { index: false, maxAge: '1h' }));

  for (const [route, file] of Object.entries(PAGES)) {
    router.get(route, (_req, res) => res.sendFile(path.join(viewsDir, file)));
  }

  router.use((_req, res) => res.status(404).sendFile(path.join(viewsDir, '404.html')));
  return router;
}
