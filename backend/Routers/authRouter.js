import { Router } from 'express';
import { postLogin, getPerfil } from '../Controllers/authController.js';

const router = Router();

router.post('/login', postLogin);
router.get('/perfil', getPerfil);

export default router;