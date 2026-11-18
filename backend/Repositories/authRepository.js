const { getDbConnection, sql } = require("../database/conexion.js");

async function buscarUsuarioPorEmail(email) {
    const pool = await getDbConnection();
    if (!pool) return null;

    try {
        const result = await pool.request().input("email", sql.VarChar(100), email).query(`
        SELECT
          id,
          nombre,
          apellido,
          email,
          password_hash,
          rol,
          activo
        FROM Usuarios
        WHERE email = @email
      `);

        return result.recordset[0] || null;
    } catch (error) {
        console.error("[authRepository] Error en buscarUsuarioPorEmail:", error);
        return null;
    }
}

async function buscarUsuarioPorId(id) {
    const pool = await getDbConnection();
    if (!pool) return null;

    try {
        const result = await pool.request().input("id", sql.Int, Number(id)).query(`
        SELECT
          id,
          nombre,
          apellido,
          email,
          rol,
          activo
        FROM Usuarios
        WHERE id = @id
      `);

        return result.recordset[0] || null;
    } catch (error) {
        console.error("[authRepository] Error en buscarUsuarioPorId:", error);
        return null;
    }
}

module.exports = { buscarUsuarioPorEmail, buscarUsuarioPorId };
