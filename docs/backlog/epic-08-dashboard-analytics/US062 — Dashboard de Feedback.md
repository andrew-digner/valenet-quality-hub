# US062 — Dashboard de Feedback e PDI

**Epic:** EPIC-08 — Dashboards e Analytics

**ID:** US062

**Prioridade:** P1 (Alta)

**Story Points:** 13

**Sprint:** Sprint 16

**Status:** Backlog

---

# História

Como gestor, supervisor ou monitor,

Quero visualizar um Dashboard de Feedback e Plano de Desenvolvimento (PDI),

Para acompanhar a evolução dos colaboradores, identificar pendências e medir a efetividade das ações de desenvolvimento.

---

# Objetivo

Implementar um dashboard analítico consolidando indicadores de feedbacks e PDIs, permitindo acompanhar o ciclo de desenvolvimento dos colaboradores e medir os resultados das ações executadas.

---

# Valor de Negócio

O Dashboard de Feedback e PDI permite:

- Acompanhar evolução dos colaboradores.
- Medir efetividade dos feedbacks.
- Monitorar execução dos PDIs.
- Identificar atrasos.
- Apoiar decisões de desenvolvimento.

---

# Escopo

## Indicadores de Feedback

Exibir:

- Feedbacks realizados
- Feedbacks pendentes
- Feedbacks por período
- Tempo médio entre monitoria e feedback
- Feedbacks por monitor
- Feedbacks por equipe

---

## Indicadores de PDI

Exibir:

- PDIs ativos
- PDIs concluídos
- PDIs vencidos
- Ações concluídas
- Ações pendentes
- Percentual médio de conclusão

---

## Evolução

Apresentar:

- Evolução das notas após feedback
- Evolução dos PDIs
- Evolução dos colaboradores
- Tendência de melhoria

---

## Distribuição

Exibir:

- Feedbacks por operação
- PDIs por equipe
- PDIs por supervisor
- Feedbacks por tipo

---

## Alertas

Destacar:

- PDIs atrasados
- Feedbacks pendentes
- Colaboradores sem feedback
- Planos sem evolução

---

## Drill-down

Permitir navegar para:

- Feedbacks
- PDIs
- Colaborador
- Equipe

---

# Fluxo Principal

```text
Abrir Dashboard

↓

Selecionar Período

↓

Consultar Indicadores

↓

Visualizar Evolução

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

Os indicadores deverão informar data da última atualização.

---

RN006

Toda consulta detalhada deverá ser auditada.

---

RN007

PDIs encerrados deverão permanecer disponíveis para análises históricas.

---

RN008

O Dashboard será exclusivamente para consulta.

---

# Critérios de Aceite

- [ ] Exibir KPIs de Feedback.
- [ ] Exibir KPIs de PDI.
- [ ] Exibir gráficos.
- [ ] Aplicar filtros.
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
GET /analytics/dashboards/feedback

GET /analytics/dashboards/feedbacks/kpis

GET /analytics/dashboards/pdi

GET /analytics/dashboards/pdi/kpis

GET /analytics/dashboards/feedbacks/trends
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

- Dashboard de Feedback
- Dashboard de PDI
- Evolução
- Alertas
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
- Alertas funcionando.
- Cache implementado.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.

---

# Dependências

- EPIC-05 — Feedback e Desenvolvimento

---

# Observações

O Dashboard deverá permitir acompanhar a efetividade dos feedbacks e dos Planos de Desenvolvimento, servindo como apoio para reuniões de acompanhamento e gestão de desempenho.

---

# Instruções para Implementação (Codex)

## Criar

- KPIs de Feedback.
- KPIs de PDI.
- Evolução temporal.
- Alertas.
- Drill-down.
- Cache.
- Auditoria.
- Testes.

## Não Implementar

- Recomendações por IA.
- Alertas automáticos.
- Dashboards personalizados.

## Critérios

- Utilizar camada Analytics.
- APIs REST.
- Alta performance.
- Somente leitura.

---

# Arquitetura Aplicada

**Padrão:** CQRS + Analytics Layer

**Componentes:**

FeedbackDashboardService

↓

PdiDashboardService

↓

AnalyticsQueryService

↓

DashboardCache

↓

AnalyticsSnapshot

**Persistência:** Prisma ORM

**Princípio:** O Dashboard de Feedback e PDI deve consolidar indicadores de desenvolvimento dos colaboradores, permitindo avaliar a efetividade das ações executadas e apoiar decisões gerenciais baseadas em dados confiáveis.
