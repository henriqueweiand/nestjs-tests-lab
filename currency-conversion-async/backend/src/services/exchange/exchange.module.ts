import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ServiceConfigModule } from 'src/config/service/config.module';
import { ServiceConfigService } from 'src/config/service/config.service';
import { ExchangeService } from './exchange.service';

@Module({
  imports: [HttpModule, ServiceConfigModule],
  controllers: [],
  providers: [ServiceConfigService, ExchangeService],
  exports: [ExchangeService],
})
export class ExchangeModule {}
