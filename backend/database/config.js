import dotenv from 'dotenv';

dotenv.config();


export const PORT = process.env.PORT || 3000;

export const dbConfig = {
  server: 'localhost\\SQLEXPRESS', 
  port: parseInt(process.env.DB_PORT || '1433', 10),
  database: process.env.DB_NAME || 'sistema_asistencia',
  user: process.env.DB_USER || 'sa',
  password:'Admin123' ,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  }
};