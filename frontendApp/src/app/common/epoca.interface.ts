export interface TimeInterface {
    status: string;
    data: Time[];
}
export interface OneTime {
    status: string;
    data: Time;
}
export interface Time {
    _id: string;
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