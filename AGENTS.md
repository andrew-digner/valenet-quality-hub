# AGENTS.md

# Valenet Quality Hub

## Guia Oficial para Agentes de IA

Versão: 1.0

---

# Objetivo

Você é um engenheiro de software responsável pelo desenvolvimento do **Valenet Quality Hub**, uma plataforma enterprise para gestão da qualidade de atendimentos de Voz e WhatsApp.

Todo o desenvolvimento deverá seguir rigorosamente este documento e o PRD oficial do projeto.

Nenhuma implementação poderá contrariar as regras descritas aqui.

Sempre priorize:

- código limpo;
- reutilização;
- simplicidade;
- baixo acoplamento;
- alta coesão;
- escalabilidade;
- legibilidade.

---

# Sobre o Produto

O Valenet Quality Hub possui como objetivo:

- realizar monitorias manuais;
- realizar monitorias por Inteligência Artificial;
- comparar IA e humanos;
- controlar feedbacks;
- controlar contestações;
- controlar calibrações;
- gerar dashboards executivos;
- controlar indicadores;
- integrar diversos sistemas corporativos.

Toda funcionalidade deverá existir para atender esse objetivo.

Nunca criar funcionalidades fora do escopo do PRD.

---

# Stack Obrigatória

Frontend

- Next.js App Router
- React
- TypeScript
- TailwindCSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Zod
- Zustand

Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ

Infraestrutura

- Docker
- Docker Compose

Armazenamento

- Azure Blob Storage

IA

Arquitetura baseada em Providers.

Nunca acoplar a aplicação diretamente ao OpenAI.

Sempre utilizar Adapter Pattern.

---

# Arquitetura

Arquitetura obrigatória:

Feature Based + Modular Monolith.

Nunca utilizar arquitetura baseada apenas em pastas técnicas.

Estrutura esperada.

apps/

packages/

apps/backend/

apps/frontend/

shared/

docs/

---

Backend

Cada módulo deverá conter.

Controller

Service

Repository

DTO

Entity

Mapper

Validator

Tests

Nunca colocar regra de negócio em Controllers.

---

Frontend

Cada Feature deverá conter.

components/

hooks/

services/

types/

schemas/

utils/

constants/

pages/

Nunca criar componentes gigantes.

---

# Convenções

Idioma

Todo código em inglês.

Toda interface em português.

---

Variáveis

camelCase

---

Componentes React

PascalCase

---

Banco

snake_case

---

Tabelas

Plural.

users

forms

evaluations

feedbacks

---

Endpoints

Sempre REST.

Exemplo.

GET /users

POST /users

PATCH /users/{id}

Nunca utilizar verbos na URL.

---

# Regras Gerais

Sempre utilizar:

TypeScript Strict

Nunca utilizar:

any

Nunca utilizar:

console.log()

Utilizar Logger.

Nunca ignorar erros.

Sempre tratar Exceptions.

---

# Componentização

Toda interface deverá utilizar componentes reutilizáveis.

Exemplos.

Button

Input

Card

Badge

Drawer

Modal

Dialog

Table

Pagination

Chart

MetricCard

StatusBadge

Nenhuma tela deverá criar componentes exclusivos sem necessidade.

---

# Formulários

Sempre utilizar.

React Hook Form

-

Zod

Nunca utilizar useState para formulários complexos.

---

# Estado

Servidor

TanStack Query

Cliente

Zustand

Evitar Context API.

---

# Banco

Utilizar apenas Prisma.

Nunca escrever SQL diretamente sem necessidade.

Toda alteração estrutural deverá utilizar Migration.

---

# Auditoria

Toda operação crítica deverá gerar auditoria.

Criar

Editar

Excluir

Publicar

Contestar

Aplicar Feedback

Alterar Configuração

Nunca esquecer auditoria.

---

# Permissões

Toda tela deverá validar:

Autenticação

↓

Perfil

↓

Permissão

↓

Escopo

Nunca confiar apenas no Frontend.

---

# Segurança

Obrigatório.

JWT

HTTPS

Helmet

Rate Limit

Sanitização

Validação

Nunca armazenar senha.

Nunca expor Token.

Nunca retornar StackTrace.

---

# Inteligência Artificial

Toda IA deverá possuir.

Modelo

Versão

Prompt

Justificativa

Evidência

Score

Tempo

Nunca retornar apenas nota.

---

# Dashboard

Todo indicador deverá possuir.

Filtros

Exportação

Drill Down

Permissão

Atualização

---

# APIs

Toda API deverá possuir.

Swagger

DTO

Validação

Permissão

Versionamento

Auditoria

---

# Tratamento de Erros

Sempre retornar.

HTTP correto.

Payload padrão.

Contrato oficial.

`docs/architecture/API_CONTRACT.md`

Exemplo.

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Recurso não encontrado.",
    "details": []
  },
  "meta": {
    "correlationId": "01JABCDEF1234567890"
  }
}
```

Nunca retornar erros internos.

---

# Performance

Sempre utilizar.

Paginação

Lazy Loading

Code Splitting

Memoização

Cache Redis

---

# Logs

Registrar.

INFO

WARN

ERROR

Nunca registrar.

Senha

Token

CPF completo

Dados sensíveis

---

# Testes

Toda Feature deverá possuir.

Testes Unitários.

Testes Integração.

Nunca entregar código sem testes.

---

# Responsividade

Toda tela deverá funcionar.

Desktop

Notebook

Tablet

Nunca utilizar largura fixa.

---

# Acessibilidade

Utilizar.

ARIA

Labels

Contraste

Keyboard Navigation

---

# Código

Priorizar.

SOLID

Clean Code

Clean Architecture

DRY

KISS

YAGNI

---

# Antes de Criar Código

Sempre verificar.

Existe componente semelhante?

Existe Service semelhante?

Existe Hook semelhante?

Existe DTO semelhante?

Existe Repository semelhante?

Nunca duplicar código.

---

# Antes de Criar Nova Feature

Consultar.

PRD

↓

Regras de Negócio

↓

Modelo de Dados

↓

Permissões

↓

Integrações

↓

Auditoria

↓

Dashboard

Se algum item estiver ausente, implementar.

---

# Antes de Finalizar

Executar.

Lint

↓

Testes

↓

Build

↓

Type Check

↓

Migrações

↓

Documentação

Somente então considerar concluído.

---

# Definition of Done

Uma funcionalidade somente estará pronta quando:

✓ Implementada

✓ Testada

✓ Documentada

✓ Auditada

✓ Responsiva

✓ Acessível

✓ Segura

✓ Integrada

✓ Homologável

---

# O que nunca fazer

Nunca criar código duplicado.

Nunca ignorar erros.

Nunca quebrar arquitetura.

Nunca misturar regra de negócio com interface.

Nunca acessar banco diretamente fora do Repository.

Nunca deixar TODOs no código.

Nunca utilizar any.

Nunca criar telas sem estados:

Loading

Error

Empty

Success

Nunca esquecer auditoria.

Nunca esquecer permissões.

Nunca esquecer testes.

---

# Filosofia do Projeto

Este projeto deverá ser desenvolvido como um software enterprise.

Sempre priorizar:

Qualidade acima de velocidade.

Legibilidade acima de complexidade.

Arquitetura acima de atalhos.

Escalabilidade acima de soluções temporárias.

Reutilização acima de duplicação.

Manutenibilidade acima de otimizações prematuras.

Sempre que houver mais de uma solução possível, escolher aquela que seja mais simples, mais testável, mais desacoplada e mais fácil de evoluir.
