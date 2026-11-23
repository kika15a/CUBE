import { randomUUID } from 'node:crypto';

/**
 * Entidad de dominio Time (un tiempo de resolución).
 * Pertenece a un usuario; el userId es la clave que el servicio usa
 * para garantizar que nadie vea ni borre tiempos ajenos.
 */
export class Time {
  constructor({ id, userId, ms, scramble = null, createdAt = new Date().toISOString() }) {
    this.id = id;
    this.userId = userId;
    this.ms = ms;
    this.scramble = scramble;
    this.createdAt = createdAt;
  }

  static create({ userId, ms, scramble = null }) {
    return new Time({ id: randomUUID(), userId, ms, scramble });
  }

  static fromRecord(record) {
    return new Time(record);
  }

  toRecord() {
    return {
      id: this.id,
      userId: this.userId,
      ms: this.ms,
      scramble: this.scramble,
      createdAt: this.createdAt,
    };
  }

  /** Representación para el cliente: sin userId (el cliente ya sabe quién es). */
  toPublic() {
    return {
      id: this.id,
      ms: this.ms,
      scramble: this.scramble,
      createdAt: this.createdAt,
    };
  }
}