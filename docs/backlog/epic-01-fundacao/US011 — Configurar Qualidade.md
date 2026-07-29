# US011 — Configurar Qualidade de Código

**Epic:** EPIC-01 — Fundação da Plataforma  
**ID:** US011  
**Prioridade:** P1 (Alta)  
**Story Points:** 5  
**Sprint:** Sprint 02  
**Status:** Done

---

# História

**Como** equipe de desenvolvimento,

**Quero** padronizar a qualidade do código,

**Para que** toda a plataforma mantenha consistência, legibilidade e facilidade de manutenção durante sua evolução.

---

# Objetivo

Implementar ferramentas e processos responsáveis por garantir padrões de desenvolvimento, organização do código, convenções de nomenclatura e validações automáticas.

Ao final desta User Story todo código submetido ao repositório deverá seguir os mesmos padrões.

---

# Valor de Negócio

Esta User Story garante:

- Código padronizado.
- Melhor legibilidade.
- Menor débito técnico.
- Facilidade para Code Review.
- Melhor produtividade da equipe.

---

# Escopo

## ESLint

Configurar regras para:

- TypeScript
- React
- NestJS
- Next.js
- Imports
- Boas práticas

---

## Prettier

Padronizar automaticamente:

- Espaçamento
- Aspas
- Quebra de linha
- Identação
- Organização de código

---

## Commitlint

Validar commits utilizando Conventional Commits.

Exemplo.

```text
feat(auth): implementar login

fix(forms): corrigir cálculo da nota

docs(prd): atualizar requisitos

refactor(api): reorganizar módulos
```

---

## Husky

Executar automaticamente:

- Lint
- Formatação
- Type Check
- Testes rápidos (quando aplicável)

Antes de permitir um commit.

---

## Lint Staged

Executar validações apenas nos arquivos alterados.

---

## Organização dos Imports

Padronizar ordem dos imports.

```text
Bibliotecas

↓

Pacotes Compartilhados

↓

Módulos

↓

Componentes

↓

Tipos

↓

Arquivos Locais
```

---

## Convenções

### Arquivos

```text
kebab-case
```

---

### Componentes React

```text
PascalCase
```

---

### Classes

```text
PascalCase
```

---

### Interfaces

```text
PascalCase
```

---

### Tipos

```text
PascalCase
```

---

### Variáveis

```text
camelCase
```

---

### Constantes

```text
UPPER_SNAKE_CASE
```

---

### Enums

```text
PascalCase

Valores

UPPER_SNAKE_CASE
```

---

## Documentação

Padronizar:

- README
- Comentários
- JSDoc (quando necessário)

Evitar comentários redundantes.

---

## Estrutura

Criar configurações compartilhadas em.

```text
packages/config/

eslint/

prettier/

typescript/

commitlint/
```

---

# Fora do Escopo

- Regras de negócio.
- Testes.
- Pipeline CI.
- Deploy.

---

# Critérios de Aceite

- [x] ESLint configurado.
- [x] Prettier configurado.
- [x] Husky funcionando.
- [x] Commitlint funcionando.
- [x] Lint Staged funcionando.
- [x] Imports organizados automaticamente.
- [x] Convenções documentadas.

---

# Dependências

- US001 — Estruturar o Monorepo

---

# Entregáveis

- Configuração compartilhada de qualidade.
- Hooks de Git.
- Padrões documentados.
- Convenções de nomenclatura.

---

# Requisitos Técnicos

- ESLint
- Prettier
- Husky
- lint-staged
- Commitlint

---

# Critérios Técnicos

O projeto deverá:

- impedir commits inválidos;
- formatar automaticamente o código;
- validar tipagem;
- seguir convenções definidas;
- compartilhar configurações entre aplicações.

---

# Riscos

- Regras muito restritivas.
- Tempo elevado de validação.
- Configurações conflitantes.

---

# Definition of Ready (DoR)

- Monorepo configurado.

---

# Definition of Done (DoD)

- Todas as ferramentas funcionando.
- Hooks ativos.
- Documentação criada.
- Equipe utilizando os padrões definidos.

---

# Arquivos Esperados

```text
packages/config/

eslint/

prettier/

typescript/

commitlint/

.editorconfig

.eslintrc

.prettierrc

commitlint.config.ts

lint-staged.config.js
```

---

# Observações

Toda contribuição para o projeto deverá seguir obrigatoriamente os padrões definidos nesta User Story.

Não serão aceitos Pull Requests que não atendam às regras de qualidade.

---

# Instruções para Implementação (Codex)

## Objetivo

Criar a camada de qualidade de código oficial do Valenet Quality Hub.

## Criar

- Configuração compartilhada de ESLint.
- Configuração compartilhada de Prettier.
- Husky.
- Commitlint.
- Lint Staged.
- Regras de importação.
- Convenções de nomenclatura.

## Não Implementar

- Regras de negócio.
- Testes.
- Deploy.

## Critérios

- Configuração centralizada.
- Fácil manutenção.
- Compartilhamento entre Frontend e Backend.
- Compatível com Turborepo.

---

# Arquitetura Aplicada

**Lint:** ESLint

**Formatação:** Prettier

**Commits:** Conventional Commits

**Git Hooks:** Husky

**Validação:** lint-staged

**Princípio:** Todo código adicionado ao projeto deverá seguir os mesmos padrões de qualidade, garantindo consistência, previsibilidade e facilidade de manutenção.
