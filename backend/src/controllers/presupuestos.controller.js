const presupuestosService = require("../services/presupuestos.service");

// GET /api/presupuestos
async function listarPresupuestos(req, res) {
  const presupuestos = await presupuestosService.listarPresupuestos();
  res.json(presupuestos);
}


// POST /api/presupuestos
async function crearPresupuesto(req, res) {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({ mensaje: "El cuerpo de la solicitud debe ser un objeto." });
  }

  const { Cliente, items } = req.body;

  if (typeof Cliente !== "string" || Cliente.trim() === "") {
    return res.status(400).json({ mensaje: "El nombre del cliente es obligatorio." });
  }
  if (Cliente.trim().length > 80) {
    return res.status(400).json({ mensaje: "El nombre del cliente no puede superar los 80 caracteres." });
  }
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ mensaje: "Debe incluir al menos un item en el presupuesto." });
  }

  const itemsAgrupados = new Map();
  for (const item of items) {
    if (
      !item ||
      !Number.isInteger(item.id) ||
      item.id <= 0 ||
      item.id > 2147483647 ||
      !Number.isInteger(item.cantidad) ||
      item.cantidad <= 0 ||
      item.cantidad > 2147483647
    ) {
      return res.status(400).json({
        mensaje: "Cada item debe incluir un id y una cantidad enteros mayores a cero."
      });
    }

    const cantidadTotal = (itemsAgrupados.get(item.id) || 0) + item.cantidad;
    if (cantidadTotal > 2147483647) {
      return res.status(400).json({
        mensaje: "La cantidad total por material no puede superar el límite permitido."
      });
    }
    itemsAgrupados.set(item.id, cantidadTotal);
  }

  const resultado = await presupuestosService.crearPresupuesto({
    Cliente: Cliente.trim(),
    items: Array.from(itemsAgrupados, ([id, cantidad]) => ({ id, cantidad }))
  });

  res.status(201).json({
    idPresupuesto: resultado.id,
    total: resultado.total,
    mensaje: `Presupuesto N° ${resultado.id} creado.`
  });
}



module.exports = { listarPresupuestos, crearPresupuesto };