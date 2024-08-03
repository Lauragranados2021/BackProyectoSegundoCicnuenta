const mongoose = require('mongoose');
const {Schema}=mongoose;

const propietarioSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    telefono:{
        type: Number,
        required: true
    },
    mascotas:[
        {
            type: Schema.Types.ObjectId,
            ref: 'mascotas'
        }
    ]
});
module.exports = mongoose.model('propietarios', propietarioSchema);