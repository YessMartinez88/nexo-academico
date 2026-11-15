import { Router } from 'express';

import { obtenerAsistenciasPorAlumno } from '../Controllers/asistencias.controllers.js';

const router = Router();

router.get('/asistencias/alumno/:id', obtenerAsistenciasPorAlumno);

export default router;