# US054 — Comparar Divergências entre Avaliadores

**Epic:** EPIC-07 — Calibração de Avaliações

**ID:** US054

**Prioridade:** P0 (Crítica)

**Story Points:** 21

**Sprint:** Sprint 14

**Status:** Backlog

---

# História

Como moderador da sessão de calibração,

Quero comparar automaticamente as avaliações realizadas pelos participantes,

Para identificar divergências de interpretação, promover discussões técnicas e alinhar os critérios de avaliação.

---

# Objetivo

Implementar o mecanismo de comparação das avaliações individuais, identificando diferenças de respostas, pontuação, critérios eliminatórios e classificação entre os participantes.

O sistema deverá apresentar indicadores objetivos para apoiar a construção do consenso.

---

# Valor de Negócio

A comparação permite:

- Identificar divergências.
- Medir consistência entre avaliadores.
- Apoiar treinamentos.
- Melhorar a qualidade das avaliações.
- Produzir indicadores de aderência.

---

# Escopo

## Comparação Geral

Comparar automaticamente:

- Nota final
- Classificação
- Critérios eliminatórios
- Respostas
- Comentários

---

## Comparação por Pergunta

Exibir:

- Resposta de cada avaliador
- Pontuação atribuída
- Diferenças encontradas
- Grau de concordância

---

## Divergências

Identificar:

- Respostas diferentes
- Diferença de nota
- Divergência de interpretação
- Critérios eliminatórios inconsistentes

---

## Indicadores

Calcular:

- Percentual de concordância
- Quantidade de divergências
- Média das notas
- Desvio entre notas
- Avaliadores com maior divergência

---

## Visualização

Disponibilizar:

- Comparação lado a lado
- Destaque visual das diferenças
- Resumo estatístico
- Filtros por pergunta

---

## Relatório

Gerar resumo contendo:

- Divergências
- Concordâncias
- Estatísticas
- Recomendações para discussão

---

# Fluxo Principal

```text
Sessão Concluída

↓

Comparar Avaliações

↓

Calcular Indicadores

↓

Exibir Divergências

↓

Preparar Consenso
```

---

# Regras de Negócio

RN001

A comparação somente poderá ocorrer após todas as avaliações serem concluídas ou mediante encerramento da sessão pelo moderador.

---

RN002

As respostas originais permanecerão inalteradas.

---

RN003

Toda comparação deverá ser recalculada automaticamente após nova avaliação autorizada.

---

RN004

O sistema deverá destacar divergências acima do limite configurado.

---

RN005

Toda execução deverá ser auditada.

---

RN006

Os cálculos deverão utilizar exatamente os resultados registrados pelos participantes.

---

RN007

Os indicadores deverão permanecer disponíveis após o encerramento da sessão.

---

RN008

A comparação não poderá alterar nenhuma avaliação individual.

---

# Critérios de Aceite

- [ ] Comparar respostas.
- [ ] Comparar notas.
- [ ] Exibir divergências.
- [ ] Calcular indicadores.
- [ ] Gerar resumo estatístico.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Sessão inexistente.
- Avaliações pendentes.
- Usuário sem permissão.
- Dados inconsistentes.

---

# APIs

```http
GET  /calibrations/{id}/comparison

GET  /calibrations/{id}/comparison/questions

GET  /calibrations/{id}/comparison/statistics

POST /calibrations/{id}/comparison/recalculate
```

---

# Banco de Dados

Tabelas:

- calibration_comparisons
- calibration_statistics
- calibration_evaluations
- calibration_answers
- audit_logs

---

# Telas

- Comparação Geral
- Comparação por Pergunta
- Estatísticas
- Divergências
- Resumo

---

# Auditoria

Registrar:

- Comparação executada.
- Reprocessamento.
- Usuário responsável.
- Data/Hora.
- Indicadores gerados.

---

# Definition of Done

- Comparação implementada.
- Estatísticas funcionando.
- Divergências destacadas.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US053 — Registrar Avaliações dos Calibradores

---

# Observações

A comparação é somente leitura e não altera nenhuma avaliação individual.

Seu objetivo é apoiar a construção do consenso durante a calibração.

---

# Instruções para Implementação (Codex)

## Criar

- Motor de comparação.
- Estatísticas.
- Destaque de divergências.
- Reprocessamento.
- Auditoria.
- Testes.

## Não Implementar

- Consenso.
- Alteração das avaliações.
- IA para análise de divergências.

## Critérios

- Processamento determinístico.
- APIs REST.
- Código desacoplado.
- Alta performance.

---

# Arquitetura Aplicada

**Aggregate Root:** CalibrationComparison

**Relacionamentos:**

CalibrationSession

↓

CalibrationComparison

↓

CalibrationStatistic

↓

CalibrationEvaluation

↓

CalibrationAnswer

**Persistência:** Prisma ORM

**Princípio:** A comparação consolida as avaliações individuais sem modificá-las, fornecendo indicadores objetivos e uma visão detalhada das divergências para apoiar o consenso da sessão de calibração.
