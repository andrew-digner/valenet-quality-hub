# US002 — Configurar Backend (NestJS)

**Epic:** EPIC-01 — Fundação da Plataforma  
**ID:** US002  
**Prioridade:** P0 (Crítica)  
**Story Points:** 8  
**Sprint:** Sprint 01  
**Status:** Backlog

---

# História

**Como** desenvolvedor da plataforma,

**Quero** configurar a aplicação Backend utilizando NestJS,

**Para que** todos os módulos do Valenet Quality Hub compartilhem uma arquitetura consistente, segura e escalável.

---

# Objetivo

Criar a estrutura inicial do Backend, definindo padrões arquiteturais, organização modular, configurações globais e infraestrutura necessária para suportar o desenvolvimento dos módulos de negócio.

Ao final desta User Story deverá existir uma API funcional, preparada para receber novas funcionalidades.

---

# Valor de Negócio

Esta User Story estabelece a fundação do Backend.

Todas as funcionalidades futuras dependerão desta implementação.

---

# Escopo

## Framework

- NestJS
- TypeScript
- Fastify (preferencialmente)
- Configuração inicial

---

## Estrutura do Projeto

```text
apps/backend/

src/

modules/

common/

config/

database/

prisma/

middlewares/

filters/

interceptors/

guards/

decorators/

pipes/

shared/

main.ts
```

---

## Configuração Global

- ValidationPipe
- Global Exception Filter
- CORS
- Compression
- Helmet
- Versionamento da API
- Prefixo global (/api)

---

## Arquitetura

Organização modular.

Cada módulo deverá possuir:

```text
module/

controllers/

services/

repositories/

dto/

entities/

validators/

mappers/

events/

interfaces/
```

---

## Configuração

Criar módulo central de configuração.

Responsável por:

- Variáveis de ambiente
- Configurações globais
- Feature Flags (estrutura)
- Ambientes

---

## Logging

Configurar:

- Logger estruturado
- Request ID
- Correlation ID
- Tempo de execução
- Nível de Log

---

## Tratamento de Erros

Criar:

- Exception Filter Global
- Exceptions customizadas
- Padronização das respostas

---

## Health Check

Criar endpoint.

```http
GET /health
```

Retornar.

- Status
- Banco
- Ambiente
- Versão

---

## Segurança Base

Preparar estrutura para:

- JWT
- Microsoft Entra ID
- Guards
- Roles
- Permissões

Sem implementar regras de negócio.

---

## Estrutura Compartilhada

Criar módulos comuns.

```text
Common

Shared

Core
```

Responsáveis por:

- Exceptions
- Utils
- Helpers
- Constantes
- Tipos
- Interfaces

---

# Fora do Escopo

- Usuários
- Login
- Prisma
- Banco
- Formulários
- Monitorias
- IA

---

# Critérios de Aceite

- [ ] API inicia corretamente.
- [ ] Estrutura modular criada.
- [ ] Configuração global funcionando.
- [ ] ValidationPipe configurado.
- [ ] Exception Filter funcionando.
- [ ] Logger funcionando.
- [ ] Endpoint /health funcionando.
- [ ] Prefixo /api configurado.
- [ ] Versionamento habilitado.
- [ ] Estrutura preparada para novos módulos.

---

# Dependências

US001 — Estruturar o Monorepo

---

# Entregáveis

- Backend inicial.
- Estrutura modular.
- Configurações globais.
- Sistema de logging.
- Tratamento global de erros.
- Endpoint de Health Check.

---

# Requisitos Técnicos

- NestJS
- Fastify
- TypeScript
- ConfigModule
- Helmet
- Compression
- Class Validator
- Class Transformer

---

# Critérios Técnicos

A aplicação deverá:

- iniciar sem erros;
- aceitar novas rotas;
- possuir configuração centralizada;
- utilizar arquitetura modular;
- seguir os padrões definidos na arquitetura do projeto.

---

# Riscos

- Estrutura inadequada para crescimento.
- Acoplamento entre módulos.
- Configurações inconsistentes.
- Baixa observabilidade.

---

# Definition of Ready (DoR)

- Monorepo configurado.
- Arquitetura aprovada.
- Ferramentas definidas.

---

# Definition of Done (DoD)

- API executando.
- Build aprovado.
- Lint aprovado.
- Testes básicos executados.
- Documentação atualizada.

---

# Arquivos Esperados

```text
apps/backend/

src/

main.ts

app.module.ts

common/

config/

modules/

shared/

middlewares/

filters/

interceptors/

guards/

decorators/

pipes/

health/
```

---

# Observações

Nenhuma funcionalidade de negócio deverá ser implementada nesta etapa.

Esta User Story estabelece exclusivamente a fundação técnica do Backend.

Os módulos funcionais (Usuários, Formulários, Monitorias, etc.) serão implementados nas próximas Epics.

---

# Instruções para Implementação (Codex)

## Objetivo

Criar a estrutura inicial do Backend seguindo a arquitetura definida para o Valenet Quality Hub.

## Criar

- Estrutura de diretórios do Backend.
- Configuração do NestJS.
- Configuração global da aplicação.
- Endpoint `/health`.
- Módulos compartilhados (`common`, `shared`, `config`).
- Sistema de logging.
- Exception Filter global.
- ValidationPipe global.

## Não Implementar

- Regras de negócio.
- Persistência de dados.
- Autenticação.
- Controllers de domínio.
- Módulos funcionais.

## Critérios

- Código limpo.
- Arquitetura modular.
- Baixo acoplamento.
- Fácil extensibilidade.
- Compatível com Prisma e Fastify.
