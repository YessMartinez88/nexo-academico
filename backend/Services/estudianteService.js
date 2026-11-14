import * as estudianteRepo from '../Repositories/estudianteRepository.js';

export async function listarEstudiantes(comisionId) {
    if (comisionId == undefined) {
        const estudiantes = await estudianteRepo.obtenerEstudiantes();
        return estudiantes;
    }

    const id = parseInt(comisionId);
    const estudiantesComision = await estudianteRepo.obtenerEstudiantesPorComision(id);
    return estudiantesComision;
}

export async function buscarEstudiante(id) {
    parseInt(id);
    const estudiante = await estudianteRepo.obtenerEstudiantePorId(id);
    return estudiante;
}