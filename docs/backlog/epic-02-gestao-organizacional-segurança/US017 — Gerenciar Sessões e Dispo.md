# US017 — Gerenciar Sessões e Dispositivos

**Epic:** EPIC-02 — Gestão Organizacional e Segurança

**ID:** US017

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 03

**Status:** Done

---

# História

Como administrador da plataforma,

Quero visualizar e controlar as sessões ativas dos usuários,

Para garantir a segurança da plataforma e encerrar acessos indevidos quando necessário.

---

# Objetivo

Implementar o gerenciamento completo de sessões autenticadas, permitindo monitorar dispositivos conectados, revogar acessos e manter um histórico de autenticação.

Todas as sessões deverão ser rastreáveis.

---

# Valor de Negócio

Este módulo garante:

- Maior segurança.
- Controle de acessos.
- Rastreabilidade.
- Atendimento a requisitos de auditoria.
- Suporte à LGPD.

---

# Escopo

## Sessões Ativas

Exibir:

- Usuário
- Dispositivo
- Navegador
- Sistema Operacional
- Endereço IP
- Localização aproximada (quando disponível)
- Data de Login
- Última atividade
- Status

---

## Encerramento de Sessão

Permitir:

- Encerrar sessão específica.
- Encerrar todas as sessões de um usuário.
- Encerrar todas as sessões da plataforma (administradores).

---

## Histórico

Registrar:

- Login
- Logout
- Expiração
- Revogação
- Renovação de Token

---

## Dispositivos

Registrar:

- Nome do dispositivo
- Navegador
- Sistema Operacional
- User Agent
- Último acesso

---

## Sessão Atual

Permitir ao usuário:

- Visualizar a sessão atual.
- Visualizar outros dispositivos conectados.
- Encerrar outras sessões.

---

# Fluxo Principal

```text
Administrador

↓

Consultar Usuário

↓

Visualizar Sessões

↓

Selecionar Sessão

↓

Encerrar Sessão

↓

Registrar Auditoria
```

---

# Regras de Negócio

RN001

Cada sessão deverá possuir um identificador único.

---

RN002

Refresh Tokens revogados não poderão ser reutilizados.

---

RN003

Ao bloquear um usuário todas as sessões deverão ser encerradas.

---

RN004

Toda revogação deverá ser auditada.

---

RN005

Sessões expiradas deverão ser removidas automaticamente.

---

RN006

Usuários poderão visualizar apenas suas próprias sessões.

Administradores poderão visualizar todas.

---

RN007

Toda autenticação deverá criar uma nova sessão.

---

# Critérios de Aceite

- [ ] Consultar sessões ativas.
- [ ] Encerrar sessão específica.
- [ ] Encerrar todas as sessões de um usuário.
- [ ] Histórico disponível.
- [ ] Sessão atual identificada.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Sessão inexistente.
- Sessão já encerrada.
- Usuário sem permissão.
- Token inválido.

---

# APIs

```http
GET    /sessions

GET    /sessions/me

GET    /sessions/{userId}

DELETE /sessions/{sessionId}

DELETE /sessions/user/{userId}

DELETE /sessions/me/others
```

---

# Banco de Dados

Tabelas.

- user_sessions
- refresh_tokens
- audit_logs

---

# Telas

- Sessões Ativas
- Dispositivos
- Histórico de Acessos

---

# Auditoria

Registrar:

- Login
- Logout
- Revogação
- Expiração
- Dispositivo
- IP
- Data/Hora
- Usuário responsável

---

# Definition of Done

- Gestão de sessões implementada.
- APIs documentadas.
- Interface concluída.
- Auditoria funcionando.
- Testes implementados.

---

# Dependências

- US005 — Configurar Autenticação
- US013 — Gerenciar Usuários

---

# Observações

O gerenciamento de sessões deverá ser compatível com autenticação local e Microsoft Entra ID.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD de sessões (consulta e revogação).
- Controle de Refresh Tokens.
- Histórico de acessos.
- Auditoria.
- Testes.

## Não Implementar

- MFA.
- Gestão de dispositivos móveis.
- Notificações de login.

## Critérios

- Sessões rastreáveis.
- Revogação imediata.
- Exclusão automática de sessões expiradas.
- Compatível com JWT e Refresh Token.

---

# Arquitetura Aplicada

**Autenticação:** JWT + Refresh Token

**Persistência:** Prisma ORM

**Segurança:** Revogação de sessões e tokens

**Auditoria:** Registro completo do ciclo de vida das sessões

**Princípio:** Toda sessão autenticada deverá ser identificável, auditável e revogável a qualquer momento, garantindo segurança operacional e rastreabilidade.
