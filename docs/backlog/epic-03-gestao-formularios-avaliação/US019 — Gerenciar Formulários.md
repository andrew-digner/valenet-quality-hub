# US019 — Gerenciar Formulários de Avaliação

**Epic:** EPIC-03 — Gestão de Formulários de Avaliação

**ID:** US019

**Prioridade:** P0 (Crítica)

**Story Points:** 21

**Sprint:** Sprint 05

**Status:** Backlog

---

# História

Como administrador de qualidade,

Quero criar e administrar formulários de avaliação,

Para padronizar as monitorias realizadas pela operação.

---

# Objetivo

Implementar o módulo completo de Gestão de Formulários, permitindo criar, editar, duplicar, arquivar e administrar formulários de avaliação.

O formulário será a entidade principal utilizada em monitorias humanas e avaliações realizadas por Inteligência Artificial.

---

# Valor de Negócio

Os formulários representam o padrão oficial de qualidade da empresa.

Toda monitoria dependerá de um formulário publicado.

---

# Escopo

## Cadastro

Permitir criar formulários contendo:

- Nome
- Código
- Descrição
- Objetivo
- Operação
- Canal
- Categoria
- Status
- Versão
- Responsável

---

## Consulta

Pesquisar por:

- Nome
- Código
- Canal
- Operação
- Categoria
- Status
- Versão

---

## Visualização

Exibir:

- Dados gerais
- Quantidade de seções
- Quantidade de perguntas
- Peso total
- Versão
- Situação
- Data de publicação

---

## Atualização

Permitir editar formulários em rascunho.

Formulários publicados não poderão ser alterados.

---

## Duplicação

Permitir criar uma cópia completa do formulário.

A nova cópia deverá iniciar como rascunho.

---

## Arquivamento

Permitir arquivar formulários.

Formulários arquivados não poderão ser utilizados em novas monitorias.

---

## Estados

Cada formulário deverá possuir um estado.

```text
Rascunho

↓

Em Revisão

↓

Publicado

↓

Arquivado
```

---

## Metadados

Registrar:

- Criador
- Data de criação
- Última alteração
- Publicador
- Data de publicação

---

# Fluxo Principal

```text
Administrador

↓

Criar Formulário

↓

Preencher Dados

↓

Adicionar Seções

↓

Adicionar Perguntas

↓

Salvar

↓

Rascunho
```

---

# Fluxo de Duplicação

```text
Selecionar Formulário

↓

Duplicar

↓

Nova Versão em Rascunho

↓

Editar

↓

Publicar
```

---

# Regras de Negócio

RN001

Todo formulário deverá possuir nome único dentro da operação.

---

RN002

Todo formulário iniciará em Rascunho.

---

RN003

Formulários publicados não poderão ser editados.

---

RN004

A alteração de um formulário publicado deverá gerar uma nova versão.

---

RN005

Formulários arquivados não poderão ser utilizados em novas avaliações.

---

RN006

Todo formulário deverá possuir pelo menos uma seção antes da publicação.

---

RN007

Toda alteração deverá ser auditada.

---

RN008

Duplicações deverão copiar toda a estrutura do formulário.

---

# Critérios de Aceite

- [ ] Criar formulário.
- [ ] Editar formulário em rascunho.
- [ ] Duplicar formulário.
- [ ] Arquivar formulário.
- [ ] Consultar formulários.
- [ ] Pesquisar formulários.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Nome duplicado.
- Formulário inexistente.
- Tentativa de editar formulário publicado.
- Operação inexistente.
- Canal inválido.

---

# APIs

```http
GET    /forms

GET    /forms/{id}

POST   /forms

PUT    /forms/{id}

POST   /forms/{id}/copies

PATCH  /forms/{id}/archive
```

---

# Banco de Dados

Tabelas.

- forms
- form_versions
- audit_logs

---

# Telas

- Lista de Formulários
- Cadastro
- Edição
- Detalhes
- Histórico de Versões

---

# Auditoria

Registrar:

- Criação.
- Alteração.
- Duplicação.
- Arquivamento.
- Publicação.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- CRUD implementado.
- Versionamento preparado.
- Auditoria implementada.
- APIs documentadas.
- Interface concluída.
- Testes implementados.

---

# Dependências

US024 — Versionar Formulários

---

# Observações

Esta User Story implementa apenas o gerenciamento do formulário.

Seções, perguntas, opções de resposta e regras de avaliação serão implementadas nas próximas User Stories.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD de formulários.
- DTOs.
- Controllers.
- Services.
- Repository.
- Validações.
- Auditoria.
- Testes.

## Não Implementar

- Seções.
- Perguntas.
- Opções de resposta.
- Regras de cálculo.

Esses recursos pertencem às User Stories seguintes.

## Critérios

- Exclusão lógica.
- APIs REST.
- Arquitetura modular.
- Versionamento preparado.
- Código reutilizável.

---

# Arquitetura Aplicada

**Modelo:** Aggregate Root

**Entidade Principal:** Form

**Relacionamentos:**

Form → Versions

Form → Sections

Form → Audit Logs

**Persistência:** Prisma ORM

**Princípio:** O formulário é a entidade raiz do domínio de avaliações e toda sua evolução deverá ocorrer por meio de versionamento controlado, preservando o histórico e garantindo rastreabilidade completa.
