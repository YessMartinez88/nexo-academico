const { getDbConnection, sql } = require("../database/conexion.js");
const { queries } = require("../database/queries.js");

async function obtenerEstudiantes() {
    const pool = await getDbConnection();
    const result = await pool.request().query(queries.obtenerEstudiantes);
    return result.recordset;
}

async function obtenerEstudiantePorId(id) {
    const pool = await getDbConnection();
    const result = await pool.request().input("id", sql.Int, id).query(queries.obtenerEstudiantePorId);
    return result.recordset[0] || null;
}

async function obtenerEstudiantesPorComision(comisionId) {
    const pool = await getDbConnection();
    const result = await pool
        .request()
        .input("comisionId", sql.Int, comisionId)
        .query(queries.obtenerEstudiantesPorComision);
    return result.recordset;
}

module.exports = { obtenerEstudiantes, obtenerEstudiantePorId, obtenerEstudiantesPorComision };
