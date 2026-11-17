const authRepo = require('../Repositories/authRepository.js');

async function login(email, password) {
  const user = await authRepo.buscarUsuarioPorEmail(email);

  if (!user) {
    return { ok: false, status: 401, mensaje: 'Credenciales inválidas' };
  }

  if (!user.activo) {
    return { ok: false, status: 403, mensaje: 'Usuario inactivo. Comuníquese con administración.' };
  }

  // Compara la contraseña cargada en la tabla usuarios
  const isMatch = (user.password_hash === password);
  if (!isMatch) {
    return { ok: false, status: 401, mensaje: 'Credenciales inválidas' };
  }

  // Objeto con los datos que retornamos al frontend (sin la contraseña)
  return {
    ok: true,
    status: 200,
    data: {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      rol: user.rol,
      token: `token-nexo-${user.id}-${Date.now()}`
    }
  };
}

async function getPerfil(userId) {
  const user = await authRepo.buscarUsuarioPorId(userId);
  if (!user) {
    return { ok: false, status: 404, mensaje: 'Usuario no encontrado' };
  }
  return user;
}

module.exports = { login, getPerfil };