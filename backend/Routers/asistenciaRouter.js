import { Router } from 'express';
import { postAsistencia } from '../Controllers/asistenciaController.js';

const router = Router();

router.post('/', postAsistencia); 

export default router;