import { Router } from 'express';
import { getEstudiantePorId, getEstudiantes } from '../Controllers/estudianteController.js';

const router = Router();

router.get('/', getEstudiantes);  
router.get('/:id', getEstudiantePorId);  

export default router;