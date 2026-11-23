/**
 * Contenido de tutoriales como datos. Añadir uno nuevo = añadir un objeto aquí.
 * Cada tutorial tiene secciones con título y contenido (texto plano por ahora;
 * en la Fase 3 puede evolucionar a Markdown o pasos interactivos).
 */
export const TUTORIALS = Object.freeze([
  {
    id: 'primeros-pasos-3x3',
    title: 'Primeros pasos con el cubo 3x3',
    summary: 'Aprende la notación y la estructura básica del cubo clásico.',
    sections: [
      {
        title: 'Notación básica',
        body: 'R = derecha, L = izquierda, U = arriba, D = abajo, F = frente, B = atrás. Un apóstrofo (R\') indica giro antihorario.',
      },
      {
        title: 'La cruz blanca',
        body: 'Empieza por las aristas blancas. Colócalas en cruz alrededor del centro blanco, alineando cada arista con su centro lateral correspondiente.',
      },
    ],
  },
  {
    id: 'metodo-principiantes',
    title: 'Método para principiantes',
    summary: 'El método por capas que te permite resolver el 3x3 sin memorizar mucho.',
    sections: [
      {
        title: 'Capa 1: cruz + esquinas',
        body: 'Primero la cruz blanca, después las esquinas blancas. Al terminar, la cara blanca está completa y la primera corona también.',
      },
      {
        title: 'Capa 2: aristas',
        body: 'Coloca las cuatro aristas de la capa media. Usa el algoritmo U R U\' R\' U\' F\' U F cuando la arista va hacia la derecha.',
      },
      {
        title: 'Capa 3: orientación y permutación',
        body: 'Aquí aparecen los algoritmos más conocidos (OLL y PLL simplificados). Con práctica, la capa 3 es puro reconocimiento de patrones.',
      },
    ],
  },
  {
    id: 'mejorar-tiempos',
    title: 'Cómo mejorar tus tiempos',
    summary: 'Consejos prácticos más allá de memorizar algoritmos.',
    sections: [
      {
        title: 'Look-ahead',
        body: 'Mientras resuelves una pieza, tus ojos ya deben estar buscando la siguiente. Esto se practica lento: mejor resolver despacio viendo todo que rápido a ciegas.',
      },
      {
        title: 'Registra tus tiempos',
        body: 'Usa el cronómetro de Cube Center. Ver tu progreso semanal es la mejor motivación.',
      },
    ],
  },
]);
