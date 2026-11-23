import { randomUUID } from 'node:crypto';

export const Role = Object.freeze({ USER: 'usuario', ADMIN: 'admin' });

/**
 * Entidad de dominio User.
 * - Encapsulamiento: el hash de contraseña es un campo privado (#passwordHash)
 *   y NUNCA sale en toJSON()/toPublic() (Confidencialidad por diseño).
 */
export class User {
  #passwordHash;

  constructor({ id, nombre, email, passwordHash, rol = Role.USER, createdAt = new Date().toISOString() }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.rol = rol;
    this.createdAt = createdAt;
    this.#passwordHash = passwordHash;
  }

  /** Fábrica para usuarios nuevos: genera un id no predecible (UUID v4). */
  static create({ nombre, email, passwordHash }) {
    return new User({ id: randomUUID(), nombre, email, passwordHash, rol: Role.USER });
  }

  /** Reconstruye una entidad desde un registro persistido. */
  static fromRecord(record) {
    return new User(record);
  }

  get passwordHash() {
    return this.#passwordHash;
  }

  /** Representación para persistencia (incluye el hash). */
  toRecord() {
    return {
      id: this.id,
      nombre: this.nombre,
      email: this.email,
      rol: this.rol,
      createdAt: this.createdAt,
      passwordHash: this.#passwordHash,
    };
  }

  /** Representación segura para enviar al cliente o guardar en sesión. */
  toPublic() {
    return { id: this.id, nombre: this.nombre, email: this.email, rol: this.rol };
  }

  toJSON() {
    return this.toPublic();
  }
}
