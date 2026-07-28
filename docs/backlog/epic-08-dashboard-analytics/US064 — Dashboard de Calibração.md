# US064 — Dashboard de Calibração

**Epic:** EPIC-08 — Dashboards e Analytics

**ID:** US064

**Prioridade:** P1 (Alta)

**Story Points:** 13

**Sprint:** Sprint 16

**Status:** Backlog

---

# História

Como coordenador, gestor ou analista de qualidade,

Quero visualizar um Dashboard de Calibração,

Para acompanhar a consistência das avaliações, identificar divergências entre avaliadores e medir a evolução da equipe ao longo do tempo.

---

# Objetivo

Implementar um dashboard analítico consolidando indicadores das sessões de calibração, permitindo acompanhar níveis de concordância, divergências, evolução dos avaliadores e efetividade das ações de alinhamento.

---

# Valor de Negócio

O Dashboard de Calibração permite:

- Medir consistência das avaliações.
- Identificar necessidades de treinamento.
- Acompanhar evolução da equipe.
- Melhorar a confiabilidade das monitorias.
- Fortalecer a governança da Qualidade.

---

# Escopo

## Indicadores

Exibir:

- Sessões realizadas
- Sessões concluídas
- Sessões em andamento
- Participantes
- Monitorias calibradas
- Percentual médio de concordância
- Divergência média
- Tempo médio das sessões

---

## Indicadores de Consistência

Apresentar:

- Índice de concordância por avaliador
- Índice por equipe
- Índice por operação
- Evolução da concordância
- Tendência de melhoria

---

## Divergências

Exibir:

- Perguntas com maior divergência
- Formulários com maior divergência
- Critérios eliminatórios mais divergentes
- Distribuição das diferenças de nota

---

## Participação

Apresentar:

- Participação por avaliador
- Participação por moderador
- Frequência em sessões
- Taxa de conclusão

---

## Evolução

Visualizar:

- Evolução mensal
- Evolução por equipe
- Evolução por operação
- Histórico das sessões

---

## Drill-down

Permitir navegar para:

- Sessões
- Avaliações
- Comparações
- Consensos
- Participantes

---

# Fluxo Principal

```text
Abrir Dashboard

↓

Selecionar Período

↓

Consultar Indicadores

↓

Visualizar Divergências

↓

Abrir Detalhes
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

Filtros deverão atualizar todos os componentes simultaneamente.

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

Somente sessões concluídas participarão dos indicadores históricos.

---

RN008

O Dashboard será exclusivamente para consulta.

---

# Critérios de Aceite

- [ ] Exibir KPIs da calibração.
- [ ] Exibir indicadores de consistência.
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
GET /analytics/dashboards/calibration

GET /analytics/dashboards/calibrations/kpis

GET /analytics/dashboards/calibrations/agreement

GET /analytics/dashboards/calibrations/divergence

GET /analytics/dashboards/calibrations/history
```

---

# Banco de Dados

Tabelas:

- analytics_snapshots
- calibration_statistics
- dashboard_metrics
- dashboard_cache
- audit_logs

---

# Telas

- Dashboard de Calibração
- KPIs
- Indicadores de Consistência
- Divergências
- Evolução
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
- Indicadores de consistência funcionando.
- Cache implementado.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.

---

# Dependências

- EPIC-07 — Calibração de Avaliações

---

# Observações

Este dashboard deverá servir como principal ferramenta para acompanhar a maturidade do processo de calibração e orientar ações de capacitação da equipe de Qualidade.

---

# Instruções para Implementação (Codex)

## Criar

- KPIs da calibração.
- Indicadores de concordância.
- Indicadores de divergência.
- Evolução temporal.
- Drill-down.
- Cache.
- Auditoria.
- Testes.

## Não Implementar

- Recomendações por IA.
- Alertas automáticos.
- Simulações.

## Critérios

- Utilizar camada Analytics.
- APIs REST.
- Alta performance.
- Somente leitura.

---

# Arquitetura Aplicada

**Padrão:** CQRS + Analytics Layer

**Componentes:**

CalibrationDashboardService

↓

AnalyticsQueryService

↓

DashboardCache

↓

CalibrationStatistics

↓

AnalyticsSnapshot

**Persistência:** Prisma ORM

**Princípio:** O Dashboard de Calibração deve consolidar indicadores de consistência das avaliações, permitindo acompanhar a evolução metodológica da equipe de Qualidade por meio de métricas confiáveis e historicamente comparáveis.
