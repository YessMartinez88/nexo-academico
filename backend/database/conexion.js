const sql = require('mssql');
const { dbConfig } = require('./config.js');

let pool = null;

async function getDbConnection() {
  try {
    if (!pool) {
      pool = await new sql.ConnectionPool(dbConfig).connect();
    }
    return pool;
  } catch (error) {
    console.log('Error al conectar con SQL Server:', error);
  }
}

module.exports = {
  getDbConnection,
  sql
};