# US021 — Gerenciar Perguntas

**Epic:** EPIC-03 — Gestão de Formulários de Avaliação

**ID:** US021

**Prioridade:** P0 (Crítica)

**Story Points:** 21

**Sprint:** Sprint 05

**Status:** Backlog

---

# História

Como administrador de qualidade,

Quero criar e administrar perguntas dos formulários,

Para definir exatamente quais critérios serão avaliados durante uma monitoria.

---

# Objetivo

Implementar o módulo responsável pelo gerenciamento das perguntas pertencentes às seções dos formulários.

As perguntas representam a menor unidade de avaliação e poderão possuir diferentes tipos, pesos, regras e comportamentos.

---

# Valor de Negócio

As perguntas representam os critérios oficiais utilizados para medir a qualidade dos atendimentos.

Toda nota da monitoria será calculada a partir delas.

---

# Escopo

## Cadastro

Permitir criar perguntas contendo:

- Código
- Título
- Descrição
- Texto de apoio
- Tipo
- Ordem
- Peso
- Obrigatória
- Ativa

---

## Tipos de Pergunta

Suportar:

- Sim / Não
- Múltipla Escolha
- Única Escolha
- Escala (1–5)
- Escala (1–10)
- Nota
- Texto Livre
- Numérico
- Percentual
- Data
- Hora

Preparar estrutura para novos tipos.

---

## Consulta

Exibir:

- Pergunta
- Tipo
- Peso
- Ordem
- Seção
- Obrigatória
- Status

---

## Atualização

Permitir alterar perguntas apenas em formulários em rascunho.

---

## Reordenação

Permitir reorganizar perguntas utilizando Drag & Drop.

---

## Duplicação

Duplicar pergunta juntamente com:

- opções;
- regras;
- pesos;
- configurações.

---

## Exclusão

Permitir exclusão apenas antes da publicação da versão.

---

## Configurações

Cada pergunta poderá definir:

- Obrigatória
- Peso
- Observação obrigatória
- Evidência obrigatória
- Permitir N/A
- Exibir dica
- Exibir ajuda

---

## Dependências

Preparar estrutura para:

- Perguntas condicionais
- Dependências entre perguntas
- Fluxo dinâmico

---

# Fluxo Principal

```text
Administrador

↓

Selecionar Seção

↓

Nova Pergunta

↓

Selecionar Tipo

↓

Configurar

↓

Salvar
```

---

# Regras de Negócio

RN001

Toda pergunta pertence obrigatoriamente a uma seção.

---

RN002

Toda pergunta possui apenas um tipo.

---

RN003

Toda pergunta deverá possuir ordem única dentro da seção.

---

RN004

Perguntas publicadas não poderão ser alteradas.

---

RN005

Alterações deverão gerar nova versão do formulário.

---

RN006

Peso deverá ser maior que zero.

---

RN007

Perguntas obrigatórias deverão ser respondidas durante a monitoria.

---

RN008

Perguntas poderão exigir justificativa.

---

RN009

Perguntas poderão exigir upload de evidências.

---

RN010

Toda alteração deverá ser auditada.

---

# Critérios de Aceite

- [ ] Criar pergunta.
- [ ] Editar pergunta.
- [ ] Duplicar pergunta.
- [ ] Reordenar perguntas.
- [ ] Excluir pergunta.
- [ ] Configurar peso.
- [ ] Configurar obrigatoriedade.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Ordem duplicada.
- Seção inexistente.
- Tipo inválido.
- Peso inválido.
- Formulário publicado.

---

# APIs

```http
GET    /sections/{sectionId}/questions

POST   /sections/{sectionId}/questions

PUT    /questions/{id}

DELETE /questions/{id}

PATCH  /questions/reorder

POST   /questions/{id}/copies
```

---

# Banco de Dados

Tabelas.

- form_questions
- form_sections
- form_versions
- audit_logs

---

# Telas

- Lista de Perguntas
- Editor Visual
- Configuração
- Reordenação
- Duplicação

---

# Auditoria

Registrar.

- Criação
- Alteração
- Exclusão lógica
- Reordenação
- Alteração de peso
- Alteração do tipo

---

# Definition of Done

- CRUD implementado.
- Reordenação funcionando.
- Duplicação funcionando.
- APIs documentadas.
- Interface concluída.
- Testes implementados.

---

# Dependências

US020 — Gerenciar Seções

---

# Observações

As respostas possíveis serão tratadas na User Story US022.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD completo.
- Drag & Drop.
- Configuração por tipo.
- Auditoria.
- Testes.

## Não Implementar

- Opções de resposta.
- Regras de cálculo.
- Publicação.

## Critérios

- Versionamento obrigatório.
- Código modular.
- APIs REST.
- Baixo acoplamento.

---

# Arquitetura Aplicada

**Aggregate:** FormVersion

**Relacionamentos:**

FormVersion → Sections → Questions

Question → Options

Question → Rules

**Persistência:** Prisma ORM

**Princípio:** Toda pergunta pertence a uma seção específica de uma versão do formulário e deve preservar seu histórico, comportamento e configuração ao longo do ciclo de vida da avaliação.
