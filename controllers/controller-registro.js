const registro=require("../models/registro");
const mascota=require("../models/mascota");
const servicio=require("../models/servicio");

exports.findAll=async (req,res)=>{
try{
    const data=await registro.find({}).populate("mascota").populate("servicio");
    res.status(200).json({state:true,data:data});
}
catch(err){
    res.status(500).json({state:false,error:err.message});
}
}
exports.save=async(req,res)=>{
    try{
        const {idMascota,idServicio}=req.params;
        const reg= new registro(req.body);
        const masc=await mascota.findById(idMascota);
        const serv=await servicio.findById(idServicio);
        if(!masc){
            return res.status(404).json({state:false,error:"Mascota no encontrada"});
        }
        if(!serv){
            return res.status(404).json({state:false,error:"Servicio no encontrado"});
        }
        else{
            reg.mascota=idMascota;
            reg.servicio=idServicio;
            masc.registros.push(reg._id);
            serv.registros.push(reg._id);
            await masc.save();
            await serv.save();
            const data=await reg.save();
            res.status(200).json({state:true,data:data});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({state:false,error:err.message});
    }
}
    exports.update=async(req,res)=>{
        const {id}=req.params;
        const {fecha,peso,temperatura,idMascota,idServicio}=req.body;
        try{
            const reg=await registro.findById(id);
            if(!reg){
                return res.status(404).json({state:false,error:"Registro no encontrado"});
            }
            else{
                const masc=await mascota.findById(idMascota);
                const ser=await servicio.findById(idServicio)
                if(!masc){
                    return res.status(404).json({state:false,error:"Mascota no encontrada"});
                }
                else if(!ser){
                    return res.status(404).json({state:false,error:"Servicio no encontrado"});
                }
                else{
                    const oldMac=await mascota.findById(reg.mascota)
                    const oldSer=await servicio.findById(reg.servicio)
                    if(oldMac){
                        const index=oldMac.registros.indexOf(id)
                        if(index>-1){
                        oldMac.registros.splice(index,1)
                        await oldMac.save()
                        }
                    }
                    if(oldSer){
                        console.log("entro aqui")
                        const ind=oldSer.registros.indexOf(id)
                        if(ind>-1){
                            console.log("here")
                            oldSer.registros.splice(ind,1)
                            await oldSer.save()
                        }
                    }
                    
                }
                const newMas=await mascota.findById(idMascota)
                const newSer=await servicio.findById(idServicio)
                if(newMas){
                    newMas.registros.push(id);
                    await newMas.save()
                }
                if(newSer){
                    newSer.registros.push(id)
                    await newSer.save()
                }

                reg.fecha=fecha;
                reg.peso=peso;
                reg.temperatura=temperatura
                reg.mascota=idMascota
                reg.servicio=idServicio
                const data=await reg.save();

                res.status(200).json({state:true,data:data});
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json({state:false,error:err.message});
        }
}
exports.deleteRegistro=async(req,res)=>{
    const {id}=req.params;
    try{
        const reg=await registro.findById(id);
        if(!reg){
            return res.status(404).json({state:false,error:"Registro no encontrado"});
        }
        else{
            const masc=await mascota.findById(reg.mascota);
            const serv=await servicio.findById(reg.servicio);
            if(masc){
                const index=masc.registros.indexOf(id);
                if(index>-1){
                    masc.registros.splice(index,1);
                    await masc.save();
                }
            }
            if(serv){
                const ind=serv.registros.indexOf(id);
                if(ind>-1){
                    serv.registros.splice(ind,1);
                    await serv.save();
                }
            }
            const data=await registro.findByIdAndDelete(id);    
            res.status(200).json({state:true, data:data});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({state:false,error:err.message});
    }
}
