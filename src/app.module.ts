import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BeersModule } from './beers/beers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    LoggingModule,
    BeersModule,
    MongooseModule.forRoot('mongodb://mongo/beers'), // TODO: use config for this
  ],
  providers: [AppService],
})
export class AppModule {}
