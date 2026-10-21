const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const logger = require("./middlewares/logger");
const { manejadorErrores, rutaNoEncontrada } = require("./middlewares/errores");
const materialesRoutes = require("./routes/materiales.routes");
const presupuestosRoutes = require("./routes/presupuestos.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);


app.use(express.static(path.join(__dirname, "../../frontend")));

app.use("/api", materialesRoutes);
app.use("/api", presupuestosRoutes);

app.use(rutaNoEncontrada);
app.use(manejadorErrores);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Sistema completo en http://localhost:${PORT}`);
});