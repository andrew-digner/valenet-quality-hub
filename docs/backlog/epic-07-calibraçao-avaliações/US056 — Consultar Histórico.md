# US056 — Consultar Histórico de Calibrações

**Epic:** EPIC-07 — Calibração de Avaliações

**ID:** US056

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 14

**Status:** Backlog

---

# História

Como gestor, coordenador ou analista de qualidade,

Quero consultar o histórico das calibrações realizadas,

Para acompanhar a evolução da consistência das avaliações, revisar decisões anteriores e apoiar auditorias e treinamentos.

---

# Objetivo

Implementar um módulo de consulta das sessões de calibração, permitindo pesquisar, filtrar e visualizar todas as informações relevantes de cada sessão, incluindo participantes, monitorias, comparações, consenso e indicadores.

O histórico deverá permanecer imutável e totalmente auditável.

---

# Valor de Negócio

O histórico permite:

- Acompanhar evolução da equipe.
- Revisar decisões anteriores.
- Apoiar treinamentos.
- Atender auditorias.
- Identificar padrões de divergência.

---

# Escopo

## Pesquisa

Permitir pesquisar por:

- Código da sessão
- Nome da sessão
- Moderador
- Participante
- Operação
- Equipe
- Período
- Status

---

## Filtros

Permitir filtrar por:

- Data de criação
- Data de encerramento
- Moderador
- Participante
- Percentual de concordância
- Quantidade de monitorias
- Quantidade de participantes

---

## Lista

Exibir:

- Código
- Nome
- Moderador
- Participantes
- Monitorias
- Percentual de concordância
- Status
- Data de encerramento

---

## Detalhes

Visualizar:

- Configuração da sessão
- Participantes
- Monitorias avaliadas
- Comparações
- Divergências
- Consenso
- Estatísticas
- Histórico completo

---

## Timeline

Registrar:

- Criação
- Publicação
- Avaliações
- Comparação
- Consenso
- Encerramento

---

## Indicadores

Exibir:

- Percentual médio de concordância
- Tempo médio das sessões
- Divergências por formulário
- Participação por avaliador
- Evolução histórica

---

# Fluxo Principal

```text
Pesquisar Sessão

↓

Selecionar Calibração

↓

Visualizar Histórico

↓

Consultar Indicadores
```

---

# Regras de Negócio

RN001

Somente usuários autorizados poderão consultar calibrações.

---

RN002

A consulta deverá respeitar o escopo organizacional do usuário.

---

RN003

Sessões concluídas serão somente leitura.

---

RN004

Toda consulta detalhada deverá ser auditada.

---

RN005

As avaliações individuais deverão permanecer preservadas.

---

RN006

Comentários internos respeitarão as permissões de acesso.

---

RN007

Downloads de documentos deverão ser registrados.

---

RN008

O histórico deverá preservar todas as versões do consenso.

---

# Critérios de Aceite

- [ ] Pesquisar sessões.
- [ ] Aplicar filtros.
- [ ] Visualizar detalhes.
- [ ] Consultar timeline.
- [ ] Exibir indicadores.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Sessão inexistente.
- Usuário sem permissão.
- Histórico indisponível.

---

# APIs

```http
GET /calibrations

GET /calibrations/{id}

GET /calibrations/{id}/history

GET /calibrations/{id}/timeline

GET /calibrations/{id}/statistics
```

---

# Banco de Dados

Tabelas:

- calibration_sessions
- calibration_history
- calibration_consensus
- calibration_statistics
- audit_logs

---

# Telas

- Histórico de Calibrações
- Detalhes da Sessão
- Timeline
- Indicadores

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
- Indicadores funcionando.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US055 — Consolidar Resultado da Calibração

---

# Observações

Este módulo é exclusivamente para consulta.

Nenhuma alteração poderá ser realizada em sessões encerradas por meio desta funcionalidade.

---

# Instruções para Implementação (Codex)

## Criar

- Pesquisa.
- Filtros.
- Timeline.
- Indicadores.
- Auditoria.
- Testes.

## Não Implementar

- Alteração de sessões.
- Reabertura.
- Exportação.

## Critérios

- APIs REST.
- Paginação.
- Somente leitura.
- Controle de acesso por RBAC.

---

# Arquitetura Aplicada

**Padrão:** CQRS (Query Side)

**Persistência:** Prisma ORM

**Relacionamentos:**

CalibrationSession

↓

CalibrationEvaluation

↓

CalibrationComparison

↓

CalibrationConsensus

↓

CalibrationHistory

↓

CalibrationStatistics

**Princípio:** O histórico de calibrações deve fornecer uma visão consolidada, imutável e auditável de todas as sessões realizadas, permitindo análise da evolução da consistência das avaliações e suporte às decisões estratégicas da área de Qualidade.
