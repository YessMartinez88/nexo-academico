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
