import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  environment: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  port: Number(process.env.BACKEND_PORT),
  version: process.env.APP_VERSION,
}));
