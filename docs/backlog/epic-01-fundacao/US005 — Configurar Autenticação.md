# US005 — Configurar Autenticação e Autorização

**Epic:** EPIC-01 — Fundação da Plataforma  
**ID:** US005  
**Prioridade:** P0 (Crítica)  
**Story Points:** 13  
**Sprint:** Sprint 01  
**Status:** Done

---

# História

**Como** usuário da plataforma,

**Quero** autenticar-me de forma segura,

**Para que** eu possa acessar apenas os recursos permitidos pelo meu perfil.

---

# Objetivo

Implementar toda a infraestrutura de autenticação e autorização da plataforma.

Ao final desta User Story, o sistema deverá permitir autenticação segura, gerenciamento de sessões e controle de acesso baseado em perfis e permissões.

---

# Valor de Negócio

Esta User Story garante:

- Segurança da plataforma.
- Controle de acesso.
- Integração futura com Microsoft Entra ID.
- Base para RBAC (Role Based Access Control).

---

# Escopo

## Autenticação

Implementar suporte para:

- Login Local
- JWT
- Refresh Token
- Logout
- Renovação automática de token

---

## Estrutura para Microsoft Entra ID

Preparar integração para:

- OpenID Connect
- OAuth 2.0
- Single Sign-On (SSO)
- Microsoft Graph

Nesta User Story apenas a estrutura será criada.

---

## Sessões

Implementar gerenciamento de sessões.

Cada login deverá registrar:

- usuário
- data
- dispositivo
- navegador
- endereço IP

---

## Controle de Acesso

Implementar estrutura para RBAC.

Suportar:

- Roles
- Permissions
- Guards
- Decorators

Exemplo.

```text
Administrador

↓

Pode acessar Configurações

Supervisor

↓

Pode acessar Dashboard

Monitor

↓

Pode criar Monitorias
```

---

## Middleware

Criar middleware responsável por.

- validar token;
- identificar usuário;
- registrar Correlation ID.

---

## Guards

Criar.

```text
AuthGuard

RolesGuard

PermissionsGuard
```

---

## Decorators

Criar.

```text
@CurrentUser()

@Roles()

@Permissions()

@Public()
```

---

## Estratégia de Tokens

Implementar.

Access Token

- curta duração

Refresh Token

- longa duração

Renovação automática.

---

## Segurança

Implementar.

- Hash de senha (Argon2)
- Proteção contra força bruta
- Rate Limiting
- Helmet
- CORS
- Cookies seguros (quando aplicável)

---

## Auditoria

Registrar.

- Login
- Logout
- Falha de Login
- Expiração de Sessão
- Renovação de Token

---

## Estrutura

```text
apps/backend/src/modules/auth/

controllers/

services/

guards/

strategies/

decorators/

dto/

interfaces/

entities/
```

---

# Fora do Escopo

- Gestão de Usuários
- Cadastro de Perfis
- Cadastro de Permissões
- MFA
- Recuperação de Senha

Essas funcionalidades serão implementadas na próxima Epic.

---

# Critérios de Aceite

- [x] Login funcionando.
- [x] JWT funcionando.
- [x] Refresh Token funcionando.
- [x] Logout funcionando.
- [x] AuthGuard funcionando.
- [x] RolesGuard funcionando.
- [x] Decorators funcionando.
- [x] Sessões registradas.
- [x] Auditoria de autenticação registrada.

---

# Dependências

- US001 — Monorepo
- US002 — Backend
- US004 — Banco de Dados

---

# Entregáveis

- Módulo Auth.
- Estrutura RBAC.
- Sistema de Tokens.
- Guards.
- Decorators.
- Middleware.
- Auditoria de autenticação.

---

# Requisitos Técnicos

- NestJS Passport
- JWT
- Argon2
- Passport
- Rate Limiter
- Microsoft Identity (estrutura preparada)

---

# Critérios Técnicos

A autenticação deverá:

- utilizar JWT;
- possuir Refresh Token;
- permitir futura integração com Microsoft Entra ID;
- separar autenticação e autorização;
- registrar eventos de auditoria.

---

# Riscos

- Tokens inseguros.
- Falhas de autorização.
- Sessões inválidas.
- Baixa rastreabilidade.

---

# Definition of Ready (DoR)

- Backend configurado.
- Banco configurado.
- Arquitetura de segurança aprovada.

---

# Definition of Done (DoD)

- Login funcionando.
- Refresh Token funcionando.
- Guards implementados.
- Auditoria funcionando.
- Testes básicos executados.
- Documentação atualizada.

---

# Arquivos Esperados

```text
modules/auth/

auth.module.ts

auth.controller.ts

auth.service.ts

jwt.strategy.ts

local.strategy.ts

auth.guard.ts

roles.guard.ts

permissions.guard.ts

decorators/

dto/

interfaces/
```

---

# Observações

A integração completa com Microsoft Entra ID será implementada em uma Epic futura.

Nesta etapa, o objetivo é criar uma arquitetura flexível que suporte autenticação local e autenticação federada.

---

# Instruções para Implementação (Codex)

## Objetivo

Criar toda a infraestrutura de autenticação da plataforma.

## Criar

- AuthModule.
- JWT.
- Refresh Token.
- Guards.
- Decorators.
- Middleware.
- Estrutura RBAC.
- Auditoria.

## Não Implementar

- CRUD de Usuários.
- CRUD de Perfis.
- MFA.
- Recuperação de Senha.
- Gestão de Permissões.

## Critérios

- Código desacoplado.
- Segurança como prioridade.
- Compatível com Microsoft Entra ID.
- Compatível com autenticação local.
- Preparado para múltiplos provedores de identidade.

---

# Arquitetura Aplicada

**Autenticação:** JWT + Refresh Token

**Autorização:** RBAC (Role-Based Access Control)

**Hash de Senhas:** Argon2

**Integração Futura:** Microsoft Entra ID (OIDC/OAuth 2.0)

**Auditoria:** Todos os eventos de autenticação registrados.

**Princípio:** Nenhuma rota protegida poderá ser acessada sem autenticação e autorização válidas.
