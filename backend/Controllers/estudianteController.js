import * as estudianteService from '../Services/estudianteService.js';

export async function getEstudiantes(req, res) {
    try {
        const { comisionId } = req.query;
        const estudiantes = await estudianteService.listarEstudiantes(comisionId);
        return res.status(200).json(estudiantes);
    } catch (error) {
        console.error('[estudianteController] getEstudiantes:', error);
        return res.status(500).json({ mensaje: 'Error al obtener los estudiantes' });
    }
}

export async function getEstudiantePorId(req, res) {
    try {
        const { id } = req.params;
        const estudiante = await estudianteService.buscarEstudiante(id);

        if (!estudiante) {
            return res.status(404).json({ mensaje: `No se encontró el estudiante con id ${id}` });
        }
        return res.status(200).json(estudiante);
    } catch (error) {
        console.error('[estudianteController] getEstudiantePorId:', error);
        return res.status(500).json({ mensaje: 'Error al obtener el estudiante' });
    }
}