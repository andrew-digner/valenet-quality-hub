# C4_CONTAINER.md

# C4 Model — Nível 2 (Containers)

## Valenet Quality Hub

Versão: 1.0

---

# Objetivo

Este documento descreve os principais containers da arquitetura do Valenet Quality Hub.

No modelo C4, um container representa uma aplicação executável, banco de dados, serviço ou infraestrutura que compõe o sistema.

---

# Visão Geral

```text
                    Usuário
                        │
                        ▼
                ┌────────────────┐
                │   Next.js App  │
                │   Frontend     │
                └────────────────┘
                        │
                 HTTPS / REST API
                        │
                        ▼
                ┌────────────────┐
                │ NestJS Backend │
                │ API Principal  │
                └────────────────┘
         ┌───────────┼───────────────┬───────────────┐
         ▼           ▼               ▼               ▼
┌────────────┐ ┌───────────┐ ┌────────────┐ ┌────────────────┐
│PostgreSQL  │ │   Redis   │ │  BullMQ    │ │ Azure Blob     │
│Banco Dados │ │ Cache     │ │ Filas      │ │ Storage        │
└────────────┘ └───────────┘ └────────────┘ └────────────────┘
                        │
        ┌───────────────┼────────────────────┐
        ▼               ▼                    ▼
┌────────────┐  ┌────────────┐      ┌────────────────┐
│ Azure      │  │ Microsoft  │      │ CRM /          │
│ OpenAI     │  │ Entra ID   │      │ Telefonia      │
└────────────┘  └────────────┘      └────────────────┘
```

---

# Container 1 — Frontend

Tecnologia:

- Next.js
- React
- TypeScript

Responsabilidades:

- Interface do usuário
- Dashboards
- Formulários
- Autenticação
- Consumo das APIs

---

# Container 2 — Backend

Tecnologia:

- NestJS
- TypeScript

Responsabilidades:

- APIs REST
- Regras de negócio
- Segurança
- Auditoria
- IA
- Integrações

---

# Container 3 — PostgreSQL

Responsabilidades:

- Persistência dos dados
- Integridade
- Histórico
- Versionamento

---

# Container 4 — Redis

Responsabilidades:

- Cache
- Sessões
- Permissões
- Configurações
- Dashboards

---

# Container 5 — BullMQ

Responsabilidades:

- Processamento assíncrono
- IA
- Relatórios
- Exportações
- Notificações

---

# Container 6 — Blob Storage

Responsabilidades:

- Evidências
- Áudios
- PDFs
- Anexos
- Exportações

---

# Sistemas Externos

- Azure OpenAI
- Microsoft Entra ID
- Telefonia
- WhatsApp
- CRM
- Microsoft Teams
