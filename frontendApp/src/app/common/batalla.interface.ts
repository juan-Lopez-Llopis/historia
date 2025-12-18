import { Time } from "./epoca.interface";


export interface BattleInterface {
    status: string;
    data: Battle[];
}
export interface OneBattle {
    status: string;
    data: Battle;
}
export interface Battle {
    _id: string;
    nombre: string;
    imagen?: string;
    descripcion: string;
    fecha: Date;
    lugar: string;
    resultado: string;
    epoca: string | Time;
}