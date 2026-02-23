import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Epoca } from './interfaces/epoca/epoca.interface';
import { EpocaDto } from './dto/epoca.dto/epoca.dto';

@Injectable()
export class EpocaService {
    constructor(@InjectModel('Epoca') private epocaModel: Model<Epoca>) {}

    async create(epocaDto: EpocaDto): Promise<any> {
        const epoca = new this.epocaModel(epocaDto);
        return epoca.save();
    }
    async getEpocas(): Promise<Epoca[]> {
        return this.epocaModel.find()
                               .sort({orden: 1}) ;
    }
    async getEpoca(id: string): Promise<any> {
        return this.epocaModel.findById(id);
    }
    async getEpocaByName(nombre: string): Promise<Epoca[]> {
        const regex = new RegExp(nombre, 'i');
        return this.epocaModel.find({nombre: {$regex: regex}});
    }
    async updateEpoca(id: string, epocaDto: EpocaDto): Promise<any> {
        return this.epocaModel.findByIdAndUpdate(
            id,
            {$set: epocaDto},
            {new: true}
        )
    }
    async deleteEpoca(id: string): Promise<any> {
        return this.epocaModel.findByIdAndDelete(id)
    }
}
