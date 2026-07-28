# ADR-003 — PostgreSQL + Prisma ORM

**Status:** Aprovado

**Data:** 27/07/2026

---

# Contexto

O sistema armazenará milhões de registros de monitorias, respostas, auditorias, feedbacks, contestações e indicadores.

Era necessário escolher um banco relacional moderno, robusto e compatível com alta escalabilidade.

---

# Decisão

Banco oficial:

**PostgreSQL**

ORM oficial:

**Prisma ORM**

---

# Motivos

## PostgreSQL

Escolhido por oferecer:

- Open Source
- Excelente performance
- ACID
- JSONB
- Full Text Search
- Índices avançados
- Particionamento
- Escalabilidade
- Grande comunidade

---

## Prisma

Escolhido por oferecer:

- Tipagem automática
- Migrations
- Client TypeScript
- Facilidade de manutenção
- Excelente integração com NestJS

---

# Regras

Obrigatório utilizar:

- UUID
- Migrations
- Soft Delete
- Índices
- Constraints

Nunca alterar banco manualmente.

---

# Não será permitido

- Sequelize
- TypeORM
- SQL manual como padrão
- Banco NoSQL para entidades transacionais

---

# Evolução

O modelo deverá permitir futura utilização de:

- Read Replicas
- Particionamento
- Data Warehouse
- Event Store
