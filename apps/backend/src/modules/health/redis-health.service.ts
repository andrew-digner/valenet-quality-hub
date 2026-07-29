import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisHealthService {
  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

  async isHealthy(): Promise<boolean> {
    const client = new Redis({
      connectTimeout: 1_000,
      host: this.configService.getOrThrow<string>('redis.host'),
      lazyConnect: true,
      maxRetriesPerRequest: 0,
      password: this.configService.get<string>('redis.password'),
      port: this.configService.getOrThrow<number>('redis.port'),
    });
    try {
      await client.connect();
      return (await client.ping()) === 'PONG';
    } finally {
      client.disconnect();
    }
  }
}
