import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailConfigService } from 'src/config/mail/config.service';
import { OrderTemplateInput } from './interfaces/mail.interface';

@Injectable()
export class MailService {
  constructor(
    private mailService: MailerService,
    private mailConfigService: MailConfigService,
  ) {}

  private getMailFromDefault() {
    return this.mailConfigService.sender;
  }

  async plainTextEmail({ from, to, context }: OrderTemplateInput) {
    await this.mailService.sendMail({
      to,
      from: !from ? this.getMailFromDefault() : from,
      subject: `Currency exchange result from ${context.currencyFrom} to ${context.currencyTo}`,
      text: `Thank you for requesting a exchanging with us, your final value from ${context.currencyFrom} to ${context.currencyTo} will be the total of ${context.valueTo}`,
    });
  }

  async postHTMLEmail({ from, to, context }: OrderTemplateInput) {
    await this.mailService.sendMail({
      to,
      from: !from ? this.getMailFromDefault() : from,
      subject: `Currency exchange result from ${context.currencyFrom} to ${context.currencyTo}`,
      template: 'index',
      context: context,
    });
  }
}
