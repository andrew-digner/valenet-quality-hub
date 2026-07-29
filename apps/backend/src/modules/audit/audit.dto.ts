import { IsEnum } from 'class-validator';

export enum AuditExportFormat {
  CSV = 'csv',
  EXCEL = 'excel',
  PDF = 'pdf',
}

export class AuditExportDto {
  @IsEnum(AuditExportFormat) format!: AuditExportFormat;
}
