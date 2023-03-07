import { Orders } from '../../entities/orders.entity';

export const orderStub = (): Orders => ({
  email: 'test@gmail.com',
  currencyFrom: 'USD',
  currencyTo: 'EUR',
  valueFrom: 100,
  valueTo: 42,
  comment: 'test',
});
