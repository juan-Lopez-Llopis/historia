import { Module } from '@nestjs/common';
import { PersonajeController } from './personaje.controller';
import { PersonajeService } from './personaje.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonajeSchema } from './schemas/personaje.schema/personaje.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'Personaje',
          schema: PersonajeSchema,
          collection: 'personajes'
        }
      ]
    )
  ],
  controllers: [PersonajeController],
  providers: [PersonajeService]
})
export class PersonajeModule {}
