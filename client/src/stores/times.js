import { ref } from 'vue';
import { defineStore } from 'pinia';
import { fetchTimes, createTime, deleteTime } from '@/api/times';
import { getErrorMessage } from '@/api/http';

/**
 * Estado de los tiempos del usuario autenticado.
 * La fuente de la verdad es el servidor; aquí solo cacheamos lo visible.
 */
export const useTimesStore = defineStore('times', () => {
  const items = ref([]);
  const loading = ref(false);
  const error = ref('');

  async function load() {
    loading.value = true;
    error.value = '';
    try {
      items.value = await fetchTimes();
    } catch (err) {
      error.value = getErrorMessage(err);
    } finally {
      loading.value = false;
    }
  }

  async function save({ ms, scramble }) {
    const time = await createTime({ ms, scramble });
    items.value = [time, ...items.value]; // más reciente arriba
    return time;
  }

  async function remove(id) {
    await deleteTime(id);
    items.value = items.value.filter((t) => t.id !== id);
  }

  function reset() {
    items.value = [];
    error.value = '';
  }

  return { items, loading, error, load, save, remove, reset };
});
