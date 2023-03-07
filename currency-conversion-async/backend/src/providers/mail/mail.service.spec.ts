import { MailerService } from '@nestjs-modules/mailer';
import { Test } from '@nestjs/testing';
import { MailConfigService } from '../../config/mail/config.service';
import { OrderTemplateInput } from './interfaces/mail.interface';
import { MailService } from './mail.service';

describe('MailService', () => {
  let mailService: MailService;
  let mailerService: MailerService;
  let mailConfigService: MailConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
        {
          provide: MailConfigService,
          useValue: {
            sender: 'test@example.com',
          },
        },
      ],
    }).compile();

    mailService = moduleRef.get<MailService>(MailService);
    mailerService = moduleRef.get<MailerService>(MailerService);
    mailConfigService = moduleRef.get<MailConfigService>(MailConfigService);
  });

  describe('plainTextEmail', () => {
    it('should call the sendMail method with the correct parameters', async () => {
      const mockInput = {
        to: 'user@example.com',
        context: {
          currencyFrom: 'USD',
          currencyTo: 'EUR',
          amount: 10,
          valueTo: 100,
          customer: {
            email: 'user@example.com',
            name: 'anonymous',
          },
        },
      } as OrderTemplateInput;

      await mailService.plainTextEmail(mockInput);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: mockInput.to,
        from: mailConfigService.sender,
        subject: `Currency exchange result from ${mockInput.context.currencyFrom} to ${mockInput.context.currencyTo}`,
        text: `Thank you for requesting a exchanging with us, your final value from ${mockInput.context.currencyFrom} to ${mockInput.context.currencyTo} will be the total of ${mockInput.context.valueTo}`,
      });
    });

    it('should call the sendMail method with the default sender if no from parameter is provided', async () => {
      const mockInput = {
        to: 'user@example.com',
        context: {
          currencyFrom: 'USD',
          currencyTo: 'EUR',
          amount: 10,
          valueTo: 100,
          customer: {
            email: 'user@example.com',
            name: 'anonymous',
          },
        },
      } as OrderTemplateInput;

      await mailService.plainTextEmail(mockInput);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: mockInput.to,
        from: mailConfigService.sender,
        subject: `Currency exchange result from ${mockInput.context.currencyFrom} to ${mockInput.context.currencyTo}`,
        text: `Thank you for requesting a exchanging with us, your final value from ${mockInput.context.currencyFrom} to ${mockInput.context.currencyTo} will be the total of ${mockInput.context.valueTo}`,
      });
    });
  });
});
