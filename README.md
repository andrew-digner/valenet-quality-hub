# Valenet Quality Hub

Fundação técnica do monorepo da plataforma de gestão da qualidade.

## Pré-requisitos

- Node.js 24 LTS ou versão compatível com `package.json`;
- pnpm 11;
- Docker Desktop com Docker Compose.

## Preparação

```bash
cp .env.example .env
pnpm install
pnpm prisma:generate
```

No PowerShell, copie o ambiente com:

```powershell
Copy-Item .env.example .env
```

## Desenvolvimento local

Inicie o PostgreSQL:

```bash
docker compose up -d postgres
```

Inicie frontend e backend:

```bash
pnpm dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

O backend não expõe APIs funcionais nesta fundação.

## Ambiente completo em containers

```bash
docker compose up --build
```

## Validação

```bash
pnpm docs:check
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm prisma:validate
pnpm build
docker compose config
```

## Estrutura

```text
apps/
├── backend/        NestJS e Prisma, sem módulos de negócio
└── frontend/       Next.js App Router, sem telas de negócio
packages/
└── shared/         Reserva para contratos compartilhados
docs/               Arquitetura, PRD e backlog
database/           Modelo de dados documental
scripts/            Validações da fundação
```

Consulte `docs/DOCUMENTATION_GOVERNANCE.md` antes de qualquer implementação.
