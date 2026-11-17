const express = require("express");
const cors = require("cors");
const { PORT } = require("./database/config.js");
const authRouter = require("./Routers/authRouter.js");
const estudianteRouter = require("./Routers/estudianteRouter.js");
const asistenciaRouter = require("./Routers/asistenciaRouter.js");
const { comisionesRouter } = require("./Routers/comisionesRouter.js");
const justificacionRouter = require("./Routers/justificacionRouter.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", proyecto: "Nexo-Academico" });
});

app.use("/api/auth", authRouter);

app.use("/api/estudiantes", estudianteRouter);

app.use("/api/asistencias", asistenciaRouter);
app.use("/api/comisiones", comisionesRouter);
app.use("/api/justificaciones", justificacionRouter);

app.listen(PORT, () => {
    console.log(`[Nexo-Academico] Servidor escuchando en http://localhost:${PORT}`);
});
