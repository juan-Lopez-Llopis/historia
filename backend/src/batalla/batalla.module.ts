import { Module } from '@nestjs/common';
import { BatallaController } from './batalla.controller';
import { BatallaService } from './batalla.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BatallaSchema } from './schemas/batalla.schema/batalla.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'Batalla',
          schema: BatallaSchema,
          collection: 'batallas'
        }
      ]
    )
  ],
  controllers: [BatallaController],
  providers: [BatallaService]
})
export class BatallaModule {}
