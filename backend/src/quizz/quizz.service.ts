import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quizz } from './interfaces/quizz/quizz.interface';
import { Model } from 'mongoose';
import { QuizzDto } from './dto/quizz.dto/quizz.dto';

@Injectable()
export class QuizzService {
    constructor(@InjectModel('Quiz')private quizModel: Model<Quizz>) {}

    async create(quizDto: QuizzDto): Promise<any> {
        const pregunta = new this.quizModel(quizDto);
        return pregunta.save();
    }
    async getQuizzes(): Promise<Quizz[]> {
        return this.quizModel
            .find()
            .populate('epoca')
            .populate('personaje')
            .populate('fecha_historica')
            .exec();
    }
    async getQuiz(id: string): Promise<any> {
        return this.quizModel
            .findById(id)
            .populate('epoca')
            .populate('personaje')
            .populate('fecha_historica')
            .exec();
    }
    async getQuizByTitle(titulo: string): Promise<Quizz[]> {
        const regex = new RegExp(titulo, 'i');
        return this.quizModel.find({titulo: {$regex: regex}});
    }
    async getQuizByTime(epoca: string): Promise<Quizz[]> {
        const regex = new RegExp(epoca, 'i');
        return this.quizModel
            .find()
            .populate({
                path: 'epoca',
                match: { nombre: {$regex: regex}}
            })
            .populate('personaje')
            .populate('fecha_historica')
            .exec();
    }
    async getQuizByPersonaje(nombre: string): Promise<Quizz[]> {
        const regex = new RegExp(nombre, 'i');
        return this.quizModel
            .find()
            .populate({
                path: 'personaje',
                match: {nombre: {$regex: regex}}
            })
            .populate('epoca')
            .populate('fecha_historica')
            .exec();
    }
    async getQuizByFechaHistorica(nombre: string): Promise<Quizz[]> {
        const regex = new RegExp(nombre, 'i');
        return this.quizModel
            .find()
            .populate({
                path: 'fecha_historica',
                match: {nombre: {$regex: regex}}
            })
            .populate('epoca')
            .populate('personaje')
            .exec();
    }
    async updateQuiz(id: string, quizDto: QuizzDto): Promise<any> {
        return this.quizModel.findByIdAndUpdate(
            id,
            {$set: quizDto},
            {new: true}
        );
    }
    async deleteQuiz(id: string): Promise<any> {
        return this.quizModel.findByIdAndDelete(id)
    }
    async getQuizPaginated(page: number, limit: number): Promise<any> {
        const skip = (page - 1)* limit;

        const quizzes = await this.quizModel
            .find()
            .skip(skip)
            .limit(limit)
            .populate('epoca')
            .populate('personaje')
            .populate('fecha_historica')
            .exec();

            const total = await this.quizModel.countDocuments();

            return {
                data: quizzes,
                info: {
                    total,
                    pageSize: limit,
                    page
                }
            }
    }

}
