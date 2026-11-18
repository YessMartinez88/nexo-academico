const repo = require("../Repositories/comisionesRepository");
async function getAllComisiones(estado, docenteId) {
    return repo.getAllComisionesRepository(estado, docenteId);
}
async function createComision(comision) {
    return repo.createComisionRepository(comision);
}
module.exports = { getAllComisiones, createComision };
