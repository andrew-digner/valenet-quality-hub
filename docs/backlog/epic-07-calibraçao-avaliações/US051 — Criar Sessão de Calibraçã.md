# US051 — Criar Sessão de Calibração

**Epic:** EPIC-07 — Calibração de Avaliações

**ID:** US051

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 13

**Status:** Backlog

---

# História

Como coordenador ou gestor da Qualidade,

Quero criar uma sessão de calibração,

Para organizar avaliações conjuntas entre diferentes monitores e garantir alinhamento nos critérios de avaliação.

---

# Objetivo

Implementar o gerenciamento das sessões de calibração, permitindo definir participantes, monitorias, período de execução, moderador e regras da sessão.

Cada sessão será o ponto central do processo de calibração.

---

# Valor de Negócio

A sessão de calibração:

- Organiza o processo.
- Padroniza avaliações.
- Garante independência entre avaliadores.
- Facilita auditorias.
- Produz indicadores de consistência.

---

# Escopo

## Criar Sessão

Permitir informar:

- Nome
- Descrição
- Moderador
- Objetivo
- Data de início
- Data de encerramento
- Status

---

## Configuração

Definir:

- Quantidade mínima de participantes
- Avaliação individual obrigatória
- Permitir reavaliação
- Exibir consenso somente ao final
- Encerramento manual ou automático

---

## Moderador

Permitir:

- Definir moderador
- Alterar moderador
- Transferir responsabilidade

---

## Status

Fluxo:

```text
Rascunho

↓

Agendada

↓

Em Execução

↓

Concluída
```

Opcionalmente:

```text
↓

Cancelada
```

---

## Resumo

Exibir:

- Quantidade de participantes
- Quantidade de monitorias
- Progresso
- Data prevista

---

# Fluxo Principal

```text
Criar Sessão

↓

Configurar Sessão

↓

Adicionar Participantes

↓

Selecionar Monitorias

↓

Publicar Sessão
```

---

# Regras de Negócio

RN001

Toda sessão deverá possuir um moderador.

---

RN002

A sessão deverá possuir pelo menos dois participantes.

---

RN003

Somente sessões publicadas poderão receber avaliações.

---

RN004

Participantes não poderão visualizar avaliações de outros participantes antes do consenso.

---

RN005

Toda alteração deverá ser auditada.

---

RN006

Sessões concluídas serão somente leitura.

---

RN007

As datas deverão ser válidas e coerentes.

---

RN008

Cada sessão deverá possuir identificador único.

---

# Critérios de Aceite

- [ ] Criar sessão.
- [ ] Definir moderador.
- [ ] Configurar regras.
- [ ] Alterar status.
- [ ] Publicar sessão.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Moderador inexistente.
- Menos de dois participantes.
- Datas inválidas.
- Usuário sem permissão.
- Sessão já encerrada.

---

# APIs

```http
GET    /calibrations

GET    /calibrations/{id}

POST   /calibrations

PUT    /calibrations/{id}

PATCH  /calibrations/{id}/status
```

---

# Banco de Dados

Tabelas:

- calibration_sessions
- calibration_settings
- calibration_history
- audit_logs

---

# Telas

- Lista de Calibrações
- Nova Sessão
- Configuração
- Resumo da Sessão

---

# Auditoria

Registrar:

- Criação.
- Alteração.
- Publicação.
- Mudança de status.
- Encerramento.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- CRUD implementado.
- Workflow de status funcionando.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- EPIC-04 — Execução de Monitorias

---

# Observações

A criação da sessão não adiciona monitorias nem participantes.

Essas funcionalidades serão implementadas nas próximas User Stories.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD de sessões.
- Workflow de status.
- Configurações da sessão.
- Auditoria.
- Testes.

## Não Implementar

- Participantes.
- Monitorias.
- Avaliações.
- Comparação.

## Critérios

- APIs REST.
- Arquitetura modular.
- Workflow baseado em estados.
- Código desacoplado.

---

# Arquitetura Aplicada

**Aggregate Root:** CalibrationSession

**Relacionamentos:**

CalibrationSession

↓

CalibrationSettings

↓

CalibrationHistory

↓

CalibrationAudit

**Persistência:** Prisma ORM

**Princípio:** A sessão de calibração representa o contexto organizacional onde ocorrerão as avaliações independentes, mantendo regras, participantes e monitorias agrupados em um único processo auditável.
