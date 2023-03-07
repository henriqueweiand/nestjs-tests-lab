import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { ServiceConfigService } from '../../config/service/config.service';
import {
  IConvert,
  IConvertResponse,
  IListResponse,
} from './interfaces/exchange.interface';

@Injectable()
export class ExchangeService {
  private baseAPIURL: string;
  private APIKey: string;

  constructor(
    private serviceConfigService: ServiceConfigService,
    private httpService: HttpService,
  ) {
    this.baseAPIURL = this.serviceConfigService.exchangeApiUrl;
    this.APIKey = this.serviceConfigService.exchangeApiKey;
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
