# US036 — Gerenciar Plano de Desenvolvimento Individual (PDI)

**Epic:** EPIC-05 — Feedback e Desenvolvimento

**ID:** US036

**Prioridade:** P0 (Crítica)

**Story Points:** 21

**Sprint:** Sprint 09

**Status:** Backlog

---

# História

Como monitor de qualidade,

Quero criar um Plano de Desenvolvimento Individual (PDI),

Para acompanhar a evolução do colaborador após a realização do feedback.

---

# Objetivo

Implementar o módulo de Plano de Desenvolvimento Individual (PDI), permitindo criar planos estruturados contendo objetivos, ações, responsáveis, prazos e indicadores de acompanhamento.

Cada PDI deverá estar vinculado a um feedback e permitir acompanhar a evolução do colaborador ao longo do tempo.

---

# Valor de Negócio

O PDI transforma feedbacks em ações concretas de desenvolvimento.

Permite acompanhar resultados, medir evolução e garantir que oportunidades de melhoria sejam efetivamente tratadas.

---

# Escopo

## Criar Plano

Permitir informar:

- Feedback
- Colaborador
- Responsável
- Supervisor
- Data de início
- Data prevista de conclusão
- Objetivo geral

---

## Objetivos

Cada plano poderá possuir diversos objetivos.

Exemplos:

- Melhorar comunicação.
- Reduzir falhas operacionais.
- Aprimorar atendimento.
- Melhorar aderência aos processos.

---

## Ações

Cada objetivo poderá possuir várias ações.

Cada ação deverá conter:

- Descrição
- Responsável
- Prioridade
- Data limite
- Status
- Observações

---

## Prioridade

Permitir definir:

- Baixa
- Média
- Alta
- Crítica

---

## Status

Fluxo:

```text
Planejado

↓

Em Andamento

↓

Concluído
```

Opcionalmente:

```text
↓

Cancelado
```

---

## Indicadores

Registrar:

- Percentual de conclusão
- Quantidade de ações
- Ações concluídas
- Ações pendentes
- Prazo restante

---

## Comentários

Permitir comentários do:

- Monitor
- Supervisor
- Colaborador

---

## Histórico

Registrar todas as alterações realizadas no plano.

---

# Fluxo Principal

```text
Feedback

↓

Criar PDI

↓

Cadastrar Objetivos

↓

Cadastrar Ações

↓

Definir Responsáveis

↓

Salvar

↓

Acompanhar Evolução
```

---

# Regras de Negócio

RN001

Todo PDI deverá estar vinculado a um feedback.

---

RN002

Todo PDI deverá possuir pelo menos um objetivo.

---

RN003

Todo objetivo deverá possuir pelo menos uma ação.

---

RN004

O percentual de conclusão será calculado automaticamente.

---

RN005

A conclusão do PDI dependerá da conclusão de todas as ações.

---

RN006

Toda alteração deverá ser auditada.

---

RN007

PDIs concluídos serão somente leitura.

---

RN008

Prazos vencidos deverão ser destacados na interface.

---

# Critérios de Aceite

- [ ] Criar PDI.
- [ ] Criar objetivos.
- [ ] Criar ações.
- [ ] Atualizar status.
- [ ] Calcular progresso.
- [ ] Registrar comentários.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Feedback inexistente.
- PDI encerrado.
- Responsável inexistente.
- Data inválida.
- Usuário sem permissão.

---

# APIs

```http
GET    /development-plans

GET    /development-plans/{id}

POST   /development-plans

PUT    /development-plans/{id}

PATCH  /development-plans/{id}/status

POST   /development-plans/{id}/goals

POST   /goals/{id}/actions
```

---

# Banco de Dados

Tabelas:

- development_plans
- development_goals
- development_actions
- development_comments
- audit_logs

---

# Telas

- Lista de PDIs
- Detalhes do Plano
- Objetivos
- Ações
- Linha do Tempo

---

# Auditoria

Registrar:

- Criação.
- Alteração.
- Mudança de status.
- Inclusão de ações.
- Conclusão.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- CRUD implementado.
- Objetivos funcionando.
- Ações funcionando.
- Progresso automático.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US035 — Gerenciar Feedbacks

---

# Observações

O PDI poderá ser acompanhado pelo colaborador, supervisor e monitor.

Sua evolução será utilizada futuramente em dashboards e indicadores de desempenho.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD de PDI.
- Objetivos.
- Ações.
- Comentários.
- Cálculo automático do progresso.
- Auditoria.
- Testes.

## Não Implementar

- Notificações.
- Agendamento de reuniões.
- IA para sugestões de ações.

## Critérios

- Arquitetura modular.
- APIs REST.
- Workflow baseado em estados.
- Baixo acoplamento.

---

# Arquitetura Aplicada

**Aggregate Root:** DevelopmentPlan

**Relacionamentos:**

DevelopmentPlan

↓

DevelopmentGoal

↓

DevelopmentAction

↓

DevelopmentComment

↓

DevelopmentHistory

**Persistência:** Prisma ORM

**Princípio:** O Plano de Desenvolvimento Individual representa o conjunto estruturado de objetivos e ações destinados à evolução do colaborador, mantendo rastreabilidade completa, acompanhamento contínuo e histórico de execução.
