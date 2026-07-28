# US027 — Criar Monitoria

**Epic:** EPIC-04 — Execução de Monitorias

**ID:** US027

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 07

**Status:** Backlog

---

# História

Como monitor de qualidade,

Quero criar uma nova monitoria,

Para avaliar um atendimento utilizando um formulário publicado e vigente.

---

# Objetivo

Permitir a criação de uma nova monitoria a partir de um formulário publicado, registrando todas as informações necessárias para identificação da avaliação e preparando o ambiente para execução das respostas.

Ao criar uma monitoria, o sistema deverá gerar um snapshot da versão do formulário utilizada, garantindo que futuras alterações não afetem a avaliação em andamento.

---

# Valor de Negócio

Esta funcionalidade inicia oficialmente o processo de avaliação da qualidade.

Toda monitoria deverá estar vinculada a um formulário, uma versão específica e um atendimento.

---

# Escopo

## Criar Monitoria

Permitir informar:

- Formulário
- Versão
- Operação
- Canal
- Colaborador Avaliado
- Monitor Responsável
- Supervisor
- Data do Atendimento
- Data da Avaliação
- Identificador do Atendimento
- Origem do Atendimento

---

## Dados do Atendimento

Registrar:

- Protocolo
- Número da ligação (quando aplicável)
- Cliente
- Duração
- Canal
- Campanha
- Equipe
- Área

---

## Seleção do Formulário

Permitir utilizar apenas:

- Formulários publicados
- Dentro da vigência
- Compatíveis com a operação

---

## Snapshot

Ao criar a monitoria copiar:

- Estrutura do formulário
- Seções
- Perguntas
- Opções
- Regras
- Pesos

O snapshot deverá permanecer imutável.

---

## Estados

A monitoria poderá assumir os estados:

```text
Rascunho

↓

Em Andamento

↓

Concluída

↓

Cancelada
```

---

## Salvamento Automático

Salvar automaticamente alterações durante o preenchimento.

---

## Identificação

Gerar código único para cada monitoria.

Exemplo:

```text
MON-2026-000001
```

---

# Fluxo Principal

```text
Monitor

↓

Nova Monitoria

↓

Selecionar Formulário

↓

Selecionar Colaborador

↓

Registrar Atendimento

↓

Criar Monitoria

↓

Rascunho
```

---

# Regras de Negócio

RN001

Toda monitoria deverá utilizar um formulário publicado.

---

RN002

A versão do formulário deverá ser congelada no momento da criação.

---

RN003

Cada monitoria possuirá identificador único.

---

RN004

Apenas usuários autorizados poderão criar monitorias.

---

RN005

A monitoria iniciará em estado Rascunho.

---

RN006

Toda criação deverá ser auditada.

---

RN007

Não será permitido utilizar formulários arquivados ou fora da vigência.

---

RN008

A operação do formulário deverá ser compatível com a operação do atendimento.

---

# Critérios de Aceite

- [ ] Criar monitoria.
- [ ] Selecionar formulário vigente.
- [ ] Gerar snapshot da versão.
- [ ] Gerar identificador único.
- [ ] Salvar em rascunho.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Formulário inexistente.
- Formulário arquivado.
- Versão inválida.
- Atendimento inexistente.
- Colaborador inexistente.
- Usuário sem permissão.

---

# APIs

```http
GET    /evaluations/forms

POST   /evaluations

GET    /evaluations/{id}

PATCH  /evaluations/{id}/draft
```

---

# Banco de Dados

Tabelas:

- evaluations
- evaluation_sessions
- evaluation_snapshot
- users
- form_versions
- audit_logs

---

# Telas

- Nova Monitoria
- Seleção de Formulário
- Dados do Atendimento
- Rascunhos

---

# Auditoria

Registrar:

- Criação.
- Alteração.
- Salvamento automático.
- Cancelamento.
- Usuário responsável.
- Data/Hora.
- IP.

---

# Definition of Done

- Criação implementada.
- Snapshot funcionando.
- APIs documentadas.
- Interface concluída.
- Auditoria implementada.
- Testes automatizados.

---

# Dependências

- US025 — Publicar Formulários

---

# Observações

A criação da monitoria não realiza o preenchimento das respostas.

O preenchimento será tratado na User Story US028.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD inicial da monitoria.
- Snapshot da versão do formulário.
- Identificador único.
- Salvamento em rascunho.
- Auditoria.
- Testes.

## Não Implementar

- Respostas.
- Evidências.
- Cálculo da nota.
- Finalização.

## Critérios

- Snapshot imutável.
- APIs REST.
- Código desacoplado.
- Compatível com futuras integrações.

---

# Arquitetura Aplicada

**Aggregate Root:** Evaluation

**Relacionamentos:**

Evaluation

↓

EvaluationSession

↓

EvaluationSnapshot

**Persistência:** Prisma ORM

**Princípio:** Toda monitoria deverá preservar um snapshot completo da versão do formulário utilizada, garantindo consistência histórica, rastreabilidade e independência em relação às futuras alterações do formulário.
