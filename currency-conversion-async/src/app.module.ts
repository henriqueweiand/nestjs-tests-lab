import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConsumerModule } from './providers/queue/consumer/consumer.module';
import { OrdersModule } from './models/orders/orders.module';
import { ProducerModule } from './providers/queue/producer/producer.module';
import { MongoDatabaseProviderModule } from './providers/database/mongo/provider.module';
import { MailDatabaseProviderModule } from './providers/mail/mail.module';

@Module({
  imports: [
    MailDatabaseProviderModule,
    MongoDatabaseProviderModule,
    ProducerModule,
    ConsumerModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
