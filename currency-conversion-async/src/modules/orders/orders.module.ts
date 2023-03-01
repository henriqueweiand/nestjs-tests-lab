import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Orders, OrdersSchema } from './schemas/orders.schema';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
