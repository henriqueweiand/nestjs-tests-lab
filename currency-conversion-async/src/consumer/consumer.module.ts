import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageHandler } from './messageHandler';
import * as AWS from 'aws-sdk';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SqsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // AWS.config.update({
        //   region: configService.get('AWS_REGION'),
        //   accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        //   secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
        // });

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
  providers: [MessageHandler],
})
export class ConsumerModule {}
