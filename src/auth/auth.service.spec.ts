import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwt: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        UsersModule,
        JwtModule.register({
          secret: 'test',
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwt = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should login an user', async () => {
      const result = await service.login('admin@example.com', 'admin');
      expect(result).toStrictEqual({
        id: 1,
        email: 'admin@example.com',
      });
    });

    it('should reject an invalid user', async () => {
      const result = await service.login('admin@example.com', 'pass');
      expect(result).toBe(null);
    });
  });

  describe('generateToken', () => {
    it('should generate a token', async () => {
      const token = await service.generateToken({
        id: 1,
        user: 'test',
      });

      expect(token.access_token.length).toBeGreaterThan(0);
    });
  });
});
