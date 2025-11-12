import { Schema } from "mongoose";

export const EpocaSchema = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    fecha_inicio: {type: Date, required: true},
    fecha_fin: {type: Date, required: true},
    imagen: [{type: String, required: false}],
    etapa: [{
        nombre:{ type: String, required: true},
        imagen: {type:String, required: true},
        fecha_inicio: {type: Date, required: true},
        fecha_fin: {type: Date, required: true},
        descripcion: {type: String, required: true},

    }]
}, {versionKey:false, timestamps: true})
