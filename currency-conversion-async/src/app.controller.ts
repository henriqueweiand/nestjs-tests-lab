import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageProducer } from './modules/producer/producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly producerService: MessageProducer,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  teste(): string {
    this.producerService.sendMessage({ body: { test: 'henrique' } });
    return 'teste';
  }
}
