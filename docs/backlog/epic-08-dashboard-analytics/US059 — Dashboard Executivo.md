# US059 — Dashboard Executivo

**Epic:** EPIC-08 — Dashboards e Analytics

**ID:** US059

**Prioridade:** P0 (Crítica)

**Story Points:** 21

**Sprint:** Sprint 15

**Status:** Backlog

---

# História

Como diretor, gerente ou coordenador,

Quero visualizar um Dashboard Executivo,

Para acompanhar os principais indicadores da Qualidade, identificar tendências e apoiar decisões estratégicas.

---

# Objetivo

Implementar o Dashboard Executivo consolidando indicadores de monitorias, feedbacks, PDIs, contestações e calibrações em uma única visão gerencial.

O painel deverá oferecer métricas em tempo real, comparativos históricos e capacidade de navegação até os dados detalhados.

---

# Valor de Negócio

O Dashboard Executivo permite:

- Acompanhar KPIs estratégicos.
- Identificar tendências.
- Monitorar produtividade.
- Medir qualidade operacional.
- Apoiar decisões baseadas em dados.

---

# Escopo

## KPIs

Exibir:

- Total de Monitorias
- Média Geral
- Nota Média
- Monitorias Pendentes
- Feedbacks Pendentes
- PDIs Ativos
- Contestações Abertas
- Índice de Calibração
- SLA Cumprido
- SLA Violado

---

## Indicadores

Apresentar:

- Evolução da nota média
- Evolução das monitorias
- Evolução dos feedbacks
- Evolução dos PDIs
- Evolução das contestações
- Evolução da calibração

---

## Rankings

Exibir:

- Equipes
- Supervisores
- Monitores
- Operações
- Formulários

---

## Comparativos

Permitir comparar:

- Períodos
- Operações
- Equipes
- Supervisores
- Canais

---

## Drill-down

Permitir navegar para:

- Monitorias
- Feedbacks
- PDIs
- Contestações
- Calibrações

---

## Atualização

Atualização:

- Manual
- Automática
- Cacheada

---

# Fluxo Principal

```text
Abrir Dashboard

↓

Aplicar Filtros

↓

Consultar Indicadores

↓

Abrir Detalhes

↓

Analisar Dados
```

---

# Regras de Negócio

RN001

O Dashboard deverá respeitar as permissões do usuário.

---

RN002

Todos os indicadores deverão utilizar a camada Analytics.

---

RN003

Consultas deverão utilizar cache quando possível.

---

RN004

Os KPIs deverão ser recalculados periodicamente.

---

RN005

Filtros deverão afetar todos os componentes do painel.

---

RN006

Toda consulta detalhada deverá ser auditada.

---

RN007

Os indicadores deverão informar data e hora da última atualização.

---

RN008

O Dashboard deverá manter tempo de carregamento inferior a 3 segundos para consultas padrão.

---

# Critérios de Aceite

- [ ] Exibir KPIs.
- [ ] Exibir gráficos.
- [ ] Aplicar filtros.
- [ ] Comparar períodos.
- [ ] Navegar via drill-down.
- [ ] Utilizar cache.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Analytics indisponível.
- Cache inválido.
- Usuário sem permissão.
- Dados indisponíveis.

---

# APIs

```http
GET /analytics/dashboards/executive

GET /analytics/dashboards/executive/kpis

GET /analytics/dashboards/executive/trends

GET /analytics/dashboards/executive/rankings

GET /analytics/dashboards/executive/drilldown
```

---

# Banco de Dados

Tabelas:

- analytics_snapshots
- dashboard_metrics
- dashboard_cache
- audit_logs

---

# Telas

- Dashboard Executivo
- KPIs
- Tendências
- Rankings
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
- Cache implementado.
- APIs documentadas.
- Interface concluída.
- Performance validada.
- Testes automatizados.

---

# Dependências

- EPIC-04 — Execução de Monitorias
- EPIC-05 — Feedback e Desenvolvimento
- EPIC-06 — Contestações
- EPIC-07 — Calibração

---

# Observações

O Dashboard Executivo representa a visão consolidada da organização.

Não permitirá alterações de dados, sendo exclusivamente um módulo analítico.

---

# Instruções para Implementação (Codex)

## Criar

- KPIs.
- Gráficos.
- Rankings.
- Tendências.
- Drill-down.
- Cache.
- Auditoria.
- Testes.

## Não Implementar

- Dashboards customizados.
- Alertas automáticos.
- IA preditiva.

## Critérios

- Utilizar camada Analytics.
- APIs REST.
- Alta performance.
- Somente leitura.

---

# Arquitetura Aplicada

**Padrão:** CQRS + Analytics Layer

**Componentes:**

DashboardController

↓

ExecutiveDashboardService

↓

AnalyticsQueryService

↓

DashboardCache

↓

AnalyticsSnapshot

**Persistência:** Prisma ORM

**Princípio:** O Dashboard Executivo deve consumir exclusivamente dados consolidados da camada analítica, garantindo alta performance, consistência dos indicadores e desacoplamento do banco transacional.
