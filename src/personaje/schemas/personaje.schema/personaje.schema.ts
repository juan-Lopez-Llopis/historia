import mongoose, { Schema } from "mongoose";

export const PersonajeSchema = new Schema({
    nombre: {type: String, required: true},
    image: {type: String, required: true},
    biografia: {type: String, required: true},
    fecha_nacimiento: {type: String, required: true},
    fecha_muerte: {type: String, required: true},
    lugar_nacimiento: {type: String, required: true},
    lugar_muerte: {type: String,requires: true},
    epoca: {type: mongoose.Schema.Types.ObjectId, ref: 'Epoca',requires: true}
}, {versionKey: false,}) 
