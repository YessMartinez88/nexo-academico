import { AsistenciasService } from '../Services/asistencias.service.js';

export async function obtenerAsistenciasPorAlumno(req, res) {
    try {
        const { id } = req.params; 
        
        // Llamamos a la capa de servicios (ahora con datos simulados internamente)
        const resultado = await AsistenciasService.obtenerPorAlumno(id);

        return res.status(200).json({
            ok: true,
            mensaje: `Panel de asistencia obtenido con éxito para el alumno ${id}`,
            data: resultado
        });
    } catch (error) {
        console.error('Error en controlador de asistencias:', error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor al consultar las asistencias',
            error: error.message
        });
    }
}