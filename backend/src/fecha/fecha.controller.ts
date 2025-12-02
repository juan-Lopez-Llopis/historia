import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { FechaService } from './fecha.service';
import { FechaDto } from './dto/fecha.dto/fecha.dto';
import { PaginationDto } from 'src/pagination/paginationDto';

@Controller('api/v1/historia/fechas')
export class FechaController {
    constructor(private readonly fechaService: FechaService) {}

    @Post('')
    async create(@Body() fechaDto: FechaDto) {
        try {
            const data = await this.fechaService.create(fechaDto);
            if(data) {
                return {
                    status: 'Created',
                    message: 'Date created'
                }
            }else {
                throw new BadRequestException({
                    status: 'Error',
                    message: 'Error creating date'
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
     async getDates() {
        try {
            const data = await this.fechaService.getFechas();
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
    @Get('/fecha/:id')
    async getDate(@Param('id') id: string) {
        try {
            const data = await this.fechaService.getFecha(id);
            if(!data) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Date not found'
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
    @Get('/ByTitle')
    async getDateByTitle(@Query('titulo') title: string) {
        try {
            return await this.fechaService.getFechaByTitle(title);
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }
    @Get('/ByDate')
    async getDateByDate(@Query('fecha') fecha: string) {
        try {
            if(!fecha) {
                throw new BadRequestException('El parámetro "fecha" es obligatorio')
            }
            const date = new Date(fecha);

            if (isNaN(date.getTime())) {
                throw new BadRequestException('La fecha proporcionada no el válida. Usa el formato YYYY-MM-DD');
            }
            return await this.fechaService.getFechaByDate(date);
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.response?.message || e.message
            })
        }
    }
    @Get('/byTime')
    async getDateByTime(@Query('epoca') time: string) {
        try {
            return await this.fechaService.getFechaByTime(time);
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.response?.message || e.message
            })
        }
    }

    @Get('paginated')
    async getDatesPaginated(@Query()paginationDto: PaginationDto) {
        try {
            const page = paginationDto.page ?? 1;
            const limit = paginationDto.limit ?? 10;
            const data = await this.fechaService.getFechaPaginated(page, limit);
            return {
                status: 'Ok',
                ...data
            }
        }catch (e) {
            throw new BadRequestException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Put('/:id')
    async updateDate(@Param('id') id: string, @Body() fechaDto: FechaDto) {
        try {
            const update = await this. fechaService.updateFecha(id, fechaDto);

            if(!update) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Date not found'
                })
            }
            return {
                status: 'Ok',
                message: 'Date updated'
            }
        }catch (e) {
            if(e instanceof NotFoundException){
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }
     @Delete('/:id')
        async deleteDate(@Param('id') id: string) {
            try {
                const deleted = await this.fechaService.deleteFecha(id);

                if(!deleted) {
                    throw new NotFoundException({
                        status: 'Error',
                        message: 'Date not found'
                    })
                }
                return {
                    status: 'Ok',
                    message: 'Date deleted'
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
