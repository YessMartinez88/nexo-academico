const comisionesService = require("../Services/comisionesService");
function validar(comision) {
    if (!comision || typeof comision !== "object") return "El cuerpo debe ser un objeto.";
    if (!comision.materia || !comision.docente_id || !comision.ciclo_lectivo) return "Complete todos los campos.";
    if (comision.estado !== "BORRADOR" && comision.estado !== "ACTIVA" && comision.estado !== "CERRADA")
        return "El estado no es válido.";
    return "";
}
async function readComisiones(req, res) {
    try {
        return res.json(await comisionesService.getAllComisiones(req.query.estado, req.query.docente_id));
    } catch (error) {
        return res.status(500).json({ error: "Error al consultar comisiones" });
    }
}
async function createComision(req, res) {
    const mensaje = validar(req.body);
    if (mensaje) return res.status(400).json({ error: mensaje });
    try {
        return res.status(201).json(await comisionesService.createComision(req.body));
    } catch (error) {
        return res.status(500).json({ error: "Error al crear comisión" });
    }
}
module.exports = { readComisiones, createComision };
