import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { BatallaService } from './batalla.service';
import { BatallaDto } from './dto/batalla.dto/batalla.dto';
import { PaginationDto } from 'src/pagination/paginationDto';

@Controller('api/v1/historia/batallas')
export class BatallaController {
    constructor(private readonly batallaService: BatallaService) {}

    @Post('')
    async create(@Body() batallaDto: BatallaDto) {
        try {
            const data = await this.batallaService.create(batallaDto)
            if(data) {
                return {
                    status: 'Created',
                    message: 'Battle created'
                }
            }else {
                throw new BadRequestException({
                    status: 'Error',
                    message: 'Error creating battle'
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
    async getBattles() {
        try {
            const data = await this.batallaService.getBatallas();
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

    @Get('/batalla/:id')
    async getBattle(@Param('id') id: string) {
        try {
            const data = await this.batallaService.getBatalla(id);
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
                message: e.messsage
            })
        }
    }

    @Get('/byName')
    async getBattleByName(@Query('nombre') name:string) {
        try {
            return await this.batallaService.getBatallaByName(name);
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message:e.message
            })
        }
    }

    @Get('/byDate')
    async getBattleByDate(@Query('fecha') fecha: string) {
        try {
            if (!fecha) {
                throw new BadRequestException('El parametro "fecha" es obligatorio')
            }

            const date = new Date(fecha);

            if (isNaN(date.getTime())) {
                throw new BadRequestException('La fecha proporcionada no es válida. Usa formato YYYY-MM-DD');

            }
            return await this.batallaService.getBatallaByDate(date);
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.response?.message || e.message
            });
        }
    }

    @Get('/byLocation')
    async getBattleByLocation(@Query('lugar') location: string) {
        try {
            return await this.batallaService.getBatallaByLocation(location);
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }
    @Get('/byTime')
    async getBattleByTime(@Query('epoca') time: string) {
        try {
            return await this.batallaService.getBatallaByTime(time);
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.response?.message || e.message
            })
        }
    }

    @Get('/paginated')
    async getBattlesPaginated(@Query()paginationDto: PaginationDto) {
        try {
            const page = paginationDto.page ?? 1;
            const limit = paginationDto.limit ?? 10;
            const data = await this.batallaService.getBatallaPaginated(page, limit);
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
    async updateBattle(@Param('id') id: string, @Body() batallaDto: BatallaDto) {
        try {
            const update = await this.batallaService.updateBatalla(id, batallaDto);

            if(!update) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Battle not found'
                })
            }
            return {
                status: 'Ok',
                message: 'Battle updated'
            }
        }catch (e) {
            if (e instanceof NotFoundException){
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }
    @Delete('/:id')
    async deleteBattle(@Param('id') id: string) {
        try {
            const deleted = await this.batallaService.deleteBatalla(id);

            if(!deleted) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Battle not found'
                })
            }
            return {
                status: 'Ok',
                message: 'Battle deleted'
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
