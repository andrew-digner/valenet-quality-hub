# US044 — Analisar Contestação

**Epic:** EPIC-06 — Contestações e Revisões de Monitorias

**ID:** US044

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 11

**Status:** Backlog

---

# História

Como analista ou gestor de qualidade,

Quero analisar uma contestação,

Para verificar se a solicitação do colaborador possui fundamento e definir as próximas ações do processo de revisão.

---

# Objetivo

Implementar o fluxo de análise das contestações, permitindo designar responsáveis, consultar a monitoria original, avaliar evidências, registrar observações técnicas e encaminhar a contestação para decisão.

---

# Valor de Negócio

A análise estruturada garante:

- Imparcialidade.
- Padronização.
- Transparência.
- Controle de SLA.
- Auditoria completa.

---

# Escopo

## Recebimento

Ao iniciar a análise:

- Registrar responsável.
- Registrar data de início.
- Calcular SLA.
- Alterar status.

---

## Consulta

Disponibilizar acesso a:

- Monitoria original.
- Feedback.
- Formulário utilizado.
- Versão do formulário.
- Respostas.
- Evidências.
- Comentários.
- Histórico da monitoria.

---

## Evidências

Permitir:

- Consultar anexos enviados pelo colaborador.
- Adicionar observações técnicas.
- Solicitar documentação complementar (futuro).

---

## Observações Técnicas

Registrar:

- Comentários internos.
- Fundamentação técnica.
- Análises realizadas.
- Recomendações.

Essas informações não serão visíveis ao colaborador.

---

## Encaminhamento

Ao concluir a análise permitir:

- Encaminhar para reavaliação.
- Encaminhar para decisão.
- Solicitar complementação (futuro).

---

## Status

Fluxo:

```text
Enviada

↓

Em Análise

↓

Aguardando Parecer
```

---

# Fluxo Principal

```text
Receber Contestação

↓

Assumir Análise

↓

Consultar Monitoria

↓

Analisar Evidências

↓

Registrar Observações

↓

Encaminhar
```

---

# Regras de Negócio

RN001

Somente usuários autorizados poderão analisar contestações.

---

RN002

Cada contestação deverá possuir um responsável.

---

RN003

O início da análise deverá registrar data e hora automaticamente.

---

RN004

Observações internas não poderão ser visualizadas pelo colaborador.

---

RN005

Toda alteração deverá ser auditada.

---

RN006

A contestação permanecerá vinculada à monitoria original durante todo o processo.

---

RN007

O SLA deverá ser monitorado continuamente.

---

RN008

A contestação não poderá permanecer sem responsável após o início da análise.

---

# Critérios de Aceite

- [ ] Assumir contestação.
- [ ] Registrar responsável.
- [ ] Consultar monitoria.
- [ ] Registrar observações.
- [ ] Alterar status.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Contestação inexistente.
- Usuário sem permissão.
- Contestação encerrada.
- Contestação já atribuída.
- SLA expirado.

---

# APIs

```http
GET    /appeals/{id}

PATCH  /appeals/{id}/assign

PATCH  /appeals/{id}/start-review

POST   /appeals/{id}/notes

PATCH  /appeals/{id}/forward
```

---

# Banco de Dados

Tabelas:

- appeals
- appeal_reviews
- appeal_notes
- appeal_history
- audit_logs

---

# Telas

- Lista de Contestações
- Painel de Análise
- Detalhes da Contestação
- Observações Técnicas

---

# Auditoria

Registrar:

- Atribuição.
- Início da análise.
- Inclusão de observações.
- Encaminhamento.
- Alterações de status.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Fluxo de análise implementado.
- Atribuição funcionando.
- Observações técnicas implementadas.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US043 — Abrir Contestação

---

# Observações

A análise não altera a monitoria.

Ela apenas prepara a contestação para emissão do parecer e eventual reavaliação.

---

# Instruções para Implementação (Codex)

## Criar

- Fluxo de análise.
- Atribuição.
- Observações técnicas.
- Controle de SLA.
- Auditoria.
- Testes.

## Não Implementar

- Reavaliação da monitoria.
- Decisão final.
- Notificações automáticas.

## Critérios

- Controle de acesso via RBAC.
- APIs REST.
- Workflow baseado em estados.
- Código desacoplado.

---

# Arquitetura Aplicada

**Aggregate Root:** Appeal

**Relacionamentos:**

Appeal

↓

AppealReview

↓

AppealNote

↓

AppealHistory

↓

AppealAudit

**Persistência:** Prisma ORM

**Princípio:** A análise da contestação representa a etapa técnica do processo, garantindo imparcialidade, rastreabilidade e segregação entre a solicitação do colaborador e a decisão final.
