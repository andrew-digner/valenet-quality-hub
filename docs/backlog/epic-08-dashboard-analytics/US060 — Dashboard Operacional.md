# US060 — Dashboard Operacional

**Epic:** EPIC-08 — Dashboards e Analytics

**ID:** US060

**Prioridade:** P0 (Crítica)

**Story Points:** 21

**Sprint:** Sprint 15

**Status:** Backlog

---

# História

Como supervisor, coordenador ou analista de qualidade,

Quero visualizar um Dashboard Operacional,

Para acompanhar a execução diária das monitorias, feedbacks e demais processos da Qualidade, identificando pendências e atuando rapidamente sobre elas.

---

# Objetivo

Implementar um Dashboard Operacional com indicadores em tempo real sobre a execução da operação, permitindo monitorar produtividade, qualidade, SLAs e pendências.

---

# Valor de Negócio

O Dashboard Operacional permite:

- Acompanhar a operação em tempo real.
- Identificar gargalos.
- Priorizar ações.
- Monitorar SLAs.
- Melhorar a produtividade da equipe.

---

# Escopo

## Indicadores Operacionais

Exibir:

- Monitorias realizadas hoje
- Monitorias pendentes
- Feedbacks pendentes
- Feedbacks agendados
- PDIs em andamento
- Contestações abertas
- Sessões de calibração em andamento
- SLA da operação
- Tempo médio de monitoria

---

## Indicadores por Equipe

Exibir:

- Volume por equipe
- Volume por supervisor
- Volume por monitor
- Média das notas
- Produtividade

---

## Pendências

Listar:

- Feedbacks atrasados
- PDIs vencidos
- Contestações próximas do SLA
- Calibrações pendentes
- Monitorias não concluídas

---

## Gráficos

Disponibilizar:

- Evolução diária
- Evolução semanal
- Distribuição por canal
- Distribuição por operação
- Distribuição por formulário

---

## Alertas

Destacar:

- SLA em risco
- Alto volume de pendências
- Queda da nota média
- Crescimento de contestações
- Divergência elevada nas calibrações

---

## Drill-down

Permitir navegar para:

- Monitorias
- Feedbacks
- PDIs
- Contestações
- Calibrações

---

# Fluxo Principal

```text
Abrir Dashboard

↓

Visualizar KPIs

↓

Aplicar Filtros

↓

Identificar Pendências

↓

Abrir Detalhes

↓

Executar Ação
```

---

# Regras de Negócio

RN001

O Dashboard deverá respeitar as permissões do usuário.

---

RN002

Os indicadores deverão refletir somente o escopo da operação do usuário.

---

RN003

Filtros deverão atualizar todos os componentes simultaneamente.

---

RN004

Indicadores deverão utilizar dados consolidados da camada Analytics.

---

RN005

As consultas deverão utilizar cache.

---

RN006

Alertas deverão ser calculados automaticamente.

---

RN007

Toda consulta detalhada deverá ser auditada.

---

RN008

O painel deverá indicar data e hora da última atualização.

---

# Critérios de Aceite

- [ ] Exibir KPIs operacionais.
- [ ] Exibir gráficos.
- [ ] Exibir pendências.
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
GET /analytics/dashboards/operational

GET /analytics/dashboards/operational/kpis

GET /analytics/dashboards/operational/pending

GET /analytics/dashboards/operational/charts

GET /analytics/dashboards/operational/alerts
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

- Dashboard Operacional
- KPIs
- Pendências
- Alertas
- Gráficos
- Drill-down

---

# Auditoria

Registrar:

- Consulta.
- Filtros.
- Drill-down.
- Exportações.
- Usuário.
- Data/Hora.

---

# Definition of Done

- Dashboard implementado.
- KPIs funcionando.
- Alertas funcionando.
- Cache implementado.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.

---

# Dependências

- EPIC-04 — Execução de Monitorias
- EPIC-05 — Feedback e Desenvolvimento
- EPIC-06 — Contestações
- EPIC-07 — Calibração

---

# Observações

Este dashboard é voltado ao acompanhamento operacional e deverá priorizar informações acionáveis e atualizadas.

---

# Instruções para Implementação (Codex)

## Criar

- KPIs operacionais.
- Lista de pendências.
- Alertas.
- Gráficos.
- Drill-down.
- Cache.
- Auditoria.
- Testes.

## Não Implementar

- IA preditiva.
- Dashboards personalizados.
- Notificações automáticas.

## Critérios

- Utilizar camada Analytics.
- APIs REST.
- Alta performance.
- Somente leitura.

---

# Arquitetura Aplicada

**Padrão:** CQRS + Analytics Layer

**Componentes:**

OperationalDashboardService

↓

AnalyticsQueryService

↓

DashboardCache

↓

AnalyticsSnapshot

**Persistência:** Prisma ORM

**Princípio:** O Dashboard Operacional deve oferecer uma visão em tempo quase real da execução da operação, permitindo identificar rapidamente pendências, riscos e oportunidades de atuação, utilizando exclusivamente dados consolidados da camada analítica.
