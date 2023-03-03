export class OrderCreatedEvent {
  email: string;
  currencyFrom: string;
  currencyTo: string;
  amount: number;
  comment?: string;
}
