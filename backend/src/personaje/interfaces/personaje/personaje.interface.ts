import { Types } from "mongoose";
import { Epoca } from "src/epoca/interfaces/epoca/epoca.interface";

export interface Personaje {
    _id?: Types.ObjectId;
    nombre: string;
    image: string;
    biografia: string;
    fecha_nacimiento: string;
    fecha_muerte: string;
    lugar_nacimiento: string;
    lugar_muerte: string;
    epoca: Types.ObjectId | Epoca;
}
