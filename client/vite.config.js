import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // Permite importar con "@/components/..." en lugar de rutas relativas largas
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    port: 5173,
    strictPort: true, // si el puerto está ocupado falla, así CLIENT_ORIGIN siempre coincide
    proxy: {
      // El navegador llama a /api en 5173 y Vite lo reenvía al backend (3000).
      // Para el navegador todo es el mismo origen: sin CORS y las cookies funcionan.
      '/api': { target: 'http://localhost:3000', changeOrigin: true },
    },
  },
});
