import { Types } from "mongoose";

export interface Epoca {
    _id?: Types.ObjectId;
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    imagen?: string[];
    etapa: Etapa[];
}

export interface Etapa {
    _id: string;
    nombre: string;
    imagen?: string;
    fecha_inicio: string;
    fecha_fin: string;
    descripcion: string;
}
