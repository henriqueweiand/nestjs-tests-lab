import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AwsConfigService } from './config.service';

describe('AwsConfigService', () => {
  let service: AwsConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AwsConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AwsConfigService>(AwsConfigService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('region', () => {
    it('should return the region value', () => {
      const region = 'us-west-2';
      jest.spyOn(configService, 'get').mockReturnValue(region);

      expect(service.region).toEqual(region);
      expect(configService.get).toHaveBeenCalledWith('aws.region');
    });
  });

  describe('accessKeyId', () => {
    it('should return the accessKeyId value', () => {
      const accessKeyId = 'AKIAxxxxxxxxx';
      jest.spyOn(configService, 'get').mockReturnValue(accessKeyId);

      expect(service.accessKeyId).toEqual(accessKeyId);
      expect(configService.get).toHaveBeenCalledWith('aws.accessKeyId');
    });
  });

  describe('secretAccessKey', () => {
    it('should return the secretAccessKey value', () => {
      const secretAccessKey = 'xxxxxxxxxxxxxxxxxxxxxx';
      jest.spyOn(configService, 'get').mockReturnValue(secretAccessKey);

      expect(service.secretAccessKey).toEqual(secretAccessKey);
      expect(configService.get).toHaveBeenCalledWith('aws.secretAccessKey');
    });
  });
});
