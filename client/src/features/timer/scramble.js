/** Genera un scramble aleatorio evitando repeticiones del mismo eje. */
const FACES = ['R', 'L', 'U', 'D', 'F', 'B'];
const MODS = ['', "'", '2'];
const AXIS = { R: 'x', L: 'x', U: 'y', D: 'y', F: 'z', B: 'z' };

export function generateScramble(length = 20) {
  const out = [];
  let lastAxis = '';
  while (out.length < length) {
    const face = FACES[Math.floor(Math.random() * FACES.length)];
    if (AXIS[face] === lastAxis) continue;
    lastAxis = AXIS[face];
    out.push(face + MODS[Math.floor(Math.random() * MODS.length)]);
  }
  return out.join(' ');
}
