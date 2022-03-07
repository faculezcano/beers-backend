import { forwardRef, Module } from '@nestjs/common';
import { BeersService } from './beers.service';
import { BeersController } from './beers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Beer, BeerSchema } from './schemas/beer.schema';
import { LogsModule } from '../logs/logs.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogInterceptor } from '../logs/log.interceptor';
import { Log, LogSchema } from '../logs/schemas/log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Beer.name, schema: BeerSchema }]),
    LogsModule,
  ],
  controllers: [BeersController],
  providers: [
    BeersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
  ],
})
export class BeersModule {}
