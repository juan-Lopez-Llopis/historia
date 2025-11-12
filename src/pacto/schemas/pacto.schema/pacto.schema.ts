import mongoose, { Schema } from "mongoose";

export const PactoSchema = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    fecha: {type: Date, required: true},
    firmantes: [{type: String, required: true}],
    epoca: {type: mongoose.Schema.Types.ObjectId, ref: 'Epoca', required: true}
}, {versionKey: false, timestamps: true}) 
