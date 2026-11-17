const authService = require('../Services/authService');

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Debe ingresar email y contraseña' });
    }

    const resultado = await authService.login(email, password);

    if (!resultado.ok) {
      return res.status(resultado.status).json({ mensaje: resultado.mensaje });
    }

    return res.status(resultado.status).json(resultado.data);
  } catch (error) {
    //console.error('Error en login:', error);
    console.error('[authController] Error en login:', error);
    return res.status(500).json({ mensaje: 'Error interno al iniciar sesión' });
  }
}

async function perfil(req, res) {
  try {
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(401).json({ mensaje: 'No autenticado' });
    }

    const resultado = await authService.getPerfil(userId);

    if (!resultado.ok) {
      return res.status(resultado.status).json({ mensaje: resultado.mensaje });
    }

    return res.status(resultado.status).json(resultado.data);
  } catch (error) {
    //console.error('Error en perfil:', error);
    console.error('[authController] Error en perfil:', error);
    return res.status(500).json({ mensaje: 'Error interno al obtener perfil' });
  }
}

module.exports = {
  login,
  perfil
};