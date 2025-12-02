import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { EpocaService } from './epoca.service';
import { EpocaDto } from './dto/epoca.dto/epoca.dto';

@Controller('api/v1/historia/epocas')
export class EpocaController {
    constructor(private readonly epocaService: EpocaService) {}

    @Post('')
    async create(@Body() epocaDto: EpocaDto) {
        try{
            const data = await this.epocaService.create(epocaDto)
            if(data) {
                return {
                    status: 'Created',
                    message: 'Time created'
                }
            }else {
                throw new BadRequestException({
                    status: 'Error',
                    message: 'Error creating time'
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
    async getTimes() {
        try {
            const data = await this.epocaService.getEpocas();
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
    @Get('/epoca/:id')
    async getTime(@Param('id') id: string) {
        try {
            const data = await this.epocaService.getEpoca(id);
            if(!data) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Time not found'
                })
            }
            return {
                status: 'Ok',
                data
            }
            
        } catch (e) {
            return new BadRequestException({
                status: 'Error',
                message: e.message
            })
        }
    }
    @Get('/byName')
    async getTimeByName(@Query('nombre') name: string) {
        try {
            return await this.epocaService.getEpocaByName(name);
        } catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }
    @Put('/:id')
    async updateTime(@Param('id') id: string, @Body() EpocaDto: EpocaDto) {
        try {
            const update = await this.epocaService.updateEpoca(id, EpocaDto);

            if(!update) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Time not found'
                })
            }
            return {
                status: 'Ok',
                message: 'Time updated'
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
    async deleteTime(@Param('id') id: string) {
        try {
            const deleted = await this.epocaService.deleteEpoca(id)

            if(!deleted) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Time not found'
                })
            }
            return {
                status: 'Ok',
                message: 'Time deleted'
            }
        }catch (e) {
            if(e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }
}
