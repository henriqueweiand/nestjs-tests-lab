import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/modules/exchange/exchange.service';
import { MailService } from 'src/modules/mail/mail.service';
import { OrdersService } from 'src/modules/orders/orders.service';

interface IProcessMessageRequest {
  email: string;
  currencyFrom: string;
  currencyTo: string;
  amount: number;
  comment: string;
}

@Injectable()
export class ProcessMessageUseCase {
  constructor(
    private exchangeService: ExchangeService,
    private ordersService: OrdersService,
    private mailService: MailService,
  ) {}

  async execute(request: IProcessMessageRequest) {
    const currencies = await this.exchangeService.convert({
      from: request.currencyFrom,
      to: request.currencyTo,
      amount: request.amount,
    });

    await this.mailService.plainTextEmail();

    await this.ordersService.create({
      email: request.email,
      currencyFrom: request.currencyFrom,
      currencyTo: request.currencyTo,
      valueFrom: request.amount,
      valueTo: currencies.data.result,
      comment: request.comment,
    });

    console.log(currencies.data);
  }
}
