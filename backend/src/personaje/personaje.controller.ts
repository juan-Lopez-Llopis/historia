import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { PersonajeService } from './personaje.service';
import { PersonajeDto } from './dto/personaje.dto/personaje.dto';
import { PaginationDto } from 'src/pagination/paginationDto';

@Controller('api/v1/historia/personajes')
export class PersonajeController {
    constructor(private readonly personajeService: PersonajeService) {}

    @Post('')
    async create(@Body() personajeDto: PersonajeDto) {
        try {
            const data = await this.personajeService.create(personajeDto);
            if(data) {
                return {
                    status: 'Created',
                    message: 'Character created'
                }
            }else {
                throw new BadRequestException({
                    status: 'Error',
                    message: 'Error creating character'
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
    async getCharacters() {
        try {
            const data =  await this.personajeService.getPersonajes();
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

    @Get('/personaje/:id')
    async getCharacter(@Param('id') id: string) {
        try {
            const data = await this.personajeService.getPersonaje(id);
            if (!data) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Character not found'
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
    async getCharacterByName(@Query('nombre') name: string) {
        try {
            return await this.personajeService.getPersonajeByName(name);
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Get('/byTime')
    async getCharacterByTime(@Query('epoca') time: string) {
        try {
            return await this.personajeService.getPersonajeByTime(time);
        }catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.response?.message || e.message
            })
        }
    }

    @Get('paginated')
    async getCharacterPaginated(@Query()paginationDto: PaginationDto) {
        try {
            const page = paginationDto.page ?? 1;
            const limit = paginationDto.limit ?? 10;
            const data = await this.personajeService.getPersonajePaginated(page, limit);
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
    async updateCharacter(@Param('id') id: string, @Body() personajeDto: PersonajeDto) {
        try {
            const update = await this.personajeService.updatePersonaje(id, personajeDto);

            if (!update) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Character not found'
                })
            }
            return {
                status:'Ok',
                message: 'Character updated'
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
    async deleteCharacter(@Param('id') id: string) {
        try {
            const deleted = await this.personajeService.deletePersonaje(id);

            if (!deleted) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Character not found'
                })
            }
            return {
                status: 'Ok',
                message: 'Character deleted'
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
