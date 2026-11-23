import bcrypt from 'bcryptjs';
import { AuthenticationError } from '../errors/AppError.js';
import { User } from '../models/User.js';

/**
 * Lógica de negocio de autenticación. No sabe nada de HTTP (req/res) ni de
 * cómo se almacenan los datos: depende de un repositorio inyectado (DIP).
 */
export class AuthService {
  #users;
  #rounds;
  #dummyHash;

  /**
   * @param {{ userRepository: import('../repositories/UserRepository.js').UserRepository, bcryptRounds: number }} deps
   */
  constructor({ userRepository, bcryptRounds }) {
    this.#users = userRepository;
    this.#rounds = bcryptRounds;
    // Hash señuelo para igualar tiempos cuando el usuario no existe
    // (mitiga enumeración de usuarios por temporización).
    this.#dummyHash = bcrypt.hashSync('timing-attack-decoy', bcryptRounds);
  }

  /** @returns {Promise<User>} */
  async register({ nombre, email, password }) {
    const passwordHash = await bcrypt.hash(password, this.#rounds);
    const user = User.create({ nombre, email, passwordHash });
    return this.#users.create(user); // lanza ConflictError si el email existe
  }

  /** @returns {Promise<User>} */
  async authenticate({ email, password }) {
    const user = await this.#users.findByEmail(email);
    const valid = await bcrypt.compare(password, user ? user.passwordHash : this.#dummyHash);
    if (!user || !valid) {
      // Mismo mensaje en ambos casos: no revela si el correo existe.
      throw new AuthenticationError();
    }
    return user;
  }

  /** @returns {Promise<User|null>} */
  getById(id) {
    return this.#users.findById(id);
  }
}
