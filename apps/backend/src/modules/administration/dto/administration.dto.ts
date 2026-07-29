import { UserStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class PageQueryDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) pageSize = 20;
  @IsOptional() @IsString() @MaxLength(160) search?: string;
}

export class StatusQueryDto extends PageQueryDto {
  @IsOptional() @Type(() => Boolean) @IsBoolean() isActive?: boolean;
}

export class CreateUserDto {
  @IsString() @MinLength(2) @MaxLength(160) name!: string;
  @IsString() @MinLength(1) @MaxLength(50) registration!: string;
  @IsEmail() @MaxLength(255) email!: string;
  @IsOptional() @IsString() @MaxLength(30) phone?: string;
  @IsOptional() @Matches(/^\d{11}$/) document?: string;
  @IsOptional() @IsString() @MaxLength(160) socialName?: string;
  @IsUUID() companyId!: string;
  @IsOptional() @IsUUID() unitId?: string;
  @IsUUID() areaId!: string;
  @IsUUID() teamId!: string;
  @IsOptional() @IsUUID() positionId?: string;
  @IsOptional() @IsUUID() supervisorId?: string;
  @IsArray() @ArrayMinSize(1) @IsUUID('4', { each: true }) roleIds!: string[];
}

export class UpdateUserDto {
  @IsOptional() @IsString() @MinLength(2) @MaxLength(160) name?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() @MaxLength(30) phone?: string;
  @IsOptional() @IsUUID() companyId?: string;
  @IsOptional() @IsUUID() unitId?: string;
  @IsOptional() @IsUUID() areaId?: string;
  @IsOptional() @IsUUID() teamId?: string;
  @IsOptional() @IsUUID() positionId?: string;
  @IsOptional() @IsArray() @ArrayMinSize(1) @IsUUID('4', { each: true }) roleIds?: string[];
}

export class UserStatusDto {
  @IsEnum(UserStatus) status!: UserStatus;
}

export class CreateRoleDto {
  @IsString() @MinLength(2) @MaxLength(120) name!: string;
  @Matches(/^[A-Z][A-Z0-9_]+$/) code!: string;
  @IsOptional() @IsString() @MaxLength(500) description?: string;
  @IsInt() @Min(0) hierarchy = 0;
  @IsArray() @ArrayMinSize(1) @IsUUID('4', { each: true }) permissionIds!: string[];
}

export class UpdateRoleDto {
  @IsOptional() @IsString() @MinLength(2) @MaxLength(120) name?: string;
  @IsOptional() @IsString() @MaxLength(500) description?: string;
  @IsOptional() @IsInt() @Min(0) hierarchy?: number;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class RolePermissionsDto {
  @IsArray() @ArrayMinSize(1) @IsUUID('4', { each: true }) permissionIds!: string[];
}

export class CreatePermissionDto {
  @IsString() @MinLength(2) @MaxLength(160) name!: string;
  @Matches(/^[A-Z][A-Z0-9_]*\.[A-Z][A-Z0-9_]*\.[A-Z][A-Z0-9_]*$/) code!: string;
  @IsString() @MaxLength(60) module!: string;
  @IsString() @MaxLength(60) resource!: string;
  @IsString() @MaxLength(60) action!: string;
  @IsOptional() @IsString() @MaxLength(500) description?: string;
}

export class UpdatePermissionDto {
  @IsOptional() @IsString() @MinLength(2) @MaxLength(160) name?: string;
  @IsOptional() @IsString() @MaxLength(500) description?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class CreateOrganizationDto {
  @IsString() @MinLength(2) @MaxLength(160) name!: string;
  @IsString() @MinLength(1) @MaxLength(50) code!: string;
  @IsOptional() @IsUUID() companyId?: string;
  @IsOptional() @IsUUID() unitId?: string;
  @IsOptional() @IsUUID() areaId?: string;
  @IsOptional() @IsString() @MaxLength(14) document?: string;
  @IsOptional() @IsString() @MaxLength(160) tradeName?: string;
  @IsOptional() @IsString() @MaxLength(100) city?: string;
  @IsOptional() @Matches(/^[A-Z]{2}$/) state?: string;
}

export class UpdateOrganizationDto {
  @IsOptional() @IsString() @MinLength(2) @MaxLength(160) name?: string;
  @IsOptional() @IsString() @MaxLength(160) tradeName?: string;
  @IsOptional() @IsUUID() companyId?: string;
  @IsOptional() @IsUUID() unitId?: string;
  @IsOptional() @IsUUID() areaId?: string;
  @IsOptional() @IsString() @MaxLength(100) city?: string;
  @IsOptional() @Matches(/^[A-Z]{2}$/) state?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
