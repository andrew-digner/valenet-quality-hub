# Configuração e Variáveis de Ambiente

A API usa `ConfigModule` global, arquivos tipados por domínio e validação Zod
antes da inicialização. Fora de `apps/backend/src/config`, não acesse
`process.env`.

## Ambientes

`NODE_ENV` aceita `local`, `development`, `test`, `homologation` e `production`.
A ordem de leitura é `.env.<ambiente>.local`, `.env.<ambiente>`, `.env.local` e
`.env`. Arquivos `*.local` não são versionados.

## Variáveis obrigatórias

| Variável       | Descrição                              |
| -------------- | -------------------------------------- |
| `NODE_ENV`     | Ambiente da aplicação                  |
| `DATABASE_URL` | URL PostgreSQL                         |
| `JWT_SECRET`   | Segredo JWT com ao menos 32 caracteres |

## Domínios opcionais e padrões

- Aplicação: `APP_NAME`, `APP_VERSION`, `BACKEND_PORT`.
- Banco: `DATABASE_POOL_MAX=10`, `DATABASE_TIMEOUT_MS=5000`.
- Redis: `REDIS_HOST=localhost`, `REDIS_PORT=6379`, `REDIS_PASSWORD`.
- Autenticação: `JWT_REFRESH_SECRET`, `JWT_EXPIRES_IN=15m`,
  `JWT_REFRESH_EXPIRES_IN=7d`.
- IA: `AI_PROVIDER=disabled`, `AI_API_KEY`, `AI_MODEL`,
  `AI_MAX_REQUESTS=100`.
- E-mail: `SMTP_HOST`, `SMTP_PORT`, `MAIL_FROM`.
- Storage: `STORAGE_MAX_UPLOAD_MB`, `STORAGE_BUCKET`, `STORAGE_DIRECTORY`.
- Logs: `LOG_LEVEL`, `LOG_FORMAT`, `LOG_RETENTION_DAYS`.
- Flags: `AI_ENABLED`, `CALIBRATION_ENABLED`, `APPEALS_ENABLED` e
  `NOTIFICATIONS_ENABLED`.

Copie `.env.example` para `.env.local`, substitua placeholders e nunca versione
segredos. Novos ambientes devem usar o mesmo schema e documentar diferenças
operacionais.
