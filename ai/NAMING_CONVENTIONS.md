# NAMING_CONVENTIONS.md

# Valenet Quality Hub

## Convenções Oficiais de Nomenclatura

Versão: 1.0

---

# Objetivo

Este documento define os padrões oficiais de nomenclatura utilizados em todo o Valenet Quality Hub.

Todos os desenvolvedores e agentes de IA deverão seguir rigorosamente estas convenções.

O objetivo é garantir:

- Consistência
- Padronização
- Legibilidade
- Facilidade de manutenção
- Código previsível

---

# Idioma

## Código

Todo código deverá ser escrito em inglês.

Exemplos.

```typescript
User;

Evaluation;

Feedback;

Appeal;

Calibration;
```

---

## Interface

Toda interface deverá permanecer em português.

Exemplo.

```text
Usuário

Monitoria

Feedback

Contestação
```

---

## Banco

Todos os nomes deverão estar em inglês.

---

# Estrutura de Pastas

Utilizar apenas:

```text
kebab-case
```

Exemplo.

```text
user-management

quality-dashboard

evaluation-engine
```

Nunca utilizar:

```text
UserManagement

user_management

User_Management
```

---

# Arquivos

Utilizar:

```text
kebab-case
```

Exemplo.

```text
create-user.dto.ts

evaluation.service.ts

feedback.repository.ts
```

---

# Componentes React

Utilizar:

```text
PascalCase
```

Exemplo.

```typescript
DashboardCard;

MetricChart;

EvaluationForm;

FeedbackDrawer;

AppealModal;
```

---

# Hooks

Sempre iniciar com:

```text
use
```

Exemplo.

```typescript
useUsers();

useEvaluations();

useDashboard();

useFeedback();
```

---

# Services

Sempre terminar com:

```text
Service
```

Exemplo.

```typescript
UserService;

EvaluationService;

DashboardService;
```

---

# Controllers

Sempre terminar com:

```text
Controller
```

Exemplo.

```typescript
UsersController;

FeedbackController;
```

---

# Repositories

Sempre terminar com:

```text
Repository
```

Exemplo.

```typescript
UserRepository;

EvaluationRepository;
```

---

# DTOs

Sempre utilizar:

```text
Action + Entity + Dto
```

Exemplo.

```typescript
CreateUserDto;

UpdateUserDto;

PublishEvaluationDto;

ApplyFeedbackDto;
```

---

# Entities

Sempre utilizar singular.

Exemplo.

```typescript
User;

Evaluation;

Feedback;

Appeal;
```

---

# Interfaces

Padrão oficial.

Sem prefixo "I".

Exemplo.

```typescript
UserRepository;

EvaluationProvider;

NotificationService;
```

Nunca.

```typescript
IUserRepository;
```

---

# Types

Sempre utilizar:

```text
PascalCase
```

Exemplo.

```typescript
UserProfile;

EvaluationResult;

DashboardFilter;
```

---

# Enums

Nome.

```typescript
UserStatus;

EvaluationStatus;

FeedbackStatus;
```

Valores.

```typescript
ACTIVE;

INACTIVE;

PUBLISHED;

PENDING;

CANCELED;
```

Sempre em UPPER_SNAKE_CASE.

---

# Variáveis

Utilizar:

```text
camelCase
```

Exemplo.

```typescript
userName;

evaluationScore;

createdAt;

feedbackDeadline;
```

---

# Constantes

Utilizar:

```text
UPPER_SNAKE_CASE
```

Exemplo.

```typescript
MAX_UPLOAD_SIZE;

DEFAULT_PAGE_SIZE;

JWT_EXPIRATION;
```

---

# Funções

Sempre utilizar verbo.

Exemplo.

```typescript
createUser();

publishEvaluation();

calculateScore();

generateFeedback();

findEvaluationById();
```

Nunca.

```typescript
user();

evaluation();

feedback();
```

---

# Métodos Booleanos

Sempre iniciar com.

```text
is

has

can

should
```

Exemplo.

```typescript
isPublished();

hasPermission();

canPublish();

shouldNotify();
```

---

# Eventos

Sempre utilizar verbo no passado.

Exemplo.

```text
UserCreated

EvaluationPublished

FeedbackApplied

AppealAccepted

CalibrationFinished
```

---

# Filas

Sempre terminar com.

```text
Queue
```

Exemplo.

```text
AIQueue

NotificationQueue

ExportQueue

ImportQueue
```

---

# Workers

Sempre terminar com.

```text
Worker
```

Exemplo.

```text
AIWorker

ExportWorker

NotificationWorker
```

---

# Providers

Sempre terminar com.

```text
Provider
```

Exemplo.

```text
OpenAIProvider

AzureProvider

ClaudeProvider
```

---

# Adapters

Sempre terminar com.

```text
Adapter
```

Exemplo.

```text
CRMAdapter

WhatsAppAdapter

AzureOpenAIAdapter
```

---

# Exceptions

Sempre terminar com.

```text
Exception
```

Exemplo.

```text
UserNotFoundException

EvaluationClosedException

PermissionDeniedException
```

---

# Banco de Dados

## Tabelas

Plural.

```text
users

forms

evaluations

feedbacks

appeals
```

---

## Colunas

Utilizar:

```text
snake_case
```

Exemplo.

```text
created_at

updated_at

deleted_at

evaluation_score
```

---

## Chaves Estrangeiras

Sempre terminar com:

```text
_id
```

Exemplo.

```text
user_id

evaluation_id

team_id

area_id
```

---

# APIs

Utilizar plural.

```text
/api/v1/users

/api/v1/forms

/api/v1/evaluations

/api/v1/feedbacks
```

Nunca utilizar verbos na URL.

---

# Branches

Padrão.

```text
feature/

fix/

hotfix/

release/

docs/

refactor/

test/
```

Exemplo.

```text
feature/evaluation-dashboard

fix/login-timeout

docs/update-prd
```

---

# Commits

Obrigatório utilizar Conventional Commits.

Exemplos.

```text
feat(auth): implement JWT authentication

fix(users): validate duplicate email

refactor(forms): simplify version service

docs(prd): update monitoring workflow

test(api): add evaluation endpoint tests
```

---

# Migrations

Formato.

```text
YYYYMMDDHHMM_description
```

Exemplo.

```text
202607272030_create_users

202607281000_add_feedback_table
```

---

# Seeds

Formato.

```text
seed-users.ts

seed-roles.ts

seed-permissions.ts
```

---

# Testes

Mesmo nome do arquivo testado.

Exemplo.

```text
user.service.spec.ts

evaluation.controller.spec.ts

feedback.repository.spec.ts
```

---

# Variáveis de Ambiente

Sempre utilizar:

```text
UPPER_SNAKE_CASE
```

Exemplo.

```text
DATABASE_URL

REDIS_URL

JWT_SECRET

OPENAI_API_KEY

AZURE_STORAGE_CONNECTION_STRING
```

---

# Resumo

| Elemento          | Convenção                |
| ----------------- | ------------------------ |
| Pastas            | kebab-case               |
| Arquivos          | kebab-case               |
| Componentes React | PascalCase               |
| Classes           | PascalCase               |
| Hooks             | use + camelCase          |
| Variáveis         | camelCase                |
| Funções           | camelCase com verbo      |
| Constantes        | UPPER_SNAKE_CASE         |
| Enums             | PascalCase               |
| Valores de Enum   | UPPER_SNAKE_CASE         |
| Tabelas           | plural + snake_case      |
| Colunas           | snake_case               |
| APIs              | plural                   |
| Branches          | feature/, fix/, docs/... |
| Commits           | Conventional Commits     |

---

# Considerações Finais

Estas convenções são obrigatórias para todo o código do Valenet Quality Hub.

A adoção consistente desses padrões facilita a leitura, reduz ambiguidades, melhora a colaboração entre equipes e aumenta a qualidade do código gerado por agentes de IA.

Qualquer exceção deverá ser documentada e aprovada por meio de um Architecture Decision Record (ADR).
