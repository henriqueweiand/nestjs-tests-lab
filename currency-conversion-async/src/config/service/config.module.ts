import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServiceConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        EXCHANGE_API_KEY: Joi.string(),
        EXCHANGE_API_URL: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, ServiceConfigService],
  exports: [ConfigService, ServiceConfigService],
})
export class ServiceConfigModule {}
