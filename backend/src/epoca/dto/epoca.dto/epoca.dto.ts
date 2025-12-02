

export class EpocaDto {
    _id?: string;
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    imagen?: string[];
    etapa: EtapaDto[];
}

export class EtapaDto {
    _id: string;
    nombre: string;
    imagen?: string;
    fecha_inicio: string;
    fecha_fin: string;
    descripcion: string;
}
