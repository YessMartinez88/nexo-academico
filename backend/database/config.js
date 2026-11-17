<<<<<<< HEAD
const dotenv = require('dotenv');
=======
const dotenv = require('dotenv'); 

>>>>>>> 1a9068429304fe5b057b6a1d7d9de54d6bbf2400
dotenv.config();

const PORT = process.env.PORT || 3000;

const dbConfig = {
<<<<<<< HEAD
    server: process.env.DB_SERVER || 'localhost',
    port: parseInt(process.env.DB_PORT || '1433', 10),
    database: process.env.DB_NAME || 'sistema_asistencia',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'tu_contraseña_local',
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: true,
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    }
};

module.exports = {
    PORT,
    dbConfig
};
=======
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


module.exports = { PORT, dbConfig };
>>>>>>> 1a9068429304fe5b057b6a1d7d9de54d6bbf2400
