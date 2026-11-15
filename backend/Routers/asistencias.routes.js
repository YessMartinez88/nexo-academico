import { Router } from 'express';
// Importamos la función desde el controlador (usamos '../' para salir de Routers y entrar a Controllers)
import { obtenerAsistenciasPorAlumno } from '../Controllers/asistencias.controllers.js';

const router = Router();

// Endpoint para obtener las asistencias de un alumno por su ID
router.get('/asistencias/alumno/:id', obtenerAsistenciasPorAlumno);

export default router;