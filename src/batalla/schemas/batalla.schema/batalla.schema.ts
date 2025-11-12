import mongoose, { Schema } from "mongoose";

export const BatallaSchema = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    fecha: {type: Date, required: true},
    lugar: {type: String, required: true},
    resultado: {type: String, required: true},
    epoca: {type: mongoose.Schema.Types.ObjectId, ref: 'Epoca',required: true}
}, {versionKey: false, timestamps: true}) 
