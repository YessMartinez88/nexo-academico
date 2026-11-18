const asistenciaService = require("../Services/asistenciaService.js");

const ESTADOS_VALIDOS = ["P", "A", "T", "R"];

async function getAsistenciasPorAlumno(req, res) {
    try {
        const { alumnoId } = req.params;

        // Llamamos al servicio que busca las asistencias en la base de datos
        const asistencias = await asistenciaService.obtenerAsistenciasPorAlumno(alumnoId);

        return res.status(200).json(asistencias);
    } catch (error) {
        console.error('[asistenciaController] getAsistenciasPorAlumno:', error);
        return res.status(500).json({ mensaje: 'Error al obtener las asistencias' });
    }
}

async function postAsistencia(req, res) {
    try {
        const { claseId, alumnoId, estado } = req.body;

        if (!claseId || !alumnoId || !estado) {
            return res.status(400).json({ mensaje: "Faltan datos" });
        }

        if (!ESTADOS_VALIDOS.includes(estado)) {
            return res.status(400).json({ mensaje: "El estado es incorrecto" });
        }

        const asistencia = await asistenciaService.registrarAsistencia(claseId, alumnoId, estado);
        return res.status(201).json(asistencia);
    } catch (error) {
        console.error("[asistenciaController] postAsistencia:", error);
        return res.status(500).json({ mensaje: "Error al registrar la asistencia" });
    }
}

async function postPlanilla(req, res) {
    try {
        const { claseId, asistencias } = req.body;

        if (!claseId || !asistencias) {
            return res.status(400).json({ mensaje: "Faltan datos" });
        }

        if (!Array.isArray(asistencias) || asistencias.length === 0) {
            return res.status(400).json({ mensaje: "No se enviaron registros" });
        }

        for (const item of asistencias) {
            if (!item.alumnoId || !ESTADOS_VALIDOS.includes(item.estado)) {
                return res.status(400).json({ mensaje: `Datos incorrectos para el alumno ${item.alumnoId}` });
            }
        }

        const guardadas = await asistenciaService.registrarPlanilla(claseId, asistencias);
        return res.status(201).json(guardadas);
    } catch (error) {
        console.error("[asistenciaController] postPlanilla:", error);
        return res.status(500).json({ mensaje: "Error al guardar la planilla" });
    }
}

module.exports = { postAsistencia, postPlanilla,getAsistenciasPorAlumno };
