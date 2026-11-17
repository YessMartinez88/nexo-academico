<<<<<<< HEAD
const { getDbConnection, sql } = require('../database/conexion');
const { queries } = require('../database/queries');

async function obtenerPorAlumno(alumnoId) {
    try {
        const pool = await getDbConnection();
        const result = await pool.request()
            .input('alumnoId', sql.VarChar, alumnoId)
            .query(queries.obtenerAsistenciasPorAlumno);

        return result.recordset;
    } catch (error) {
        console.error('[asistenciaRepository] obtenerPorAlumno:', error);
        throw error;
    }
}

module.exports = {
    obtenerPorAlumno
};
=======
const { getDbConnection, sql } = require('../database/conexion.js');
const { queries } = require('../database/queries.js');

async function crearAsistencia(claseId, alumnoId, estado) {
    const pool = await getDbConnection();
    const result = await pool.request()
                            .input('claseId', sql.Int, claseId)
                            .input('alumnoId', sql.Int, alumnoId)
                            .input('estado', sql.VarChar(5), estado)
                            .query(queries.crearAsistencia);
    return result.recordset[0];
}

module.exports = { crearAsistencia };
>>>>>>> 1a9068429304fe5b057b6a1d7d9de54d6bbf2400
