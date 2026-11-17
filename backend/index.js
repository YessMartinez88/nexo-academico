const express = require('express');
const cors = require('cors');
const { PORT } = require('./database/config');
const asistenciaRouter = require('./Routers/asistenciaRouter');
const authRouter = require('./Routers/authRouter');
const app = express();

app.use(cors());
app.use(express.json());

// Endpoint de salud para verificar que el backend está corriendo
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', proyecto: 'Nexo-Academico' });
});

// Rutas de autenticacion, sesion y roles
app.use('/api/auth', authRouter);

// Estudiantes
//app.use('/api/estudiantes', estudianteRouter);

// Asistencias
app.use('/api/asistencias', asistenciaRouter);

app.listen(PORT, () => {
    console.log(`[Nexo-Academico] Servidor escuchando en http://localhost:${PORT}`);
});