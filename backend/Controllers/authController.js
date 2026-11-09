import * as authService from '../Services/authService.js';

export async function postLogin(req, res) {
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

export async function getPerfil(req, res) {
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