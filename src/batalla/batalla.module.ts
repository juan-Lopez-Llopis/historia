import { Module } from '@nestjs/common';
import { BatallaController } from './batalla.controller';
import { BatallaService } from './batalla.service';

@Module({
  controllers: [BatallaController],
  providers: [BatallaService]
})
export class BatallaModule {}
