import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EnumEventOrders } from 'src/providers/queue/consumer/events/orders.enum';
import { IExchangeMessage } from 'src/providers/queue/consumer/interfaces/order-created.interface';
import { ProcessMessageUseCase } from '../useCase/process-message-use-case';

@Injectable()
export class OrderCreatedListener {
  constructor(private processMessageUseCase: ProcessMessageUseCase) {}

  @OnEvent(EnumEventOrders.OrderCreated)
  handleOrderCreatedEvent(event: IExchangeMessage) {
    console.log(EnumEventOrders.OrderCreated, event);
    this.processMessageUseCase.execute(event);
  }
}
