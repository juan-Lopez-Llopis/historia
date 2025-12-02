import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pacto } from './interfaces/pacto/pacto.interface';
import { PactoDto } from './dto/pacto.dto/pacto.dto';

@Injectable()
export class PactoService {
    constructor(@InjectModel('Pacto') private pactoModel: Model<Pacto>) {}

    async create(pactoDto: PactoDto): Promise<any> {
        const pacto = new this.pactoModel(pactoDto);
        return pacto.save();
    }
    async getPactos(): Promise<Pacto[]> {
        return this.pactoModel.find();
    }
    async getPacto(id: string): Promise<any> {
        return this.pactoModel.findById(id);
    }
    async getPactoByName(nombre: string): Promise<Pacto[]> {
        const regex = new RegExp(nombre, 'i');
        return this.pactoModel.find({nombre: {$regex: regex}});
    }
    async getPactoByDate(fecha: Date): Promise<Pacto[]> {
        const start = new Date(fecha);
        start.setHours(0,0,0,0);

        const end = new Date(fecha);
        end.setHours(23,59,59,999)

        return this.pactoModel.find({fecha: {$gte:start, $lte: end}});
    }
    async getPactoByLocation(lugar: string): Promise<Pacto[]> {
        const regex = new RegExp(lugar, 'i');
        return this.pactoModel.find({lugar: {$regex: regex}});
    }
    async getPactoByTime(epoca: string): Promise<Pacto[]> {
        const regex = new RegExp(epoca, 'i');
        return this.pactoModel.find()
        .populate('epoca')
        .where('epoca.nombre', regex)
        .exec();
    }
    async updatePacto(id: string, pactoDto: PactoDto): Promise<any> {
        return this.pactoModel.findByIdAndUpdate(
            id,
            {$set: pactoDto},
            {new: true}
        )
    }
    async deletePacto(id: string): Promise<any> {
        return this.pactoModel.findByIdAndDelete(id)
    }
    async getPactoPaginated(page: number, limit: number): Promise<any> {
        const skip = (page - 1)*limit;
        const pactos = await this.pactoModel
            .find()
            .skip(skip)
            .limit(limit)
            .exec();
        const total = await this.pactoModel.countDocuments();
        return {
            data: pactos,
            info: {
                total,
                pageSize: limit,
                page
            }
        }

    }
 }
