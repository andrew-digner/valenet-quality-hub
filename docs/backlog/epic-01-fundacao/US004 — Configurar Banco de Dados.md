# US004 — Configurar Banco de Dados (PostgreSQL + Prisma)

**Epic:** EPIC-01 — Fundação da Plataforma  
**ID:** US004  
**Prioridade:** P0 (Crítica)  
**Story Points:** 8  
**Sprint:** Sprint 01  
**Status:** Done

---

# História

**Como** desenvolvedor da plataforma,

**Quero** configurar o banco de dados utilizando PostgreSQL e Prisma ORM,

**Para que** toda a persistência de dados do Valenet Quality Hub seja consistente, escalável e preparada para evolução.

---

# Objetivo

Criar toda a infraestrutura de persistência da aplicação, incluindo conexão com PostgreSQL, configuração do Prisma ORM, migrations, seeds e padrões de acesso aos dados.

Ao final desta User Story deverá existir um banco totalmente funcional e integrado ao Backend.

---

# Valor de Negócio

Esta User Story estabelece toda a camada de persistência da plataforma.

Todos os módulos futuros utilizarão esta infraestrutura.

---

# Escopo

## Banco de Dados

- PostgreSQL
- Banco local
- Banco para testes
- Banco para desenvolvimento

---

## Prisma ORM

Configurar.

- Prisma Client
- Schema
- Generator
- Datasource
- Migrations
- Seeds

---

## Estrutura

```text
prisma/

schema.prisma

migrations/

seed.ts

scripts/

README.md
```

---

## Configuração

Criar.

- DATABASE_URL
- Variáveis de ambiente
- Configuração por ambiente
- Pool de conexões

---

## Prisma Client

Criar Provider compartilhado para o NestJS.

Responsável por.

- conexão;
- lifecycle;
- shutdown;
- logging.

---

## Primeira Migration

Criar migration inicial contendo.

- tabela de migrations;
- estrutura base;
- configuração inicial.

Ainda sem entidades de negócio.

---

## Seeds

Preparar estrutura para.

- Roles
- Permissions
- Settings
- IA Providers
- Templates

Não inserir dados nesta User Story.

---

## Scripts

Adicionar scripts.

```bash
prisma generate

prisma migrate dev

prisma migrate deploy

prisma db seed

prisma studio

prisma format
```

---

## Logging

Configurar logs do Prisma.

- Queries
- Erros
- Warnings
- Tempo de execução

---

## Organização

Criar módulo.

```text
apps/backend/src/database/
```

Responsável por.

- PrismaService
- PrismaModule
- Repositories Base
- Helpers

---

## Documentação

Criar instruções para.

- subir banco;
- executar migrations;
- executar seeds;
- utilizar Prisma Studio.

---

# Fora do Escopo

- Entidades de negócio
- Usuários
- Formulários
- Monitorias
- Feedbacks
- IA

---

# Critérios de Aceite

- [x] PostgreSQL configurado.
- [x] Prisma instalado.
- [x] Prisma Client funcionando.
- [x] Conexão estabelecida.
- [x] Migration inicial criada.
- [x] Prisma Studio funcionando.
- [x] Seeds configuradas.
- [x] Scripts funcionando.
- [x] Integração com NestJS concluída.

---

# Dependências

- US001 — Estruturar o Monorepo
- US002 — Configurar Backend

---

# Entregáveis

- Banco PostgreSQL configurado.
- Prisma ORM configurado.
- Prisma Client.
- Migration inicial.
- Estrutura de Seeds.
- Prisma Module para NestJS.

---

# Requisitos Técnicos

- PostgreSQL 16+
- Prisma ORM
- Prisma Client
- TypeScript

---

# Critérios Técnicos

O projeto deverá.

- conectar ao banco;
- executar migrations;
- gerar Prisma Client;
- executar seeds;
- utilizar uma única instância do Prisma Client;
- suportar múltiplos ambientes.

---

# Riscos

- Conexões duplicadas.
- Falhas em migrations.
- Configuração incorreta de ambientes.
- Vazamento de conexões.

---

# Definition of Ready (DoR)

- Backend configurado.
- PostgreSQL disponível.
- Arquitetura aprovada.

---

# Definition of Done (DoD)

- Banco conectado.
- Migration executando.
- Prisma Client gerado.
- Build aprovado.
- Documentação atualizada.

---

# Arquivos Esperados

```text
prisma/

schema.prisma

migrations/

seed.ts

apps/backend/src/database/

prisma.module.ts

prisma.service.ts

database.module.ts
```

---

# Observações

Nenhuma entidade de negócio deverá ser criada nesta User Story.

O objetivo é preparar exclusivamente a infraestrutura de persistência da plataforma.

O modelo de dados será implementado nas próximas Epics.

---

# Instruções para Implementação (Codex)

## Objetivo

Configurar PostgreSQL e Prisma ORM como camada oficial de persistência do Valenet Quality Hub.

## Criar

- Configuração do PostgreSQL.
- Prisma ORM.
- Prisma Client.
- PrismaModule.
- PrismaService.
- Estrutura de migrations.
- Estrutura de seeds.
- Scripts de desenvolvimento.
- Configuração por ambiente.

## Não Implementar

- Models do Prisma.
- Entidades de negócio.
- Repositórios específicos.
- Dados iniciais.
- Regras de negócio.

## Critérios

- Utilizar apenas Prisma ORM.
- Uma única instância do Prisma Client.
- Configuração baseada em variáveis de ambiente.
- Código preparado para evolução incremental.
- Compatível com PostgreSQL e Docker.

---

# Arquitetura Aplicada

**Persistência:** Prisma ORM + PostgreSQL

**Padrão:** Repository Pattern (implementado nas próximas Epics)

**Migrations:** Prisma Migrate

**Seeds:** Prisma Seed

**Conexão:** PrismaService Singleton

**Ambientes:** Local, Desenvolvimento, Homologação e Produção

**Observabilidade:** Logging de queries, erros e tempo de execução

**Princípio:** Toda alteração estrutural do banco deverá ser realizada exclusivamente por meio de migrations versionadas.
