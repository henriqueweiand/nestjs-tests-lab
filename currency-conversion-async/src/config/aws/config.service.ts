import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsConfigService {
  constructor(private configService: ConfigService) {}

  get region(): string {
    return this.configService.get<string>('aws.region');
  }
  get accessKeyId(): string {
    return this.configService.get<string>('aws.accessKeyId');
  }
  get secretAccessKey(): string {
    return this.configService.get<string>('aws.secretAccessKey');
  }
}
