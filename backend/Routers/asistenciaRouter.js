const { Router } = require('express');
//const { postAsistencia, postPlanilla } = require('../Controllers/asistenciaController.js');
const { postAsistencia, postPlanilla, getAsistenciasPorAlumno } = require('../Controllers/asistenciaController.js');
const router = Router();

router.post('/', postAsistencia); 
router.post('/planilla', postPlanilla);

router.get('/alumno/:alumnoId', getAsistenciasPorAlumno);

module.exports = router;