import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { QueueConfigService } from './config.service';

describe('QueueConfigService', () => {
  let service: QueueConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<QueueConfigService>(QueueConfigService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('inputOrders', () => {
    it('should return the inputOrders value', () => {
      const inputOrders = 'orders';
      jest.spyOn(configService, 'get').mockReturnValue(inputOrders);

      expect(service.inputOrders).toEqual(inputOrders);
      expect(configService.get).toHaveBeenCalledWith('queue.inputOrders');
    });
  });

  describe('inputOrderUrl', () => {
    it('should return the inputOrderUrl value', () => {
      const inputOrderUrl =
        'https://sqs.us-west-2.amazonaws.com/123456789012/orders';
      jest.spyOn(configService, 'get').mockReturnValue(inputOrderUrl);

      expect(service.inputOrderUrl).toEqual(inputOrderUrl);
      expect(configService.get).toHaveBeenCalledWith('queue.inputOrderUrl');
    });
  });
});
