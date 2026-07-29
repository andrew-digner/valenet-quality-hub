import { Injectable } from '@nestjs/common';
import { Counter, Histogram, Registry, collectDefaultMetrics } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly registry = new Registry();
  private readonly requests = new Counter({
    help: 'Total de requisições HTTP.',
    labelNames: ['method', 'route', 'status'],
    name: 'http_requests_total',
    registers: [this.registry],
  });
  private readonly duration = new Histogram({
    buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
    help: 'Duração das requisições HTTP em segundos.',
    labelNames: ['method', 'route', 'status'],
    name: 'http_request_duration_seconds',
    registers: [this.registry],
  });

  constructor() {
    collectDefaultMetrics({ prefix: 'valenet_', register: this.registry });
  }

  observe(method: string, route: string, status: number, durationMs: number): void {
    const labels = { method, route, status: String(status) };
    this.requests.inc(labels);
    this.duration.observe(labels, durationMs / 1_000);
  }

  get contentType(): string {
    return this.registry.contentType;
  }

  async render(): Promise<string> {
    return this.registry.metrics();
  }
}
