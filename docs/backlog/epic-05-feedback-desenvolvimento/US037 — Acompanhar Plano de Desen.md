# US037 — Acompanhar Plano de Desenvolvimento

**Epic:** EPIC-05 — Feedback e Desenvolvimento

**ID:** US037

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 09

**Status:** Backlog

---

# História

Como monitor, supervisor ou gestor,

Quero acompanhar a execução dos Planos de Desenvolvimento,

Para garantir que as ações planejadas sejam realizadas dentro do prazo e contribuam para a evolução do colaborador.

---

# Objetivo

Implementar o acompanhamento contínuo dos PDIs, permitindo atualizar o andamento das ações, registrar evidências, acompanhar indicadores e monitorar o progresso do colaborador.

---

# Valor de Negócio

O acompanhamento garante que o desenvolvimento do colaborador seja efetivamente executado, permitindo identificar atrasos, medir evolução e apoiar a tomada de decisão.

---

# Escopo

## Acompanhamento

Permitir visualizar:

- Plano
- Objetivos
- Ações
- Responsáveis
- Prazos
- Status
- Percentual de conclusão

---

## Atualização

Permitir atualizar:

- Status das ações
- Percentual concluído
- Comentários
- Evidências
- Datas de conclusão

---

## Indicadores

Exibir:

- Ações concluídas
- Ações pendentes
- Ações atrasadas
- Prazo restante
- Percentual geral
- Tendência de conclusão

---

## Alertas Visuais

Destacar:

- Ações vencidas
- Planos atrasados
- Planos próximos do vencimento
- Objetivos sem progresso

---

## Timeline

Registrar:

- Atualizações
- Comentários
- Alterações
- Conclusões
- Evidências

---

## Dashboard do Plano

Exibir:

- Evolução temporal
- Objetivos concluídos
- Próximas ações
- Últimas atualizações

---

# Fluxo Principal

```text
Abrir PDI

↓

Visualizar Objetivos

↓

Atualizar Ações

↓

Registrar Evidências

↓

Atualizar Indicadores

↓

Salvar Evolução
```

---

# Regras de Negócio

RN001

Somente responsáveis autorizados poderão atualizar ações.

---

RN002

O progresso geral deverá ser recalculado automaticamente.

---

RN003

Uma ação concluída deverá registrar data e responsável.

---

RN004

Planos concluídos não poderão receber novas ações.

---

RN005

Toda atualização deverá ser auditada.

---

RN006

O percentual do plano será baseado na conclusão das ações.

---

RN007

Ações atrasadas deverão ser identificadas automaticamente.

---

RN008

Comentários e evidências ficarão registrados no histórico.

---

# Critérios de Aceite

- [ ] Atualizar ações.
- [ ] Atualizar status.
- [ ] Registrar comentários.
- [ ] Registrar evidências.
- [ ] Atualizar progresso automaticamente.
- [ ] Exibir indicadores.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Plano inexistente.
- Ação inexistente.
- Plano encerrado.
- Usuário sem permissão.
- Data inválida.

---

# APIs

```http
GET    /development-plans/{id}

PATCH  /development-actions/{id}

POST   /development-actions/{id}/comments

POST   /development-actions/{id}/evidences

GET    /development-plans/{id}/progress
```

---

# Banco de Dados

Tabelas:

- development_plans
- development_goals
- development_actions
- development_progress
- development_comments
- development_evidences
- audit_logs

---

# Telas

- Dashboard do PDI
- Detalhes do Plano
- Acompanhamento de Ações
- Timeline
- Indicadores

---

# Auditoria

Registrar:

- Atualização de ações.
- Mudança de status.
- Inclusão de comentários.
- Inclusão de evidências.
- Recalculo do progresso.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Atualização das ações implementada.
- Indicadores funcionando.
- Timeline implementada.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US036 — Gerenciar Plano de Desenvolvimento (PDI)

---

# Observações

O acompanhamento é contínuo até que todas as ações sejam concluídas ou o plano seja encerrado.

Os indicadores desta User Story servirão de base para dashboards gerenciais e análises futuras.

---

# Instruções para Implementação (Codex)

## Criar

- Dashboard do PDI.
- Atualização das ações.
- Indicadores.
- Timeline.
- Comentários.
- Evidências.
- Auditoria.
- Testes.

## Não Implementar

- Notificações automáticas.
- IA para recomendações.
- Gamificação.

## Critérios

- Atualização em tempo real.
- Arquitetura modular.
- APIs REST.
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

DevelopmentProgress

↓

DevelopmentComment

↓

DevelopmentEvidence

↓

DevelopmentHistory

**Persistência:** Prisma ORM

**Princípio:** O acompanhamento do PDI deve refletir continuamente a evolução do colaborador, mantendo indicadores, histórico e rastreabilidade completos durante todo o ciclo de vida do plano.
