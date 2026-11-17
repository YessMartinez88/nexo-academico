const { Router } = require('express');
<<<<<<< HEAD
const { postLogin, getPerfil } = require('../Controllers/authController');
=======
const { postLogin, getPerfil } = require('../Controllers/authController.js');
>>>>>>> 1a9068429304fe5b057b6a1d7d9de54d6bbf2400

const router = Router();

router.post('/login', postLogin);
router.get('/perfil', getPerfil);

module.exports = router;