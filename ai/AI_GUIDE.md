# AI_GUIDE.md

# Valenet Quality Hub

## Guia Oficial para Agentes de IA

Versão: 1.0

---

# Objetivo

Este documento define as regras que todos os agentes de Inteligência Artificial devem seguir durante o desenvolvimento do Valenet Quality Hub.

Estas regras complementam o PRD, os ADRs e a documentação de arquitetura.

Caso exista conflito, seguir integralmente a hierarquia definida em
`../docs/DOCUMENTATION_GOVERNANCE.md`. Este guia é complementar e não altera a
precedência oficial.

---

# Missão

O objetivo do agente não é apenas gerar código.

O objetivo é construir uma plataforma enterprise, preparada para evolução durante muitos anos.

Toda implementação deverá priorizar:

- simplicidade;
- qualidade;
- reutilização;
- testabilidade;
- legibilidade;
- desacoplamento.

---

# Antes de escrever código

Sempre responder internamente:

- Existe módulo semelhante?
- Existe componente semelhante?
- Existe Service semelhante?
- Existe Hook semelhante?
- Existe DTO semelhante?
- Existe Repository semelhante?

Se existir, reutilizar.

Nunca duplicar código.

---

# Antes de criar uma funcionalidade

Consultar obrigatoriamente:

- PRD
- Modelo de Dados
- ADRs
- Regras de Negócio
- Permissões
- Auditoria

Nenhuma implementação poderá ignorar esses documentos.

---

# Fluxo obrigatório

Sempre seguir a sequência:

Analisar requisito

↓

Consultar arquitetura

↓

Consultar modelo de dados

↓

Planejar implementação

↓

Criar código

↓

Criar testes

↓

Executar lint

↓

Executar build

↓

Atualizar documentação

---

# Filosofia

Sempre escolher a solução:

- mais simples;
- mais reutilizável;
- mais testável;
- mais desacoplada.

Nunca escolher a solução mais curta apenas por ser menor.

---

# Regras de Ouro

Nunca:

- duplicar código;
- criar componentes gigantes;
- misturar responsabilidades;
- ignorar tratamento de erro;
- ignorar permissões;
- ignorar auditoria;
- utilizar `any`;
- acessar banco diretamente fora dos Repositories.

Sempre:

- utilizar TypeScript Strict;
- criar código modular;
- utilizar Dependency Injection;
- escrever testes;
- documentar código complexo.

---

# Estrutura do Projeto

Frontend:

- Next.js
- React
- Tailwind
- shadcn/ui

Backend:

- NestJS
- Prisma
- PostgreSQL

Nunca alterar essa stack sem ADR.

---

# Desenvolvimento por Feature

Toda funcionalidade deverá seguir a estrutura:

Feature

↓

Interface

↓

API

↓

Service

↓

Repository

↓

Banco

↓

Testes

Nunca implementar parcialmente.

---

# Responsabilidade dos Módulos

Cada módulo deverá ser autocontido.

Não acessar Repository de outro módulo.

Utilizar apenas interfaces públicas.

---

# Inteligência Artificial

Toda funcionalidade relacionada à IA deverá:

- registrar modelo;
- registrar versão;
- registrar prompt;
- registrar score;
- registrar justificativa;
- registrar evidências.

Nunca retornar apenas uma nota.

---

# APIs

Toda API deverá possuir:

- DTO;
- validação;
- autorização;
- auditoria;
- documentação Swagger;
- testes.

---

# Banco de Dados

Toda alteração deverá ocorrer por Migration.

Nunca alterar banco manualmente.

Nunca excluir dados históricos.

---

# Frontend

Toda tela deverá possuir:

- Loading
- Empty State
- Error State
- Success State

Todas as páginas deverão ser responsivas.

---

# Segurança

Obrigatório:

- JWT
- HTTPS
- RBAC
- Auditoria
- Rate Limit

Nunca confiar apenas no Frontend.

---

# Testes

Toda funcionalidade deverá possuir:

- testes unitários;
- testes de integração;
- quando aplicável, testes E2E.

Cobertura mínima:

80%.

---

# Antes de concluir

Verificar:

- Regras de negócio
- Permissões
- Auditoria
- Testes
- Responsividade
- Build
- Lint
- Documentação

Somente então considerar concluído.

---

# Objetivo Final

Construir um software enterprise que seja:

- simples;
- consistente;
- escalável;
- seguro;
- preparado para IA;
- preparado para evolução contínua.

Sempre privilegiar qualidade em vez de velocidade.
