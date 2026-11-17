<<<<<<< HEAD
const authService = require('../Services/authService.js');

async function postLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y contraseña requeridos' });
    }

    const data = await authService.login(email, password);
    return res.json(data);
  } catch (error) {
    return res.status(401).json({ mensaje: error.message });
  }
}

async function getPerfil(req, res) {
  try {
    const userId = req.headers['x-user-id'] || req.query.id;
    if (!userId) {
      return res.status(400).json({ mensaje: 'Falta identificador de usuario' });
    }

    const perfil = await authService.getPerfil(userId);
    return res.json(perfil);
  } catch (error) {
    return res.status(404).json({ mensaje: error.message });
  }
}

module.exports = { postLogin, getPerfil };
=======
const authRepo = require('../Repositories/authRepository.js');

async function login(email, password) {
  const user = await authRepo.buscarUsuarioPorEmail(email);

  if (!user) {
    return { 
      ok: false, 
      status: 401,
      mensaje: 'Credenciales inválidas' };
  }

  if (!user.activo) {
    return { 
      ok: false, 
      status: 403, 
      mensaje: 'Usuario inactivo. Comuníquese con administración.' };
  }

  // Compara la contraseña cargada en la tabla usuarios
  const isMatch = (user.password_hash === password);
  if (!isMatch) {
    return { 
      ok: false,
      status: 401, 
      mensaje: 'Credenciales inválidas' };
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
    return { 
      ok: false, 
      status: 404, 
      mensaje: 'Usuario no encontrado' };
  }
  return {
  ok: true,
  status: 200,
  data: {
    id: user.id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    rol: user.rol,
    activo: user.activo
  }
};
}

module.exports = { login, getPerfil };
>>>>>>> 1a9068429304fe5b057b6a1d7d9de54d6bbf2400
