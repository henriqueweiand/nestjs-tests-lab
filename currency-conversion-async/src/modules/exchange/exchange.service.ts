import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import {
  IConvert,
  IConvertResponse,
  IListResponse,
} from './dto/interfaces/exchange.interface';

@Injectable()
export class ExchangeService {
  private readonly logger = new Logger('ExchangeService');
  private baseAPIURL: string;
  private APIKey: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.baseAPIURL = this.configService.get('EXCHANGE_API_URL');
    this.APIKey = this.configService.get('EXCHANGE_API_KEY');
  }

  async list(): Promise<AxiosResponse<IListResponse>> {
    return await this.httpService.axiosRef.get(
      this.baseAPIURL + '/currency_data/list',
      {
        headers: {
          apikey: this.APIKey,
        },
      },
    );
  }

  async convert({
    to,
    from,
    amount,
  }: IConvert): Promise<AxiosResponse<IConvertResponse>> {
    return await this.httpService.axiosRef.get(
      `${this.baseAPIURL}/currency_data/convert?from=${from}&to=${to}&amount=${amount}`,
      {
        headers: {
          apikey: this.APIKey,
        },
      },
    );
  }
}
