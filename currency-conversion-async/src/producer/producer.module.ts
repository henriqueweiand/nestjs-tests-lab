import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageProducer } from './producer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SqsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          producers: [
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
  providers: [MessageProducer],
  exports: [MessageProducer],
})
export class ProducerModule {}
