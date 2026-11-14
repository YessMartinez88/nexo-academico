import { getDbConnection } from '../database/conexion.js';
import { queries } from '../database/queries.js';

export async function obtenerEstudiantes(){
    const pool = await obtenerEstudiantes();
    const result = await pool.request().query(queries.obtenerEstudiantes);
    return result.recorset;
}