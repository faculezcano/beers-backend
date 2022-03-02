import { Test, TestingModule } from '@nestjs/testing';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';
import { CreateBeerDto } from "./dto/create-beer.dto";

describe('BeersController', () => {
  let controller: BeersController;
  let service: BeersService;

  const createBeerDto: CreateBeerDto = {
    name: 'APA',
    ingredients: [
      '1',
      '2'
    ],
  };

  const mockBeer = {
    _id: 'id1',
    name: 'APA',
    ingredients: [
      '1',
      '2'
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeersController],
      providers: [{
        provide: BeersService,
        useValue: {
          findAll: jest.fn().mockResolvedValue([
            {
              name: 'IPA',
              ingredients: [
                'cebada',
                'lúpulo',
              ],
            },{
              name: 'Stout',
              ingredients: [
                'cebada',
                'cebada tostada',
                'lúpulo',
              ],
            },
          ]),
          create: jest.fn().mockResolvedValue(createBeerDto),
        }
      }],
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
    it("should return an array of beers", function() {
      expect(controller.findAll()).resolves.toEqual([
        {
          name: 'IPA',
          ingredients: [
            'cebada',
            'lúpulo',
          ],
        },{
          name: 'Stout',
          ingredients: [
            'cebada',
            'cebada tostada',
            'lúpulo',
          ],
        },
      ]);
    });
  })
});
