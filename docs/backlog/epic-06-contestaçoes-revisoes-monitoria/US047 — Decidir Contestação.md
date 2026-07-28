# US047 — Decidir Contestação

**Epic:** EPIC-06 — Contestações e Revisões de Monitorias

**ID:** US047

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 12

**Status:** Backlog

---

# História

Como gestor ou responsável pela Qualidade,

Quero decidir o resultado de uma contestação,

Para concluir oficialmente o processo de revisão da monitoria e registrar a decisão final da organização.

---

# Objetivo

Implementar o processo de decisão final da contestação, permitindo aprovar ou indeferir a solicitação com base no parecer técnico e na reavaliação realizada.

A decisão deverá ser definitiva, auditável e preservar todo o histórico do processo.

---

# Valor de Negócio

A decisão final garante:

- Encerramento formal do processo.
- Transparência.
- Segurança jurídica.
- Padronização.
- Rastreabilidade.

---

# Escopo

## Decisão

Permitir decidir:

- Deferida
- Parcialmente Deferida
- Indeferida

---

## Fundamentação

Registrar:

- Motivo da decisão
- Justificativa
- Responsável
- Data/Hora

---

## Aplicação

Quando deferida:

- Aplicar resultado da reavaliação.
- Atualizar nota oficial.
- Atualizar classificação.
- Registrar nova versão da monitoria.

Quando indeferida:

- Manter avaliação original.

---

## Comunicação

Atualizar:

- Status da contestação
- Histórico
- Resultado disponível para consulta

Preparar integração futura com notificações.

---

## Encerramento

Registrar:

- Data de encerramento
- Responsável
- Tempo total do processo
- SLA atendido ou não

---

# Fluxo Principal

```text
Parecer Técnico

↓

Reavaliação

↓

Decisão

↓

Aplicar Resultado (quando deferido)

↓

Encerrar Contestação
```

---

# Regras de Negócio

RN001

Somente usuários autorizados poderão decidir contestações.

---

RN002

A decisão somente poderá ocorrer após parecer técnico.

---

RN003

Quando houver reavaliação deferida, o resultado oficial deverá ser atualizado.

---

RN004

A monitoria original deverá permanecer preservada para fins de auditoria.

---

RN005

Toda decisão deverá ser auditada.

---

RN006

Após encerrada, a contestação será somente leitura.

---

RN007

O sistema deverá registrar automaticamente data, hora e responsável.

---

RN008

A decisão deverá gerar eventos para atualização dos indicadores e histórico.

---

# Critérios de Aceite

- [ ] Registrar decisão.
- [ ] Aplicar resultado quando deferido.
- [ ] Atualizar status.
- [ ] Encerrar contestação.
- [ ] Atualizar histórico.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Contestação inexistente.
- Parecer não concluído.
- Usuário sem permissão.
- Contestação encerrada.

---

# APIs

```http
POST /appeals/{id}/decisions

GET  /appeals/{id}/decisions

PATCH /appeals/{id}/close
```

---

# Banco de Dados

Tabelas:

- appeal_decisions
- appeals
- evaluations
- evaluation_versions
- appeal_history
- audit_logs

---

# Telas

- Decisão da Contestação
- Resumo da Reavaliação
- Histórico da Contestação
- Resultado Final

---

# Auditoria

Registrar:

- Decisão.
- Aplicação da reavaliação.
- Encerramento.
- Usuário responsável.
- Data/Hora.
- SLA.

---

# Definition of Done

- Fluxo de decisão implementado.
- Atualização da monitoria funcionando.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US045 — Registrar Parecer Técnico
- US046 — Reavaliar Monitoria

---

# Observações

A decisão representa o encerramento oficial da contestação.

Após sua conclusão, nenhuma alteração será permitida na contestação.

---

# Instruções para Implementação (Codex)

## Criar

- Fluxo de decisão.
- Aplicação da reavaliação.
- Atualização da versão oficial.
- Auditoria.
- Eventos de domínio.
- Testes.

## Não Implementar

- Notificações.
- Dashboards.
- Integrações externas.

## Critérios

- Workflow transacional.
- APIs REST.
- Código desacoplado.
- Idempotência para evitar dupla decisão.

---

# Arquitetura Aplicada

**Aggregate Root:** AppealDecision

**Relacionamentos:**

Appeal

↓

AppealDecision

↓

AppealReassessment

↓

EvaluationVersion

↓

AppealHistory

**Persistência:** Prisma ORM

**Princípio:** A decisão da contestação encerra formalmente o processo de revisão, preservando o histórico completo da avaliação original e, quando aplicável, promovendo uma nova versão oficial da monitoria sem perda de rastreabilidade.
