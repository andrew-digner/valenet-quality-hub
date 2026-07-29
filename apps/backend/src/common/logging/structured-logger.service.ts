import { Injectable, type LoggerService } from '@nestjs/common';

type LogLevel = 'debug' | 'error' | 'info' | 'warn';

@Injectable()
export class StructuredLogger implements LoggerService {
  private write(level: LogLevel, message: unknown, context?: string, trace?: string): void {
    const entry = JSON.stringify({
      context,
      level,
      message: typeof message === 'string' ? message : JSON.stringify(message),
      timestamp: new Date().toISOString(),
      ...(trace ? { trace } : {}),
    });
    const stream = level === 'error' ? process.stderr : process.stdout;
    stream.write(`${entry}\n`);
  }

  debug(message: unknown, context?: string): void {
    this.write('debug', message, context);
  }

  error(message: unknown, trace?: string, context?: string): void {
    this.write('error', message, context, trace);
  }

  log(message: unknown, context?: string): void {
    this.write('info', message, context);
  }

  warn(message: unknown, context?: string): void {
    this.write('warn', message, context);
  }
}
