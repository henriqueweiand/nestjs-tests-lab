import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ServiceConfigService } from './config.service';

describe('ServiceConfigService', () => {
  let service: ServiceConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ServiceConfigService>(ServiceConfigService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('exchangeApiKey', () => {
    it('should return the exchangeApiKey value', () => {
      const exchangeApiKey = '1234567890abcdef';
      jest.spyOn(configService, 'get').mockReturnValue(exchangeApiKey);

      expect(service.exchangeApiKey).toEqual(exchangeApiKey);
      expect(configService.get).toHaveBeenCalledWith('service.exchangeApiKey');
    });
  });

  describe('exchangeApiUrl', () => {
    it('should return the exchangeApiUrl value', () => {
      const exchangeApiUrl = 'https://api.exchange.com/v1';
      jest.spyOn(configService, 'get').mockReturnValue(exchangeApiUrl);

      expect(service.exchangeApiUrl).toEqual(exchangeApiUrl);
      expect(configService.get).toHaveBeenCalledWith('service.exchangeApiUrl');
    });
  });
});
