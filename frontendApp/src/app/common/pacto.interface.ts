import { Time } from "./epoca.interface";

export interface PactInterface {
    status: string;
    data: Pact[];
}
export interface OnePact {
    status: string;
    data: Pact;
}
export interface Pact {
    _id: string;
    nombre: string;
    descripcion: string;
    fecha: Date;
    lugar: string;
    firmantes: string[];
    epoca: string | Time
}