import { Module } from '@nestjs/common';
import { EpocaController } from './epoca.controller';
import { EpocaService } from './epoca.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EpocaSchema } from './schemas/epoca.schema/epoca.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'Epoca',
          schema: EpocaSchema,
          collection: 'epocas'
        }
      ]
    )
  ],
  controllers: [EpocaController],
  providers: [EpocaService]
})
export class EpocaModule {}
