import mongoose, { Schema } from "mongoose";


export const FechaSchema = new Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    fecha: {type: Date, required: true},
    epoca: {type: mongoose.Schema.Types.ObjectId, ref: 'Epoca', required: true}
}, {versionKey: false, timestamps: true}) 
