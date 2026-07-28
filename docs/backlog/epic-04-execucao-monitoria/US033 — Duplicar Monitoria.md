# US033 — Duplicar Monitoria

**Epic:** EPIC-04 — Execução de Monitorias

**ID:** US033

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 08

**Status:** Backlog

---

# História

Como monitor de qualidade,

Quero duplicar uma monitoria existente,

Para reutilizar suas informações como base para uma nova avaliação, reduzindo retrabalho e acelerando processos de calibração e revisão.

---

# Objetivo

Permitir criar uma nova monitoria a partir de uma monitoria existente, copiando informações configuráveis e preservando a integridade da avaliação original.

A nova monitoria deverá possuir identidade própria e iniciar em estado **Rascunho**.

---

# Valor de Negócio

Esta funcionalidade reduz tempo operacional e facilita:

- Calibrações
- Revisões
- Reavaliações
- Treinamentos
- Auditorias internas

---

# Escopo

## Duplicação

Permitir copiar:

- Formulário
- Versão
- Dados do atendimento
- Colaborador avaliado
- Estrutura da monitoria

---

## Configurações

Permitir escolher se deseja copiar:

- Respostas
- Comentários
- Evidências
- Anotações
- Tags

Cada item deverá ser opcional.

---

## Nova Monitoria

A nova monitoria deverá possuir:

- Novo identificador
- Nova data de criação
- Novo responsável
- Status Rascunho
- Auditoria independente

---

## Validação

Antes da duplicação validar:

- Existência da monitoria
- Permissão do usuário
- Integridade dos dados
- Disponibilidade da versão do formulário

---

# Fluxo Principal

```text
Selecionar Monitoria

↓

Duplicar

↓

Selecionar Itens

↓

Criar Nova Monitoria

↓

Abrir Rascunho
```

---

# Regras de Negócio

RN001

A monitoria original nunca poderá ser alterada.

---

RN002

Toda duplicação deverá gerar um novo identificador.

---

RN003

A nova monitoria iniciará obrigatoriamente em estado Rascunho.

---

RN004

A duplicação deverá registrar o vínculo com a monitoria de origem.

---

RN005

Somente usuários autorizados poderão duplicar monitorias.

---

RN006

Caso as respostas sejam copiadas, a nota deverá ser recalculada.

---

RN007

Toda duplicação deverá ser auditada.

---

RN008

A duplicação não deverá reutilizar identificadores de arquivos de evidência.

Caso evidências sejam copiadas, novos vínculos deverão ser criados.

---

# Critérios de Aceite

- [ ] Duplicar monitoria.
- [ ] Escolher itens a copiar.
- [ ] Criar nova monitoria em rascunho.
- [ ] Recalcular nota quando necessário.
- [ ] Registrar vínculo com a origem.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Monitoria inexistente.
- Usuário sem permissão.
- Formulário indisponível.
- Dados inconsistentes.

---

# APIs

```http
POST /evaluations/{id}/copies

GET  /evaluations/{id}/copy-previews
```

---

# Banco de Dados

Tabelas:

- evaluations
- evaluation_answers
- evaluation_comments
- evaluation_evidences
- evaluation_history
- audit_logs

---

# Telas

- Duplicar Monitoria
- Seleção de Conteúdo
- Confirmação
- Nova Monitoria

---

# Auditoria

Registrar:

- Monitoria original.
- Nova monitoria.
- Usuário responsável.
- Itens copiados.
- Data/Hora.

---

# Definition of Done

- Duplicação implementada.
- Configuração de cópia funcionando.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US027 — Criar Monitoria
- US031 — Finalizar Monitoria

---

# Observações

A monitoria duplicada é totalmente independente da original.

Alterações realizadas em uma delas nunca deverão refletir na outra.

---

# Instruções para Implementação (Codex)

## Criar

- Serviço de duplicação.
- Configuração dos itens copiados.
- Recalcular nota.
- Auditoria.
- Testes.

## Não Implementar

- Comparação entre monitorias.
- Contestação.
- Feedback.

## Critérios

- Duplicação transacional.
- Reutilização de serviços existentes.
- APIs REST.
- Baixo acoplamento.

---

# Arquitetura Aplicada

**Padrão:** Prototype Pattern

**Aggregate Root:** Evaluation

**Persistência:** Prisma ORM

**Princípio:** A duplicação deve criar uma nova instância independente da monitoria original, preservando o histórico da origem e garantindo consistência dos dados copiados.
