import { getDbConnection, sql } from '../database/conexion.js';
import { queries } from '../database/queries.js';


export async function obtenerEstudiantes() {
    const pool = await getDbConnection();
    const result = await pool.request().query(queries.obtenerEstudiantes);
    return result.recordset;
}

export async function obtenerEstudiantePorId(id) {
    const pool = await getDbConnection();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query(queries.obtenerEstudiantePorId);
    return result.recordset[0] || null;
}


export async function obtenerEstudiantesPorComision(comisionId) {
    const pool = await getDbConnection();
    const result = await pool.request()
        .input('comisionId', sql.Int, comisionId)
        .query(queries.obtenerEstudiantesPorComision);
    return result.recordset;
}