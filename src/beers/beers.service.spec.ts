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
            create: jest.fn(),
            exec: jest.fn(),
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

  it('should return all beers', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockBeers),
    } as any);
    const beers = await service.findAll();
    expect(beers).toEqual(mockBeers);
  });
});
