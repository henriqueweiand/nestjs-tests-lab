import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MailDatabaseProviderModule } from 'src/providers/mail/mail.module';
import { ExchangeModule } from '../../services/exchange/exchange.module';
import { Orders, OrdersSchema } from './entities/orders.entity';
import { OrderCreatedListener } from './listeners/order-created.listener';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { ProcessMessageUseCase } from './useCase/process-message-use-case';

@Module({
  imports: [
    MailDatabaseProviderModule,
    ExchangeModule,
    MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }]),
  ],
  controllers: [],
  providers: [
    OrdersRepository,
    OrdersService,
    ProcessMessageUseCase,
    OrderCreatedListener,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
