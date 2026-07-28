# ADR-008 — Arquitetura Orientada a Eventos (Event-Driven)

**Status:** Aprovado

**Data:** 27/07/2026

---

# Contexto

O Valenet Quality Hub possui diversos módulos que reagem aos mesmos acontecimentos.

Exemplo.

Uma monitoria publicada gera:

- Dashboard
- Feedback
- Auditoria
- Notificações
- IA
- Indicadores

Esses módulos não devem depender diretamente uns dos outros.

---

# Problema

Chamadas diretas entre módulos aumentam o acoplamento.

Isso dificulta:

- manutenção;
- testes;
- evolução;
- escalabilidade.

---

# Decisão

Toda comunicação assíncrona utilizará Eventos de Domínio.

---

# Fluxo

```text
Evaluation Published

↓

Event Bus

↓

Dashboard

↓

Feedback

↓

Notifications

↓

Audit

↓

Analytics
```

---

# Eventos Oficiais

## Usuários

```text
UserCreated

UserUpdated

UserBlocked
```

---

## Formulários

```text
FormCreated

FormPublished

FormArchived
```

---

## Monitorias

```text
EvaluationStarted

EvaluationCompleted

EvaluationPublished

EvaluationCanceled
```

---

## Feedback

```text
FeedbackCreated

FeedbackApplied

FeedbackAcknowledged
```

---

## Contestações

```text
AppealCreated

AppealAccepted

AppealRejected
```

---

## Calibração

```text
CalibrationCreated

CalibrationFinished
```

---

## IA

```text
AIStarted

AICompleted

AIFailed
```

---

## Dashboard

```text
MetricsUpdated
```

---

# Regras

Eventos deverão ser:

- Imutáveis.
- Assíncronos.
- Versionados.
- Auditáveis.

---

# Payload

Todo evento deverá possuir.

```text
Event ID

Timestamp

Aggregate ID

Event Type

Payload

Correlation ID

User ID
```

---

# Benefícios

- Baixo acoplamento.
- Alta escalabilidade.
- Melhor observabilidade.
- Facilidade para adicionar novos módulos.
- Integração simplificada.

---

# Evolução

No futuro, o Event Bus poderá utilizar:

- RabbitMQ
- Apache Kafka
- Azure Service Bus

Sem necessidade de alterar as regras de negócio.
