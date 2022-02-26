import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthControllerController } from './auth/auth-controller/auth-controller.controller';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo/beers')], // TODO: use config for this
  controllers: [AppController, AuthControllerController],
  providers: [AppService],
})
export class AppModule {}
