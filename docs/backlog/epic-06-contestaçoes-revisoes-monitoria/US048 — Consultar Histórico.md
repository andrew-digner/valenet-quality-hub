# US048 — Consultar Histórico de Contestações

**Epic:** EPIC-06 — Contestações e Revisões de Monitorias

**ID:** US048

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 12

**Status:** Backlog

---

# História

Como monitor, gestor, analista de qualidade ou auditor,

Quero consultar o histórico de contestações,

Para acompanhar decisões, verificar a evolução dos processos e garantir rastreabilidade das revisões realizadas.

---

# Objetivo

Implementar um módulo de consulta do histórico de contestações, permitindo pesquisar, filtrar e visualizar todas as etapas do processo de revisão das monitorias.

O histórico deverá preservar todas as versões, decisões e registros de auditoria.

---

# Valor de Negócio

O histórico permite:

- Auditorias internas.
- Acompanhamento de SLAs.
- Transparência.
- Análise de recorrências.
- Base para melhoria contínua.

---

# Escopo

## Pesquisa

Permitir pesquisar por:

- Código da contestação
- Código da monitoria
- Colaborador
- Analista
- Gestor
- Status
- Resultado
- Período

---

## Filtros

Permitir filtrar por:

- Data de abertura
- Data de decisão
- SLA
- Categoria
- Prioridade
- Operação
- Equipe
- Área

---

## Lista

Exibir:

- Código
- Monitoria
- Colaborador
- Status
- Resultado
- Responsável
- Data de abertura
- Data de encerramento

---

## Detalhes

Visualizar:

- Contestação
- Monitoria original
- Parecer técnico
- Reavaliação
- Decisão final
- Evidências
- Timeline completa

---

## Timeline

Registrar:

- Abertura
- Análise
- Parecer
- Reavaliação
- Decisão
- Encerramento

---

## Indicadores

Exibir:

- Tempo médio de análise
- Tempo médio de decisão
- Contestação dentro do SLA
- Contestação fora do SLA

---

# Fluxo Principal

```text
Pesquisar Contestação

↓

Selecionar Processo

↓

Visualizar Histórico

↓

Consultar Timeline
```

---

# Regras de Negócio

RN001

Somente usuários autorizados poderão consultar contestações.

---

RN002

A consulta deverá respeitar o escopo organizacional do usuário.

---

RN003

Processos encerrados serão somente leitura.

---

RN004

Toda consulta detalhada deverá ser registrada em auditoria.

---

RN005

Todas as versões da monitoria deverão permanecer disponíveis.

---

RN006

As decisões deverão permanecer imutáveis.

---

RN007

Comentários internos somente serão exibidos para usuários autorizados.

---

RN008

Downloads de anexos deverão ser auditados.

---

# Critérios de Aceite

- [ ] Pesquisar contestações.
- [ ] Filtrar resultados.
- [ ] Visualizar timeline.
- [ ] Consultar parecer.
- [ ] Consultar reavaliação.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Contestação inexistente.
- Usuário sem permissão.
- Histórico indisponível.

---

# APIs

```http
GET /appeals

GET /appeals/{id}

GET /appeals/{id}/history

GET /appeals/{id}/timeline

GET /appeals/{id}/versions
```

---

# Banco de Dados

Tabelas:

- appeals
- appeal_history
- appeal_reviews
- appeal_opinions
- appeal_decisions
- audit_logs

---

# Telas

- Lista de Contestações
- Histórico
- Timeline
- Comparação de Versões

---

# Auditoria

Registrar:

- Consultas.
- Visualizações detalhadas.
- Downloads.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Consulta implementada.
- Timeline disponível.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US047 — Decidir Contestação

---

# Observações

Este módulo é exclusivamente para consulta.

Nenhuma alteração poderá ser realizada por meio desta funcionalidade.

---

# Instruções para Implementação (Codex)

## Criar

- Pesquisa.
- Filtros.
- Timeline.
- Comparação de versões.
- Auditoria.
- Testes.

## Não Implementar

- Alteração de contestações.
- Reabertura de processos.
- Dashboards.

## Critérios

- Alta performance.
- Paginação.
- APIs REST.
- Somente leitura.

---

# Arquitetura Aplicada

**Padrão:** CQRS (Query Side)

**Persistência:** Prisma ORM

**Relacionamentos:**

Appeal

↓

AppealReview

↓

AppealOpinion

↓

AppealDecision

↓

EvaluationVersion

↓

History

**Princípio:** O histórico de contestações deve fornecer uma visão completa, imutável e auditável de todo o ciclo de revisão, permitindo consultas eficientes e preservando a integridade das informações.
