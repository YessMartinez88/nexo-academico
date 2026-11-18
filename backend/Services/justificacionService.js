const justificacionRepo = require("../Repositories/justificacionRepository.js");

// error con el codigo http que tiene que devolver el controller
class JustificacionError extends Error {
    constructor(status, mensaje) {
        super(mensaje);
        this.status = status;
    }
}

async function listarAsistenciasJustificables(alumnoId) {
    return justificacionRepo.obtenerAsistenciasJustificables(alumnoId);
}

async function listarJustificaciones(filtros) {
    return justificacionRepo.listarJustificaciones(filtros);
}

async function solicitarJustificacion(asistenciaId, alumnoId, motivo, archivoUrl) {
    const asistencia = await justificacionRepo.obtenerAsistenciaPorId(asistenciaId);

    if (!asistencia) {
        throw new JustificacionError(404, `No existe la asistencia con id ${asistenciaId}`);
    }
    if (asistencia.alumnoId !== alumnoId) {
        throw new JustificacionError(403, "La asistencia no pertenece al alumno indicado");
    }
    if (!["A", "T", "R"].includes(asistencia.estado)) {
        throw new JustificacionError(409, "Solo se pueden justificar ausencias, tardanzas o retiros");
    }
    if (asistencia.solicitudesActivas > 0) {
        throw new JustificacionError(409, "Esa asistencia ya tiene una justificación pendiente o aprobada");
    }

    const id = await justificacionRepo.crearJustificacion(asistenciaId, alumnoId, motivo, archivoUrl);
    const [creada] = await justificacionRepo.listarJustificaciones({ id });
    return creada;
}

async function revisarJustificacion(id, estado, observacionAdmin) {
    const revisada = await justificacionRepo.revisarJustificacion(id, estado, observacionAdmin);

    if (!revisada) {
        const [existente] = await justificacionRepo.listarJustificaciones({ id });
        if (!existente) {
            throw new JustificacionError(404, `No existe la justificación con id ${id}`);
        }
        throw new JustificacionError(409, `La justificación ya fue revisada (${existente.estado})`);
    }

    const [actualizada] = await justificacionRepo.listarJustificaciones({ id });
    return actualizada;
}

module.exports = {
    JustificacionError,
    listarAsistenciasJustificables,
    listarJustificaciones,
    solicitarJustificacion,
    revisarJustificacion,
};
