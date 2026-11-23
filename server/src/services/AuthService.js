import bcrypt from 'bcryptjs';
import { AuthenticationError } from '../errors/AppError.js';
import { User } from '../models/User.js';

/**
 * Lógica de negocio de autenticación. No sabe nada de HTTP ni de
 * cómo se almacenan los datos: depende de un repositorio inyectado (DIP).
 */
export class AuthService {
  #users;
  #rounds;
  #dummyHash;

  
  constructor({ userRepository, bcryptRounds }) {
    this.#users = userRepository;
    this.#rounds = bcryptRounds;
    // Hash señuelo para igualar tiempos cuando el usuario no existe
    // (mitiga enumeración por temporización).
    this.#dummyHash = bcrypt.hashSync('timing-attack-decoy', bcryptRounds);
  }

  async register({ nombre, apodo, email, password }) {
    const passwordHash = await bcrypt.hash(password, this.#rounds);
    const user = User.create({ nombre, apodo, email, passwordHash });
    return this.#users.create(user);
  }


  async authenticate({ email, password }) {
    const user = await this.#users.findByEmail(email);
    const valid = await bcrypt.compare(password, user ? user.passwordHash : this.#dummyHash);
    if (!user || !valid) {
       throw new AuthenticationError();
    }
    return user;
  }


  getById(id) {
    return this.#users.findById(id);
  }
}
