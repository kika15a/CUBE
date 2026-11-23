import { faGraduationCap, faHouse, faStopwatch } from '@fortawesome/free-solid-svg-icons';

/**
 * Enlaces fijos del navbar (los de sesión los decide AppNavbar según el usuario) definidos como DATOS (no repetidos en la plantilla).
 * Agregar una página al menú = agregar un objeto aquí.
 * `to` usa el nombre de la ruta, así un cambio de URL no rompe los enlaces.
 */
export const NAV_ITEMS = Object.freeze([
  { label: 'Inicio', to: { name: 'home' }, icon: faHouse },
  { label: 'Tiempos', to: { name: 'tiempos' }, icon: faStopwatch },
  { label: 'Tutoriales', to: { name: 'tutoriales' }, icon: faGraduationCap },
]);
