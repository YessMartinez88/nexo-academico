const { getDbConnection, sql } = require('../database/conexion.js');

// Busca al usuario por su email para verificar credenciales en el login
async function buscarUsuarioPorEmail(email) {
  const pool = await getDbConnection();
  const result = await pool
    .request()
    .input('email', sql.VarChar(100), email)
    .query(`
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
}

// Busca al usuario por ID para devolver los datos del perfil
async function buscarUsuarioPorId(id) {
  const pool = await getDbConnection();
  const result = await pool
    .request()
    .input('id', sql.Int, Number(id))
    .query(`
      SELECT 
        id,
        nombre,
        apellido,
        email,
        rol,
        activo
      FROM Usuarios
      WHERE id_usuario = @id
    `);

  return result.recordset[0] || null;
}

module.exports = { buscarUsuarioPorEmail, buscarUsuarioPorId };