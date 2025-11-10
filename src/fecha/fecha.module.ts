import { Module } from '@nestjs/common';
import { FechaController } from './fecha.controller';
import { FechaService } from './fecha.service';

@Module({
  controllers: [FechaController],
  providers: [FechaService]
})
export class FechaModule {}
