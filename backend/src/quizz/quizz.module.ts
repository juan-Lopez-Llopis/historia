import { Module } from '@nestjs/common';
import { QuizzController } from './quizz.controller';
import { QuizzService } from './quizz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzSchema } from './schemas/quizz.schema/quizz.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'Quiz',
          schema: QuizzSchema,
          collection: 'quizzes'
        }
      ]
    )
  ],
  controllers: [QuizzController],
  providers: [QuizzService]
})
export class QuizzModule {}
