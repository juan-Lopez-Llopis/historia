import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BatallaModule } from './batalla/batalla.module';
import { EpocaModule } from './epoca/epoca.module';
import { PersonajeModule } from './personaje/personaje.module';
import { FechaModule } from './fecha/fecha.module';
import { PactoModule } from './pacto/pacto.module';
import { QuizzModule } from './quizz/quizz.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DBURL as string),
    BatallaModule,
    EpocaModule,
    PersonajeModule,
    FechaModule,
    PactoModule,
    QuizzModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
