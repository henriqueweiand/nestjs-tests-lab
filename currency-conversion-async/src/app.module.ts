import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OrdersModule } from './models/orders/orders.module';
import { MongoDatabaseProviderModule } from './providers/database/mongo/provider.module';
import { ConsumerModule } from './providers/queue/consumer/consumer.module';
import { ProducerModule } from './providers/queue/producer/producer.module';

@Module({
  imports: [
    MongoDatabaseProviderModule,
    ProducerModule,
    ConsumerModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
