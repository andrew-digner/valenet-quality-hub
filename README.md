# Valenet Quality Hub

## Administração e segurança

A Sprint 3 (`v0.3.0`) está concluída e congelada. Ela adiciona gestão de
usuários, estrutura organizacional, RBAC
persistido, sessões revogáveis e auditoria corporativa. O frontend administrativo
está disponível em `/login` e `/admin/*`; a API REST permanece versionada em
`/api/v1`. Execute `pnpm prisma:seed` após as migrations para criar o catálogo
inicial de permissões e associar o papel Administrador ao usuário bootstrap.

Fundação técnica do monorepo da plataforma de gestão da qualidade. As Sprints 1,
2 e 3 estão concluídas e congeladas; o projeto está pronto para iniciar a Sprint 4.

## Pré-requisitos

- Node.js 24 LTS ou versão compatível com `package.json`;
- pnpm 11;
- Docker Desktop com Docker Compose.

## Preparação

```bash
cp .env.example .env
pnpm install
pnpm prisma:generate
pnpm --filter @valenet/backend prisma:migrate:deploy
pnpm --filter @valenet/backend prisma:seed
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
- Health check: `http://localhost:3001/health`
- Swagger: `http://localhost:3001/api/docs`
- Métricas: `http://localhost:3001/metrics`

O backend expõe o health check técnico e a fundação de autenticação. APIs de
negócio continuam fora do escopo.

## Autenticação

Configure `JWT_SECRET` com no mínimo 32 caracteres. Para criar ou atualizar um
usuário local inicial durante a seed, informe `AUTH_BOOTSTRAP_EMAIL` e
`AUTH_BOOTSTRAP_PASSWORD`; sem essas variáveis, nenhuma conta é criada.

```text
POST   /api/v1/auth/sessions
POST   /api/v1/auth/token-refreshes
DELETE /api/v1/auth/sessions/current
```

O access token JWT expira em 15 minutos. O refresh token opaco dura 30 dias, é
armazenado somente como hash Argon2 e rotacionado a cada renovação. Login,
falha, renovação, logout e expiração são auditados com IP e user-agent. As
rotas são protegidas por padrão; `@Public()`, `@Roles()` e `@Permissions()`
controlam exceções e autorização. A abstração `IdentityProvider` reserva a
integração futura com Microsoft Entra ID sem acoplar o domínio ao provedor.

## Ambiente completo em containers

```bash
pnpm docker:up
```

O comando constrói e inicia PostgreSQL, Redis, API e frontend em uma rede bridge
privada. Backend e frontend iniciam os artefatos já compilados, sem instalar
dependências em runtime. As migrations pendentes são executadas por um container
one-shot antes da API iniciar. Aguarde todos os serviços permanentes ficarem
`healthy`:

```bash
pnpm docker:ps
```

Operações usuais:

```bash
pnpm docker:logs
pnpm docker:restart
pnpm docker:down
docker compose pull
docker compose build --pull
```

Para remover também os volumes persistentes e recriar PostgreSQL e Redis do
zero, use o comando destrutivo abaixo. Ele apaga todos os dados locais:

```bash
docker compose down --volumes
pnpm docker:up
```

Depois, configure opcionalmente a conta inicial no `.env` e execute
`pnpm --filter @valenet/backend prisma:seed` no host, ou
`docker compose run --rm migrate pnpm --filter @valenet/backend prisma:seed`.

O `.env.example` documenta todas as variáveis. `.env.development` fornece
valores locais não sensíveis e `.env.local` permite sobrescrevê-los sem versionar
segredos. Nunca reutilize as credenciais locais em ambientes compartilhados.

## Validação

```bash
pnpm docs:check
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
pnpm test:e2e
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
├── config/         Configurações compartilhadas de engenharia
├── shared/         Reserva para contratos compartilhados
└── ui/             Design System oficial
docs/               Arquitetura, PRD e backlog
database/           Modelo de dados documental
scripts/            Validações da fundação
```

Consulte `docs/DOCUMENTATION_GOVERNANCE.md` antes de qualquer implementação.
Guias complementares estão em `docs/CONFIGURATION.md`,
`docs/CONTRIBUTING.md`, `docs/OBSERVABILITY.md` e `docs/TESTING.md`.

## Banco de dados

Os comandos Prisma são executados no pacote backend:

```bash
pnpm prisma:generate
pnpm --filter @valenet/backend prisma:migrate:dev
pnpm --filter @valenet/backend prisma:migrate:deploy
pnpm --filter @valenet/backend prisma:seed
pnpm --filter @valenet/backend prisma:studio
```

Alterações estruturais devem ser feitas exclusivamente por migrations. A seed
da fundação só cria a conta local opcional configurada pelas variáveis
`AUTH_BOOTSTRAP_EMAIL` e `AUTH_BOOTSTRAP_PASSWORD`.
