const { Router } = require('express');
const { postAsistencia, postPlanilla } = require('../Controllers/asistenciaController.js');

const router = Router();

router.post('/', postAsistencia); 
router.post('/planilla', postPlanilla);



module.exports = router;