const mongoose=require("mongoose");
const {Schema}=mongoose;
const registroSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    },
    peso:{
        type: Number,
        required: true
    },
    temperatura:{
        type: Number,
        required: true
    },
    mascota:{
        type: Schema.Types.ObjectId,
        ref: 'mascotas'
    },
    servicio:{
        type: Schema.Types.ObjectId,
        ref: 'servicios'
    }
});
module.exports = mongoose.model('registros', registroSchema);

