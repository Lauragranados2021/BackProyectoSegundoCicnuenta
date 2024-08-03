const routes= require('express').Router();
const {
    findAll,save,update,deleteRegistro
}=require("../controllers/controller-registro");
routes.get("/",findAll);
routes.post("/:idMascota/:idServicio",save);
routes.put("/:id",update);
routes.delete("/:id",deleteRegistro);
module.exports=routes;