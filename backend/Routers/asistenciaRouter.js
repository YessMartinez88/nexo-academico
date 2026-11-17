const { Router } = require('express');
const { obtenerAsistenciasPorAlumno } = require('../Controllers/asistenciaController');

const router = Router();

router.get('/alumno/:id', obtenerAsistenciasPorAlumno);

module.exports = router;