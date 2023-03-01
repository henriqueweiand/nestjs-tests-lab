import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageHandler } from './messageHandler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProcessMessageUseCase } from './useCases/process-message-use-case';
import { ExchangeService } from '../exchange/exchange.service';
import { ExchangeModule } from '../exchange/exchange.module';
import { HttpModule } from '@nestjs/axios';
import { OrdersModule } from '../orders/orders.module';
import { OrdersService } from '../orders/orders.service';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    OrdersModule,
    HttpModule,
    ExchangeModule,
    MailModule,
    SqsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          consumers: [
            {
              name: configService.get('QUEUE'), // name of the queue
              queueUrl: configService.get('QUEUE_URL'), // the url of the queue
              region: configService.get('AWS_REGION'),
            },
          ],
        };
      },
    }),
  ],
  controllers: [],
  providers: [
    MailService,
    OrdersService,
    ExchangeService,
    ProcessMessageUseCase,
    MessageHandler,
  ],
})
export class ConsumerModule {}
