const { Router } = require("express");
const { readComisiones, createComision } = require("../Controllers/comisionesController");

const router = Router();

router.get("/", readComisiones);
router.post("/", createComision);

module.exports.comisionesRouter = router;
