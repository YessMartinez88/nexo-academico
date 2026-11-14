import * as estudianteRepo from '../Repositories/estudianteRepository';

export async function listarEstudiantes(){
    const usuarios = await estudianteRepo.obtenerEstudiantes();
    return usuarios;
}