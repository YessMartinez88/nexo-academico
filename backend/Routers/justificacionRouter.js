const { Router } = require("express");
const {
    getJustificaciones,
    getAsistenciasJustificables,
    postJustificacion,
    patchRevisarJustificacion,
} = require("../Controllers/justificacionController.js");

const router = Router();

router.get("/", getJustificaciones);
router.get("/justificables/:alumnoId", getAsistenciasJustificables);
router.post("/", postJustificacion);
router.patch("/:id/revisar", patchRevisarJustificacion);

module.exports = router;
