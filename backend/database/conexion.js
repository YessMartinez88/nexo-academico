const sql = require("mssql");
const { dbConfig } = require("./config.js");

let pool = null;

async function getDbConnection() {
    try {
        if (!pool) {
            pool = await new sql.ConnectionPool(dbConfig).connect();
        }
        return pool;
    } catch (error) {
        pool = null;
        console.error("[Nexo-Academico] Error al conectar con SQL Server:", error);
        return null;
    }
}

module.exports = { getDbConnection, sql };
