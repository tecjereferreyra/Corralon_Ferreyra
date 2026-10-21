const { sql, getConnection } = require("../config/db");

async function listarMateriales() {
  const pool = await getConnection();
  const resultado = await pool.request().execute("usp_ListarMateriales");
  return resultado.recordset;
}


module.exports = { listarMateriales };