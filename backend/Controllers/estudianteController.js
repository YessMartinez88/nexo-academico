import * as estudianteService from '../Services/estudianteService.js';

export async function getEstudiantes(req, res) {
    try {
        const estudiantes = await estudianteService.listarEstudiantes();
        return res.status(200).json(estudiantes);
    } catch (error) {
        console.error('[estudianteController] getEstudiantes:', error);
        return res.status(500).json({ mensaje: 'Error al obtener los estudiantes' });
    }
}