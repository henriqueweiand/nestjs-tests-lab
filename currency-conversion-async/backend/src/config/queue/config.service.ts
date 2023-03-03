import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QueueConfigService {
  constructor(private configService: ConfigService) {}

  get inputOrders(): string {
    return this.configService.get<string>('queue.inputOrders');
  }
  get inputOrderUrl(): string {
    return this.configService.get<string>('queue.inputOrderUrl');
  }
}
