import { Test, TestingModule } from '@nestjs/testing';
import { LoggingService } from './logging.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Beer } from '../beers/schemas/beer.schema';
import { CreateBeerDto } from '../beers/dto/create-beer.dto';
import { CreateLogDto } from './dto/create-log.dto';
import { Log } from './schemas/log.schema';

const createLogDto: CreateLogDto = {
  user: 'admin@example.com',
  request: 'test',
  at: 'now',
};

describe('LogsService', () => {
  let service: LoggingService;
  let model: Model<Log>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggingService,
        {
          provide: getModelToken('Log'),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LoggingService>(LoggingService);
    model = module.get<Model<Log>>(getModelToken('Log'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('log', () => {
    it('should store a log', async () => {
      const modelSpy = jest.spyOn(model, 'create').mockReturnValue(undefined);
      await service.log(createLogDto);
      expect(modelSpy).toBeCalled();
    });
  });
});
