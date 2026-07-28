# US041 — Agendar Sessões de Feedback

**Epic:** EPIC-05 — Feedback e Desenvolvimento

**ID:** US041

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 10

**Status:** Backlog

---

# História

Como monitor ou supervisor,

Quero agendar sessões de feedback,

Para organizar a devolutiva da monitoria e garantir que o colaborador receba orientação dentro do prazo definido.

---

# Objetivo

Implementar o agendamento de sessões de feedback vinculadas às monitorias e aos feedbacks cadastrados, permitindo controlar datas, participantes, status e resultados das reuniões.

---

# Valor de Negócio

O agendamento permite:

- Organizar devolutivas.
- Melhorar o acompanhamento.
- Reduzir feedbacks pendentes.
- Garantir cumprimento dos SLAs.
- Criar histórico das reuniões.

---

# Escopo

## Agendamento

Permitir informar:

- Feedback
- Data
- Hora
- Duração prevista
- Local
- Modalidade
- Responsável
- Participantes

---

## Modalidade

Permitir:

- Presencial
- Online
- Híbrida

---

## Participantes

Adicionar:

- Monitor
- Colaborador
- Supervisor
- Gestor (opcional)

---

## Status

Fluxo:

```text
Agendado

↓

Confirmado

↓

Realizado
```

Opcionalmente:

```text
↓

Cancelado

↓

Reagendado

↓

Não Compareceu
```

---

## Registro da Sessão

Ao finalizar permitir registrar:

- Resumo da reunião
- Decisões
- Compromissos
- Próximos passos
- Observações

---

## Consulta

Permitir visualizar:

- Agenda
- Próximas sessões
- Histórico
- Sessões pendentes

---

# Fluxo Principal

```text
Criar Feedback

↓

Agendar Sessão

↓

Confirmar Participantes

↓

Realizar Reunião

↓

Registrar Resultado

↓

Encerrar Sessão
```

---

# Regras de Negócio

RN001

Toda sessão deverá estar vinculada a um feedback.

---

RN002

A data do agendamento deverá ser posterior à criação do feedback.

---

RN003

Sessões realizadas não poderão ser editadas.

---

RN004

Toda alteração deverá ser auditada.

---

RN005

Sessões canceladas deverão registrar o motivo.

---

RN006

Reagendamentos deverão preservar o histórico.

---

RN007

A reunião poderá gerar ou atualizar um PDI.

---

RN008

Participantes deverão possuir permissão de acesso ao feedback.

---

# Critérios de Aceite

- [ ] Agendar sessão.
- [ ] Alterar data e horário.
- [ ] Cancelar sessão.
- [ ] Registrar realização.
- [ ] Registrar resumo da reunião.
- [ ] Consultar agenda.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Feedback inexistente.
- Data inválida.
- Participante inexistente.
- Sessão já realizada.
- Usuário sem permissão.

---

# APIs

```http
GET    /feedback-sessions

GET    /feedback-sessions/{id}

POST   /feedback-sessions

PUT    /feedback-sessions/{id}

PATCH  /feedback-sessions/{id}/status

POST   /feedback-sessions/{id}/reschedule
```

---

# Banco de Dados

Tabelas:

- feedback_sessions
- feedback_session_participants
- feedback_session_notes
- audit_logs

---

# Telas

- Agenda de Feedbacks
- Calendário
- Detalhes da Sessão
- Registro da Reunião

---

# Auditoria

Registrar:

- Agendamento.
- Reagendamento.
- Cancelamento.
- Realização.
- Participantes.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Agendamento implementado.
- Reagendamento funcionando.
- Registro da reunião implementado.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US035 — Gerenciar Feedbacks
- US036 — Gerenciar Plano de Desenvolvimento (PDI)

---

# Observações

A sessão de feedback representa o encontro formal entre monitor e colaborador.

Seu resultado poderá originar novos compromissos ou atualizar o PDI existente.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD de sessões.
- Agenda.
- Calendário.
- Participantes.
- Registro da reunião.
- Auditoria.
- Testes.

## Não Implementar

- Videoconferência.
- Integração com Outlook/Google Calendar.
- Notificações automáticas.

## Critérios

- Arquitetura modular.
- APIs REST.
- Workflow baseado em estados.
- Histórico completo.

---

# Arquitetura Aplicada

**Aggregate Root:** FeedbackSession

**Relacionamentos:**

FeedbackSession

↓

Feedback

↓

Participants

↓

MeetingNotes

↓

History

**Persistência:** Prisma ORM

**Princípio:** A sessão de feedback representa o momento formal de devolutiva da avaliação, mantendo histórico completo, rastreabilidade das decisões e integração com o processo de desenvolvimento do colaborador.
