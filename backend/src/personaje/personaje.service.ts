import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Personaje } from './interfaces/personaje/personaje.interface';
import { Model } from 'mongoose';
import { PersonajeDto } from './dto/personaje.dto/personaje.dto';

@Injectable()
export class PersonajeService {
    constructor(@InjectModel('Personaje') private personajeModel: Model<Personaje>) {}

    async create(personajeDto: PersonajeDto): Promise<any> {
        const personaje = new this.personajeModel(personajeDto);
        return personaje.save();
    }
    async getPersonajes(): Promise<Personaje[]> {
        return this.personajeModel.find().populate('epoca').exec();
    }
    async getPersonaje(id: string): Promise<any> {
        return this.personajeModel.findById(id);
    }
    async getPersonajeByName(nombre: string): Promise<Personaje[]> {
        const regex = new RegExp(nombre, 'i');
        return this.personajeModel.find({nombre: {$regex: regex}});
    }
    async getPersonajeByTime(epoca: string): Promise<Personaje[]> {
        const regex = new RegExp(epoca, 'i');
        return this.personajeModel.find()
        .populate('epoca')
        .where('epoca.nombre', regex)
        .exec();
    }
    async updatePersonaje(id: string, personajeDto: PersonajeDto): Promise<any> {
        return this.personajeModel.findByIdAndUpdate(
            id,
            {$set: personajeDto},
            {new: true}
        )
    }
    async deletePersonaje(id: string): Promise<any> {
        return this.personajeModel.findByIdAndDelete(id)
    }
    async getPersonajePaginated(page: number, limit: number): Promise<any> {
        const skip = (page - 1)*limit;
        const personaje = await this.personajeModel
            .find()
            .skip(skip)
            .limit(limit)
            .exec();
        const total = await this.personajeModel.countDocuments();
        return {
            data: personaje,
            info: {
                total,
                pageSize: limit,
                page
            }
        }
    }

  
 }
