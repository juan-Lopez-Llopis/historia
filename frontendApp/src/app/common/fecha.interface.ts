import { Time } from "./epoca.interface";

export interface DateInterface {
    status: string;
    data: Fecha[];
}
export interface OneDate {
    status: string;
    data: Fecha;
}
export interface Fecha {
    _id?: string;
    titulo: string;
    descripcion: string;
    fecha: Date;
    epoca: string | Time
}