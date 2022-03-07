import { forwardRef, Module } from '@nestjs/common';
import { BeersService } from './beers.service';
import { BeersController } from './beers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Beer, BeerSchema } from './schemas/beer.schema';
import { LoggingModule } from '../logging/logging.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { Log, LogSchema } from '../logging/schemas/log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Beer.name, schema: BeerSchema }]),
    LoggingModule,
  ],
  controllers: [BeersController],
  providers: [
    BeersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class BeersModule {}
