const asistenciaService = require('../Services/asistenciaService');

async function obtenerAsistenciasPorAlumno(req, res) {
    try {
        const { id } = req.params; 

        if (!id) {
            return res.status(400).json({ mensaje: 'El ID del alumno es obligatorio' });
        }

        const resultado = await asistenciaService.obtenerPorAlumno(id);

        return res.status(200).json({
            ok: true,
            mensaje: `Panel de asistencia obtenido con éxito para el alumno ${id}`,
            data: resultado
        });
    } catch (error) {
        console.error('[asistenciaController] obtenerAsistenciasPorAlumno:', error);
        return res.status(500).json({ 
            mensaje: 'Error al consultar las asistencias' 
        });
    }
}

module.exports = {
    obtenerAsistenciasPorAlumno
};