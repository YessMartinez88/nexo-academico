const { Router } = require('express');
<<<<<<< HEAD
const { obtenerAsistenciasPorAlumno } = require('../Controllers/asistenciaController');

const router = Router();

router.get('/alumno/:id', obtenerAsistenciasPorAlumno);
=======
const { postAsistencia, postPlanilla } = require('../Controllers/asistenciaController.js');

const router = Router();

router.post('/', postAsistencia); 
router.post('/planilla', postPlanilla);


>>>>>>> 1a9068429304fe5b057b6a1d7d9de54d6bbf2400

module.exports = router;