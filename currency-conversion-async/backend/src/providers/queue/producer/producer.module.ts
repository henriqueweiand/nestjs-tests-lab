import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { AwsConfigModule } from 'src/config/aws/config.module';
import { AwsConfigService } from 'src/config/aws/config.service';
import { QueueConfigModule } from 'src/config/queue/config.module';
import { QueueConfigService } from 'src/config/queue/config.service';
import { ProducerService } from './producer.service';

@Module({
  imports: [
    SqsModule.registerAsync({
      imports: [QueueConfigModule, AwsConfigModule],
      inject: [QueueConfigService, AwsConfigService],
      useFactory: (
        queueConfigService: QueueConfigService,
        awsConfigService: AwsConfigService,
      ) => {
        return {
          producers: [
            {
              name: queueConfigService.inputOrders,
              queueUrl: queueConfigService.inputOrderUrl,
              region: awsConfigService.region,
            },
          ],
        };
      },
    }),
  ],
  controllers: [],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
