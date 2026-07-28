# C4_CODE.md

# C4 Model — Nível 4 (Código)

## Exemplo: Módulo de Monitorias

---

# Objetivo

Demonstrar a organização interna de um módulo seguindo Clean Architecture.

---

# Estrutura

```text
evaluations/

│

├── controllers/

│     EvaluationController

│

├── services/

│     EvaluationService

│

├── repositories/

│     EvaluationRepository

│

├── dto/

│     CreateEvaluationDto

│     UpdateEvaluationDto

│

├── entities/

│     Evaluation

│

├── validators/

│     EvaluationValidator

│

├── mappers/

│     EvaluationMapper

│

├── interfaces/

│     IEvaluationRepository

│

├── events/

│     EvaluationPublishedEvent

│

├── tests/

│     evaluation.service.spec.ts

│

└── evaluation.module.ts
```

---

# Fluxo Interno

```text
HTTP Request

↓

Controller

↓

DTO Validation

↓

Service

↓

Repository

↓

Prisma

↓

PostgreSQL

↓

Mapper

↓

Response
```

---

# Regras

Controller

Responsável apenas por:

- receber requisições;
- validar DTO;
- chamar Service.

Nunca conter regra de negócio.

---

# Service

Responsável por:

- regras de negócio;
- autorização;
- eventos;
- auditoria.

---

# Repository

Responsável exclusivamente pelo acesso ao banco.

Nunca implementar regra de negócio.

---

# DTO

Responsável pela validação de entrada.

---

# Mapper

Responsável por transformar:

Entity

↓

Response DTO

---

# Eventos

Após publicar uma monitoria:

```text
EvaluationPublishedEvent

↓

Dashboards

↓

Feedbacks

↓

Notificações

↓

Auditoria

↓

Analytics
```

---

# Testes

Cada módulo deverá possuir:

- testes unitários;
- testes de integração;
- testes de contratos das APIs.

Cobertura mínima:

80%
