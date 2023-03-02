import { Controller, Get } from '@nestjs/common';
import { ProducerService } from './providers/queue/producer/producer.service';

@Controller()
export class AppController {
  constructor(private readonly producerService: ProducerService) {}

  @Get()
  getHello(): string {
    return 'hello';
  }

  @Get('test')
  teste(): string {
    this.producerService.sendMessage();
    return 'teste';
  }
}
