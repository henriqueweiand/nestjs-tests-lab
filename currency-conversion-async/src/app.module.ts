import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumerModule } from './modules/consumer/consumer.module';
import { DatabaseModule } from './modules/database/database.module';
import { MailService } from './modules/mail/mail.service';
import { OrdersModule } from './modules/orders/orders.module';
import { ProducerModule } from './modules/producer/producer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ProducerModule,
    ConsumerModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
