import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeersModule } from './beers/beers.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    BeersModule,
    MongooseModule.forRoot('mongodb://mongo/beers')], // TODO: use config for this
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
