import { Schema } from "mongoose";

export const EpocaSchema = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required:true},
})
