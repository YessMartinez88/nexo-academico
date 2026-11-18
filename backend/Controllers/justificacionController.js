const justificacionService = require("../Services/justificacionService.js");
const { JustificacionError } = justificacionService;

const ESTADOS_JUSTIFICACION = ["PENDIENTE", "APROBADA", "RECHAZADA"];
const ESTADOS_REVISION = ["APROBADA", "RECHAZADA"];
const LARGO_MAXIMO = 500;

function esIdValido(valor) {
    return Number.isInteger(Number(valor)) && Number(valor) > 0;
}

function responderError(res, error, contexto, mensajeGenerico) {
    if (error instanceof JustificacionError) {
        return res.status(error.status).json({ mensaje: error.message });
    }
    console.error(`[justificacionController] ${contexto}:`, error);
    return res.status(500).json({ mensaje: mensajeGenerico });
}

// GET /api/justificaciones?estado=PENDIENTE&alumnoId=5
async function getJustificaciones(req, res) {
    try {
        const { estado, alumnoId } = req.query;

        if (estado && !ESTADOS_JUSTIFICACION.includes(estado)) {
            return res.status(400).json({ mensaje: "El estado es incorrecto" });
        }
        if (alumnoId && !esIdValido(alumnoId)) {
            return res.status(400).json({ mensaje: "El alumnoId es incorrecto" });
        }

        const justificaciones = await justificacionService.listarJustificaciones({
            estado,
            alumnoId: alumnoId ? Number(alumnoId) : undefined,
        });
        return res.status(200).json(justificaciones);
    } catch (error) {
        return responderError(res, error, "getJustificaciones", "Error al obtener las justificaciones");
    }
}

// GET /api/justificaciones/justificables/:alumnoId
async function getAsistenciasJustificables(req, res) {
    try {
        const { alumnoId } = req.params;

        if (!esIdValido(alumnoId)) {
            return res.status(400).json({ mensaje: "El alumnoId es incorrecto" });
        }

        const asistencias = await justificacionService.listarAsistenciasJustificables(Number(alumnoId));
        return res.status(200).json(asistencias);
    } catch (error) {
        return responderError(res, error, "getAsistenciasJustificables", "Error al obtener las asistencias");
    }
}

// POST /api/justificaciones
async function postJustificacion(req, res) {
    try {
        const { asistenciaId, alumnoId, motivo, archivoUrl } = req.body;

        if (!asistenciaId || !alumnoId || !motivo?.trim()) {
            return res.status(400).json({ mensaje: "Faltan datos" });
        }
        if (!esIdValido(asistenciaId) || !esIdValido(alumnoId)) {
            return res.status(400).json({ mensaje: "Los ids son incorrectos" });
        }
        if (motivo.length > LARGO_MAXIMO || (archivoUrl && archivoUrl.length > LARGO_MAXIMO)) {
            return res
                .status(400)
                .json({ mensaje: `El motivo y el comprobante admiten hasta ${LARGO_MAXIMO} caracteres` });
        }

        const justificacion = await justificacionService.solicitarJustificacion(
            Number(asistenciaId),
            Number(alumnoId),
            motivo.trim(),
            archivoUrl?.trim() || null,
        );
        return res.status(201).json(justificacion);
    } catch (error) {
        return responderError(res, error, "postJustificacion", "Error al registrar la justificación");
    }
}

// PATCH /api/justificaciones/:id/revisar
async function patchRevisarJustificacion(req, res) {
    try {
        const { id } = req.params;
        const { estado, observacion } = req.body;

        if (!esIdValido(id)) {
            return res.status(400).json({ mensaje: "El id es incorrecto" });
        }
        if (!ESTADOS_REVISION.includes(estado)) {
            return res.status(400).json({ mensaje: "El estado debe ser APROBADA o RECHAZADA" });
        }
        if (estado === "RECHAZADA" && !observacion?.trim()) {
            return res.status(400).json({ mensaje: "Para rechazar hay que indicar una observación" });
        }
        if (observacion && observacion.length > LARGO_MAXIMO) {
            return res.status(400).json({ mensaje: `La observación admite hasta ${LARGO_MAXIMO} caracteres` });
        }

        const justificacion = await justificacionService.revisarJustificacion(
            Number(id),
            estado,
            observacion?.trim() || null,
        );
        return res.status(200).json(justificacion);
    } catch (error) {
        return responderError(res, error, "patchRevisarJustificacion", "Error al revisar la justificación");
    }
}

module.exports = { getJustificaciones, getAsistenciasJustificables, postJustificacion, patchRevisarJustificacion };
