# ADR-002 — Adoção de Next.js + NestJS como Stack Principal

**Status:** Aprovado

**Data:** 27/07/2026

**Responsável:** Product Owner / Arquitetura

---

# Contexto

O Valenet Quality Hub será uma aplicação web moderna, utilizada diariamente por monitores, líderes, administradores e atendentes.

A plataforma deverá oferecer:

- Interface altamente responsiva.
- Dashboards com grande volume de dados.
- Formulários complexos.
- Atualizações frequentes.
- APIs robustas.
- Integração com IA.
- Arquitetura preparada para crescimento.

Era necessário definir uma stack única para Frontend e Backend.

---

# Problema

Foram avaliadas diversas combinações:

- React + Express
- Angular + Spring Boot
- Vue + Laravel
- Blazor
- Next.js + NestJS

A solução escolhida precisava:

- utilizar TypeScript ponta a ponta;
- possuir grande comunidade;
- facilitar desenvolvimento assistido por IA;
- possuir excelente documentação;
- permitir arquitetura modular;
- facilitar testes;
- possuir alto desempenho.

---

# Decisão

A stack oficial será:

## Frontend

- Next.js (App Router)
- React
- TypeScript

## Backend

- NestJS
- TypeScript

---

# Motivos da Escolha

## TypeScript End-to-End

A mesma linguagem será utilizada em todo o projeto.

Benefícios:

- compartilhamento de tipos;
- menor curva de aprendizado;
- menor quantidade de erros;
- melhor produtividade.

---

## Next.js

Escolhido por oferecer:

- App Router
- Server Components
- Client Components
- Performance
- Lazy Loading
- Excelente integração com React
- Estrutura moderna
- Grande comunidade

---

## NestJS

Escolhido por oferecer:

- Arquitetura modular
- Dependency Injection
- Decorators
- Excelente organização
- Swagger nativo
- Integração simples com Prisma
- Facilidade para testes
- Excelente suporte a autenticação

---

# Benefícios

A combinação Next.js + NestJS oferece:

- alta produtividade;
- excelente organização;
- grande compatibilidade com ferramentas de IA;
- facilidade de manutenção;
- alta escalabilidade;
- código padronizado.

---

# Consequências

Todo código deverá ser escrito em TypeScript.

Não será permitido:

- JavaScript puro;
- Express sem NestJS;
- outro framework frontend sem aprovação arquitetural.

---

# Estrutura Esperada

```text
apps/

apps/frontend/

apps/backend/

packages/

shared/

docs/
```

---

# Frontend

Obrigatório utilizar:

- App Router
- React Server Components quando possível
- Client Components apenas quando necessário
- TanStack Query
- React Hook Form
- Zod
- Zustand

---

# Backend

Obrigatório utilizar:

- Controllers
- Services
- Repositories
- DTOs
- Guards
- Pipes
- Interceptors
- Filters

---

# Alternativas Avaliadas

## React + Express

### Vantagens

- Simples

### Desvantagens

- Pouca padronização
- Arquitetura livre
- Alto risco de inconsistência

Resultado:

Rejeitado.

---

## Angular + Spring

### Vantagens

- Muito robusto

### Desvantagens

- Curva de aprendizado maior
- Menor produtividade
- Stack heterogênea

Resultado:

Rejeitado.

---

## Vue + Laravel

Resultado:

Rejeitado.

---

## Blazor

Resultado:

Rejeitado.

---

# Impacto

Todas as futuras implementações deverão respeitar esta stack.

Mudanças tecnológicas somente poderão ocorrer mediante nova ADR.

---

# Referências

- Next.js Documentation
- NestJS Documentation
- React Documentation
- TypeScript Handbook
- Microsoft Architecture Center
