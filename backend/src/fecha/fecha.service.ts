import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fecha } from './interfaces/fecha/fecha.interface';
import { FechaDto } from './dto/fecha.dto/fecha.dto';

@Injectable()
export class FechaService {
    constructor(@InjectModel('Fecha') private readonly fechaModel: Model<Fecha>) {}

    async create(fechaDto: FechaDto): Promise<any> {
        const fecha = new this.fechaModel(fechaDto);
        return fecha.save();
    }
    async getFechas(): Promise<Fecha[]> {
        return this.fechaModel.find();
    }
    async getFecha(id: string): Promise<any> {
        return this.fechaModel.findById(id);
    }
    async getFechaByTitle(titulo: string): Promise<Fecha[]> {
        const regex = new RegExp(titulo, 'i');
        return this.fechaModel.find({titulo: {$regex: regex}});
    }
    async getFechaByDate(fecha: Date): Promise<Fecha[]> {
        const start = new Date(fecha);
        start.setUTCHours(0,0,0,0);

        const end = new Date(fecha);
        end.setUTCHours(23,59,59,999)

        return this.fechaModel.find({fecha: {$gte: start, $lte: end}});
    }
    async getFechaByTime(epoca: string): Promise<Fecha[]> {
        const regex = new RegExp(epoca, 'i');
        return this.fechaModel.find()
        .populate('epoca')
        .where('epoca.nombre', regex)
        .exec();
    }
    async updateFecha(id: string, fechaDto: FechaDto): Promise<any> {
        return this.fechaModel.findByIdAndUpdate(
            id,
            {$set: fechaDto},
            {new: true}
        )
    }
    async deleteFecha(id: string): Promise<any> {
        return this.fechaModel.findByIdAndDelete(id)
    }
    async getFechaPaginated(page: number, limit: number): Promise<any> {
        const skip = (page - 1)*limit;
        const fechas = await this.fechaModel
        .find()
        .skip(skip)
        .limit(limit)
        .exec();
        const total = await this.fechaModel.countDocuments();
        return {
            data: fechas,
            info: {
                total,
                pageSize: limit,
                page
            }
        }
    }
}
