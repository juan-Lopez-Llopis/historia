import { Types } from "mongoose";
import { Epoca } from "src/epoca/interfaces/epoca/epoca.interface";

export interface Fecha {
    _id?: Types.ObjectId;
    titulo: string;
    descripcion: string;
    fecha: Date;
    epoca: Types.ObjectId | Epoca;
}
