import * as asistenciaService from '../Services/asistenciaService.js';

/**
 *        P = Presente
 *        A = Ausente
 *        T = Tarde
 *        R = Retiro anticipado
 */
const ESTADOS_VALIDOS = ['P', 'A', 'T', 'R'];

export async function postAsistencia(req, res) {
    try {
        const { claseId, alumnoId, estado } = req.body;

        if (!claseId || !alumnoId || !estado) {
            return res.status(400).json({ mensaje: 'Faltan datos' });
        }

        if (!ESTADOS_VALIDOS.includes(estado)) {
            return res.status(400).json({ mensaje: 'El estado es incorrecto' });
        }

        const asistencia = await asistenciaService.registrarAsistencia(claseId, alumnoId, estado);
        return res.status(201).json(asistencia);
    } catch (error) {
        console.error('[asistenciaController] postAsistencia:', error);
        return res.status(500).json({ mensaje: 'Error al registrar la asistencia' });
    }
}