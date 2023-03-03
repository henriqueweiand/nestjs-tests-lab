import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('mail.host');
  }
  get user(): string {
    return this.configService.get<string>('mail.user');
  }
  get pass(): string {
    return this.configService.get<string>('mail.pass');
  }
  get sender(): string {
    return this.configService.get<string>('mail.sender');
  }
}
