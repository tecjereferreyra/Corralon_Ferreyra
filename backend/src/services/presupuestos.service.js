const { sql, getConnection } = require("../config/db");

async function listarPresupuestos() {
  const pool = await getConnection();
  const resultado = await pool.request().execute("usp_ListarPresupuestos");
  return resultado.recordset;
}


async function crear({ cliente, items }) {
  const pool = await getConnection();

  const resultado = await pool.request()
    .input("Cliente", sql.NVarChar(80), cliente)
    .input("Items", sql.NVarChar(sql.MAX), JSON.stringify(items))
    .output("IdPresupuesto", sql.Int)
    .output("Total", sql.Decimal(12, 2))
    .execute("usp_CrearPresupuesto");


  return {
    idPresupuesto: resultado.output.IdPresupuesto,
    total: resultado.output.Total
  };
}

module.exports = { listarPresupuestos, crear };