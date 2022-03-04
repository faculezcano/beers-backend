import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeersModule } from './beers/beers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    BeersModule,
    MongooseModule.forRoot('mongodb://mongo/beers'),
    UsersModule,
  ], // TODO: use config for this
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
