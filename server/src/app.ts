import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiRouter } from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`[Nexo-Academico] Servidor escuchando en http://localhost:${PORT}`);
});