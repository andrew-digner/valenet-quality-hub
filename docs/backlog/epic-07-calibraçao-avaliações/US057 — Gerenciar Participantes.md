# US057 — Gerenciar Participantes da Calibração

**Epic:** EPIC-07 — Calibração de Avaliações

**ID:** US057

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 14

**Status:** Backlog

---

# História

Como moderador da sessão de calibração,

Quero gerenciar os participantes da sessão,

Para definir quem participará da calibração, seus papéis e responsabilidades durante o processo.

---

# Objetivo

Implementar o gerenciamento de participantes das sessões de calibração, permitindo adicionar, remover e atualizar participantes antes do início da sessão, bem como acompanhar sua participação durante a execução.

---

# Valor de Negócio

O gerenciamento de participantes permite:

- Controlar acesso às sessões.
- Definir responsabilidades.
- Garantir participação adequada.
- Registrar presença.
- Apoiar auditorias.

---

# Escopo

## Adicionar Participantes

Permitir adicionar:

- Monitor
- Analista de Qualidade
- Supervisor
- Coordenador
- Gestor

---

## Papéis

Permitir definir:

- Moderador
- Avaliador
- Observador

---

## Situação

Controlar:

- Convidado
- Confirmado
- Participando
- Concluído
- Ausente

---

## Alterações

Permitir:

- Alterar papel
- Remover participante
- Substituir participante
- Transferir moderação

Somente antes do início da sessão.

---

## Consulta

Exibir:

- Nome
- Papel
- Status
- Progresso da avaliação
- Data de conclusão

---

## Indicadores

Exibir:

- Total de participantes
- Participantes ativos
- Participantes concluídos
- Participantes pendentes

---

# Fluxo Principal

```text
Abrir Sessão

↓

Adicionar Participantes

↓

Definir Papéis

↓

Publicar Sessão

↓

Acompanhar Participação
```

---

# Regras de Negócio

RN001

Toda sessão deverá possuir exatamente um moderador.

---

RN002

Um participante não poderá ser adicionado duas vezes à mesma sessão.

---

RN003

Participantes somente poderão ser removidos antes do início da sessão.

---

RN004

O moderador poderá transferir sua função para outro participante.

---

RN005

Toda alteração deverá ser auditada.

---

RN006

Observadores não poderão realizar avaliações.

---

RN007

Participantes deverão possuir permissão para acessar as monitorias da sessão.

---

RN008

Sessões concluídas não permitirão alterações nos participantes.

---

# Critérios de Aceite

- [ ] Adicionar participante.
- [ ] Alterar papel.
- [ ] Remover participante.
- [ ] Transferir moderação.
- [ ] Consultar progresso.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Usuário inexistente.
- Participante duplicado.
- Sessão iniciada.
- Usuário sem permissão.
- Tentativa de remover o único moderador.

---

# APIs

```http
GET    /calibrations/{id}/participants

POST   /calibrations/{id}/participants

PUT    /calibration-participants/{id}

DELETE /calibration-participants/{id}

PATCH  /calibration-participants/{id}/role
```

---

# Banco de Dados

Tabelas:

- calibration_participants
- calibration_sessions
- users
- audit_logs

---

# Telas

- Participantes da Sessão
- Adicionar Participante
- Gerenciar Papéis
- Acompanhamento

---

# Auditoria

Registrar:

- Inclusão.
- Remoção.
- Alteração de papel.
- Transferência de moderação.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Gerenciamento implementado.
- Controle de papéis funcionando.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US051 — Criar Sessão de Calibração

---

# Observações

O gerenciamento de participantes é permitido apenas enquanto a sessão não estiver em execução.

Após o início da calibração, a composição da equipe permanece congelada para garantir a integridade do processo.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD de participantes.
- Controle de papéis.
- Acompanhamento de status.
- Auditoria.
- Testes.

## Não Implementar

- Convites automáticos.
- Notificações.
- Integração com calendário.

## Critérios

- APIs REST.
- Controle de acesso por RBAC.
- Workflow baseado em estados.
- Código desacoplado.

---

# Arquitetura Aplicada

**Aggregate Root:** CalibrationSession

**Relacionamentos:**

CalibrationSession

↓

CalibrationParticipant

↓

User

↓

CalibrationHistory

↓

CalibrationAudit

**Persistência:** Prisma ORM

**Princípio:** Os participantes representam os usuários autorizados a atuar em uma sessão de calibração, com papéis e responsabilidades claramente definidos, preservando a integridade e a governança do processo.
