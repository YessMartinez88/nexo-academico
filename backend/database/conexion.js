import sql from 'mssql';
import { dbConfig } from './config.js';

let pool = null;

export async function getDbConnection() {
  try {
    if (!pool) {
      pool = await new sql.ConnectionPool(dbConfig).connect();
    }
    return pool;
  } catch (error) {
    console.error('[Nexo-Academico] Error al conectar con SQL Server:', error);
    throw error;
  }
}

export { sql };
