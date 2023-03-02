export interface IListResponse {
  success: boolean;
  currencies: {
    [currency: string]: string;
  };
}

export interface IConvert {
  to: string;
  from: string;
  amount: number;
}

export interface IConvertResponse {
  success: boolean;
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    timestamp: number;
    quote: number;
  };
  result: number;
}
