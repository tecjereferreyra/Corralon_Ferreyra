const { Router } = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const materialesController = require("../controllers/materiales.controller");

const router = Router();

router.get("/materiales", asyncHandler(materialesController.listarMateriales));

module.exports = router;