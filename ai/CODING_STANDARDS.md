# CODING_STANDARDS.md

# Valenet Quality Hub

## Padrões Oficiais de Desenvolvimento

Versão: 1.0

---

# Objetivo

Este documento define os padrões oficiais de desenvolvimento do Valenet Quality Hub.

Todos os desenvolvedores e agentes de IA deverão seguir rigorosamente estas diretrizes.

O objetivo é garantir:

- Consistência
- Legibilidade
- Reutilização
- Testabilidade
- Escalabilidade
- Manutenção simplificada

---

# Princípios

Todo código deverá seguir:

- SOLID
- Clean Code
- Clean Architecture
- DRY
- KISS
- YAGNI
- Separation of Concerns
- Dependency Injection

Sempre priorizar clareza em vez de otimizações prematuras.

---

# Linguagem

Obrigatório:

TypeScript Strict

Nunca utilizar:

```typescript
any;
```

Preferir:

```typescript
unknown;
```

ou

Interfaces e Types específicos.

---

# Organização

Cada Feature deverá ser isolada.

Exemplo.

```text
features/

users/

components/

hooks/

services/

schemas/

types/

utils/
```

Nunca criar arquivos gigantes.

---

# Tamanho dos Arquivos

Recomendação.

| Item               | Máximo     |
| ------------------ | ---------- |
| Componente React   | 300 linhas |
| Service            | 400 linhas |
| Controller         | 150 linhas |
| Hook               | 200 linhas |
| Arquivo utilitário | 250 linhas |

Se ultrapassar esses limites, considerar refatoração.

---

# Nomeação

## Variáveis

camelCase

```typescript
customerName;

evaluationScore;

createdAt;
```

---

## Funções

camelCase

```typescript
calculateScore();

publishEvaluation();

createFeedback();
```

---

## Classes

PascalCase

```typescript
EvaluationService;

UserRepository;

AuthGuard;
```

---

## Interfaces

Prefixo I opcional, mas consistente.

```typescript
EvaluationRepository;

ou;

IEvaluationRepository;
```

Escolher um padrão e mantê-lo.

---

## Tipos

PascalCase

```typescript
EvaluationStatus;

UserRole;

DashboardMetric;
```

---

## ENUMs

PascalCase

Valores em UPPER_CASE.

```typescript
enum EvaluationStatus {
  PUBLISHED,

  DRAFT,

  CANCELED,
}
```

---

# Componentes React

Sempre utilizar.

Function Components.

Nunca utilizar.

Class Components.

---

# Componentes

Cada componente deverá possuir apenas uma responsabilidade.

Exemplo.

Errado.

```text
Dashboard.tsx

↓

1000 linhas

↓

Tabela

↓

Gráfico

↓

Filtros

↓

Modal

↓

Drawer

↓

Cards
```

Correto.

```text
Dashboard

↓

MetricCards

↓

Filters

↓

Charts

↓

Table

↓

Drawer
```

---

# Hooks

Todo Hook deverá iniciar com.

```typescript
use;
```

Exemplo.

```typescript
useUsers();

useEvaluation();

useDashboard();
```

---

# Services

Toda lógica de negócio deverá ficar em Services.

Nunca colocar regra de negócio:

- em Controllers;
- em Components;
- em Hooks;
- em Repositories.

---

# Controllers

Responsabilidade.

- Receber requisição.
- Validar DTO.
- Chamar Service.
- Retornar resposta.

Nada além disso.

---

# Repositories

Responsáveis apenas pelo acesso ao banco.

Nunca implementar regra de negócio.

---

# DTOs

Utilizar:

class-validator

class-transformer

Todo DTO deverá validar todos os campos de entrada.

---

# Tratamento de Erros

Nunca fazer.

```typescript
throw 'Erro';
```

Sempre utilizar Exceptions específicas.

Exemplo.

```typescript
throw new NotFoundException();
```

ou

Exceptions customizadas.

---

# Logs

Nunca utilizar.

```typescript
console.log();
```

Sempre utilizar Logger.

---

# Comentários

Evitar comentários desnecessários.

Código deve ser autoexplicativo.

Documentar apenas:

- algoritmos complexos;
- regras de negócio incomuns;
- integrações específicas.

---

# Imports

Ordem.

1. Bibliotecas externas

2. Alias do projeto

3. Relativos

Exemplo.

```typescript
import { Injectable } from '@nestjs/common';

import { UserRepository } from '@/modules/users';

import './styles.css';
```

---

# Async

Sempre utilizar.

```typescript
async;

await;
```

Evitar.

```typescript
.then()

.catch()
```

Quando possível.

---

# React

Preferir.

```typescript
const
```

Nunca utilizar.

```typescript
var
```

Evitar.

```typescript
let;
```

Sempre que possível.

---

# CSS

Utilizar apenas.

Tailwind CSS.

Nunca utilizar.

CSS Inline.

---

# Design System

Todos os componentes deverão utilizar.

shadcn/ui

Não criar componentes similares sem necessidade.

---

# Estado

Servidor.

TanStack Query.

Cliente.

Zustand.

Evitar Context API.

---

# Banco

Nunca escrever SQL manual sem justificativa.

Sempre utilizar Prisma.

---

# Auditoria

Toda operação crítica deverá gerar registro.

Obrigatório.

- Usuário
- Data
- Operação
- Antes
- Depois

---

# Segurança

Nunca confiar em dados vindos do Frontend.

Toda validação deverá ocorrer também no Backend.

---

# Testes

Cada funcionalidade deverá possuir.

- Unit Tests
- Integration Tests

Cobertura mínima.

80%.

---

# Performance

Sempre considerar.

- Paginação.
- Lazy Loading.
- Memoização.
- Cache.
- Processamento assíncrono.

---

# Pull Request

Todo PR deverá:

- Compilar.
- Passar nos testes.
- Passar no lint.
- Atualizar documentação.

---

# Checklist

Antes de finalizar qualquer implementação:

- [ ] Código limpo
- [ ] Sem duplicação
- [ ] Tipagem completa
- [ ] Testes criados
- [ ] Auditoria implementada
- [ ] Permissões implementadas
- [ ] Documentação atualizada
- [ ] Lint sem erros
- [ ] Build executado
- [ ] Critérios de aceite atendidos

---

# Filosofia

Escreva código como se outra pessoa fosse mantê-lo pelos próximos dez anos.

Priorize simplicidade, clareza e previsibilidade.

Todo código deverá ser fácil de entender, fácil de testar e fácil de evoluir.
