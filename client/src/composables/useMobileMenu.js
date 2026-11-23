import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

/**
 * Lógica del menú móvil, separada de la plantilla para poder reutilizarla:
 *  - se cierra al navegar a otra página
 *  - se cierra con la tecla Escape
 */
export function useMobileMenu() {
  const isOpen = ref(false);
  const route = useRoute();

  const close = () => {
    isOpen.value = false;
  };
  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  const onKeydown = (event) => {
    if (event.key === 'Escape') close();
  };

  watch(() => route.fullPath, close);
  onMounted(() => document.addEventListener('keydown', onKeydown));
  onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));

  return { isOpen, toggle, close };
}
