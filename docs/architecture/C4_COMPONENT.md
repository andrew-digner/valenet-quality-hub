# C4_COMPONENT.md

# C4 Model — Nível 3 (Componentes)

## Backend — NestJS

---

# Objetivo

Descrever os componentes internos do Backend.

---

# Estrutura Geral

```text
Backend

│

├── Auth Module

├── Users Module

├── Forms Module

├── Evaluations Module

├── Feedbacks Module

├── Appeals Module

├── Calibrations Module

├── Dashboards Module

├── AI Module

├── Settings Module

├── Audit Module

├── Notifications Module

├── Integrations Module

└── Shared Module
```

---

# Auth Module

Responsável por:

- Login
- JWT
- Refresh Token
- MFA
- SSO

---

# Users Module

Responsável por:

- Usuários
- Perfis
- Permissões
- Equipes
- Áreas

---

# Forms Module

Responsável por:

- Formulários
- Versões
- Perguntas
- Categorias
- Pesos

---

# Evaluations Module

Responsável por:

- Monitorias
- Respostas
- Evidências
- Publicação
- Histórico

---

# AI Module

Responsável por:

- Providers
- Prompt Builder
- Processamento
- Score
- Evidências

---

# Dashboards Module

Responsável por:

- KPIs
- Indicadores
- Rankings
- Metas
- Exportações

---

# Audit Module

Responsável por:

- Logs
- Histórico
- Auditoria
- Versionamento

---

# Shared Module

Componentes compartilhados:

- Exceptions
- Guards
- Pipes
- Decorators
- Helpers
- Utils
- Logger
- Events
