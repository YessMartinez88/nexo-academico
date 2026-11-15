import * as asistenciaRepo from '../Repositories/asistenciaRepository.js';

export async function registrarAsistencia(claseId, alumnoId, estado) {
    const asistencia = await asistenciaRepo.crearAsistencia(claseId, alumnoId, estado);
    return asistencia;
}