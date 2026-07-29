import { NotFoundException } from '@nestjs/common';

import { AuditController } from './audit.controller.js';
import { AuditExportFormat } from './audit.dto.js';

const request = { id: 'request', headers: { 'user-agent': 'jest' } };
const user = {
  id: 'user',
  email: 'admin@valenet.local',
  roles: ['ADMIN'],
  permissions: [],
  sessionId: 'session',
};

describe('AuditController', () => {
  it('normalizes filters and returns audit details', async () => {
    const service = {
      list: jest.fn().mockResolvedValue({ data: [] }),
      findOne: jest.fn().mockResolvedValue({ id: 'id' }),
    };
    const controller = new AuditController(service as never);
    await controller.list(
      '0',
      '1000',
      'USERS',
      'UPDATE',
      'actor',
      'correlation',
      request as never,
      'ip',
      user,
    );
    await controller.list('1', '20');
    await expect(controller.findOne('id', request as never, 'ip', user)).resolves.toEqual({
      id: 'id',
    });
    service.findOne.mockResolvedValueOnce(null);
    await expect(
      controller.findOne('missing', request as never, 'ip', user),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('sends exports with download headers', async () => {
    const service = {
      export: jest.fn().mockResolvedValue({
        buffer: Buffer.from('file'),
        contentType: 'text/csv',
        filename: 'audit.csv',
      }),
    };
    const reply = {
      header: jest.fn(),
      send: jest.fn(),
    };
    reply.header.mockReturnValue(reply);
    const controller = new AuditController(service as never);
    await controller.export(
      { format: AuditExportFormat.CSV },
      request as never,
      'ip',
      user,
      reply as never,
    );
    expect(reply.send).toHaveBeenCalledWith(Buffer.from('file'));
  });
});
