import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  expiresIn: process.env.JWT_EXPIRES_IN,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  secret: process.env.JWT_SECRET,
}));
