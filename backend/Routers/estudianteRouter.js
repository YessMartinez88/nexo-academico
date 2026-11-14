import { Router } from 'express';
import { getEstudiantes } from '../Controllers/estudianteController.js';

const router = Router();

router.get('/', getEstudiantes);  

export default router;