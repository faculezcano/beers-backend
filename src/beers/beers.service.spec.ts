import { Test, TestingModule } from '@nestjs/testing';
import { BeersService } from './beers.service';
import { Beer } from './schemas/beer.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const mockBeer = {
  name: 'APA',
  ingredients: ['cebada', 'lúpulo'],
};

describe('BeersService', () => {
  let service: BeersService;
  let model: Model<Beer>;

  const mockBeers = [
    {
      name: 'IPA',
      ingredients: ['cebada', 'lúpulo'],
    },
    {
      name: 'Stout',
      ingredients: ['cebada', 'cebada tostada', 'lúpulo'],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BeersService,
        {
          provide: getModelToken('Beer'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockBeer),
            constructor: jest.fn().mockResolvedValue(mockBeer),
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            updateOne: jest.fn(),
            findOneAndRemove: jest.fn(),
            exec: jest.fn(),
            sort: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BeersService>(BeersService);
    model = module.get<Model<Beer>>(getModelToken('Beer'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new beer', async () => {
      const createSpy = jest.spyOn(model, 'create').mockReturnValue(undefined);
      await service.create(mockBeer);
      expect(createSpy).toBeCalled();
    });
  });

  describe('findAll', () => {
    it('should return all beers', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(mockBeers),
        }),
        exec: jest.fn().mockResolvedValueOnce(mockBeers),
      } as any);
      const beers = await service.findAll({ q: 'test', order: 'name' });
      expect(beers).toEqual(mockBeers);
    });
  });

  describe('findOne', () => {
    it('should return all beers', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockBeer),
      } as any);
      const beer = await service.findOne('1');
      expect(beer).toEqual(mockBeer);
    });
  });

  describe('search', () => {
    it('should return keywords', async () => {
      const seachSpy = jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([
          {
            name: 'test',
            ingredients: {
              hops: [{ name: 'hop' }],
              malt: [{ name: 'malt' }],
              yeast: 'test',
            },
          },
        ]),
      } as any);
      await service.search('test');
      expect(seachSpy).toBeCalled();
    });
  });

  describe('update', () => {
    it('should update a beer', async () => {
      const seachSpy = jest.spyOn(model, 'updateOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockBeer),
      } as any);
      const beer = await service.update(1, {});
      expect(beer).toEqual(mockBeer);
    });
  });

  describe('remove', () => {
    it('should remove a beer', async () => {
      const seachSpy = jest.spyOn(model, 'findOneAndRemove').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockBeer),
      } as any);
      const beer = await service.remove(1);
      expect(beer).toEqual(mockBeer);
    });
  });
});
