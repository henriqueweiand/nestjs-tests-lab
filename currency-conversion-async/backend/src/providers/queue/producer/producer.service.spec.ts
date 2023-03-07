import { Test } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { SqsService } from '@ssut/nestjs-sqs';

describe('ProducerService', () => {
  let producerService: ProducerService;
  let sqsService: SqsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: SqsService,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    producerService = moduleRef.get<ProducerService>(ProducerService);
    sqsService = moduleRef.get<SqsService>(SqsService);
  });

  describe('sendMessage', () => {
    it('should send a message to the SQS queue', async () => {
      const mockSend = sqsService.send as jest.Mock;
      mockSend.mockResolvedValueOnce({});

      await producerService.sendMessage();

      expect(mockSend).toHaveBeenCalledWith('sample-queue', {
        id: 'id',
        body: {
          email: 'henriqueweiand@gmail.com',
          currencyFrom: 'BRL',
          currencyTo: 'USD',
          amount: 100,
          comment: 'its too expensive to exchange real to dollar',
        },
      });
    });

    it('should handle errors when sending a message to the SQS queue', async () => {
      const mockSend = sqsService.send as jest.Mock;
      const error = new Error('Failed to send message');
      mockSend.mockRejectedValueOnce(error);

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      await producerService.sendMessage();

      expect(mockSend).toHaveBeenCalledWith('sample-queue', {
        id: 'id',
        body: {
          email: 'henriqueweiand@gmail.com',
          currencyFrom: 'BRL',
          currencyTo: 'USD',
          amount: 100,
          comment: 'its too expensive to exchange real to dollar',
        },
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'error in producing image!',
        error,
      );
    });
  });
});
