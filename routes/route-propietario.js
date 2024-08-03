const route = require("express").Router();
const {
  findAll,
  save,
  findById,
  update,
  deletePropietario
} = require("../controllers/controller-propietario");

route.get("/", findAll);
route.post("/", save);
route.get("/:id", findById);
route.put("/:id", update);
route.delete("/:id", deletePropietario);
module.exports = route;
