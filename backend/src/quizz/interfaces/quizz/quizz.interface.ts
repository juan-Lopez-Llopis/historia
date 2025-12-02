import { Types } from "mongoose";
import { Epoca } from "src/epoca/interfaces/epoca/epoca.interface";
import { Fecha } from "src/fecha/interfaces/fecha/fecha.interface";
import { Personaje } from "src/personaje/interfaces/personaje/personaje.interface";

export interface Quizz {
    _id?: Types.ObjectId;
    titulo: string;
    descripcion: string;
    imagen: string;
    preguntas: Pregunta[];
    epoca: Types.ObjectId | Epoca;
    personaje: Types.ObjectId | Personaje;
    fecha_historica: Types.ObjectId | Fecha;
}

export interface Pregunta {
    _id: string;
    texto: string;
    imagen?: string;
    opciones: string[];
    respuesta_correcta: Number;
}
