import { Time } from "./epoca.interface";
import { Fecha } from "./fecha.interface";
import { Character } from "./personaje.interface";

export interface QuizInterface {
    status: string;
    data: Quiz[];
}
export interface OneQuiz {
    status: string;
    data: Quiz;
}
export interface Quiz {
    _id: string;
    titulo: string;
    descripcion: string;
    imagen: string;
    preguntas: Pregunta[];
    epoca: string | Time;
    personaje: string | Character;
    fecha_historica: string | Fecha
}
export interface Pregunta {
    _id: string;
    texto: string;
    imagen?: string;
    opciones: string[];
    respuesta_correcta: Number;
}