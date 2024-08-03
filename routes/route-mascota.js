const routes= require('express').Router();
const {
    findAll,save,update,deleteMascota
}=require("../controllers/controller-mascota");
routes.get("/",findAll);
routes.post("/:idPropietario",save);
routes.put("/:id",update);
routes.delete("/:id",deleteMascota);
module.exports=routes;