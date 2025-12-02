import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Batalla } from './interfaces/batalla/batalla.interface';
import { Model } from 'mongoose';
import { BatallaDto } from './dto/batalla.dto/batalla.dto';

@Injectable()
export class BatallaService {
    constructor(@InjectModel('Batalla') private batallaModel: Model<Batalla>) {
    }

    async create(batallaDto: BatallaDto): Promise<any> {
        const batalla = new this.batallaModel(batallaDto);
        return batalla.save();
    }
    async getBatallas(): Promise<Batalla[]> {
        return this.batallaModel.find();
    }
    async getBatalla(id: string): Promise<any> {
        return this.batallaModel.findById(id);
    }
    async getBatallaByName(nombre: string): Promise<Batalla[]> {
        const regex = new RegExp(nombre, 'i');
        return this.batallaModel.find({nombre: {$regex: regex}});
    }
     async getBatallaByDate(fecha: Date): Promise<Batalla[]> {

        const start = new Date(fecha);
        start.setHours(0,0,0,0);

        const end = new Date(fecha);
        end.setHours(23,59,59,999)

        return this.batallaModel.find({fecha: {$gte: start, $lte: end}});
    }
     async getBatallaByLocation(lugar: string): Promise<Batalla[]> {
        const regex = new RegExp(lugar, 'i');
        return this.batallaModel.find({lugar: {$regex: regex}});
    }
     async getBatallaByTime(epoca: string): Promise<Batalla[]> {
        const regex = new RegExp(epoca, 'i');
        return this.batallaModel.find()
        .populate('epoca')
        .where('epoca.nombre', regex)
        .exec();
    }
    async updateBatalla(id: string, batallaDto: BatallaDto): Promise<any> {
        return this.batallaModel.findByIdAndUpdate(
            id,
            {$set: batallaDto},
            {new: true}
        )
    }
    async deleteBatalla(id: string): Promise<any> {
        return this.batallaModel.findByIdAndDelete(id)
    }
    async getBatallaPaginated(page: number, limit: number): Promise<any> {
        const skip = (page - 1)*limit;
        const batallas = await this.batallaModel
            .find()
            .skip(skip)
            .limit(limit)
            .exec();
        const total = await this.batallaModel.countDocuments();
        return {
            data: batallas,
            info: {
                total,
                pageSize: limit,
                page
            }
        }

    }


}
