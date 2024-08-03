const mascota=require("../models/mascota");
const propietario=require("../models/propietario");
const registro=require("../models/registro");

exports.findAll=async (req,res)=>{
    try{
        const data=await mascota.find({}).populate("propietario");
        res.status(200).json({state:true,data:data});

    }catch(error){
        console.log(error);
        res.status(500).json({state:false,error:error.message});
    }
}
exports.save=async (req,res)=>{ 
    try{
        const {idPropietario}=req.params;
        const masc= new mascota(req.body);
        const prop=await propietario.findById(idPropietario);
        if(!prop){
            return res.status(404).json({state:false,error:"Propietario no encontrado"});
        }
        else{
            masc.propietario=idPropietario;
            prop.mascotas.push(masc._id);
            await prop.save();
            const data=await masc.save();
            res.status(200).json({state:true,data:data});
        }
       
    }
    catch(error){
        console.log(error);
        res.status(500).json({state:false,error:error.message});
    }
}
exports.update=async (req,res)=>{
    const {id}=req.params;
    const {code,nombre,tipo,idpropietario}=req.body;
    try{
        const masc=await mascota.findById(id)
        if(!masc){
            return res.status(404).json({state:false,error:"Mascota no encontrada"});
        }
        else{
            const prop=await propietario.findById(idpropietario)
            if(!prop){
                return res.status(404).json({state:false,error:"Propietario no encontrado"});
            }
            const oldPro=await propietario.findById(masc.propietario);
            if(oldPro){
                const index=oldPro.mascotas.indexOf(id);
                if(index>-1){
                    oldPro.mascotas.splice(index,1);
                    await oldPro.save();
                }
            }
            const newPro=await propietario.findById(idpropietario);
            if(newPro){
                newPro.mascotas.push(id);
                await newPro.save();
            }

            masc.id=code;
            masc.nombre=nombre;
            masc.tipo=tipo;
            masc.propietario=idpropietario;
            const data=await masc.save();
            res.status(200).json({state:true,data:data});
        }


    }
    catch(error){
        console.log(error);
        res.status(500).json({state:false,error:error.message});
    }
}
exports.deleteMascota=async (req,res)=>{
    const {id}=req.params;
    try{
        const masc=await mascota.findById(id);
        if(!masc){
            return res.status(404).json({state:false,error:"Mascota no encontrada"});
        }
        else{
            const prop=await propietario.findById(masc.propietario);
            if(prop){
                const index=prop.mascotas.indexOf(id);
                if(index>-1){
                    prop.mascotas.splice(index,1);
                    await prop.save();
                }
            }
            await mascota.findByIdAndDelete(id);
            res.status(200).json({state:true});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({state:false,error:error.message});
    }
}

