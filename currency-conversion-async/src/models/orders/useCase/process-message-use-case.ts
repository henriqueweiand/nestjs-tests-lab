import { Injectable } from '@nestjs/common';
import { IExchangeMessage } from 'src/providers/queue/consumer/interfaces/order-created.interface';
import { ExchangeService } from 'src/services/exchange/exchange.service';
import { MailService } from 'src/providers/mail/mail.service';
import { OrdersService } from 'src/models/orders/orders.service';

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

    await this.mailService.plainTextEmail();

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
