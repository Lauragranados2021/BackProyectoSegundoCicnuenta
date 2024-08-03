const propietario=require("../models/propietario");
const mascota=require("../models/mascota");

exports.findAll=async (req,res)=>{
    try{
        const data=await propietario.find({}).populate("mascotas");
        res.status(200).json({state:true,data:data});

    }catch(error){
        console.log(error);
        res.status(500).json({state:false,error:error.message});
    }
}
exports.save=async (req,res)=>{
    try{
        const propi= new propietario(req.body); 
        const data=await propi.save();
        res.status(200).json({state:true,data:data});
    }catch(error){
        console.log(error);
        res.status(500).json({state:false,error:error.message});
    }
}
exports.findById=async (req,res)=>{
    const {id}=req.params;
    try{
        const data=await propietario.findById(id).populate("mascotas");
        if(!data){
            return res.status(404).json({state:false,error:"Propietario no encontrado"});
        }
        res.status(200).json({state:true,data:data});   
} catch(error){
    console.log(error);
    res.status(500).json({state:false,error:error.message});
}
}
exports.update=async (req,res)=>{
    const {id}=req.params;
    const {nombre,apellido,direccion,telefono}=req.body;
    try{
        const prop=await propietario.findById(id);
        if(!prop){
            return res.status(404).json({state:false,error:"Propietario no encontrado"});
        }
        else{
            prop.nombre=nombre;
            prop.apellido=apellido;
            prop.direccion=direccion;
            prop.telefono=telefono;
            const data=await prop.save();
            res.status(200).json({state:true,data:data});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({state:false,error:error.message});
    }
}
exports.deletePropietario=async (req,res)=>{
    const {id}=req.params;
    try{
        const prop=await propietario.findById(id);
        if(!prop){
            return res.status(404).json({state:false,error:"Propietario no encontrado"});
        }
        else{
           const data= await propietario.findByIdAndDelete(id);
            res.status(200).json({state:true,data:data});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({state:false,error:error.message});
    }
}

