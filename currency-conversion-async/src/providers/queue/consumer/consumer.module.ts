import { Module, OnModuleInit } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { QueueConfigModule } from 'src/config/queue/config.module';
import { ConsumerHandler } from './consumer.handler';

@Module({
  imports: [EventEmitterModule.forRoot(), QueueConfigModule],
  controllers: [],
  providers: [ConsumerHandler],
})
export class ConsumerModule implements OnModuleInit {
  constructor(private readonly service: ConsumerHandler) {}

  onModuleInit() {
    this.service.activateReceivers();
  }
}
