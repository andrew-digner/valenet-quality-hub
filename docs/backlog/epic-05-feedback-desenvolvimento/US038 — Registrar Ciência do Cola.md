# US038 — Registrar Ciência do Colaborador

**Epic:** EPIC-05 — Feedback e Desenvolvimento

**ID:** US038

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 10

**Status:** Backlog

---

# História

Como colaborador avaliado,

Quero registrar minha ciência sobre o feedback recebido,

Para confirmar que tomei conhecimento da avaliação e das orientações apresentadas.

---

# Objetivo

Implementar o processo de ciência do colaborador, permitindo registrar eletronicamente o recebimento do feedback, incluindo data, hora, usuário, comentários opcionais e histórico.

O registro de ciência não representa concordância com o conteúdo da avaliação.

---

# Valor de Negócio

A ciência do colaborador:

- Formaliza a devolutiva.
- Atende requisitos de auditoria.
- Garante rastreabilidade.
- Dá transparência ao processo.
- Serve como base para processos de contestação.

---

# Escopo

## Registrar Ciência

Permitir registrar:

- Data/Hora
- Usuário
- Forma da ciência
- Comentário (opcional)

---

## Formas de Ciência

Suportar:

- Ciência eletrônica
- Ciência presencial
- Ciência remota

Preparar estrutura para assinatura eletrônica.

---

## Comentários

Permitir ao colaborador registrar:

- Observações
- Dúvidas
- Justificativas
- Comentários gerais

---

## Histórico

Registrar:

- Data da disponibilização
- Data da ciência
- Alterações
- Comentários
- Responsáveis

---

## Situação

Estados:

```text
Aguardando Ciência

↓

Ciente

↓

Contestado (quando aplicável)
```

---

## Consulta

Permitir visualizar:

- Feedback
- Data da ciência
- Responsável
- Comentários
- Histórico

---

# Fluxo Principal

```text
Feedback Publicado

↓

Colaborador Acessa

↓

Visualiza Feedback

↓

Registrar Ciência

↓

Sistema Registra

↓

Feedback Ciente
```

---

# Regras de Negócio

RN001

Somente o colaborador avaliado poderá registrar sua ciência.

---

RN002

A ciência poderá ser registrada apenas uma vez.

---

RN003

O registro de ciência não representa concordância com a avaliação.

---

RN004

Todo registro deverá ser auditado.

---

RN005

A data e hora deverão ser registradas automaticamente.

---

RN006

Após a ciência, o feedback permanecerá disponível para consulta.

---

RN007

Caso exista processo de contestação, a ciência permanecerá registrada.

---

RN008

O colaborador poderá adicionar comentários no momento da ciência.

---

# Critérios de Aceite

- [ ] Registrar ciência.
- [ ] Registrar data/hora.
- [ ] Registrar comentários.
- [ ] Alterar status do feedback.
- [ ] Exibir histórico.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Feedback inexistente.
- Usuário não autorizado.
- Ciência já registrada.
- Feedback não publicado.

---

# APIs

```http
POST /feedbacks/{id}/acknowledgements

GET  /feedbacks/{id}/acknowledgementsment

GET  /feedbacks/{id}/history
```

---

# Banco de Dados

Tabelas:

- feedbacks
- feedback_acknowledgements
- feedback_history
- audit_logs

---

# Telas

- Visualização do Feedback
- Confirmação de Ciência
- Histórico
- Comentários

---

# Auditoria

Registrar:

- Ciência.
- Usuário.
- Data/Hora.
- Comentários.
- Origem do acesso.

---

# Definition of Done

- Registro de ciência implementado.
- Histórico disponível.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US035 — Gerenciar Feedbacks

---

# Observações

O registro de ciência não impede a abertura de uma contestação.

O processo de contestação será tratado em uma Epic específica.

---

# Instruções para Implementação (Codex)

## Criar

- Registro de ciência.
- Histórico.
- Comentários.
- Auditoria.
- Testes.

## Não Implementar

- Contestação.
- Assinatura eletrônica certificada.
- Notificações.

## Critérios

- Registro único.
- APIs REST.
- Fluxo auditável.
- Código desacoplado.

---

# Arquitetura Aplicada

**Aggregate Root:** Feedback

**Relacionamentos:**

Feedback

↓

FeedbackAcknowledgement

↓

FeedbackComment

↓

FeedbackHistory

**Persistência:** Prisma ORM

**Princípio:** A ciência do colaborador formaliza o recebimento do feedback, preservando rastreabilidade e segurança jurídica, sem representar concordância com o conteúdo da avaliação.
