# US024 — Versionar Formulários

**Epic:** EPIC-03 — Gestão de Formulários de Avaliação

**ID:** US024

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 06

**Status:** Backlog

---

# História

Como administrador de qualidade,

Quero versionar formulários,

Para preservar o histórico das avaliações e permitir a evolução contínua dos critérios sem impactar monitorias já realizadas.

---

# Objetivo

Implementar o mecanismo de versionamento dos formulários, garantindo que toda alteração relevante gere uma nova versão independente, mantendo o histórico completo e permitindo comparação entre versões.

Nenhuma monitoria poderá perder a referência da versão utilizada.

---

# Valor de Negócio

O versionamento garante:

- Integridade histórica.
- Rastreabilidade.
- Auditoria.
- Evolução segura dos formulários.
- Compatibilidade com avaliações antigas.

---

# Escopo

## Criação de Versões

Permitir criar uma nova versão a partir de qualquer versão existente.

A nova versão deverá iniciar em estado **Rascunho**.

---

## Numeração

Versionamento seguindo o padrão:

```text
1.0
1.1
1.2
2.0
2.1
```

Incremento:

- **Major** → alterações estruturais.
- **Minor** → ajustes não estruturais.

---

## Histórico

Consultar:

- Número da versão.
- Criador.
- Data de criação.
- Status.
- Publicador.
- Observações da versão.

---

## Comparação

Permitir comparar versões, identificando:

- Seções adicionadas ou removidas.
- Perguntas alteradas.
- Pesos modificados.
- Regras alteradas.
- Opções adicionadas, removidas ou modificadas.

---

## Clonagem

Ao criar uma nova versão, copiar integralmente:

- Seções.
- Perguntas.
- Opções.
- Regras.
- Configurações.
- Pesos.

---

## Bloqueio

Versões publicadas não poderão ser editadas.

Toda alteração deverá gerar uma nova versão.

---

## Compatibilidade

Monitorias já realizadas deverão continuar vinculadas à versão utilizada na data da avaliação.

---

# Fluxo Principal

```text
Selecionar Formulário

↓

Criar Nova Versão

↓

Duplicar Estrutura

↓

Editar

↓

Publicar

↓

Nova Versão Ativa
```

---

# Regras de Negócio

RN001

Toda versão pertence exatamente a um formulário.

---

RN002

Apenas uma versão poderá estar publicada por operação e contexto.

---

RN003

Versões publicadas são imutáveis.

---

RN004

Toda nova versão inicia como Rascunho.

---

RN005

Monitorias sempre utilizarão uma versão específica.

---

RN006

Não será permitido excluir versões publicadas.

---

RN007

Comparações deverão considerar estrutura completa.

---

RN008

Toda criação de versão deverá ser auditada.

---

# Critérios de Aceite

- [ ] Criar nova versão.
- [ ] Duplicar estrutura completa.
- [ ] Consultar histórico.
- [ ] Comparar versões.
- [ ] Impedir edição de versões publicadas.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Formulário inexistente.
- Versão inexistente.
- Numeração inválida.
- Tentativa de editar versão publicada.

---

# APIs

```http
GET    /forms/{id}/versions

POST   /forms/{id}/versions

GET    /versions/{id}

GET    /versions/{id}/compare/{targetVersionId}

PATCH  /versions/{id}/publications
```

---

# Banco de Dados

Tabelas:

- forms
- form_versions
- form_sections
- form_questions
- question_options
- form_scoring_rules
- audit_logs

---

# Telas

- Histórico de Versões
- Comparação de Versões
- Publicação
- Linha do Tempo

---

# Auditoria

Registrar:

- Criação de versão.
- Publicação.
- Arquivamento.
- Comparação.
- Alterações estruturais.

---

# Definition of Done

- Versionamento implementado.
- Comparação funcionando.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US019 — Gerenciar Formulários
- US020 — Gerenciar Seções
- US021 — Gerenciar Perguntas
- US022 — Gerenciar Opções de Resposta
- US023 — Configurar Regras de Avaliação

---

# Observações

Toda alteração estrutural deverá ocorrer em uma nova versão.

A versão utilizada em uma monitoria nunca poderá ser alterada retroativamente.

---

# Instruções para Implementação (Codex)

## Criar

- Gerenciamento de versões.
- Clonagem da estrutura.
- Histórico.
- Comparação.
- Publicação.
- Auditoria.
- Testes.

## Não Implementar

- Execução da monitoria.
- IA.
- Dashboards.

## Critérios

- Histórico imutável.
- Comparação eficiente.
- Código desacoplado.
- Versionamento transparente para o usuário.

---

# Arquitetura Aplicada

**Padrão:** Aggregate Root + Snapshot Versioning

**Aggregate:** Form

**Relacionamentos:**

Form

↓

FormVersion

↓

Sections

↓

Questions

↓

Options

↓

Rules

**Persistência:** Prisma ORM

**Princípio:** Cada versão representa um snapshot completo e imutável do formulário, garantindo que avaliações históricas permaneçam consistentes, independentemente das evoluções futuras.
