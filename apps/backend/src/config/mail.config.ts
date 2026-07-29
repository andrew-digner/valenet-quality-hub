import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  from: process.env.MAIL_FROM,
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
}));
