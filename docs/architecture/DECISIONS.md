# DECISIONS.md

# Valenet Quality Hub

## Registro de Decisões Arquiteturais

Versão: 1.0

---

# Objetivo

Este documento centraliza todas as decisões arquiteturais vigentes do Valenet Quality Hub.

Enquanto os documentos da pasta `/docs/adr` registram o histórico e a justificativa de cada decisão, este arquivo representa a visão consolidada da arquitetura atual.

Em caso de conflito entre este documento e um ADR, prevalece o ADR mais recente aprovado.

---

# Como utilizar

Antes de implementar qualquer funcionalidade, desenvolvedores e agentes de IA devem consultar este documento para compreender os padrões oficiais adotados no projeto.

Mudanças arquiteturais somente poderão ocorrer mediante criação de um novo ADR.

---

# Arquitetura

| Item                  | Decisão                            |
| --------------------- | ---------------------------------- |
| Estilo Arquitetural   | Modular Monolith                   |
| Evolução futura       | Microsserviços (quando necessário) |
| Organização           | Feature-Based                      |
| Arquitetura de Código | Clean Architecture + DDD Lite      |
| Comunicação interna   | Eventos de Domínio                 |

---

# Frontend

| Item               | Decisão              |
| ------------------ | -------------------- |
| Framework          | Next.js (App Router) |
| Linguagem          | TypeScript           |
| UI                 | React                |
| Estilização        | Tailwind CSS         |
| Componentes        | shadcn/ui            |
| Formulários        | React Hook Form      |
| Validação          | Zod                  |
| Estado do Servidor | TanStack Query       |
| Estado do Cliente  | Zustand              |
| Gráficos           | Recharts             |

---

# Backend

| Item                     | Decisão           |
| ------------------------ | ----------------- |
| Framework                | NestJS            |
| Linguagem                | TypeScript        |
| ORM                      | Prisma            |
| APIs                     | REST              |
| Documentação             | OpenAPI (Swagger) |
| Processamento Assíncrono | BullMQ            |

---

# Banco de Dados

| Item            | Decisão        |
| --------------- | -------------- |
| Banco Principal | PostgreSQL     |
| Chave Primária  | UUID           |
| Exclusão        | Soft Delete    |
| Auditoria       | Obrigatória    |
| Migrations      | Prisma Migrate |
| Convenção       | snake_case     |

---

# Cache

| Item       | Decisão                                   |
| ---------- | ----------------------------------------- |
| Tecnologia | Redis                                     |
| Uso        | Cache, Sessões, Permissões, Configurações |

---

# Filas

| Item       | Decisão                                   |
| ---------- | ----------------------------------------- |
| Tecnologia | BullMQ                                    |
| Backend    | Redis                                     |
| Utilização | IA, Exportações, Notificações, Relatórios |

---

# Armazenamento de Arquivos

| Item            | Decisão            |
| --------------- | ------------------ |
| Produção        | Azure Blob Storage |
| Desenvolvimento | MinIO (opcional)   |

---

# Inteligência Artificial

| Item          | Decisão                              |
| ------------- | ------------------------------------ |
| Arquitetura   | Provider Pattern                     |
| Acoplamento   | Desacoplado                          |
| Provedores    | Azure OpenAI, OpenAI, Claude, Gemini |
| Processamento | Assíncrono                           |
| Auditoria     | Obrigatória                          |

---

# Segurança

| Item         | Decisão             |
| ------------ | ------------------- |
| Autenticação | JWT + Refresh Token |
| SSO          | Microsoft Entra ID  |
| Autorização  | RBAC                |
| Transporte   | HTTPS / TLS 1.3     |
| Rate Limit   | Obrigatório         |
| Helmet       | Obrigatório         |
| Auditoria    | Obrigatória         |

---

# APIs

| Item          | Decisão      |
| ------------- | ------------ |
| Padrão        | REST         |
| Versionamento | /api/v1      |
| Paginação     | Obrigatória  |
| DTOs          | Obrigatórios |
| Validação     | Obrigatória  |
| Rate Limiting | Obrigatório  |

---

# Observabilidade

| Item       | Decisão       |
| ---------- | ------------- |
| Métricas   | Prometheus    |
| Dashboards | Grafana       |
| Tracing    | OpenTelemetry |
| Logs       | Estruturados  |

---

# Testes

| Item             | Decisão      |
| ---------------- | ------------ |
| Unitários        | Obrigatórios |
| Integração       | Obrigatórios |
| E2E              | Obrigatórios |
| Cobertura mínima | 80%          |

---

# DevOps

| Item                | Decisão                |
| ------------------- | ---------------------- |
| Containers          | Docker                 |
| Orquestração futura | Kubernetes             |
| CI/CD               | GitHub Actions         |
| Ambientes           | Dev, Homolog, Produção |

---

# Convenções de Código

| Item                | Padrão               |
| ------------------- | -------------------- |
| Linguagem do código | Inglês               |
| Interface           | Português            |
| Variáveis           | camelCase            |
| Classes             | PascalCase           |
| Banco               | snake_case           |
| Commits             | Conventional Commits |

---

# Princípios Obrigatórios

Toda implementação deverá seguir:

- SOLID
- Clean Code
- Clean Architecture
- DRY
- KISS
- YAGNI
- Dependency Injection
- Separation of Concerns
- Feature-Based Design

---

# Decisões Registradas

| ADR     | Tema                                        | Status   |
| ------- | ------------------------------------------- | -------- |
| ADR-001 | Modular Monolith                            | Aprovado |
| ADR-002 | Next.js + NestJS                            | Aprovado |
| ADR-003 | PostgreSQL + Prisma                         | Aprovado |
| ADR-004 | Redis + BullMQ                              | Aprovado |
| ADR-005 | IA baseada em Providers                     | Aprovado |
| ADR-006 | REST API                                    | Aprovado |
| ADR-007 | RBAC                                        | Aprovado |
| ADR-008 | Arquitetura Event-Driven                    | Aprovado |
| ADR-009 | Governança documental e contratos canônicos | Aprovado |

---

# Checklist Arquitetural

Antes de iniciar qualquer desenvolvimento, verificar:

- [ ] A implementação segue o PRD?
- [ ] Respeita os ADRs?
- [ ] Mantém a arquitetura modular?
- [ ] Utiliza os padrões oficiais?
- [ ] Implementa auditoria?
- [ ] Implementa autenticação e autorização?
- [ ] Possui testes automatizados?
- [ ] Está documentada?

---

# Considerações Finais

Este documento representa a visão consolidada da arquitetura do Valenet Quality Hub.

Qualquer alteração significativa deverá ser formalizada por meio de um novo Architecture Decision Record (ADR) e refletida neste arquivo após sua aprovação.
