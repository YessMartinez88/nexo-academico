import express from 'express';
import cors from 'cors';
import { PORT } from './database/config.js';
import authRouter from './Routers/authRouter.js';

const app = express();

app.use(cors());
app.use(express.json());


//Endpoint de salud para verificar que el backend está corriendo
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', proyecto: 'Nexo-Academico' });
});


//Rutas de autenticacion, sesion y roles
app.use('/api/auth', authRouter);
app.listen(PORT, () => {
  console.log(`[Nexo-Academico] Servidor escuchando en http://localhost:${PORT}`);
});
