# US063 — Dashboard de Contestações

**Epic:** EPIC-08 — Dashboards e Analytics

**ID:** US063

**Prioridade:** P1 (Alta)

**Story Points:** 13

**Sprint:** Sprint 16

**Status:** Backlog

---

# História

Como gestor, coordenador ou analista de qualidade,

Quero visualizar um Dashboard de Contestações,

Para acompanhar o desempenho do processo de revisão das monitorias, identificar gargalos e analisar tendências das contestações.

---

# Objetivo

Implementar um dashboard analítico consolidando indicadores das contestações, permitindo acompanhar volume, prazos, resultados, reincidências e impactos sobre as avaliações.

---

# Valor de Negócio

O Dashboard de Contestações permite:

- Monitorar SLAs.
- Identificar gargalos.
- Reduzir tempo de análise.
- Identificar padrões de contestação.
- Melhorar os critérios de avaliação.

---

# Escopo

## Indicadores

Exibir:

- Contestações abertas
- Contestações encerradas
- Contestações deferidas
- Contestações parcialmente deferidas
- Contestações indeferidas
- Tempo médio de análise
- Tempo médio de decisão
- SLA cumprido
- SLA violado

---

## Evolução

Apresentar:

- Contestações por período
- Evolução mensal
- Tendência de crescimento
- Tempo médio por período

---

## Distribuição

Exibir:

- Contestações por operação
- Contestações por equipe
- Contestações por supervisor
- Contestações por formulário
- Contestações por categoria
- Contestações por motivo

---

## Indicadores de Qualidade

Apresentar:

- Percentual de deferimento
- Percentual de alteração da nota
- Critérios mais contestados
- Perguntas com maior índice de revisão
- Monitorias revisadas

---

## Alertas

Destacar:

- Contestações próximas do SLA
- Crescimento anormal de recursos
- Alto índice de deferimento
- Operações com maior reincidência

---

## Drill-down

Permitir navegar para:

- Contestações
- Pareceres
- Reavaliações
- Decisões
- Monitorias relacionadas

---

# Fluxo Principal

```text
Abrir Dashboard

↓

Selecionar Período

↓

Consultar Indicadores

↓

Visualizar Tendências

↓

Abrir Detalhes
```

---

# Regras de Negócio

RN001

O Dashboard deverá respeitar o escopo organizacional do usuário.

---

RN002

Todos os indicadores deverão utilizar a camada Analytics.

---

RN003

Filtros deverão atualizar todos os componentes.

---

RN004

Consultas deverão utilizar cache.

---

RN005

Os indicadores deverão informar data e hora da última atualização.

---

RN006

Toda consulta detalhada deverá ser auditada.

---

RN007

As informações deverão refletir a decisão final oficial da contestação.

---

RN008

O Dashboard será exclusivamente para consulta.

---

# Critérios de Aceite

- [ ] Exibir KPIs das contestações.
- [ ] Exibir gráficos.
- [ ] Exibir indicadores de SLA.
- [ ] Aplicar filtros.
- [ ] Navegar via drill-down.
- [ ] Utilizar cache.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Analytics indisponível.
- Cache expirado.
- Usuário sem permissão.
- Dados indisponíveis.

---

# APIs

```http
GET /analytics/dashboards/appeals

GET /analytics/dashboards/appeals/kpis

GET /analytics/dashboards/appeals/trends

GET /analytics/dashboards/appeals/sla

GET /analytics/dashboards/appeals/categories
```

---

# Banco de Dados

Tabelas:

- analytics_snapshots
- dashboard_metrics
- dashboard_cache
- appeal_statistics
- audit_logs

---

# Telas

- Dashboard de Contestações
- KPIs
- Tendências
- SLA
- Distribuições
- Drill-down

---

# Auditoria

Registrar:

- Consulta.
- Filtros utilizados.
- Drill-down.
- Exportações.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Dashboard implementado.
- KPIs funcionando.
- Indicadores de SLA funcionando.
- Cache implementado.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.

---

# Dependências

- EPIC-06 — Contestações e Revisões

---

# Observações

Este dashboard deverá apoiar a melhoria contínua do processo de contestação, permitindo identificar padrões recorrentes, oportunidades de revisão dos formulários e necessidades de treinamento da equipe.

---

# Instruções para Implementação (Codex)

## Criar

- KPIs de contestações.
- Indicadores de SLA.
- Evolução temporal.
- Distribuições.
- Drill-down.
- Cache.
- Auditoria.
- Testes.

## Não Implementar

- IA para previsão de contestações.
- Alertas automáticos.
- Recomendações inteligentes.

## Critérios

- Utilizar camada Analytics.
- APIs REST.
- Alta performance.
- Somente leitura.

---

# Arquitetura Aplicada

**Padrão:** CQRS + Analytics Layer

**Componentes:**

AppealsDashboardService

↓

AnalyticsQueryService

↓

DashboardCache

↓

AnalyticsSnapshot

↓

AppealStatistics

**Persistência:** Prisma ORM

**Princípio:** O Dashboard de Contestações deve consolidar indicadores estratégicos do processo de revisão das monitorias, permitindo acompanhar desempenho, SLAs, reincidências e padrões de contestação por meio de uma camada analítica desacoplada da operação.
