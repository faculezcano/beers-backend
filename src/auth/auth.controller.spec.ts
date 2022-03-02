import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UsersService,
        {
          provide: AuthService,
          useValue: {
            generateToken: jest.fn().mockResolvedValue({
              access_token: 'test_token',
            }),
          }
        }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a new token', () => {
      expect(controller.login({})).resolves.toEqual({
        access_token: 'test_token',
      });
    })
  })
});
