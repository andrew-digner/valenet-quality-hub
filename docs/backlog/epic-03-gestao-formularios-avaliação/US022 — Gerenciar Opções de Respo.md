# US022 — Gerenciar Opções de Resposta

**Epic:** EPIC-03 — Gestão de Formulários de Avaliação

**ID:** US022

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 05

**Status:** Backlog

---

# História

Como administrador de qualidade,

Quero configurar as opções de resposta das perguntas,

Para definir todas as respostas válidas e como elas impactam a avaliação.

---

# Objetivo

Implementar o gerenciamento das opções de resposta das perguntas dos formulários, permitindo configurar pontuação, pesos, regras e comportamentos específicos para cada alternativa.

As opções de resposta serão utilizadas durante a execução das monitorias e no cálculo da nota final.

---

# Valor de Negócio

As opções de resposta determinam como cada pergunta será respondida e como a resposta influenciará o resultado da avaliação.

---

# Escopo

## Cadastro

Permitir criar opções contendo:

- Texto da resposta
- Código
- Valor
- Ordem
- Pontuação
- Peso (opcional)
- Cor de exibição (opcional)
- Status

---

## Tipos Compatíveis

As opções deverão funcionar para perguntas dos tipos:

- Sim / Não
- Única Escolha
- Múltipla Escolha
- Escala
- Nota

Perguntas abertas não utilizarão opções.

---

## Configuração

Cada opção poderá definir:

- Pontuação
- Peso
- Critério eliminatório
- Exigir justificativa
- Exigir evidência
- Exibir comentário
- Permitir seleção

---

## Consulta

Exibir:

- Texto
- Ordem
- Pontuação
- Peso
- Status

---

## Atualização

Permitir edição apenas enquanto o formulário estiver em rascunho.

---

## Reordenação

Permitir reorganizar opções utilizando Drag & Drop.

---

## Duplicação

Duplicar todas as opções de uma pergunta durante a duplicação da pergunta.

---

## Exclusão

Permitir exclusão apenas antes da publicação da versão.

---

# Fluxo Principal

```text
Administrador

↓

Selecionar Pergunta

↓

Adicionar Opção

↓

Configurar Pontuação

↓

Salvar
```

---

# Regras de Negócio

RN001

Toda opção pertence obrigatoriamente a uma pergunta.

---

RN002

A ordem deverá ser única dentro da pergunta.

---

RN003

Perguntas do tipo Texto não poderão possuir opções.

---

RN004

A soma da pontuação deverá respeitar as regras definidas para a pergunta.

---

RN005

Opções eliminatórias deverão ser destacadas.

---

RN006

Formulários publicados não poderão ter opções alteradas.

---

RN007

Alterações deverão ser auditadas.

---

RN008

A alteração das opções deverá criar uma nova versão do formulário quando publicada.

---

# Critérios de Aceite

- [ ] Criar opção.
- [ ] Editar opção.
- [ ] Excluir opção.
- [ ] Reordenar opções.
- [ ] Configurar pontuação.
- [ ] Configurar critério eliminatório.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Pergunta inexistente.
- Ordem duplicada.
- Tipo incompatível.
- Formulário publicado.
- Pontuação inválida.

---

# APIs

```http
GET    /questions/{questionId}/options

POST   /questions/{questionId}/options

PUT    /options/{id}

DELETE /options/{id}

PATCH  /options/reorder
```

---

# Banco de Dados

Tabelas.

- question_options
- form_questions
- form_versions
- audit_logs

---

# Telas

- Lista de Opções
- Editor de Opções
- Configuração de Pontuação

---

# Auditoria

Registrar:

- Criação
- Alteração
- Exclusão lógica
- Reordenação
- Alteração de pontuação
- Alteração de regras

---

# Definition of Done

- CRUD implementado.
- Reordenação funcionando.
- APIs documentadas.
- Interface concluída.
- Testes implementados.
- Auditoria implementada.

---

# Dependências

- US021 — Gerenciar Perguntas

---

# Observações

As regras de cálculo da nota serão implementadas na US023.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD de opções.
- Configuração de pontuação.
- Configuração de critérios eliminatórios.
- Reordenação.
- Auditoria.
- Testes.

## Não Implementar

- Cálculo da nota final.
- Publicação do formulário.
- Motor de execução da monitoria.

## Critérios

- Versionamento obrigatório.
- APIs REST.
- Compatível com múltiplos tipos de pergunta.
- Estrutura preparada para expansão.

---

# Arquitetura Aplicada

**Aggregate:** FormVersion

**Relacionamentos:**

FormVersion → Sections → Questions → Options

**Persistência:** Prisma ORM

**Princípio:** As opções de resposta definem os resultados possíveis para perguntas fechadas e concentram toda a configuração de pontuação, comportamento e regras necessárias para a execução consistente das avaliações.
