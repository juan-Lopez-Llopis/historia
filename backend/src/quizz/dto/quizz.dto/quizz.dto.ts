export class QuizzDto {
    _id?: string;
    titulo: string;
    descripcion: string;
    imagen: string;
    preguntas: PreguntaDto[];
    epoca: string;
    personaje: string;
    fecha_historica: string;
}

export class PreguntaDto {
    _id: string;
    texto: string;
    imagen?: string;
    opciones: string[];
    respuesta_correcta: Number;
}
