# US035 — Gerenciar Feedbacks

**Epic:** EPIC-05 — Feedback e Desenvolvimento

**ID:** US035

**Prioridade:** P0 (Crítica)

**Story Points:** 21

**Sprint:** Sprint 09

**Status:** Backlog

---

# História

Como monitor de qualidade,

Quero criar feedbacks a partir das monitorias concluídas,

Para compartilhar os resultados da avaliação com o colaborador, orientar melhorias e registrar formalmente a devolutiva.

---

# Objetivo

Implementar o módulo de gestão de feedbacks, permitindo criar, editar, consultar e concluir feedbacks vinculados às monitorias.

O feedback deverá consolidar o resultado da avaliação, destacar pontos fortes, oportunidades de melhoria e permitir o acompanhamento do desenvolvimento do colaborador.

---

# Valor de Negócio

O módulo de feedback transforma avaliações em ações práticas de desenvolvimento.

Permite padronizar devolutivas, aumentar a transparência e registrar todo o histórico de evolução do colaborador.

---

# Escopo

## Criar Feedback

Permitir criar feedback contendo:

- Monitoria vinculada
- Avaliado
- Monitor responsável
- Supervisor
- Tipo de feedback
- Status

---

## Resumo da Avaliação

Exibir automaticamente:

- Nota final
- Classificação
- Critérios eliminatórios
- Tempo da avaliação
- Formulário utilizado
- Versão do formulário

---

## Pontos Positivos

Registrar:

- Boas práticas observadas
- Destaques da avaliação
- Reconhecimentos

---

## Oportunidades de Melhoria

Registrar:

- Pontos críticos
- Erros identificados
- Recomendações

---

## Comentários

Permitir:

- Comentários do monitor
- Comentários do supervisor
- Comentários do colaborador (após ciência)

---

## Status

Fluxo:

```text
Rascunho

↓

Em Revisão

↓

Agendado

↓

Realizado

↓

Encerrado
```

---

## Classificação

Permitir classificar o feedback como:

- Preventivo
- Corretivo
- Evolutivo
- Reconhecimento

---

## Histórico

Registrar todas as alterações realizadas durante o ciclo de vida do feedback.

---

# Fluxo Principal

```text
Monitoria Concluída

↓

Criar Feedback

↓

Adicionar Comentários

↓

Registrar Pontos Positivos

↓

Registrar Melhorias

↓

Salvar

↓

Agendar Devolutiva
```

---

# Regras de Negócio

RN001

Todo feedback deverá estar vinculado a uma monitoria concluída.

---

RN002

Cada monitoria poderá possuir apenas um feedback ativo.

---

RN003

Feedbacks encerrados serão somente leitura.

---

RN004

Toda alteração deverá ser auditada.

---

RN005

O colaborador somente poderá visualizar o feedback após sua publicação.

---

RN006

A nota da monitoria será exibida automaticamente.

---

RN007

O feedback poderá originar um Plano de Desenvolvimento (PDI).

---

RN008

O feedback deverá registrar data de criação e responsável.

---

# Critérios de Aceite

- [ ] Criar feedback.
- [ ] Vincular à monitoria.
- [ ] Exibir resumo da avaliação.
- [ ] Registrar pontos positivos.
- [ ] Registrar oportunidades de melhoria.
- [ ] Alterar status.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Monitoria inexistente.
- Monitoria não concluída.
- Feedback já existente.
- Usuário sem permissão.
- Feedback encerrado.

---

# APIs

```http
GET    /feedbacks

GET    /feedbacks/{id}

POST   /feedbacks

PUT    /feedbacks/{id}

PATCH  /feedbacks/{id}/status

GET    /feedbacks/evaluation/{evaluationId}
```

---

# Banco de Dados

Tabelas:

- feedbacks
- evaluations
- users
- audit_logs

---

# Telas

- Lista de Feedbacks
- Novo Feedback
- Detalhes do Feedback
- Linha do Tempo
- Histórico

---

# Auditoria

Registrar:

- Criação.
- Alteração.
- Mudança de status.
- Publicação.
- Encerramento.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- CRUD implementado.
- Fluxo de status funcionando.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US031 — Finalizar Monitoria

---

# Observações

O feedback representa a devolutiva oficial da monitoria.

Planos de Desenvolvimento (PDI) serão tratados na US036.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD de feedbacks.
- Workflow de status.
- Resumo automático da monitoria.
- Comentários.
- Auditoria.
- Testes.

## Não Implementar

- Plano de Desenvolvimento (PDI).
- Ciência do colaborador.
- Notificações.
- Agendamento de reuniões.

## Critérios

- Fluxo baseado em estados.
- APIs REST.
- Código desacoplado.
- Reutilização dos dados da monitoria.

---

# Arquitetura Aplicada

**Aggregate Root:** Feedback

**Relacionamentos:**

Feedback

↓

Evaluation

↓

FeedbackComment

↓

FeedbackHistory

**Persistência:** Prisma ORM

**Princípio:** O feedback representa a devolutiva oficial de uma monitoria, consolidando os resultados da avaliação e servindo como ponto de partida para ações de desenvolvimento e melhoria contínua.
