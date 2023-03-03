import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('database.env');
  }
  get testUrl(): string {
    return this.configService.get<string>('database.testUrl');
  }
  get url(): string {
    return this.configService.get<string>('database.url');
  }
}
