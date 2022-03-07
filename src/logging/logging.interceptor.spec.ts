import { LoggingInterceptor } from './logging.interceptor';
import { LoggingService } from './logging.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BeersService } from '../beers/beers.service';
import { BeersController } from '../beers/beers.controller';
import { ExecutionContext } from '@nestjs/common';
import { Observable, of } from 'rxjs';

const executionContext = {
  switchToHttp: jest.fn(() => ({
    getRequest: () => ({
      originalUrl: '/',
      method: 'GET',
      params: undefined,
      query: undefined,
      body: undefined,
      user: {
        id: 1,
        email: 'admin@example.com',
      },
    }),
    getResponse: () => ({
      statusCode: 200,
    }),
    getNext: () => jest.fn(),
  })),
  // method I needed recently so I figured I'd add it in
  getType: jest.fn(() => 'http'),
  getClass: jest.fn(),
  getHandler: jest.fn(),
  getArgs: jest.fn(),
  getArgByIndex: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};
describe('LoggingInterceptorInterceptor', () => {
  let interceptor: LoggingInterceptor;
  let service: LoggingService;
  let myDataObject: any;

  const callHandler = {
    handle: jest.fn(() => of(myDataObject)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: LoggingService,
          useValue: {
            log: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<LoggingService>(LoggingService);
    interceptor = new LoggingInterceptor(service);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  describe('intercept()', () => {
    it('should store a new log', () => {
      const logSpy = jest
        .spyOn(service, 'log')
        .mockResolvedValueOnce(undefined);

      const responseInterceptor: Observable<any> = interceptor.intercept(
        executionContext as ExecutionContext,
        callHandler,
      );

      responseInterceptor.subscribe({
        next: () => {
          expect(logSpy).toBeCalled();
        },
        error: (error) => {
          throw error;
        },
        complete: () => {
          expect(logSpy).toBeCalledTimes(1);
        },
      });
    });
  });
});
