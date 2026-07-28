# US046 — Reavaliar Monitoria

**Epic:** EPIC-06 — Contestações e Revisões de Monitorias

**ID:** US046

**Prioridade:** P0 (Crítica)

**Story Points:** 21

**Sprint:** Sprint 12

**Status:** Backlog

---

# História

Como analista ou gestor de qualidade,

Quero reavaliar uma monitoria contestada,

Para revisar a avaliação original de forma imparcial, documentada e auditável, preservando o histórico completo da decisão.

---

# Objetivo

Implementar o processo de reavaliação da monitoria após a conclusão da análise da contestação, permitindo revisar respostas, critérios, pontuação e classificação quando necessário.

A reavaliação deverá gerar uma nova versão do resultado da avaliação sem alterar o histórico da monitoria original.

---

# Valor de Negócio

A reavaliação garante:

- Justiça no processo.
- Transparência.
- Rastreabilidade.
- Preservação do histórico.
- Governança corporativa.

---

# Escopo

## Iniciar Reavaliação

Permitir:

- Abrir monitoria original.
- Consultar contestação.
- Consultar parecer técnico.
- Consultar evidências.

---

## Revisão

Permitir revisar:

- Respostas.
- Comentários.
- Critérios.
- Pesos.
- Critérios eliminatórios.

---

## Alterações

Permitir:

- Alterar resposta.
- Alterar comentário.
- Alterar nota.
- Alterar classificação.

Toda alteração deverá possuir justificativa.

---

## Comparação

Exibir lado a lado:

- Avaliação original.
- Reavaliação.

Destacar diferenças.

---

## Resultado

Gerar:

- Nova nota.
- Nova classificação.
- Justificativa das alterações.
- Histórico completo.

---

## Encerramento

Após concluir:

- Registrar reavaliação.
- Encaminhar para decisão final.

---

# Fluxo Principal

```text
Contestação

↓

Parecer Técnico

↓

Abrir Reavaliação

↓

Revisar Avaliação

↓

Registrar Alterações

↓

Salvar Reavaliação

↓

Encaminhar
```

---

# Regras de Negócio

RN001

A reavaliação somente poderá iniciar após a emissão do parecer técnico.

---

RN002

Toda alteração deverá possuir justificativa obrigatória.

---

RN003

A monitoria original permanecerá preservada.

---

RN004

A reavaliação deverá gerar histórico próprio.

---

RN005

Somente usuários autorizados poderão realizar reavaliações.

---

RN006

Toda operação deverá ser auditada.

---

RN007

A nova nota deverá ser recalculada utilizando o Motor de Regras.

---

RN008

A reavaliação poderá manter o mesmo resultado da avaliação original.

---

# Critérios de Aceite

- [ ] Abrir reavaliação.
- [ ] Comparar avaliações.
- [ ] Alterar respostas.
- [ ] Recalcular nota.
- [ ] Registrar justificativas.
- [ ] Gerar histórico.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Contestação inexistente.
- Parecer não concluído.
- Usuário sem permissão.
- Reavaliação já concluída.

---

# APIs

```http
POST /appeals/{id}/reassessment

GET  /appeals/{id}/reassessment

PATCH /appeals/{id}/reassessment

POST /appeals/{id}/reassessment/calculate

PATCH /appeals/{id}/reassessment-completions
```

---

# Banco de Dados

Tabelas:

- appeal_reassessments
- appeal_reassessment_answers
- appeal_history
- evaluation_scores
- audit_logs

---

# Telas

- Reavaliação da Monitoria
- Comparação das Avaliações
- Histórico
- Resumo das Alterações

---

# Auditoria

Registrar:

- Início da reavaliação.
- Alterações realizadas.
- Justificativas.
- Recalculo da nota.
- Conclusão.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Reavaliação implementada.
- Comparação funcionando.
- Recalculo automático.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US045 — Registrar Parecer Técnico
- US030 — Calcular Resultado da Monitoria

---

# Observações

A reavaliação não altera imediatamente a monitoria oficial.

Ela gera uma proposta de novo resultado que será utilizada pela decisão final da contestação.

---

# Instruções para Implementação (Codex)

## Criar

- Fluxo de reavaliação.
- Comparação lado a lado.
- Registro de justificativas.
- Recalculo da nota.
- Auditoria.
- Testes.

## Não Implementar

- Aprovação final.
- Notificações.
- Atualização definitiva da monitoria.

## Critérios

- Workflow transacional.
- APIs REST.
- Código desacoplado.
- Histórico imutável.

---

# Arquitetura Aplicada

**Aggregate Root:** AppealReassessment

**Relacionamentos:**

Appeal

↓

AppealReassessment

↓

AppealReassessmentAnswer

↓

EvaluationScore

↓

AppealHistory

**Persistência:** Prisma ORM

**Princípio:** A reavaliação representa uma proposta técnica de revisão da monitoria, preservando integralmente a avaliação original e registrando todas as diferenças de forma auditável e rastreável.
