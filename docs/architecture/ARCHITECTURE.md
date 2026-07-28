# ARCHITECTURE.md

# Valenet Quality Hub

## Arquitetura Oficial do Sistema

Versão: 1.0

---

# 1. Objetivo

Este documento define a arquitetura oficial do Valenet Quality Hub.

Toda implementação deverá seguir rigorosamente esta arquitetura.

O objetivo é garantir:

- Alta escalabilidade
- Baixo acoplamento
- Alta coesão
- Facilidade de manutenção
- Evolução contínua
- Performance
- Segurança
- Organização do código

Nenhum módulo deverá ser implementado contrariando este documento.

---

# 2. Visão Geral

O Valenet Quality Hub é uma plataforma de Gestão da Qualidade para Contact Centers.

Ela suporta:

- Monitorias manuais
- Monitorias por IA
- Monitorias híbridas
- Feedbacks
- Contestações
- Calibração
- Dashboards
- Analytics
- Integrações corporativas

---

# 3. Arquitetura Geral

```text
                    Usuário

                       │

                Next.js Frontend

                       │

             REST API (NestJS)

                       │

        ┌──────────────┼──────────────┐

        │              │              │

 PostgreSQL         Redis         BullMQ

        │              │              │

        └──────────────┼──────────────┘

                       │

                Serviços Internos

        │

        ├── IA

        ├── Telefonia

        ├── WhatsApp

        ├── CRM

        ├── Microsoft Entra

        ├── Teams

        └── Webhooks
```

---

# 4. Stack Tecnológica

## Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- shadcn/ui
- React Hook Form
- TanStack Query
- Zustand
- Zod

---

## Backend

- NestJS
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ

---

## Infraestrutura

- Docker
- Docker Compose

---

## Observabilidade

- OpenTelemetry
- Grafana
- Prometheus

---

## Armazenamento

Azure Blob Storage

---

# 5. Estilo Arquitetural

O sistema deverá utilizar:

## Modular Monolith

Cada módulo será independente.

Todos utilizarão o mesmo banco de dados.

Não haverá comunicação direta entre módulos através do banco.

Toda comunicação deverá ocorrer através de Services.

---

# 6. Módulos da Aplicação

```text
auth
users
forms
evaluations
feedbacks
appeals
calibrations
dashboards
ai
settings
audit
notifications
integrations
```

Cada módulo deverá ser autocontido.

O nome, o caminho e a responsabilidade de cada módulo são definidos pelo
`MODULE_CATALOG.md`.

---

# 7. Dependência entre Módulos

As dependências seguem a direção das abstrações:

- módulos de negócio podem depender apenas de contratos públicos de outros
  módulos;
- nenhum módulo acessa o repository ou as tabelas de outro módulo diretamente;
- `dashboards`, `notifications`, `audit` e `integrations` consomem contratos ou
  eventos, sem inverter a dependência do módulo produtor;
- dependências circulares são proibidas;
- `shared` contém apenas capacidades transversais e não depende de módulos de
  negócio.

As dependências concretas devem ser registradas no diagrama de componentes
quando cada módulo for implementado.

---

# 8. Organização do Backend

```text
apps/backend/src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── forms/
│   ├── evaluations/
│   ├── feedbacks/
│   ├── appeals/
│   ├── calibrations/
│   ├── dashboards/
│   ├── ai/
│   ├── settings/
│   ├── audit/
│   ├── notifications/
│   └── integrations/
├── shared/
└── config/
```

---

# 9. Estrutura de um Módulo

Todo módulo deverá possuir:

```text
controllers/

services/

repositories/

dto/

entities/

validators/

mappers/

interfaces/

events/

tests/
```

Nenhuma pasta poderá ser omitida sem justificativa.

---

# 10. Organização do Frontend

```text
app/

components/

features/

hooks/

services/

stores/

types/

schemas/

utils/

styles/

assets/
```

---

# 11. Organização por Feature

Cada funcionalidade deverá possuir:

```text
feature

components

hooks

services

schemas

types

utils

constants

pages
```

---

# 12. Fluxo de Dados

Frontend

↓

React Query

↓

API

↓

Controller

↓

Service

↓

Repository

↓

Prisma

↓

PostgreSQL

Nenhum componente React poderá acessar APIs diretamente sem passar pela camada de serviços.

---

# 13. Fluxo da IA

```text
Atendimento

↓

Transcrição

↓

Provider IA

↓

Prompt

↓

Resposta

↓

Validação

↓

Persistência

↓

Dashboard
```

A IA deverá ser desacoplada da aplicação.

---

# 14. Adapter Pattern

Toda integração externa deverá utilizar Adapters.

Exemplo.

```text
AIProvider

↓

OpenAI Adapter

↓

Azure Adapter

↓

Claude Adapter

↓

Gemini Adapter
```

Nunca utilizar SDKs diretamente dentro dos módulos de negócio.

---

# 15. Eventos

O sistema deverá utilizar eventos internos.

Exemplos.

```text
EvaluationPublished

FeedbackCreated

AppealAccepted

CalibrationFinished

AICompleted
```

Eventos nunca deverão conhecer quem irá consumi-los.

---

# 16. Filas

BullMQ será utilizado para:

- IA
- Notificações
- Importações
- Exportações
- Relatórios
- Processamentos pesados

Nenhum processamento pesado deverá bloquear requisições HTTP.

---

# 17. Cache

Redis será utilizado para:

- Dashboard
- Configurações
- Permissões
- Sessões
- Consultas frequentes

Nunca armazenar dados críticos exclusivamente no cache.

---

# 18. Banco de Dados

Banco oficial.

PostgreSQL.

ORM oficial.

Prisma.

Nunca utilizar SQL bruto sem necessidade comprovada.

---

# 19. Segurança

Toda requisição deverá passar por:

JWT

↓

Permissões

↓

Área

↓

Equipe

↓

Validação

↓

Service

Nunca confiar apenas no Frontend.

---

# 20. Auditoria

Toda operação crítica deverá registrar:

- usuário;
- data;
- ação;
- módulo;
- IP;
- alterações.

Auditoria será obrigatória para:

- criação;
- edição;
- exclusão lógica;
- publicação;
- contestação;
- feedback;
- configurações.

---

# 21. Escalabilidade

A arquitetura deverá suportar:

- milhões de monitorias;
- milhares de usuários;
- múltiplos canais;
- novos módulos;
- novos modelos de IA.

Sem necessidade de reescrita da arquitetura.

---

# 22. Comunicação entre Módulos

Um módulo nunca deverá acessar diretamente o Repository de outro módulo.

Comunicação correta:

```text
Service

↓

Interface

↓

Service Destino
```

---

# 23. Princípios Arquiteturais

Todo desenvolvimento deverá seguir:

- SOLID
- Clean Architecture
- DRY
- KISS
- Separation of Concerns
- Dependency Injection
- Feature Based Design
- Domain Driven Design (DDD Lite)

---

# 24. Evolução da Arquitetura

A arquitetura deverá permitir evolução futura para:

- Microsserviços
- Multiempresa
- Event Driven Architecture
- CQRS (quando necessário)
- Event Sourcing (casos específicos)
- Múltiplos bancos especializados
- Novos provedores de IA
- Novos canais de atendimento

Sem necessidade de grandes refatorações.

---

# 25. Decisões Arquiteturais

As seguintes decisões são obrigatórias:

- TypeScript em todo o projeto.
- Prisma como ORM.
- PostgreSQL como banco principal.
- Redis para cache.
- BullMQ para filas.
- REST API como padrão.
- Modular Monolith como arquitetura inicial.
- React Query para consumo de APIs.
- Zod para validações no Frontend.
- class-validator no Backend.
- shadcn/ui como Design System.
- Tailwind CSS para estilização.

Qualquer alteração nessas decisões deverá ser aprovada antes da implementação.

---

# 26. Visão de Longo Prazo

O Valenet Quality Hub deverá evoluir para uma plataforma enterprise de gestão da qualidade, capaz de suportar múltiplas operações, alto volume de atendimentos, Inteligência Artificial avançada e integrações corporativas, mantendo uma arquitetura simples, modular, escalável e preparada para evolução contínua.
