const { getDbConnection, sql } = require("../database/conexion.js");
const { queries } = require("../database/queries.js");

async function obtenerAsistenciasJustificables(alumnoId) {
    const pool = await getDbConnection();
    const result = await pool
        .request()
        .input("alumnoId", sql.Int, alumnoId)
        .query(queries.obtenerAsistenciasJustificables);
    return result.recordset;
}

async function obtenerAsistenciaPorId(asistenciaId) {
    const pool = await getDbConnection();
    const result = await pool
        .request()
        .input("asistenciaId", sql.Int, asistenciaId)
        .query(queries.obtenerAsistenciaPorId);
    return result.recordset[0];
}

async function crearJustificacion(asistenciaId, alumnoId, motivo, archivoUrl) {
    const pool = await getDbConnection();
    const result = await pool
        .request()
        .input("asistenciaId", sql.Int, asistenciaId)
        .input("alumnoId", sql.Int, alumnoId)
        .input("motivo", sql.VarChar(500), motivo)
        .input("archivoUrl", sql.VarChar(500), archivoUrl)
        .query(queries.crearJustificacion);
    return result.recordset[0].id;
}

// filtros opcionales: id, estado, alumnoId
async function listarJustificaciones(filtros = {}) {
    const pool = await getDbConnection();
    const request = pool.request();
    const condiciones = [];

    if (filtros.id) {
        request.input("id", sql.Int, filtros.id);
        condiciones.push("j.id = @id");
    }
    if (filtros.estado) {
        request.input("estado", sql.VarChar(20), filtros.estado);
        condiciones.push("j.estado = @estado");
    }
    if (filtros.alumnoId) {
        request.input("alumnoId", sql.Int, filtros.alumnoId);
        condiciones.push("j.alumno_id = @alumnoId");
    }

    const where = condiciones.length ? ` WHERE ${condiciones.join(" AND ")}` : "";
    const result = await request.query(`${queries.listarJustificaciones}${where} ORDER BY j.fecha_solicitud DESC`);
    return result.recordset;
}

// si se aprueba tambien se actualiza la asistencia (A -> AJ, etc), por eso va en transaccion
async function revisarJustificacion(id, estado, observacionAdmin) {
    const pool = await getDbConnection();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
        const result = await new sql.Request(transaction)
            .input("id", sql.Int, id)
            .input("estado", sql.VarChar(20), estado)
            .input("observacionAdmin", sql.VarChar(500), observacionAdmin)
            .query(queries.revisarJustificacion);

        const revisada = result.recordset[0];

        if (revisada && estado === "APROBADA") {
            await new sql.Request(transaction)
                .input("asistenciaId", sql.Int, revisada.asistenciaId)
                .query(queries.marcarAsistenciaJustificada);
        }

        await transaction.commit();
        return revisada;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    obtenerAsistenciasJustificables,
    obtenerAsistenciaPorId,
    crearJustificacion,
    listarJustificaciones,
    revisarJustificacion,
};
