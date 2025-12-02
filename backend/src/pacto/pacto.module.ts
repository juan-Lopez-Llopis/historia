import { Module } from '@nestjs/common';
import { PactoController } from './pacto.controller';
import { PactoService } from './pacto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PactoSchema } from './schemas/pacto.schema/pacto.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'Pacto',
          schema: PactoSchema,
          collection: 'pactos'
        }
      ]
    )
  ],
  controllers: [PactoController],
  providers: [PactoService]
})
export class PactoModule {}
