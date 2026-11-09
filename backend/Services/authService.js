import * as authRepo from '../Repositories/authRepository.js';

export async function login(email, password) {
  const user = await authRepo.buscarUsuarioPorEmail(email);

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  if (!user.activo) {
    throw new Error('Usuario inactivo. Comuníquese con administración.');
  }

  // Compara la contraseña cargada en la tabla usuarios
  const isMatch = (user.password_hash === password);
  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }

  // Objeto con los datos que retornamos al frontend (sin la contraseña)
  return {
    id: user.id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    rol: user.rol,
    token: `token-nexo-${user.id}-${Date.now()}`
  };
}

export async function getPerfil(userId) {
  const user = await authRepo.buscarUsuarioPorId(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
}