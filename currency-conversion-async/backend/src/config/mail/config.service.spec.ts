import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MailConfigService } from './config.service';

describe('MailConfigService', () => {
  let service: MailConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MailConfigService>(MailConfigService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('host', () => {
    it('should return the host value', () => {
      const host = 'smtp.gmail.com';
      jest.spyOn(configService, 'get').mockReturnValue(host);

      expect(service.host).toEqual(host);
      expect(configService.get).toHaveBeenCalledWith('mail.host');
    });
  });

  describe('user', () => {
    it('should return the user value', () => {
      const user = 'example@gmail.com';
      jest.spyOn(configService, 'get').mockReturnValue(user);

      expect(service.user).toEqual(user);
      expect(configService.get).toHaveBeenCalledWith('mail.user');
    });
  });

  describe('pass', () => {
    it('should return the pass value', () => {
      const pass = 'password123';
      jest.spyOn(configService, 'get').mockReturnValue(pass);

      expect(service.pass).toEqual(pass);
      expect(configService.get).toHaveBeenCalledWith('mail.pass');
    });
  });

  describe('sender', () => {
    it('should return the sender value', () => {
      const sender = 'example@gmail.com';
      jest.spyOn(configService, 'get').mockReturnValue(sender);

      expect(service.sender).toEqual(sender);
      expect(configService.get).toHaveBeenCalledWith('mail.sender');
    });
  });
});
