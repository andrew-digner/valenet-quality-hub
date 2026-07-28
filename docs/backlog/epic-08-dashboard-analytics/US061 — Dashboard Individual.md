# US061 — Dashboard Individual do Avaliador

**Epic:** EPIC-08 — Dashboards e Analytics

**ID:** US061

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 15

**Status:** Backlog

---

# História

Como monitor ou analista de qualidade,

Quero visualizar meu Dashboard Individual,

Para acompanhar minha produtividade, qualidade das avaliações, metas e evolução ao longo do tempo.

---

# Objetivo

Implementar um dashboard personalizado para cada avaliador, apresentando indicadores individuais de desempenho, produtividade, qualidade das avaliações e participação nas atividades da plataforma.

---

# Valor de Negócio

O Dashboard Individual permite:

- Acompanhar produtividade.
- Medir desempenho.
- Identificar oportunidades de melhoria.
- Estimular autodesenvolvimento.
- Apoiar feedbacks individuais.

---

# Escopo

## Indicadores

Exibir:

- Monitorias realizadas
- Média das notas atribuídas
- Tempo médio por monitoria
- Feedbacks emitidos
- PDIs acompanhados
- Contestações analisadas
- Participações em calibrações
- Taxa de conclusão

---

## Produtividade

Apresentar:

- Monitorias por dia
- Monitorias por semana
- Monitorias por mês
- Tempo médio de avaliação
- Evolução da produtividade

---

## Qualidade

Exibir:

- Divergência em calibrações
- Contestação de avaliações
- Taxa de retrabalho
- Consistência das avaliações
- Índice de aderência ao consenso

---

## Metas

Visualizar:

- Meta mensal
- Percentual atingido
- Pendências
- Projeção de conclusão

---

## Evolução

Apresentar:

- Histórico de produtividade
- Evolução da nota média
- Participação em treinamentos
- Evolução das calibrações

---

## Drill-down

Permitir navegar para:

- Monitorias realizadas
- Feedbacks emitidos
- Calibrações
- Contestações

---

# Fluxo Principal

```text
Abrir Dashboard

↓

Consultar KPIs

↓

Visualizar Evolução

↓

Abrir Detalhes

↓

Analisar Desempenho
```

---

# Regras de Negócio

RN001

Cada usuário visualizará apenas seus próprios indicadores.

---

RN002

Gestores poderão visualizar dashboards da equipe conforme suas permissões.

---

RN003

Todos os indicadores utilizarão a camada Analytics.

---

RN004

Filtros atualizarão todos os componentes do painel.

---

RN005

As consultas utilizarão cache.

---

RN006

Toda visualização detalhada será auditada.

---

RN007

Os indicadores deverão informar data e hora da última atualização.

---

RN008

O dashboard será exclusivamente para consulta.

---

# Critérios de Aceite

- [ ] Exibir KPIs individuais.
- [ ] Exibir gráficos de evolução.
- [ ] Exibir metas.
- [ ] Aplicar filtros.
- [ ] Navegar via drill-down.
- [ ] Utilizar cache.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Usuário sem permissão.
- Dados indisponíveis.
- Analytics indisponível.
- Cache inválido.

---

# APIs

```http
GET /analytics/dashboards/me

GET /analytics/dashboards/me/kpis

GET /analytics/dashboards/me/productivity

GET /analytics/dashboards/me/goals

GET /analytics/dashboards/me/history
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

- Dashboard Individual
- KPIs
- Produtividade
- Evolução
- Metas

---

# Auditoria

Registrar:

- Consulta.
- Filtros utilizados.
- Drill-down.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Dashboard implementado.
- KPIs funcionando.
- Metas exibidas.
- Cache implementado.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.

---

# Dependências

- EPIC-04 — Execução de Monitorias
- EPIC-07 — Calibração

---

# Observações

O Dashboard Individual deverá incentivar o autodesenvolvimento e fornecer transparência sobre o desempenho do avaliador.

Não permitirá alterações de dados.

---

# Instruções para Implementação (Codex)

## Criar

- KPIs individuais.
- Indicadores de produtividade.
- Histórico.
- Metas.
- Drill-down.
- Cache.
- Auditoria.
- Testes.

## Não Implementar

- Comparação pública entre avaliadores.
- Ranking geral visível para todos.
- Recomendações por IA.

## Critérios

- Utilizar camada Analytics.
- APIs REST.
- Alta performance.
- Somente leitura.

---

# Arquitetura Aplicada

**Padrão:** CQRS + Analytics Layer

**Componentes:**

IndividualDashboardService

↓

AnalyticsQueryService

↓

DashboardCache

↓

AnalyticsSnapshot

**Persistência:** Prisma ORM

**Princípio:** O Dashboard Individual deve apresentar uma visão personalizada e segura do desempenho do avaliador, utilizando dados consolidados da camada analítica e respeitando rigorosamente o controle de acesso baseado em perfis.
