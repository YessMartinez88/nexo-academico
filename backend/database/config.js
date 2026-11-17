const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

const dbConfig = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433', 10),
  database: process.env.DB_NAME || 'sistema_asistencia',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'Password123!',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

module.exports = {
  PORT,
  dbConfig
};