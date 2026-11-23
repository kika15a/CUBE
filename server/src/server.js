import { env } from './config/env.js';
import { createApp } from './app.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`✔ CubeCenter (${env.NODE_ENV}) → http://localhost:${env.PORT}`);
});

// Apagado ordenado: termina las peticiones en curso antes de salir (Disponibilidad).
function shutdown(signal) {
  console.log(`\n${signal} recibido, cerrando servidor...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
