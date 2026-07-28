# US020 — Gerenciar Seções dos Formulários

**Epic:** EPIC-03 — Gestão de Formulários de Avaliação

**ID:** US020

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 05

**Status:** Backlog

---

# História

Como administrador de qualidade,

Quero criar e organizar seções dentro dos formulários,

Para estruturar a avaliação de forma lógica, organizada e reutilizável.

---

# Objetivo

Implementar o gerenciamento de seções dos formulários de avaliação, permitindo criar, editar, reordenar, duplicar e remover seções pertencentes a uma versão específica do formulário.

Cada seção será responsável por agrupar perguntas relacionadas ao mesmo contexto de avaliação.

---

# Valor de Negócio

As seções organizam o formulário em blocos funcionais, melhorando a experiência do avaliador e permitindo regras específicas por etapa da avaliação.

---

# Escopo

## Cadastro

Permitir criar seções contendo:

- Nome
- Código
- Descrição
- Ordem
- Peso (opcional)
- Obrigatória (Sim/Não)
- Visível (Sim/Não)

---

## Consulta

Exibir:

- Nome
- Ordem
- Quantidade de perguntas
- Peso acumulado
- Status

---

## Atualização

Permitir editar:

- Nome
- Descrição
- Ordem
- Peso
- Obrigatoriedade

Enquanto o formulário estiver em rascunho.

---

## Reordenação

Permitir alterar a sequência das seções através de Drag & Drop.

A nova ordem deverá ser persistida automaticamente.

---

## Duplicação

Permitir duplicar uma seção juntamente com todas as perguntas existentes.

---

## Exclusão

Permitir remover apenas seções que ainda não possuam monitorias vinculadas.

---

## Estrutura

Cada seção poderá conter:

- Perguntas
- Subtítulo
- Texto de apoio
- Observações

---

# Fluxo Principal

```text
Administrador

↓

Selecionar Formulário

↓

Adicionar Seção

↓

Informar Dados

↓

Salvar

↓

Adicionar Perguntas
```

---

# Fluxo de Reordenação

```text
Administrador

↓

Arrastar Seção

↓

Nova Ordem

↓

Salvar Automaticamente
```

---

# Regras de Negócio

RN001

Toda seção pertence obrigatoriamente a uma versão de formulário.

---

RN002

Toda seção deverá possuir uma ordem única dentro da versão.

---

RN003

Formulários publicados não poderão ter suas seções alteradas.

---

RN004

Toda seção deverá possuir pelo menos uma pergunta antes da publicação do formulário.

---

RN005

A exclusão física não será permitida após a publicação da versão.

---

RN006

Duplicações deverão copiar todas as perguntas da seção.

---

RN007

Alterações deverão ser auditadas.

---

RN008

A soma dos pesos das seções poderá ser utilizada no cálculo geral da avaliação, quando configurado.

---

# Critérios de Aceite

- [ ] Criar seção.
- [ ] Editar seção.
- [ ] Reordenar seções.
- [ ] Duplicar seção.
- [ ] Excluir seção em rascunho.
- [ ] Consultar estrutura.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Ordem duplicada.
- Formulário inexistente.
- Formulário publicado.
- Seção inexistente.

---

# APIs

```http
GET    /forms/{formId}/sections

POST   /forms/{formId}/sections

PUT    /sections/{id}

DELETE /sections/{id}

PATCH  /sections/reorder

POST   /sections/{id}/copies
```

---

# Banco de Dados

Tabelas envolvidas:

- form_sections
- form_versions
- audit_logs

---

# Telas

- Lista de Seções
- Editor de Estrutura
- Reordenação (Drag & Drop)
- Detalhes da Seção

---

# Auditoria

Registrar:

- Criação
- Alteração
- Exclusão lógica
- Duplicação
- Reordenação

---

# Definition of Done

- CRUD implementado.
- Reordenação funcionando.
- Duplicação implementada.
- APIs documentadas.
- Interface concluída.
- Testes implementados.

---

# Dependências

- US019 — Gerenciar Formulários

---

# Observações

As perguntas pertencem às seções e não diretamente ao formulário.

A publicação do formulário exige que todas as seções obrigatórias estejam completas.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD de seções.
- Reordenação.
- Duplicação.
- Auditoria.
- Testes.

## Não Implementar

- Perguntas.
- Opções de resposta.
- Regras de cálculo.

## Critérios

- Persistir ordem das seções.
- Compatível com Drag & Drop.
- Versionamento respeitado.
- Código modular.

---

# Arquitetura Aplicada

**Aggregate:** FormVersion

**Relacionamentos:**

FormVersion → Sections (1:N)

Section → Questions (1:N)

**Persistência:** Prisma ORM

**Princípio:** As seções representam blocos funcionais da avaliação e pertencem exclusivamente a uma versão específica do formulário, garantindo consistência e preservação histórica.
