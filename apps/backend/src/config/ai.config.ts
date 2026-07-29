import { registerAs } from '@nestjs/config';

export default registerAs('ai', () => ({
  apiKey: process.env.AI_API_KEY,
  maxRequests: Number(process.env.AI_MAX_REQUESTS),
  model: process.env.AI_MODEL,
  provider: process.env.AI_PROVIDER,
}));
