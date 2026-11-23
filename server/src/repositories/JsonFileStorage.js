import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

/**
 * Persistencia en archivo JSON con garantías de Integridad y Disponibilidad:
 *  - Serializa las operaciones (cola) para evitar condiciones de carrera.
 *  - Escritura atómica: escribe a un .tmp y hace rename, así un corte de luz
 *    o un crash nunca deja el archivo a medio escribir (corrupto).
 *
 * Es un reemplazo temporal de una base de datos real (ver roadmap: Fase 4).
 */
export class JsonFileStorage {
  #filePath;
  #queue = Promise.resolve();

  /** @param {string} filePath Ruta absoluta al archivo .json */
  constructor(filePath) {
    this.#filePath = filePath;
  }

  /** Lee todos los registros. Archivo inexistente o vacío => []. */
  async readAll() {
    try {
      const raw = await readFile(this.#filePath, 'utf8');
      return raw.trim() === '' ? [] : JSON.parse(raw);
    } catch (err) {
      if (err.code === 'ENOENT') return [];
      throw err;
    }
  }

  /**
   * Ejecuta `mutator(records)` de forma exclusiva (sin concurrencia) y persiste
   * el resultado de forma atómica. Devuelve lo que retorne `mutator`.
   * @template T
   * @param {(records: any[]) => T | Promise<T>} mutator Puede mutar el arreglo recibido.
   * @returns {Promise<T>}
   */
  transaction(mutator) {
    const run = this.#queue.then(async () => {
      const records = await this.readAll();
      const result = await mutator(records);
      await this.#atomicWrite(records);
      return result;
    });
    // La cola sigue viva aunque una operación falle.
    this.#queue = run.catch(() => {});
    return run;
  }

  async #atomicWrite(records) {
    await mkdir(path.dirname(this.#filePath), { recursive: true });
    const tmp = `${this.#filePath}.${randomUUID()}.tmp`;
    await writeFile(tmp, JSON.stringify(records, null, 2), { encoding: 'utf8', mode: 0o600 });
    await rename(tmp, this.#filePath);
  }
}
