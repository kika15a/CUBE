/**
 * Formatea milisegundos al estilo speedcubing: "SS.CC" o "MM:SS.CC".
 * Ejemplos: 12345 → "12.34"; 83450 → "01:23.45".
 */
export function formatTime(ms) {
  if (!Number.isFinite(ms) || ms < 0) return '0.00';
  const totalCs = Math.floor(ms / 10);
  const cs = totalCs % 100;
  const totalSec = Math.floor(totalCs / 100);
  const sec = totalSec % 60;
  const min = Math.floor(totalSec / 60);
  const pad = (n) => String(n).padStart(2, '0');
  return min > 0 ? `${pad(min)}:${pad(sec)}.${pad(cs)}` : `${pad(sec)}.${pad(cs)}`;
}
