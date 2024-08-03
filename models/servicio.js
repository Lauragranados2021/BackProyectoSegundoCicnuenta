const mongoose=require("mongoose");
const {Schema}=mongoose;

const servicioSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        enum:["basico","premium"],
        required: true
    },
    costo:{
        type: Number,
        required: true
    },
    registros:[
        {
            type: Schema.Types.ObjectId,
            ref: 'registros'
        }
    ]
});
module.exports = mongoose.model('servicios', servicioSchema);