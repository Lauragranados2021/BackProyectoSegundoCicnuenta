const mongoose = require('mongoose');
const {Schema}=mongoose;

const mascotaSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    tipo:{
        type: String,
        enum:["perro","gato","otro"],
        required: true
    },
    propietario:{
        type: Schema.Types.ObjectId,
        ref: 'propietarios'
    },
    registros:[
        {
            type: Schema.Types.ObjectId,
            ref: 'registros'
        }
    ]
});
module.exports = mongoose.model('mascotas', mascotaSchema);