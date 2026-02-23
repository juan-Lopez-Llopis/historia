import { Time } from "./epoca.interface";

export interface CharacterInterface {
    status: string;
    data: Character[];
}
export interface OneCharacter {
    status: string;
    data: Character;
}
export interface Character {
    _id: string;
    nombre: string;
    image: string;
    biografia: string;
    fecha_nacimiento: string;
    fecha_muerte: string;
    lugar_nacimiento: string;
    lugar_muerte: string;
    epoca:  Time;
}