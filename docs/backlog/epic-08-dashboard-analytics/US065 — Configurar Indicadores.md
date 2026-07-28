# US065 — Configurar Indicadores (KPIs)

**Epic:** EPIC-08 — Dashboards e Analytics

**ID:** US065

**Prioridade:** P1 (Alta)

**Story Points:** 13

**Sprint:** Sprint 16

**Status:** Backlog

---

# História

Como administrador ou gestor da Qualidade,

Quero configurar os indicadores (KPIs) utilizados nos dashboards,

Para adaptar as métricas da plataforma às necessidades da organização sem depender de alterações no sistema.

---

# Objetivo

Implementar o gerenciamento dos KPIs da plataforma, permitindo configurar metas, limites, regras de cálculo, periodicidade e visibilidade dos indicadores utilizados pelos dashboards.

---

# Valor de Negócio

A configuração de KPIs permite:

- Adaptar indicadores à realidade da empresa.
- Reduzir dependência da equipe técnica.
- Padronizar métricas.
- Facilitar evolução da plataforma.
- Melhorar governança dos indicadores.

---

# Escopo

## Cadastro

Permitir configurar:

- Nome do KPI
- Código
- Categoria
- Descrição
- Unidade de medida
- Tipo

---

## Configuração

Permitir definir:

- Meta
- Valor mínimo
- Valor máximo
- Faixas de classificação
- Fórmula utilizada
- Frequência de atualização

---

## Visibilidade

Configurar:

- Dashboard Executivo
- Dashboard Operacional
- Dashboard Individual
- Dashboard Feedback/PDI
- Dashboard Contestações
- Dashboard Calibração

---

## Status

Permitir:

- Ativar
- Desativar
- Arquivar

---

## Versionamento

Registrar:

- Versão
- Alterações
- Responsável
- Data

---

## Simulação

Permitir visualizar como o KPI será exibido antes da publicação.

---

# Fluxo Principal

```text
Cadastrar KPI

↓

Configurar Metas

↓

Definir Fórmula

↓

Validar

↓

Publicar
```

---

# Regras de Negócio

RN001

Somente administradores poderão configurar KPIs.

---

RN002

KPIs publicados somente poderão ser alterados mediante criação de nova versão.

---

RN003

Alterações não deverão impactar indicadores históricos.

---

RN004

Toda alteração deverá ser auditada.

---

RN005

Os dashboards utilizarão apenas KPIs ativos.

---

RN006

Metas deverão possuir valores válidos.

---

RN007

Toda fórmula deverá ser validada antes da publicação.

---

RN008

Os indicadores deverão possuir identificador único.

---

# Critérios de Aceite

- [ ] Cadastrar KPI.
- [ ] Configurar metas.
- [ ] Configurar visibilidade.
- [ ] Versionar alterações.
- [ ] Validar fórmulas.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Código duplicado.
- Fórmula inválida.
- Meta inconsistente.
- Usuário sem permissão.
- KPI em uso sem versionamento.

---

# APIs

```http
GET    /analytics/kpis

GET    /analytics/kpis/{id}

POST   /analytics/kpis

PUT    /analytics/kpis/{id}

PATCH  /analytics/kpis/{id}/status

POST   /analytics/kpis/{id}/publications
```

---

# Banco de Dados

Tabelas:

- analytics_kpis
- analytics_kpi_versions
- analytics_kpi_targets
- audit_logs

---

# Telas

- Lista de KPIs
- Cadastro de KPI
- Configuração
- Histórico de Versões
- Simulação

---

# Auditoria

Registrar:

- Criação.
- Alteração.
- Publicação.
- Arquivamento.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- CRUD implementado.
- Versionamento funcionando.
- Validação de fórmulas implementada.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US059 — Dashboard Executivo
- US060 — Dashboard Operacional

---

# Observações

Os KPIs configurados nesta funcionalidade servirão como fonte única para todos os dashboards da plataforma.

Alterações em KPIs publicados não modificarão indicadores históricos.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD de KPIs.
- Versionamento.
- Configuração de metas.
- Validação de fórmulas.
- Simulação.
- Auditoria.
- Testes.

## Não Implementar

- IA para criação de KPIs.
- KPIs personalizados por usuário.
- Integrações externas.

## Critérios

- APIs REST.
- Arquitetura modular.
- Versionamento obrigatório.
- Código desacoplado.

---

# Arquitetura Aplicada

**Aggregate Root:** AnalyticsKPI

**Relacionamentos:**

AnalyticsKPI

↓

AnalyticsKPIVersion

↓

AnalyticsKPITarget

↓

DashboardMetric

↓

AuditLog

**Persistência:** Prisma ORM

**Princípio:** Os KPIs representam a definição oficial das métricas utilizadas pela plataforma, devendo possuir versionamento, rastreabilidade e governança para garantir consistência em todos os dashboards.
