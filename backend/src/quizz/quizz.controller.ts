import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { QuizzDto } from './dto/quizz.dto/quizz.dto';
import { NestApplication } from '@nestjs/core';
import { PaginationDto } from 'src/pagination/paginationDto';

@Controller('api/v1/historia/quizzes')
export class QuizzController {
    constructor(private readonly quizService: QuizzService) {}

    @Post('')
    async create(@Body() quizDto: QuizzDto) {
        try {
            const data = await this.quizService.create(quizDto)
            if (data) {
                return {
                    status: 'Created',
                    message: 'Quiz created'
                }
            }else {
                throw new BadRequestException({
                    status: 'Error',
                    message: 'Error creating quiz'
                })
            }
        }catch (e) {
            if (e instanceof BadRequestException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }
    @Get('')
    async getQuizzes() {
        try {
            const data = await this.quizService.getQuizzes();
            return {
                status: 'Ok',
                data
            }
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Get('/quiz/:id')
    async getQuiz(@Param('id') id: string) {
        try {
            const data = await this.quizService.getQuiz(id);
            if (!data) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Battle not found'
                })
            }
            return {
                status: 'Ok',
                data
            }
        }catch (e) {
            return new BadRequestException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Get('/byTitle')
    async getQuizByTitle(@Query('titulo') title: string) {
        try {
            const data = await this.quizService.getQuizByTitle(title);
            return {
                status: 'Ok',
                data
            }
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            });
        }
    }
    @Get('/byTime')
    async getQuizByTime(@Query('epoca') time: string) {
        try {
            const data = await this.quizService.getQuizByTime(time);
            return {
                status: 'Ok',
                data
            }
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                messsage: e.message
            });
        }
    }
    @Get('/byCharacter')
    async getQuizByCharacter(@Query('personaje') character: string) {
        try {
            const data = await this.quizService.getQuizByPersonaje(character);
            return {
                status: 'Ok',
                data
            }
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }
    @Get('byDate')
    async getQuizByDate(@Query('fecha_historica') date: string) {
        try {
            const data = await this.quizService.getQuizByFechaHistorica(date);
            return {
                status: 'Ok',
                data
            };
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.response?.message || e.message
            })
        }
    }
    @Get('paginated')
    async getQuizPaginated(@Query() paginationDto: PaginationDto) {
        try {
            const page = paginationDto.page ?? 1;
            const limit = paginationDto.limit ?? 10;
            const data = await this.quizService.getQuizPaginated(page, limit);
            return {
                status: 'Ok',
                ...data
            }
        }catch (e) {
            throw new BadRequestException({
                status: 'Error',
                message: e. message
            });
        }
    }
    @Put('/:id')
    async updateQuiz(@Param('id') id: string, @Body() quizDto: QuizzDto) {
        try {
            const update = await this.quizService.updateQuiz(id,quizDto);

            if (!update) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Quiz not found'
                })
            }
            return {
                status: 'Ok',
                message: 'Quiz updated'
            }
        }catch (e) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }
    @Delete('/:id')
    async deleteQuiz(@Param('id') id: string) {
        try {
            const deleted = await this.quizService.deleteQuiz(id);

            if(!deleted) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Quiz not found'
                })
            }
            return {
                status: 'Ok',
                message: 'Quiz deleted'
            }
        }catch (e) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

}
