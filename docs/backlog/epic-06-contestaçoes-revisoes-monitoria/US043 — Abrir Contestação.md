# US043 — Abrir Contestação

**Epic:** EPIC-06 — Contestações e Revisões de Monitorias

**ID:** US043

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 11

**Status:** Backlog

---

# História

Como colaborador avaliado,

Quero abrir uma contestação para uma monitoria,

Para solicitar formalmente a revisão da avaliação quando identificar inconsistências ou discordar do resultado.

---

# Objetivo

Implementar o processo de abertura de contestações, permitindo que o colaborador registre os motivos da solicitação, anexe evidências e acompanhe o andamento da análise.

Cada contestação deverá estar vinculada a uma monitoria concluída e seguir um fluxo controlado até sua decisão.

---

# Valor de Negócio

A contestação formaliza o direito de revisão das avaliações, promovendo transparência, justiça e rastreabilidade no processo de qualidade.

---

# Escopo

## Abrir Contestação

Permitir informar:

- Monitoria
- Motivo da contestação
- Descrição detalhada
- Categoria
- Prioridade
- Evidências (opcional)

---

## Categorias

Permitir selecionar:

- Discordância da nota
- Critério aplicado incorretamente
- Erro operacional
- Evidência desconsiderada
- Divergência de interpretação
- Outro

---

## Prioridade

Permitir definir:

- Baixa
- Média
- Alta

---

## Evidências

Permitir anexar:

- PDF
- Imagens
- Áudios
- Vídeos
- Documentos Office

---

## Prazo

Exibir:

- Data limite para abertura
- SLA de análise
- Tempo restante

---

## Situação

Fluxo inicial:

```text
Rascunho

↓

Enviada

↓

Em Análise
```

---

# Fluxo Principal

```text
Colaborador

↓

Selecionar Monitoria

↓

Preencher Contestação

↓

Anexar Evidências

↓

Enviar

↓

Contestação Registrada
```

---

# Regras de Negócio

RN001

Somente monitorias concluídas poderão ser contestadas.

---

RN002

A contestação deverá ser aberta dentro do prazo configurado pela empresa.

---

RN003

Cada monitoria poderá possuir apenas uma contestação ativa.

---

RN004

Somente o colaborador avaliado poderá abrir a contestação.

---

RN005

Toda abertura deverá ser auditada.

---

RN006

Contestações enviadas não poderão ser editadas.

---

RN007

O sistema deverá gerar um número único para cada contestação.

---

RN008

Anexos deverão seguir as políticas corporativas de armazenamento.

---

# Critérios de Aceite

- [ ] Abrir contestação.
- [ ] Informar motivo.
- [ ] Anexar evidências.
- [ ] Validar prazo.
- [ ] Gerar identificador único.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Monitoria inexistente.
- Prazo expirado.
- Contestação já existente.
- Usuário sem permissão.
- Arquivo inválido.

---

# APIs

```http
GET    /appeals

GET    /appeals/{id}

POST   /appeals

POST   /appeals/{id}/attachments

PATCH  /appeals/{id}/submit
```

---

# Banco de Dados

Tabelas:

- appeals
- appeal_attachments
- appeal_history
- audit_logs

---

# Telas

- Nova Contestação
- Detalhes da Contestação
- Upload de Evidências
- Acompanhamento

---

# Auditoria

Registrar:

- Criação.
- Envio.
- Inclusão de anexos.
- Usuário responsável.
- Data/Hora.
- IP de origem.

---

# Definition of Done

- Abertura implementada.
- Upload funcionando.
- Validação de prazo.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US031 — Finalizar Monitoria
- US038 — Registrar Ciência do Colaborador

---

# Observações

A abertura da contestação não altera a monitoria original.

Toda alteração ocorrerá somente após a decisão final do processo.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD inicial da contestação.
- Upload de anexos.
- Validação de prazo.
- Numeração automática.
- Auditoria.
- Testes.

## Não Implementar

- Análise.
- Parecer.
- Reavaliação.
- Decisão final.

## Critérios

- Fluxo transacional.
- APIs REST.
- Controle de acesso por RBAC.
- Código desacoplado.

---

# Arquitetura Aplicada

**Aggregate Root:** Appeal

**Relacionamentos:**

Appeal

↓

Evaluation

↓

AppealAttachment

↓

AppealHistory

↓

AppealAudit

**Persistência:** Prisma ORM

**Princípio:** A contestação representa uma solicitação formal e independente de revisão da monitoria. Ela preserva a integridade da avaliação original durante todo o processo de análise, garantindo rastreabilidade, segurança e governança.
