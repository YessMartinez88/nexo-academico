const asistenciaRepo = require('../Repositories/asistenciaRepository.js');

async function registrarAsistencia(claseId, alumnoId, estado) {
    const asistencia = await asistenciaRepo.crearAsistencia(claseId, alumnoId, estado);
    return asistencia;
}

async function registrarPlanilla(claseId, asistencias) {
    const guardadas = [];

    for (const item of asistencias) {                       
        const nueva = await registrarAsistencia(claseId, item.alumnoId, item.estado);   
        guardadas.push(nueva);
    }

    return guardadas;                                      
}

module.exports = { registrarAsistencia, registrarPlanilla };