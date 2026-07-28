# US025 — Publicar Formulários

**Epic:** EPIC-03 — Gestão de Formulários de Avaliação

**ID:** US025

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 06

**Status:** Backlog

---

# História

Como administrador de qualidade,

Quero publicar formulários de avaliação,

Para disponibilizá-los para utilização nas monitorias da operação.

---

# Objetivo

Implementar o fluxo completo de publicação dos formulários, garantindo que apenas versões válidas, consistentes e aprovadas possam ser disponibilizadas para uso.

Após a publicação, a versão deverá tornar-se imutável e poderá ser utilizada pelas monitorias.

---

# Valor de Negócio

A publicação garante:

- Integridade dos formulários.
- Controle de versões.
- Segurança operacional.
- Rastreabilidade.
- Governança do processo de avaliação.

---

# Escopo

## Publicação

Permitir publicar uma versão do formulário.

Ao publicar:

- Validar estrutura.
- Validar regras.
- Validar perguntas obrigatórias.
- Validar pesos.
- Gerar snapshot final.
- Tornar a versão imutável.

---

## Pré-Validação

Antes da publicação verificar:

- Formulário preenchido.
- Pelo menos uma seção.
- Pelo menos uma pergunta por seção.
- Regras de cálculo configuradas.
- Pesos válidos.
- Estrutura consistente.
- Versão em estado **Rascunho** ou **Em Revisão**.

---

## Aprovação

Fluxo suportado:

```text
Rascunho

↓

Em Revisão

↓

Aprovado

↓

Publicado
```

A aprovação poderá ser opcional conforme configuração da empresa.

---

## Agendamento

Permitir:

- Publicação imediata.
- Publicação agendada.
- Data de início de vigência.
- Data de encerramento de vigência.

---

## Vigência

Controlar:

- Data inicial.
- Data final.
- Status da vigência.

---

## Convivência de Versões

Permitir coexistência de versões quando aplicável, desde que destinadas a contextos diferentes (ex.: operações distintas).

---

## Descontinuação

Permitir arquivar versões publicadas.

Versões arquivadas:

- permanecem disponíveis para consulta histórica;
- não podem iniciar novas monitorias.

---

# Fluxo Principal

```text
Administrador

↓

Selecionar Versão

↓

Executar Validações

↓

Aprovar (quando aplicável)

↓

Publicar

↓

Versão Ativa
```

---

# Regras de Negócio

RN001

Somente versões válidas poderão ser publicadas.

---

RN002

Versões publicadas serão imutáveis.

---

RN003

A publicação deverá registrar data, hora e usuário responsável.

---

RN004

Monitorias iniciadas utilizarão sempre uma versão publicada.

---

RN005

Não será permitido publicar formulários incompletos.

---

RN006

Publicações agendadas deverão ocorrer automaticamente.

---

RN007

A publicação deverá ser auditada.

---

RN008

Toda versão publicada deverá possuir vigência definida.

---

RN009

Caso exista uma versão ativa para o mesmo contexto, aplicar a política definida pela organização (substituição automática ou bloqueio da publicação).

---

# Critérios de Aceite

- [ ] Publicar formulário.
- [ ] Validar estrutura antes da publicação.
- [ ] Bloquear edição após publicação.
- [ ] Agendar publicação.
- [ ] Configurar vigência.
- [ ] Arquivar versão publicada.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Formulário incompleto.
- Regras inconsistentes.
- Versão inexistente.
- Versão já publicada.
- Vigência inválida.
- Conflito com outra versão ativa.

---

# APIs

```http
POST  /versions/{id}/publications

POST  /versions/{id}/schedule

POST  /versions/{id}/approvals

POST  /versions/{id}/archive

GET   /versions/{id}/validation
```

---

# Banco de Dados

Tabelas:

- form_versions
- form_publications
- form_validations
- audit_logs

---

# Telas

- Publicação
- Aprovação
- Validação
- Histórico de Publicações
- Agenda de Publicações

---

# Auditoria

Registrar:

- Aprovação.
- Publicação.
- Agendamento.
- Arquivamento.
- Alteração de vigência.
- Usuário responsável.
- Data e hora.

---

# Definition of Done

- Fluxo de publicação implementado.
- Validação automática funcionando.
- Agendamento funcionando.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US023 — Configurar Regras de Avaliação
- US024 — Versionar Formulários

---

# Observações

A publicação é o único mecanismo oficial para disponibilizar formulários para monitorias.

Nenhuma monitoria poderá utilizar versões em rascunho ou em revisão.

---

# Instruções para Implementação (Codex)

## Criar

- Fluxo de publicação.
- Validação automática.
- Aprovação.
- Agendamento.
- Controle de vigência.
- Auditoria.
- Testes.

## Não Implementar

- Execução de monitorias.
- IA.
- Dashboards.

## Critérios

- Snapshot imutável.
- Validações obrigatórias.
- APIs REST.
- Alta confiabilidade.

---

# Arquitetura Aplicada

**Padrão:** Workflow + State Machine

**Estados:**

Rascunho → Em Revisão → Aprovado → Publicado → Arquivado

**Persistência:** Prisma ORM

**Princípio:** Apenas formulários aprovados e validados poderão ser publicados. Após a publicação, a versão torna-se imutável e passa a representar a fonte oficial para todas as monitorias realizadas durante sua vigência.
