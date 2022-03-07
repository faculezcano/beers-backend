import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return an user', async () => {
      const user = await service.findOne('admin@example.com');
      expect(user).toStrictEqual({
        id: 1,
        email: 'admin@example.com',
        password: 'admin',
      });
    });
  });
});
