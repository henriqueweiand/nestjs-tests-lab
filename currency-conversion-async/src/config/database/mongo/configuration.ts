import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  env: process.env.NODE_ENV,
  testUrl: process.env.MONGODB_TESTS_URL,
  url: process.env.MONGODB_URL,
}));
