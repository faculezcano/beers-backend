import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Log, LogDocument, LogSchema } from './schemas/log.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logsService: LoggingService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap((data) => {
        this.log({
          user: request.user.email,
          request: `${request.method} ${request.originalUrl}`,
          at: new Date().toISOString(),
        });
      }),
    );
  }

  log(data) {
    this.logsService.log(data);
  }
}
