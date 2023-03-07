import { Test, TestingModule } from '@nestjs/testing';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { OrdersService } from '../../../models/orders/orders.service';
import { MailService } from '../../../providers/mail/mail.service';
import { ExchangeService } from '../../../services/exchange/exchange.service';
import { IConvertResponse } from '../../../services/exchange/interfaces/exchange.interface';
import { ProcessMessageUseCase } from './process-message-use-case';

describe('ProcessMessageUseCase', () => {
  let useCase: ProcessMessageUseCase;
  let exchangeService: ExchangeService;
  let mailService: MailService;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessMessageUseCase,
        {
          provide: ExchangeService,
          useValue: {
            convert: jest.fn(),
          },
        },
        {
          provide: OrdersService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: MailService,
          useValue: {
            postHTMLEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<ProcessMessageUseCase>(ProcessMessageUseCase);
    exchangeService = module.get<ExchangeService>(ExchangeService);
    mailService = module.get<MailService>(MailService);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should execute the use case', async () => {
    const queueMessage = {
      email: 'john@example.com',
      currencyFrom: 'USD',
      currencyTo: 'EUR',
      amount: 100,
      comment: 'Test order',
    };

    const mockResponse: AxiosResponse<IConvertResponse, unknown> = {
      data: {
        success: true,
        query: {
          from: 'USD',
          to: 'EUR',
          amount: 100,
        },
        info: {
          timestamp: 111111,
          quote: 22222,
        },
        result: 42,
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: {} as AxiosRequestHeaders,
      },
    };

    jest.spyOn(exchangeService, 'convert').mockResolvedValueOnce(mockResponse);

    jest.spyOn(mailService, 'postHTMLEmail').mockResolvedValueOnce(null);

    jest.spyOn(ordersService, 'create').mockResolvedValueOnce(null);

    await useCase.execute(queueMessage);

    expect(exchangeService.convert).toHaveBeenCalledWith({
      from: 'USD',
      to: 'EUR',
      amount: 100,
    });

    expect(mailService.postHTMLEmail).toHaveBeenCalledWith({
      to: 'john@example.com',
      context: {
        currencyFrom: 'USD',
        currencyTo: 'EUR',
        amount: 100,
        valueTo: 42,
        customer: {
          email: 'john@example.com',
          name: 'anonymous',
        },
      },
    });

    expect(ordersService.create).toHaveBeenCalledWith({
      email: 'john@example.com',
      currencyFrom: 'USD',
      currencyTo: 'EUR',
      valueFrom: 100,
      valueTo: 42,
      comment: 'Test order',
    });
  });
});
