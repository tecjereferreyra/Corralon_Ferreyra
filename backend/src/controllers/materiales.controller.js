const materialesService = require("../services/materiales.service");

// GET /api/materiales
async function listarMateriales(req, res) {
  const materiales = await materialesService.listarMateriales();
  res.json(materiales);
}

module.exports = { listarMateriales };