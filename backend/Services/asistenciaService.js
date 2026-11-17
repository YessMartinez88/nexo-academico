const asistenciaRepo = require('../Repositories/asistenciaRepository');

async function obtenerPorAlumno(id) {
    const detalleCronologico = await asistenciaRepo.obtenerPorAlumno(id);

    const clasesDictadas = detalleCronologico.length;

    let faltasComputadas = 0;
    detalleCronologico.forEach(item => {
        const codigo = item.codigo;
        if (codigo === 'A' || codigo === 'AJ') faltasComputadas += 1;
        if (codigo === 'T' || codigo === 'TJ' || codigo === 'R' || codigo === 'RJ') faltasComputadas += 0.5;
    });

    const porcentajeAcumulado = clasesDictadas > 0
        ? (((clasesDictadas - faltasComputadas) / clasesDictadas) * 100).toFixed(1) + '%'
        : '100%';

    return {
        alumnoId: id,
        resumenAsistencia: {
            clasesDictadas,
            faltasComputadas,
            porcentajeAcumulado
        },
        detalleCronologico
    };
}

module.exports = {
    obtenerPorAlumno
};