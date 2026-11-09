import { getDbConnection, sql } from '../database/conexion.js';

// Busca al usuario por su email para verificar credenciales en el login
export async function buscarUsuarioPorEmail(email) {
  const pool = await getDbConnection();
  const result = await pool.request()
    .input('email', sql.VarChar(100), email)
    .query(`
      SELECT id, nombre, apellido, email, password_hash, rol, activo
      FROM usuarios
      WHERE email = @email
    `);
  return result.recordset[0] || null;
}

// Busca al usuario por ID para devolver los datos del perfil
export async function buscarUsuarioPorId(id) {
  const pool = await getDbConnection();
  const result = await pool.request()
    .input('id', sql.VarChar(50), id)
    .query(`
      SELECT id, nombre, apellido, email, rol, activo
      FROM usuarios
      WHERE id = @id
    `);
  return result.recordset[0] || null;
}