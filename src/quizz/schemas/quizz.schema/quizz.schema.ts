import mongoose, {  Schema } from "mongoose";

export const QuizzSchema = new Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    imagen: {type: String, required: true},
    preguntas: [{
        texto: {type: String, required: true},
        opciones: [{type: String, required: true}],
        respuesta_correcta: {type: Number, required: true}
    }],
    epoca: {type: mongoose.Schema.Types.ObjectId, ref: 'Epoca', required: true},
    personaje: {type: mongoose.Schema.Types.ObjectId, ref: 'Personaje', required: true},
    fecha_historica: {type: mongoose.Schema.Types.ObjectId, ref: 'Fecha', required: true}
}, {versionKey: false, timestamps: true}) 
