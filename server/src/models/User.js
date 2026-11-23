import { randomUUID } from 'node:crypto';

export const Role = Object.freeze({ USER: 'usuario', ADMIN: 'admin' });

/**
 * Entidad de dominio User.
 * - Encapsulamiento: el hash de contraseña es un campo privado (#passwordHash)
 *   y NUNCA sale en toJSON()/toPublic() (Confidencialidad por diseño).
 * - `apodo` es único (ver UserRepository) y sirve como alias público del usuario.
 */
export class User {
  #passwordHash;

  constructor({
    id,
    nombre,
    apodo = null,
    email,
    passwordHash,
    rol = Role.USER,
    createdAt = new Date().toISOString(),
  }) {
    this.id = id;
    this.nombre = nombre;
    this.apodo = apodo;
    this.email = email;
    this.rol = rol;
    this.createdAt = createdAt;
    this.#passwordHash = passwordHash;
  }

  static create({ nombre, apodo, email, passwordHash }) {
    return new User({ id: randomUUID(), nombre, apodo, email, passwordHash, rol: Role.USER });
  }

  static fromRecord(record) {
    return new User(record);
  }

  get passwordHash() {
    return this.#passwordHash;
  }

  toRecord() {
    return {
      id: this.id,
      nombre: this.nombre,
      apodo: this.apodo,
      email: this.email,
      rol: this.rol,
      createdAt: this.createdAt,
      passwordHash: this.#passwordHash,
    };
  }

  /** Representación segura para enviar al cliente o guardar en sesión. */
  toPublic() {
    return {
      id: this.id,
      nombre: this.nombre,
      apodo: this.apodo,
      email: this.email,
      rol: this.rol,
    };
  }

  toJSON() {
    return this.toPublic();
  }
}
