import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { PactoService } from './pacto.service';
import { PactoDto } from './dto/pacto.dto/pacto.dto';
import { PaginationDto } from 'src/pagination/paginationDto';

@Controller('api/v1/historia/pactos')
export class PactoController {
    constructor(private readonly pactoService: PactoService) {}

    @Post('')
    async create(@Body() pactoDto: PactoDto) {
        try {
            const data = await this.pactoService.create(pactoDto)
            if(data) {
                return {
                    status: 'Created',
                    message: 'Agreement created'
                }
            }else{
                throw new BadRequestException({
                    status: 'Error',
                    message: 'Error creating agreement'
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
    async getAgreements() {
        try {
            const data = await this.pactoService.getPactos();
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
    @Get('/pacto/:id')
    async getAgreement(@Param('id') id: string) {
        try {
            const data = await this.pactoService.getPacto(id);
            if(!data) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Agreement not found'
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

    @Get('/byName')
    async getAgreementByName(@Query('nombre') name: string) {
        try {
            return await this.pactoService.getPactoByName(name);
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Get('/byTime')
    async getAgreementByTime(@Query('epoca') time: string) {
        try {
            return await this.pactoService.getPactoByTime(time);
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.response?.message || e.message
            })
        }
    }
    //add 'byDate' and 'byLocation' if necessary

    @Get('paginated')
    async getAgreementsPaginated(@Query()paginationDto: PaginationDto) {
        try {
            const page = paginationDto.page ?? 1;
            const limit = paginationDto.limit ?? 10;
            const data = await this.pactoService.getPactoPaginated(page, limit);

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
    async updateAgreement(@Param('id') id: string, @Body() pactoDto: PactoDto) {
        try {
            const update = await this.pactoService.updatePacto(id, pactoDto);

            if (!update) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Agrrement not found'
                })
            }
            return {
                status: 'Ok',
                message: 'Agreement updated'
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
    async deleteAgreement(@Param('id') id: string) {
        try {
            const deleted = await this.pactoService.deletePacto(id);

            if (!deleted) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Agreement not found'
                })
            }
            return {
                status: 'Ok',
                message: 'Agreement deleted'
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
