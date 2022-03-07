import { Test, TestingModule } from '@nestjs/testing';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';
import { CreateBeerDto } from './dto/create-beer.dto';
import { LogsModule } from '../logs/logs.module';
import { LogsService } from '../logs/logs.service';

describe('BeersController', () => {
  let controller: BeersController;
  let service: BeersService;

  const createBeerDto: CreateBeerDto = {
    name: 'APA',
    ingredients: ['1', '2'],
  };

  const mockBeer = {
    _id: 'id1',
    name: 'APA',
    ingredients: ['1', '2'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeersController],
      providers: [
        {
          provide: LogsService,
          useValue: {},
        },
        {
          provide: BeersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: 'IPA',
                ingredients: ['cebada', 'lúpulo'],
              },
              {
                name: 'Stout',
                ingredients: ['cebada', 'cebada tostada', 'lúpulo'],
              },
            ]),
            create: jest.fn().mockResolvedValue(createBeerDto),
            search: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({
              _id: 1,
              name: 'IPA',
            }),
            update: jest.fn().mockResolvedValue({
              _id: 1,
              name: 'IPA',
            }),
            remove: jest.fn().mockResolvedValue({
              _id: 1,
              name: 'IPA',
            }),
            getTopUsedIngredients: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<BeersController>(BeersController);
    service = module.get<BeersService>(BeersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new beer', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockBeer);

      await controller.create(createBeerDto);
      expect(createSpy).toHaveBeenCalledWith(createBeerDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of beers', function () {
      expect(controller.findAll({})).resolves.toEqual([
        {
          name: 'IPA',
          ingredients: ['cebada', 'lúpulo'],
        },
        {
          name: 'Stout',
          ingredients: ['cebada', 'cebada tostada', 'lúpulo'],
        },
      ]);
    });
  });

  describe('search', () => {
    it('should return an array of keywords', function () {
      expect(controller.search({ q: 'test' })).resolves.toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a beer', function () {
      expect(controller.findOne('1')).resolves.toEqual({
        _id: 1,
        name: 'IPA',
      });
    });
  });

  describe('update', () => {
    it('should update and return a beer', function () {
      expect(controller.update('1', {})).resolves.toEqual({
        _id: 1,
        name: 'IPA',
      });
    });
  });

  describe('remove', () => {
    it('should remove and return a beer', function () {
      expect(controller.remove('1')).resolves.toEqual({
        _id: 1,
        name: 'IPA',
      });
    });
  });

  describe('getTopUsedIngredients', () => {
    it('should get top 10 most used ingredients', function () {
      expect(controller.getTopUsedIngredients()).resolves.toEqual([]);
    });
  });
});
