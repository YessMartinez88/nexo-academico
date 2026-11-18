const { getDbConnection, sql } = require("../database/conexion");
const base = "SELECT c.id, c.materia, c.docente_id, c.ciclo_lectivo, c.estado FROM comisiones c";
async function getAllComisionesRepository(estado, docenteId) {
    const pool = await getDbConnection();
    if (!pool) return [];
    const request = pool.request();
    let where = "";
    if (estado) {
        where = " WHERE c.estado = @estado";
        request.input("estado", sql.VarChar(20), estado);
    }
    if (docenteId) {
        where = where ? " WHERE c.estado = @estado AND c.docente_id = @docenteId" : " WHERE c.docente_id = @docenteId";
        request.input("docenteId", sql.Int, Number(docenteId));
    }
    return (await request.query(base + where + " ORDER BY c.id")).recordset;
}
async function createComisionRepository(comision) {
    const pool = await getDbConnection();
    if (!pool) return [];
    const result = await pool
        .request()
        .input("materia", sql.VarChar(100), comision.materia)
        .input("docenteId", sql.Int, Number(comision.docente_id))
        .input("cicloLectivo", sql.VarChar(10), comision.ciclo_lectivo)
        .input("estado", sql.VarChar(20), comision.estado)
        .query(
            "INSERT INTO comisiones (materia, docente_id, ciclo_lectivo, estado) OUTPUT INSERTED.id VALUES (@materia, @docenteId, @cicloLectivo, @estado)",
        );
    const id = result.recordset[0].id;
    const created = await pool
        .request()
        .input("id", sql.Int, id)
        .query(base + " WHERE c.id = @id");
    return created.recordset;
}
module.exports = { getAllComisionesRepository, createComisionRepository };
