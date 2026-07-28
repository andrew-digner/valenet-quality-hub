# US031 — Finalizar Monitoria

**Epic:** EPIC-04 — Execução de Monitorias

**ID:** US031

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 08

**Status:** Backlog

---

# História

Como monitor de qualidade,

Quero finalizar uma monitoria,

Para registrar oficialmente o resultado da avaliação e disponibilizá-la para as próximas etapas do processo.

---

# Objetivo

Implementar o fluxo de finalização da monitoria, garantindo que todas as validações sejam executadas antes da conclusão definitiva.

Após finalizada, a monitoria deverá tornar-se imutável e iniciar o fluxo de pós-avaliação.

---

# Valor de Negócio

A finalização garante que apenas avaliações completas, consistentes e válidas façam parte dos indicadores oficiais da organização.

---

# Escopo

## Finalização

Permitir concluir monitorias.

Antes da conclusão validar:

- Perguntas obrigatórias respondidas.
- Evidências obrigatórias.
- Comentários obrigatórios.
- Nota calculada.
- Critérios eliminatórios.
- Integridade dos dados.

---

## Alteração de Status

Fluxo:

```text
Rascunho

↓

Em Andamento

↓

Concluída
```

Opcionalmente:

```text
↓

Cancelada
```

---

## Persistência

Ao concluir:

- Persistir nota final.
- Persistir classificação.
- Persistir respostas.
- Persistir comentários.
- Persistir evidências.
- Persistir histórico.

---

## Bloqueio

Após concluir:

- impedir edição;
- impedir exclusão;
- impedir alteração de respostas;
- impedir alteração de evidências.

---

## Resumo

Exibir antes da confirmação:

- Nota Final
- Classificação
- Percentual
- Critérios eliminatórios
- Pendências
- Tempo gasto

---

## Eventos

Gerar eventos internos:

- EvaluationCompleted
- AuditRegistered
- FeedbackPending

Preparar integração futura.

---

# Fluxo Principal

```text
Monitor

↓

Responder Avaliação

↓

Executar Validações

↓

Calcular Nota

↓

Confirmar Finalização

↓

Persistir Resultado

↓

Monitoria Concluída
```

---

# Regras de Negócio

RN001

Não permitir finalizar monitorias incompletas.

---

RN002

Toda monitoria deverá possuir nota calculada.

---

RN003

Monitorias concluídas tornam-se somente leitura.

---

RN004

Toda finalização deverá ser auditada.

---

RN005

A data de conclusão deverá ser registrada automaticamente.

---

RN006

A classificação final deverá permanecer imutável.

---

RN007

Após a conclusão deverão ser disparados eventos de domínio.

---

RN008

Monitorias canceladas não poderão ser concluídas.

---

# Critérios de Aceite

- [ ] Validar obrigatoriedades.
- [ ] Persistir resultado.
- [ ] Alterar status para Concluída.
- [ ] Bloquear edição.
- [ ] Gerar eventos.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Perguntas obrigatórias sem resposta.
- Evidência obrigatória ausente.
- Comentário obrigatório ausente.
- Nota não calculada.
- Monitoria inexistente.
- Monitoria já concluída.

---

# APIs

```http
POST /evaluations/{id}/completions

POST /evaluations/{id}/cancellations

GET  /evaluations/{id}/summary
```

---

# Banco de Dados

Tabelas.

- evaluations
- evaluation_answers
- evaluation_scores
- evaluation_comments
- evaluation_evidences
- evaluation_history
- audit_logs

---

# Telas

- Resumo da Monitoria
- Confirmação de Finalização
- Histórico
- Resultado Final

---

# Auditoria

Registrar.

- Finalização.
- Cancelamento.
- Usuário responsável.
- Data/Hora.
- Tempo de execução.
- Nota final.
- Classificação.

---

# Definition of Done

- Fluxo de finalização implementado.
- Validações funcionando.
- Status atualizado.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US028 — Executar Avaliação
- US029 — Gerenciar Evidências
- US030 — Calcular Resultado

---

# Observações

Após a conclusão, a monitoria passa a ser utilizada pelos módulos de Feedback, Contestação, Dashboards, IA e Relatórios.

Nenhuma alteração poderá ser realizada diretamente sobre uma monitoria concluída.

---

# Instruções para Implementação (Codex)

## Criar

- Fluxo de finalização.
- Validações.
- Persistência definitiva.
- Eventos de domínio.
- Auditoria.
- Testes.

## Não Implementar

- Feedback.
- Contestação.
- Dashboards.
- Notificações.

## Critérios

- Fluxo transacional.
- Alta confiabilidade.
- APIs REST.
- Código desacoplado.
- Idempotência para evitar dupla finalização.

---

# Arquitetura Aplicada

**Padrão:** Domain Events + State Machine

**Eventos:**

EvaluationCompleted

↓

FeedbackPending

↓

DashboardUpdated

↓

AuditRegistered

**Persistência:** Prisma ORM

**Princípio:** A finalização da monitoria representa o encerramento oficial do processo de avaliação. A partir desse momento, os dados tornam-se imutáveis e passam a alimentar todos os demais módulos da plataforma por meio de eventos de domínio.
