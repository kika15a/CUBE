/**
 * Validación del lado del cliente: da respuesta inmediata al usuario.
 * ¡No sustituye al servidor! Estas reglas replican las de server/src/validators
 * y el backend siempre vuelve a validar (nunca se confía en el cliente).
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const APODO_RE = /^[a-zA-Z0-9_-]+$/;

function validateEmail(value) {
  const email = value.trim();
  if (!email) return 'El correo es obligatorio';
  if (email.length > 254 || !EMAIL_RE.test(email)) return 'Correo electrónico inválido';
  return null;
}

function validateApodo(value) {
  const apodo = value.trim();
  if (apodo.length < 2) return 'El apodo debe tener al menos 2 caracteres';
  if (apodo.length > 20) return 'El apodo no puede exceder 20 caracteres';
  if (!APODO_RE.test(apodo)) return 'Solo letras, números, guiones y guiones bajos';
  return null;
}

function validateNewPassword(value) {
  if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
  if (value.length > 72) return 'La contraseña no puede exceder 72 caracteres';
  if (!/[A-Za-z]/.test(value)) return 'La contraseña debe incluir al menos una letra';
  if (!/\d/.test(value)) return 'La contraseña debe incluir al menos un número';
  return null;
}

const compact = (errors) => Object.fromEntries(Object.entries(errors).filter(([, msg]) => msg));

export function validateLogin({ email, password }) {
  return compact({
    email: validateEmail(email),
    password: password ? null : 'La contraseña es obligatoria',
  });
}

export function validateRegister({ nombre, apodo, email, password, confirmPassword, terms }) {
  const name = nombre.trim();
  return compact({
    nombre:
      name.length < 2
        ? 'El nombre debe tener al menos 2 caracteres'
        : name.length > 60
          ? 'El nombre es demasiado largo'
          : null,
    apodo: validateApodo(apodo),
    email: validateEmail(email),
    password: validateNewPassword(password),
    confirmPassword: confirmPassword === password ? null : 'Las contraseñas no coinciden',
    terms: terms ? null : 'Debes aceptar los términos para continuar',
  });
}
