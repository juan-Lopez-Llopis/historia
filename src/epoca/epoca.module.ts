import { Module } from '@nestjs/common';
import { EpocaController } from './epoca.controller';
import { EpocaService } from './epoca.service';

@Module({
  controllers: [EpocaController],
  providers: [EpocaService]
})
export class EpocaModule {}
