# US018 — Auditoria de Segurança

**Epic:** EPIC-02 — Gestão Organizacional e Segurança

**ID:** US018

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 04

**Status:** Backlog

---

# História

Como administrador da plataforma,

Quero consultar toda a trilha de auditoria do sistema,

Para garantir rastreabilidade, conformidade e segurança das operações realizadas no Valenet Quality Hub.

---

# Objetivo

Implementar um módulo corporativo de auditoria responsável por registrar automaticamente todas as operações críticas realizadas na plataforma.

Toda ação relevante deverá ser auditada de forma transparente, permitindo rastrear quem realizou a ação, quando ocorreu, de onde foi executada e quais informações foram alteradas.

---

# Valor de Negócio

Esta User Story garante:

- Conformidade (Compliance)
- Segurança
- Rastreabilidade
- Atendimento à LGPD
- Facilidade de investigação
- Histórico completo das alterações

---

# Escopo

## Registro Automático

Auditar automaticamente:

- Login
- Logout
- Criação
- Alteração
- Exclusão lógica
- Bloqueios
- Desbloqueios
- Alteração de permissões
- Alteração de perfis
- Alteração organizacional
- Configurações
- Execuções de IA
- Exportações
- Integrações

---

## Dados Registrados

Cada evento deverá registrar.

- Usuário
- Nome
- Perfil
- Módulo
- Recurso
- Operação
- Data/Hora
- IP
- Navegador
- Sistema Operacional
- Correlation ID
- Request ID
- Resultado
- Valores anteriores
- Valores novos

---

## Tipos de Evento

```text
CREATE

UPDATE

DELETE

LOGIN

LOGOUT

EXPORT

IMPORT

EXECUTE

APPROVE

REJECT

VIEW
```

---

## Consulta

Permitir pesquisa por:

- Usuário
- Perfil
- Módulo
- Operação
- Data
- IP
- Correlation ID
- Resultado

---

## Visualização

Exibir:

- Linha do tempo
- Valores alterados
- Antes e Depois
- Dados técnicos
- Origem da operação

---

## Exportação

Permitir exportar:

- CSV
- Excel
- PDF

---

## Retenção

Permitir configurar:

- Tempo de retenção
- Política de arquivamento
- Exclusão automática

---

# Fluxo Principal

```text
Usuário

↓

Executa ação

↓

Interceptor de Auditoria

↓

Captura contexto

↓

Persistência

↓

Consulta disponível
```

---

# Regras de Negócio

RN001

Nenhuma operação crítica poderá ocorrer sem auditoria.

---

RN002

Os registros de auditoria nunca poderão ser alterados manualmente.

---

RN003

Auditoria deverá utilizar UTC internamente.

---

RN004

Todos os registros deverão possuir Correlation ID.

---

RN005

Exportações deverão ser auditadas.

---

RN006

Consultas à auditoria também deverão ser auditadas.

---

RN007

A exclusão física de registros de auditoria não será permitida.

---

RN008

Toda auditoria deverá registrar o estado anterior e o estado posterior da entidade, quando aplicável.

---

# Critérios de Aceite

- [ ] Auditoria automática funcionando.
- [ ] Consulta funcionando.
- [ ] Filtros funcionando.
- [ ] Exportação funcionando.
- [ ] Correlation ID registrado.
- [ ] Before/After registrado.
- [ ] Auditoria protegida contra alterações.

---

# Casos de Erro

- Usuário inexistente.
- Registro inexistente.
- Exportação inválida.
- Permissão insuficiente.

---

# APIs

```http
GET /audit

GET /audit/{id}

GET /audit/search

POST /audit/export
```

---

# Banco de Dados

Tabelas.

- audit_logs
- audit_exports
- users

---

# Telas

- Consulta de Auditoria
- Detalhes do Evento
- Linha do Tempo
- Exportação

---

# Auditoria

O próprio módulo deverá registrar:

- Consultas
- Exportações
- Configurações
- Alterações de retenção

---

# Definition of Done

- Auditoria automática implementada.
- APIs documentadas.
- Interface concluída.
- Exportação funcionando.
- Testes implementados.

---

# Dependências

- US005 — Configurar Autenticação
- US008 — Configurar Observabilidade
- US013 — Gerenciar Usuários
- US014 — Gerenciar Perfis
- US015 — Gerenciar Permissões

---

# Observações

Este módulo será reutilizado por todas as Epics subsequentes.

Nenhum módulo poderá implementar sua própria auditoria.

Toda auditoria deverá utilizar a infraestrutura corporativa definida nesta User Story.

---

# Instruções para Implementação (Codex)

## Criar

- AuditModule.
- AuditService.
- AuditInterceptor.
- AuditRepository.
- DTOs.
- APIs REST.
- Filtros.
- Exportação.
- Testes.

## Não Implementar

- SIEM.
- Integração com Azure Monitor.
- Integração com Splunk.
- Alertas em tempo real.

## Critérios

- Auditoria automática.
- Baixo impacto de performance.
- Imutabilidade dos registros.
- APIs REST.
- Código reutilizável.

---

# Arquitetura Aplicada

**Padrão:** Cross-Cutting Concern

**Captura:** Interceptors + Decorators

**Persistência:** Prisma ORM

**Observabilidade:** Correlation ID + Request ID

**Exportação:** CSV, Excel e PDF

**Princípio:** Toda operação relevante executada na plataforma deverá gerar um registro de auditoria imutável, rastreável e consultável, garantindo conformidade, segurança e governança sobre os dados e processos do Valenet Quality Hub.
