# PROMPTING_GUIDE.md

# Valenet Quality Hub

## Guia Oficial de Prompts para Desenvolvimento Assistido por IA

Versão: 1.0

---

# Objetivo

Este documento define o padrão oficial para interação entre desenvolvedores e agentes de Inteligência Artificial durante o desenvolvimento do Valenet Quality Hub.

Seu objetivo é garantir que todas as solicitações produzam código consistente, aderente à arquitetura e alinhado ao PRD.

Este guia deve ser utilizado para qualquer solicitação feita ao Codex, ChatGPT, Claude Code ou outro agente de desenvolvimento.

---

# Regras Gerais

Antes de solicitar qualquer implementação, o agente deverá consultar obrigatoriamente:

- PRD
- Architecture
- ADRs
- Decisions
- Database
- Business Rules
- Coding Standards
- Project Rules
- Naming Conventions

Nunca gerar código ignorando esses documentos.

---

# Estrutura Recomendada de um Prompt

Todo prompt deverá conter:

## Objetivo

O que precisa ser desenvolvido.

## Contexto

Onde a funcionalidade se encaixa.

## Regras de Negócio

Quais regras devem ser respeitadas.

## Critérios de Aceite

Quando a implementação será considerada concluída.

## Restrições Técnicas

Quais padrões arquiteturais devem ser seguidos.

---

# Template Geral

```text
Objetivo

Contexto

Regras de Negócio

Critérios de Aceite

Arquivos que poderão ser alterados

Arquivos que NÃO poderão ser alterados

Resultado esperado
```

---

# Prompt para Criar um Novo Módulo

```text
Crie um novo módulo chamado "<nome>".

Consulte obrigatoriamente:

- PRD
- MODULE_TEMPLATE.md
- PROJECT_RULES.md
- CODING_STANDARDS.md

O módulo deverá conter:

- Module
- Controller
- Service
- Repository
- DTOs
- Validators
- Mappers
- Interfaces
- Exceptions
- Events
- Testes
- Swagger

Não omita nenhuma etapa.

Não implemente regras de negócio que não estejam descritas no PRD.
```

---

# Prompt para Criar uma Nova Página

```text
Crie uma nova página seguindo PAGE_TEMPLATE.md.

A página deverá possuir:

- Loading
- Empty State
- Error State
- Success State

Utilize:

- React Hook Form
- Zod
- TanStack Query
- Tailwind
- shadcn/ui

Não implementar lógica de negócio na página.

Toda chamada HTTP deverá utilizar Services.
```

---

# Prompt para Criar uma API

```text
Implemente um endpoint REST seguindo API_TEMPLATE.md.

Obrigatório:

- DTO
- Swagger
- Autorização
- Auditoria
- Validação
- Testes

Utilizar apenas os padrões definidos no projeto.
```

---

# Prompt para Criar Migration

```text
Analise DATABASE.md.

Crie a migration necessária.

Não altere tabelas existentes sem necessidade.

Explique os impactos da alteração.

Atualize índices e constraints quando necessário.
```

---

# Prompt para Criar Testes

```text
Implemente todos os testes necessários.

Criar:

- Unitários
- Integração
- E2E (quando aplicável)

Cobertura mínima de 80%.

Utilizar TEST_TEMPLATE.md.
```

---

# Prompt para Corrigir um Bug

```text
Analise o problema descrito.

Identifique a causa raiz.

Não implemente soluções paliativas.

Explique:

- causa
- impacto
- solução

Atualize testes para evitar regressão.
```

---

# Prompt para Refatoração

```text
Refatore o código mantendo exatamente o mesmo comportamento funcional.

Objetivos:

- reduzir complexidade
- melhorar legibilidade
- eliminar duplicações
- aumentar testabilidade

Não alterar contratos públicos.
```

---

# Prompt para Revisão de Código

```text
Revise o código utilizando PR_REVIEW.md.

Verifique:

- arquitetura
- regras de negócio
- segurança
- performance
- testes
- documentação

Liste todas as melhorias encontradas em ordem de prioridade.

Não gere código, apenas a revisão.
```

---

# Prompt para Implementar uma User Story

```text
Implemente integralmente a User Story do backlog oficial em `docs/backlog/`.

Antes de iniciar:

- identifique os módulos envolvidos;
- valide permissões;
- valide regras de negócio;
- identifique impactos no banco.

Ao finalizar, informe:

- arquivos criados;
- arquivos alterados;
- migrations;
- APIs;
- testes;
- documentação atualizada.
```

---

# Prompt para Nova Funcionalidade

```text
Analise o requisito antes de escrever código.

Explique:

- impacto arquitetural;
- módulos envolvidos;
- entidades afetadas;
- APIs necessárias;
- alterações no banco;
- riscos.

Após a análise, implemente a funcionalidade seguindo todos os padrões oficiais do projeto.
```

---

# Prompt para Melhorias

```text
Analise o código existente.

Proponha melhorias relacionadas a:

- performance;
- segurança;
- arquitetura;
- legibilidade;
- reutilização.

Priorize mudanças de alto impacto e baixo risco.
```

---

# Prompt para Documentação

```text
Atualize toda a documentação relacionada à funcionalidade implementada.

Verifique:

- PRD
- Swagger
- DATABASE.md
- Architecture
- Changelog

Nenhuma documentação deverá ficar inconsistente.
```

---

# Prompt para Pull Request

```text
Antes de finalizar:

Execute mentalmente o IMPLEMENTATION_CHECKLIST.md.

Depois execute o PR_REVIEW.md.

Somente considere a tarefa concluída se todos os critérios forem atendidos.

Apresente um resumo contendo:

- Objetivo
- Arquivos alterados
- APIs criadas
- Migrations
- Testes
- Impactos
- Pendências (se houver)
```

---

# Prompt Mestre (Recomendado)

Este é o prompt padrão para qualquer solicitação ao agente.

```text
Antes de implementar qualquer alteração:

1. Consulte toda a documentação relevante do projeto.
2. Explique seu plano de implementação.
3. Identifique impactos técnicos.
4. Não assuma regras de negócio não documentadas.
5. Siga rigorosamente os padrões definidos.
6. Gere código limpo, modular e testável.
7. Crie ou atualize testes.
8. Atualize a documentação afetada.
9. Informe exatamente quais arquivos foram criados ou modificados.
10. Ao finalizar, valide a implementação utilizando IMPLEMENTATION_CHECKLIST.md.
```

---

# Regras de Ouro

O agente nunca deverá:

- inventar regras de negócio;
- alterar arquitetura sem ADR;
- criar código duplicado;
- utilizar bibliotecas não aprovadas;
- ignorar testes;
- ignorar auditoria;
- ignorar permissões.

Sempre que houver dúvida, interromper a implementação e solicitar esclarecimentos ao Product Owner.

---

# Filosofia

A Inteligência Artificial é uma aceleradora de desenvolvimento, não uma substituta do processo de engenharia.

Toda implementação deve preservar a qualidade, consistência e evolutividade do Valenet Quality Hub.

A prioridade é entregar software confiável, sustentável e alinhado às decisões arquiteturais do projeto.
