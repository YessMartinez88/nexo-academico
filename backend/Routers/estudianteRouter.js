const { Router } = require('express');
const { getEstudiantes, getEstudiantePorId } = require('../Controllers/estudianteController.js');

const router = Router();

router.get('/', getEstudiantes);  
router.get('/:id', getEstudiantePorId);  

module.exports = router;