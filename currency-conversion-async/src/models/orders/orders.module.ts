import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ServiceConfigModule } from 'src/config/service/config.module';
import { MailService } from '../../providers/mail/mail.service';
import { ExchangeModule } from '../../services/exchange/exchange.module';
import { Orders, OrdersSchema } from './entities/orders.entity';
import { OrderCreatedListener } from './listners/order-created.listener';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { ProcessMessageUseCase } from './useCase/process-message-use-case';

@Module({
  imports: [
    ServiceConfigModule,
    ExchangeModule,
    MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }]),
  ],
  controllers: [],
  providers: [
    MailService,
    OrdersRepository,
    OrdersService,
    ProcessMessageUseCase,
    OrderCreatedListener,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
