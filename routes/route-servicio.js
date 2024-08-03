const routes=require("express").Router();
const {
    findAll,save,update,deleteService
}=require("../controllers/controller-servicio");
routes.get("/",findAll);
routes.post("/",save)
routes.put("/:id",update);
routes.delete("/:id",deleteService);
module.exports=routes;