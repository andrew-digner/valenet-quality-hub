import { Inject, Injectable } from '@nestjs/common';
import { AuditResult } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service.js';

import type { AuditOperation, Prisma } from '@prisma/client';

export interface AuditContext {
  actorId?: string;
  actorName?: string;
  actorRoles?: string[];
  correlationId: string;
  requestId?: string;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class AuditService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async record(input: {
    context: AuditContext;
    module: string;
    resource: string;
    resourceId?: string;
    operation: AuditOperation;
    result?: AuditResult;
    before?: Prisma.InputJsonValue;
    after?: Prisma.InputJsonValue;
    metadata?: Prisma.InputJsonValue;
  }): Promise<void> {
    const data: Prisma.AuditLogUncheckedCreateInput = {
      actorRoles: input.context.actorRoles ?? [],
      correlationId: input.context.correlationId,
      module: input.module,
      resource: input.resource,
      operation: input.operation,
      result: input.result ?? AuditResult.SUCCESS,
      ...(input.context.actorId ? { actorId: input.context.actorId } : {}),
      ...(input.context.actorName ? { actorName: input.context.actorName } : {}),
      ...(input.context.requestId ? { requestId: input.context.requestId } : {}),
      ...(input.context.ipAddress ? { ipAddress: input.context.ipAddress } : {}),
      ...(input.context.userAgent ? { userAgent: input.context.userAgent } : {}),
      ...(input.resourceId ? { resourceId: input.resourceId } : {}),
      ...(input.before ? { before: input.before } : {}),
      ...(input.after ? { after: input.after } : {}),
      ...(input.metadata ? { metadata: input.metadata } : {}),
    };
    await this.prisma.auditLog.create({ data });
  }

  async list(
    query: {
      page: number;
      pageSize: number;
      module?: string;
      operation?: AuditOperation;
      actorId?: string;
      correlationId?: string;
    },
    context?: AuditContext,
  ) {
    const where: Prisma.AuditLogWhereInput = {
      ...(query.module ? { module: query.module } : {}),
      ...(query.operation ? { operation: query.operation } : {}),
      ...(query.actorId ? { actorId: query.actorId } : {}),
      ...(query.correlationId ? { correlationId: query.correlationId } : {}),
    };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      }),
      this.prisma.auditLog.count({ where }),
    ]);
    if (context) {
      await this.record({
        context,
        module: 'AUDIT',
        resource: 'audit_logs',
        operation: 'VIEW',
        metadata: { filters: query as Prisma.InputJsonValue },
      });
    }
    return { data, pagination: pagination(query.page, query.pageSize, total) };
  }

  async findOne(id: string, context?: AuditContext) {
    const record = await this.prisma.auditLog.findUnique({ where: { id } });
    if (context) {
      await this.record({
        context,
        module: 'AUDIT',
        resource: 'audit_logs',
        resourceId: id,
        operation: 'VIEW',
      });
    }
    return record;
  }

  async export(format: 'csv' | 'excel' | 'pdf', context: AuditContext) {
    const records = await this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10_000,
    });
    const rows = records.map((record) => [
      record.id,
      record.createdAt.toISOString(),
      record.actorName ?? '',
      record.actorRoles.join('|'),
      record.module,
      record.resource,
      record.resourceId ?? '',
      record.operation,
      record.result,
      record.ipAddress ?? '',
      record.correlationId,
    ]);
    const headers = [
      'id',
      'created_at',
      'actor',
      'roles',
      'module',
      'resource',
      'resource_id',
      'operation',
      'result',
      'ip_address',
      'correlation_id',
    ];
    let file: { buffer: Buffer; contentType: string; extension: string };
    if (format === 'csv') {
      const csv = [headers, ...rows]
        .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
        .join('\r\n');
      file = {
        buffer: Buffer.from(`\uFEFF${csv}`),
        contentType: 'text/csv; charset=utf-8',
        extension: 'csv',
      };
    } else if (format === 'excel') {
      const xmlRows = [headers, ...rows]
        .map(
          (row) =>
            `<Row>${row.map((value) => `<Cell><Data ss:Type="String">${escapeXml(String(value))}</Data></Cell>`).join('')}</Row>`,
        )
        .join('');
      const xml = `<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="Auditoria"><Table>${xmlRows}</Table></Worksheet></Workbook>`;
      file = {
        buffer: Buffer.from(xml),
        contentType: 'application/vnd.ms-excel',
        extension: 'xls',
      };
    } else {
      const lines = [headers.join(' | '), ...rows.map((row) => row.join(' | '))].slice(0, 50);
      file = { buffer: createPdf(lines), contentType: 'application/pdf', extension: 'pdf' };
    }
    await this.record({
      context,
      module: 'AUDIT',
      resource: 'audit_exports',
      operation: 'EXPORT',
      metadata: { format, recordCount: records.length },
    });
    return {
      ...file,
      filename: `auditoria-${new Date().toISOString().slice(0, 10)}.${file.extension}`,
    };
  }
}

export const pagination = (page: number, pageSize: number, total: number) => ({
  page,
  pageSize,
  total,
  totalPages: Math.ceil(total / pageSize),
});

const escapeXml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const createPdf = (lines: string[]): Buffer => {
  const content = lines
    .map(
      (line, index) =>
        `BT /F1 7 Tf 30 ${800 - index * 14} Td (${line.replace(/[()\\]/g, '\\$&').slice(0, 150)}) Tj ET`,
    )
    .join('\n');
  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj',
    '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
    `5 0 obj << /Length ${Buffer.byteLength(content)} >> stream\n${content}\nendstream endobj`,
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (const object of objects) {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${object}\n`;
  }
  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, '0')} 00000 n `)
    .join('\n')}\ntrailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf);
};
