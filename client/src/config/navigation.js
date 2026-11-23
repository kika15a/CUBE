import { faGraduationCap, faHouse, faRightToBracket, faStopwatch } from '@fortawesome/free-solid-svg-icons';

/**
 * Enlaces del navbar definidos como DATOS (no repetidos en la plantilla).
 * Agregar una página al menú = agregar un objeto aquí.
 * `to` usa el nombre de la ruta, así un cambio de URL no rompe los enlaces.
 */
export const NAV_ITEMS = Object.freeze([
  { label: 'Inicio', to: { name: 'home' }, icon: faHouse },
  { label: 'Tiempos', to: { name: 'tiempos' }, icon: faStopwatch },
  { label: 'Tutoriales', to: { name: 'tutoriales' }, icon: faGraduationCap },
  // En la fase 2.3 este enlace cambiará según el estado de sesión (Pinia).
  { label: 'Inicia sesión', to: { name: 'login' }, icon: faRightToBracket },
]);
