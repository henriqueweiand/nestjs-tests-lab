export interface IMailBaseInput<TContext> {
  from?: string;
  to: string;
  subject?: string;
  text?: string;
  template?: string;
  context?: TContext;
}

export interface OrderTemplate {
  customer: {
    name: string;
    email: string;
  };
  currencyFrom: string;
  currencyTo: string;
  amount: number;
  valueTo: number;
}

export type OrderTemplateInput = IMailBaseInput<OrderTemplate>;
