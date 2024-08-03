const servicio=require("../models/servicio");
const registro=require("../models/registro");

exports.findAll=async (req,res)=>{
    try{
        const data=await servicio.find({}).populate("registros");
        res.status(200).json({state:true,data:data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({state:false,error:err.message});
    }
}
exports.save=async(req,res)=>{
    try{
        const service= new servicio(req.body);
        const data=await service.save();
        res.status(200).json({state:true,data:data});

    }catch(error){
        console.log(error);
        res.status(500).json({state:false,error:error.message});
    }
}
exports.update=async(req,res)=>{
    const {id}=req.params;
    const {nombre,descripcion,costo}=req.body;
    try{
        const service=await servicio.findById(id);
        if(!service){
            return res.status(404).json({state:false,error:"Servicio no encontrado"});
        }
        else{
            service.nombre=nombre;
            service.descripcion=descripcion;
            service.costo=costo;
            const data=await service.save();
            res.status(200).json({state:true,data:data});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({state:false,error:error.message});
    }
}
exports.deleteService=async(req,res)=>{
    const {id}=req.params;
    try{
        const service=await servicio.findById(id);
        if(!service){
            return res.status(404).json({state:false,error:"Servicio no encontrado"});
        }
        else{
            const regs=await registro.find({servicio:id});
            if(regs.length>0){
                return res.status(400).json({state:false,error:"Servicio en uso"});
            }
            else{
                const data= await servicio.findByIdAndDelete(id);
                res.status(200).json({state:true,data:data});
            }
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({state:false,error:error.message});
    }
}
