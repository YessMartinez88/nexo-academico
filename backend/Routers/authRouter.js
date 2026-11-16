const { Router } = require('express');
const { postLogin, getPerfil } = require('../Controllers/authController');

const router = Router();

router.post('/login', postLogin);
router.get('/perfil', getPerfil);

module.exports = router;





