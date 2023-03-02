import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServiceConfigService {
  constructor(private configService: ConfigService) {}

  get exchangeApiKey(): string {
    return this.configService.get<string>('service.exchangeApiKey');
  }
  get exchangeApiUrl(): string {
    return this.configService.get<string>('service.exchangeApiUrl');
  }
}
