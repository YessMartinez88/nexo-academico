<<<<<<< HEAD
const authService = require('../Services/authService');
=======
const authService = require('../Services/authService.js');
>>>>>>> 1a9068429304fe5b057b6a1d7d9de54d6bbf2400

async function postLogin(req, res) {
  try {
    const { email, password } = req.body;
<<<<<<< HEAD
    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y contraseña requeridos' });
    }

    const data = await authService.login(email, password);
    return res.json(data);
  } catch (error) {
    return res.status(401).json({ mensaje: error.message });
=======

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
>>>>>>> 1a9068429304fe5b057b6a1d7d9de54d6bbf2400
  }
}

async function getPerfil(req, res) {
  try {
<<<<<<< HEAD
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

module.exports = {
  postLogin,
  getPerfil,
};
=======
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

module.exports = { postLogin, getPerfil };
>>>>>>> 1a9068429304fe5b057b6a1d7d9de54d6bbf2400
