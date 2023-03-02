import { registerAs } from '@nestjs/config';

export default registerAs('service', () => ({
  exchangeApiKey: process.env.EXCHANGE_API_KEY,
  exchangeApiUrl: process.env.EXCHANGE_API_URL,
}));
