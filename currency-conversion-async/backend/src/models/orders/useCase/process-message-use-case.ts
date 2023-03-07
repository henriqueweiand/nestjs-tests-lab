import { Injectable } from '@nestjs/common';
import { IExchangeMessage } from '../../../providers/queue/consumer/interfaces/order-created.interface';
import { ExchangeService } from '../../../services/exchange/exchange.service';
import { MailService } from '../../../providers/mail/mail.service';
import { OrdersService } from '../../../models/orders/orders.service';

@Injectable()
export class ProcessMessageUseCase {
  constructor(
    private exchangeService: ExchangeService,
    private ordersService: OrdersService,
    private mailService: MailService,
  ) {}

  async execute(queueMessage: IExchangeMessage) {
    const currencies = await this.exchangeService.convert({
      from: queueMessage.currencyFrom,
      to: queueMessage.currencyTo,
      amount: queueMessage.amount,
    });

    await this.mailService.postHTMLEmail({
      to: queueMessage.email,
      context: {
        currencyFrom: queueMessage.currencyFrom,
        currencyTo: queueMessage.currencyTo,
        amount: queueMessage.amount,
        valueTo: currencies.data.result,
        customer: {
          email: queueMessage.email,
          name: 'anonymous',
        },
      },
    });

    await this.ordersService.create({
      email: queueMessage.email,
      currencyFrom: queueMessage.currencyFrom,
      currencyTo: queueMessage.currencyTo,
      valueFrom: queueMessage.amount,
      valueTo: currencies.data.result,
      comment: queueMessage.comment,
    });
  }
}
