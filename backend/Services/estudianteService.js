const estudianteRepo = require('../Repositories/estudianteRepository.js');

async function listarEstudiantes(comisionId) {
    if (comisionId == undefined) {
        const estudiantes = await estudianteRepo.obtenerEstudiantes();
        return estudiantes;
    }

    const id = parseInt(comisionId);
    const estudiantesComision = await estudianteRepo.obtenerEstudiantesPorComision(id);
    return estudiantesComision;
}

async function buscarEstudiante(id) {
    parseInt(id);
    const estudiante = await estudianteRepo.obtenerEstudiantePorId(id);
    return estudiante;
}

module.exports = { listarEstudiantes, buscarEstudiante };