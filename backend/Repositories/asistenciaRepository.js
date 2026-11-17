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