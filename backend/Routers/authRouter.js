const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

router.post('/login', authController.login);
router.get('/perfil', authController.perfil);

module.exports = router;