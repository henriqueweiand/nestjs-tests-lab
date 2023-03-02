import { registerAs } from '@nestjs/config';

export default registerAs('queue', () => ({
  inputOrders: process.env.QUEUE_INPUT_ORDERS,
  inputOrderUrl: process.env.QUEUE_INPUT_ORDERS_URL,
}));
