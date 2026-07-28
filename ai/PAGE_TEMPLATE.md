# PAGE_TEMPLATE.md

# Valenet Quality Hub

## Template Oficial para Páginas Next.js

Versão: 1.0

---

# Objetivo

Este documento define a estrutura oficial para criação de todas as páginas do Frontend.

Todas as telas deverão seguir rigorosamente este padrão.

Exemplos:

- Dashboard
- Usuários
- Formulários
- Monitorias
- Feedbacks
- Contestações
- Configurações

---

# Estrutura da Feature

Cada funcionalidade deverá ficar isolada.

```text
features/

<feature>/

├── components/
│
├── hooks/
│
├── services/
│
├── schemas/
│
├── types/
│
├── constants/
│
├── utils/
│
├── pages/
│
├── store/
│
└── index.ts
```

---

# Estrutura da Página

```text
app/

dashboards/

page.tsx
```

A página deverá ser pequena.

Nunca colocar lógica complexa dentro de page.tsx.

---

# Responsabilidade da Página

A página deverá apenas:

- carregar layout;
- chamar hooks;
- organizar componentes.

Nunca implementar regras de negócio.

---

# Estrutura Recomendada

```text
DashboardPage

↓

DashboardFilters

↓

DashboardMetrics

↓

DashboardCharts

↓

DashboardTable

↓

Pagination
```

---

# Componentização

Cada componente deverá possuir apenas uma responsabilidade.

Exemplo.

```text
EvaluationCard

EvaluationTable

EvaluationFilters

EvaluationDrawer

EvaluationScore

EvaluationTimeline
```

Nunca criar componentes gigantes.

---

# Hooks

Cada página deverá possuir hooks específicos.

Exemplo.

```text
useDashboard()

useDashboardFilters()

useDashboardMetrics()

useDashboardExport()
```

---

# Serviços

Toda chamada HTTP deverá ficar em:

```text
services/
```

Nunca chamar APIs diretamente nos componentes.

---

# Schemas

Toda validação deverá utilizar:

Zod

Exemplo.

```typescript
CreateEvaluationSchema;

FeedbackSchema;

FilterSchema;
```

---

# Tipos

Todos os tipos deverão ficar em:

```text
types/
```

Nunca declarar interfaces espalhadas pela aplicação.

---

# Estados Obrigatórios

Toda página deverá implementar:

## Loading

Skeletons utilizando shadcn/ui.

---

## Empty State

Mensagem amigável.

Ícone.

Botão de ação.

---

## Error State

Mensagem clara.

Botão de tentar novamente.

---

## Success State

Feedback visual após operações.

Toast.

Alert.

Badge.

---

# Paginação

Sempre utilizar paginação.

Nunca carregar milhares de registros.

---

# Filtros

Filtros deverão ser desacoplados da tabela.

Estrutura.

```text
Filters

↓

Query Params

↓

React Query

↓

API
```

---

# Tabelas

Todas deverão possuir.

- Paginação
- Ordenação
- Busca
- Exportação
- Seleção
- Estados vazios

---

# Formulários

Obrigatório utilizar.

- React Hook Form
- Zod

Todos deverão possuir.

- validação;
- mensagens;
- máscaras;
- placeholders;
- ajuda contextual.

---

# Drawer

Utilizar Drawer para:

- criação;
- edição;
- detalhes rápidos.

---

# Modal

Utilizar Modal apenas para:

- confirmação;
- exclusão;
- ações críticas.

---

# Navegação

Utilizar:

App Router.

Nunca utilizar navegação manual.

---

# Layout

Toda página deverá utilizar.

```text
Header

↓

Breadcrumb

↓

Actions

↓

Filters

↓

Content

↓

Pagination
```

---

# Responsividade

Obrigatória.

Desktop.

Notebook.

Tablet.

---

# Tema

Toda página deverá funcionar em:

- Light
- Dark
- System

---

# Permissões

A interface deverá esconder ações não permitidas.

Exemplo.

Sem permissão:

Não exibir botão.

Mesmo assim.

Backend deverá validar novamente.

---

# Feedback Visual

Toda operação deverá informar.

- sucesso;
- erro;
- carregamento.

Nunca deixar usuário sem resposta.

---

# Performance

Utilizar.

- Lazy Loading
- React.memo
- Dynamic Import
- Suspense

Quando aplicável.

---

# Acessibilidade

Obrigatório.

- Labels
- ARIA
- Navegação por teclado
- Contraste adequado

---

# Testes

Toda página deverá possuir.

- Renderização.
- Estados.
- Eventos.
- Permissões.
- Fluxos principais.

---

# Checklist

Antes de finalizar uma página:

- [ ] Responsiva.
- [ ] Estados implementados.
- [ ] Hooks separados.
- [ ] Serviços separados.
- [ ] Validação implementada.
- [ ] Permissões aplicadas.
- [ ] Testes criados.
- [ ] Build funcionando.
- [ ] Acessibilidade validada.

---

# Exemplo de Organização

```text
features/

evaluations/

components/

EvaluationTable.tsx

EvaluationFilters.tsx

EvaluationDrawer.tsx

EvaluationTimeline.tsx

hooks/

useEvaluations.ts

useEvaluationFilters.ts

services/

evaluation.service.ts

schemas/

evaluation.schema.ts

types/

evaluation.types.ts

pages/

EvaluationPage.tsx
```

---

# Filosofia

Cada página deverá ser:

- Simples.
- Modular.
- Reutilizável.
- Responsiva.
- Testável.
- Fácil de manter.

O objetivo é que qualquer nova tela do Valenet Quality Hub siga exatamente a mesma estrutura, proporcionando consistência visual e técnica em toda a plataforma.
