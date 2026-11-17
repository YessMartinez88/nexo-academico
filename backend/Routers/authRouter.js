const { Router } = require('express');
const { postLogin, getPerfil } = require('../Controllers/authController.js');

router.post('/login', authController.login);
router.get('/perfil', authController.perfil);

router.post('/login', postLogin);
router.get('/perfil', getPerfil);

module.exports = router;