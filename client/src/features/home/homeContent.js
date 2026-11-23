import { faDiagramProject, faStopwatch, faUsers } from '@fortawesome/free-solid-svg-icons';

/**
 * Contenido de la página de inicio como datos.
 * Cada cara es un color (toda la cara) o un arreglo con un color por pegatina.
 */
export const CUBES = Object.freeze([
  {
    id: '2x2',
    grid: 2,
    title: '2x2',
    description:
      'El cubo 2x2 es perfecto para principiantes. Aunque parece simple, requiere estrategias únicas para resolverlo.',
    faces: {
      front: ['red', 'blue', 'green', 'yellow'],
      back: ['blue', 'green', 'yellow', 'red'],
      top: ['white', 'orange', 'white', 'orange'],
      bottom: ['orange', 'white', 'orange', 'white'],
      left: ['green', 'yellow', 'red', 'blue'],
      right: ['yellow', 'red', 'blue', 'green'],
    },
  },
  {
    id: '3x3',
    grid: 3,
    title: '3x3',
    description:
      'El clásico cubo de Rubik 3x3, el rompecabezas más famoso del mundo. Perfecto para todos los niveles.',
    faces: { front: 'red', back: 'orange', top: 'white', bottom: 'yellow', left: 'green', right: 'blue' },
  },
  {
    id: '4x4',
    grid: 4,
    title: '4x4',
    description:
      'Para los que buscan un desafío mayor. El cubo 4x4 introduce nuevas complejidades con sus centros y aristas.',
    faces: { front: 'yellow', back: 'white', top: 'red', bottom: 'orange', left: 'blue', right: 'green' },
  },
]);

export const FEATURES = Object.freeze([
  {
    id: 'accesible',
    icon: faUsers,
    title: 'Accesible a todo público',
    description:
      'Nuestros recursos y tutoriales están diseñados para ser comprendidos por personas de todas las edades y niveles.',
  },
  {
    id: 'algoritmos',
    icon: faDiagramProject,
    title: 'Algoritmos avanzados',
    description:
      'Aprende métodos de resolución eficientes con algoritmos probados por campeones mundiales.',
  },
  {
    id: 'tiempos',
    icon: faStopwatch,
    title: 'Registro de tiempos',
    description:
      'Registra y compara tus tiempos de resolución para mejorar y competir con otros cubers.',
  },
]);
