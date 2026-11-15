import express from 'express';
import cors from 'cors';
import { PORT } from './database/config.js';
import asistenciasRoutes from './Routers/asistencias.routes.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', asistenciasRoutes);
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', proyecto: 'Nexo-Academico' });
});

app.listen(PORT, () => {
  console.log(`[Nexo-Academico] Servidor escuchando en http://localhost:${PORT}`);
});
