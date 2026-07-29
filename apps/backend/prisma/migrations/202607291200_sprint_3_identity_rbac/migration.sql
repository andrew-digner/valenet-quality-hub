CREATE TYPE "user_status_new" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED', 'SUSPENDED', 'PENDING_ACTIVATION');
ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "status" TYPE "user_status_new" USING ("status"::text::"user_status_new");
DROP TYPE "user_status";
ALTER TYPE "user_status_new" RENAME TO "user_status";
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

CREATE TYPE "audit_operation" AS ENUM ('CREATE','UPDATE','DELETE','LOGIN','LOGOUT','EXPORT','IMPORT','EXECUTE','APPROVE','REJECT','VIEW');
CREATE TYPE "audit_result" AS ENUM ('SUCCESS','FAILURE','DENIED');

CREATE TABLE "companies" ("id" UUID PRIMARY KEY, "name" VARCHAR(160) NOT NULL, "trade_name" VARCHAR(160), "document" VARCHAR(14) NOT NULL UNIQUE, "is_active" BOOLEAN NOT NULL DEFAULT true, "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMPTZ(6) NOT NULL, "deleted_at" TIMESTAMPTZ(6));
CREATE TABLE "units" ("id" UUID PRIMARY KEY, "company_id" UUID NOT NULL REFERENCES "companies"("id"), "name" VARCHAR(160) NOT NULL, "code" VARCHAR(50) NOT NULL, "city" VARCHAR(100), "state" CHAR(2), "is_active" BOOLEAN NOT NULL DEFAULT true, "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMPTZ(6) NOT NULL, "deleted_at" TIMESTAMPTZ(6), UNIQUE("company_id","code"));
CREATE TABLE "areas" ("id" UUID PRIMARY KEY, "company_id" UUID NOT NULL REFERENCES "companies"("id"), "unit_id" UUID REFERENCES "units"("id"), "name" VARCHAR(160) NOT NULL, "code" VARCHAR(50) NOT NULL, "is_active" BOOLEAN NOT NULL DEFAULT true, "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMPTZ(6) NOT NULL, "deleted_at" TIMESTAMPTZ(6), UNIQUE("company_id","code"));
CREATE TABLE "teams" ("id" UUID PRIMARY KEY, "area_id" UUID NOT NULL REFERENCES "areas"("id"), "name" VARCHAR(160) NOT NULL, "code" VARCHAR(50) NOT NULL, "is_active" BOOLEAN NOT NULL DEFAULT true, "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMPTZ(6) NOT NULL, "deleted_at" TIMESTAMPTZ(6), UNIQUE("area_id","code"));
CREATE TABLE "positions" ("id" UUID PRIMARY KEY, "company_id" UUID NOT NULL REFERENCES "companies"("id"), "name" VARCHAR(120) NOT NULL, "code" VARCHAR(50) NOT NULL, "is_active" BOOLEAN NOT NULL DEFAULT true, "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMPTZ(6) NOT NULL, "deleted_at" TIMESTAMPTZ(6), UNIQUE("company_id","code"));

ALTER TABLE "users" ADD COLUMN "name" VARCHAR(160) NOT NULL DEFAULT '', ADD COLUMN "social_name" VARCHAR(160), ADD COLUMN "registration" VARCHAR(50), ADD COLUMN "phone" VARCHAR(30), ADD COLUMN "document" VARCHAR(11), ADD COLUMN "must_change_password" BOOLEAN NOT NULL DEFAULT false, ADD COLUMN "last_access_at" TIMESTAMPTZ(6), ADD COLUMN "company_id" UUID REFERENCES "companies"("id"), ADD COLUMN "unit_id" UUID REFERENCES "units"("id"), ADD COLUMN "area_id" UUID REFERENCES "areas"("id"), ADD COLUMN "team_id" UUID REFERENCES "teams"("id"), ADD COLUMN "position_id" UUID REFERENCES "positions"("id"), ADD COLUMN "supervisor_id" UUID REFERENCES "users"("id"), ADD COLUMN "deleted_at" TIMESTAMPTZ(6);
UPDATE "users" SET "registration" = id::text WHERE "registration" IS NULL;
ALTER TABLE "users" ALTER COLUMN "registration" SET NOT NULL;
CREATE UNIQUE INDEX "users_registration_key" ON "users"("registration");
CREATE UNIQUE INDEX "users_document_key" ON "users"("document");
CREATE INDEX "users_status_deleted_at_idx" ON "users"("status","deleted_at");
CREATE INDEX "users_company_id_unit_id_area_id_team_id_idx" ON "users"("company_id","unit_id","area_id","team_id");

CREATE TABLE "roles" ("id" UUID PRIMARY KEY, "name" VARCHAR(120) NOT NULL UNIQUE, "code" VARCHAR(80) NOT NULL UNIQUE, "description" VARCHAR(500), "hierarchy" INTEGER NOT NULL DEFAULT 0, "is_active" BOOLEAN NOT NULL DEFAULT true, "is_system" BOOLEAN NOT NULL DEFAULT false, "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMPTZ(6) NOT NULL, "deleted_at" TIMESTAMPTZ(6));
CREATE TABLE "permissions" ("id" UUID PRIMARY KEY, "name" VARCHAR(160) NOT NULL, "code" VARCHAR(120) NOT NULL UNIQUE, "module" VARCHAR(60) NOT NULL, "resource" VARCHAR(60) NOT NULL, "action" VARCHAR(60) NOT NULL, "description" VARCHAR(500), "is_active" BOOLEAN NOT NULL DEFAULT true, "is_system" BOOLEAN NOT NULL DEFAULT false, "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMPTZ(6) NOT NULL, "deleted_at" TIMESTAMPTZ(6));
CREATE INDEX "permissions_module_resource_action_idx" ON "permissions"("module","resource","action");
CREATE TABLE "user_roles" ("user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE, "role_id" UUID NOT NULL REFERENCES "roles"("id"), "is_default" BOOLEAN NOT NULL DEFAULT false, "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY("user_id","role_id"));
CREATE TABLE "role_permissions" ("role_id" UUID NOT NULL REFERENCES "roles"("id") ON DELETE CASCADE, "permission_id" UUID NOT NULL REFERENCES "permissions"("id"), PRIMARY KEY("role_id","permission_id"));

ALTER TABLE "auth_sessions" ADD COLUMN "device_name" VARCHAR(120), ADD COLUMN "browser" VARCHAR(120), ADD COLUMN "operating_system" VARCHAR(120), ADD COLUMN "last_activity_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE "audit_logs" ("id" UUID PRIMARY KEY, "actor_id" UUID REFERENCES "users"("id") ON DELETE SET NULL, "actor_name" VARCHAR(160), "actor_roles" TEXT[] NOT NULL, "module" VARCHAR(60) NOT NULL, "resource" VARCHAR(80) NOT NULL, "resource_id" VARCHAR(80), "operation" "audit_operation" NOT NULL, "result" "audit_result" NOT NULL DEFAULT 'SUCCESS', "ip_address" VARCHAR(64), "user_agent" VARCHAR(512), "correlation_id" VARCHAR(100) NOT NULL, "request_id" VARCHAR(100), "before" JSONB, "after" JSONB, "metadata" JSONB, "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at");
CREATE INDEX "audit_logs_actor_id_module_operation_idx" ON "audit_logs"("actor_id","module","operation");
CREATE INDEX "audit_logs_correlation_id_idx" ON "audit_logs"("correlation_id");
