import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfigService } from './config.service';

describe('DatabaseConfigService', () => {
  let service: DatabaseConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DatabaseConfigService>(DatabaseConfigService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('env', () => {
    it('should return the env value', () => {
      const env = 'production';
      jest.spyOn(configService, 'get').mockReturnValue(env);

      expect(service.env).toEqual(env);
      expect(configService.get).toHaveBeenCalledWith('database.env');
    });
  });

  describe('testUrl', () => {
    it('should return the testUrl value', () => {
      const testUrl = 'mongodb://localhost/test';
      jest.spyOn(configService, 'get').mockReturnValue(testUrl);

      expect(service.testUrl).toEqual(testUrl);
      expect(configService.get).toHaveBeenCalledWith('database.testUrl');
    });
  });

  describe('url', () => {
    it('should return the url value', () => {
      const url = 'mongodb://localhost/mydb';
      jest.spyOn(configService, 'get').mockReturnValue(url);

      expect(service.url).toEqual(url);
      expect(configService.get).toHaveBeenCalledWith('database.url');
    });
  });
});
