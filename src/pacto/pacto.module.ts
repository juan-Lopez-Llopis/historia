import { Module } from '@nestjs/common';
import { PactoController } from './pacto.controller';
import { PactoService } from './pacto.service';

@Module({
  controllers: [PactoController],
  providers: [PactoService]
})
export class PactoModule {}
