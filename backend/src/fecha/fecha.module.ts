import { Module } from '@nestjs/common';
import { FechaController } from './fecha.controller';
import { FechaService } from './fecha.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FechaSchema } from './schemas/fecha.schema/fecha.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'Fecha',
          schema: FechaSchema,
          collection: 'fechas'
        }
      ]
    )
  ],
  controllers: [FechaController],
  providers: [FechaService]
})
export class FechaModule {}
