import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './schemas/log.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
