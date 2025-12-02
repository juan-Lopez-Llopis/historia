import { Types } from "mongoose";
import { Epoca } from "src/epoca/interfaces/epoca/epoca.interface";

export interface Pacto {
    _id?: Types.ObjectId;
    nombre: string;
    descripcion: string;
    fecha: Date;
    lugar: string;
    firmantes: string[];
    epoca: Types.ObjectId | Epoca;
}
