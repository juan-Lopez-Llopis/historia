import { Types } from "mongoose";
import { Epoca } from "src/epoca/interfaces/epoca/epoca.interface";

export interface Batalla {
    _id?: Types.ObjectId;
    nombre: string;
    imagen?: string;
    descripcion: string;
    fecha: Date;
    lugar: string;
    resultado: string;
    epoca: Types.ObjectId | Epoca;
}
