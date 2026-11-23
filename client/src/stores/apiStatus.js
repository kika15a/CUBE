import { defineStore } from 'pinia';
import { fetchHealth } from '@/api/health';
import { getErrorMessage } from '@/api/http';

/** Estado de la conexión con la API (verifica que front y back se comunican). */
export const useApiStatusStore = defineStore('apiStatus', {
  state: () => ({
    status: 'idle', // 'idle' | 'loading' | 'online' | 'offline'
    uptime: null,
    error: null,
  }),
  actions: {
    async check() {
      this.status = 'loading';
      this.error = null;
      try {
        const data = await fetchHealth();
        this.uptime = Math.round(data.uptime);
        this.status = 'online';
      } catch (err) {
        this.error = getErrorMessage(err);
        this.status = 'offline';
      }
    },
  },
});
