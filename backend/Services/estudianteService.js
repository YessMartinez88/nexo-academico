import * as estudianteRepo from '../Repositories/estudianteRepository.js';

export async function listarEstudiantes(){
    const usuarios = await estudianteRepo.obtenerEstudiantes();
    return usuarios;
}