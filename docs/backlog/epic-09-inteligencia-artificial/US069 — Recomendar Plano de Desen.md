# US069 — Recomendar Plano de Desenvolvimento (PDI)

**Epic:** EPIC-09 — Inteligência Artificial

**ID:** US069

**Prioridade:** P1 (Alta)

**Story Points:** 21

**Sprint:** Sprint 17

**Status:** Backlog

---

# História

Como monitor, supervisor ou gestor,

Quero receber recomendações de Plano de Desenvolvimento (PDI) geradas por Inteligência Artificial,

Para acelerar a elaboração dos planos de ação e aumentar a qualidade das recomendações feitas aos colaboradores.

---

# Objetivo

Implementar um serviço de IA capaz de analisar o contexto da monitoria, feedbacks anteriores, histórico de desempenho e demais informações relevantes para sugerir um Plano de Desenvolvimento Individual estruturado.

As recomendações deverão ser tratadas como sugestões e dependerão da aprovação do usuário antes de serem utilizadas.

---

# Valor de Negócio

A funcionalidade permite:

- Reduzir tempo de elaboração do PDI.
- Padronizar recomendações.
- Melhorar qualidade dos planos.
- Personalizar ações de desenvolvimento.
- Apoiar gestores menos experientes.

---

# Escopo

## Geração

Gerar recomendações considerando:

- Resultado da monitoria
- Feedback aprovado
- Histórico de monitorias
- Histórico de PDIs
- Tendências do colaborador
- Critérios eliminatórios
- Competências avaliadas

---

## Estrutura

Gerar automaticamente:

- Objetivo do PDI
- Competências prioritárias
- Ações recomendadas
- Sugestões de treinamento
- Prazo sugerido
- Critérios de sucesso
- Indicadores de acompanhamento

---

## Personalização

Permitir configurar:

- Tipo de PDI
- Horizonte do plano
- Nível de detalhamento
- Idioma
- Modelo de recomendação

---

## Aprovação

Permitir:

- Editar recomendação
- Aprovar
- Descartar
- Regenerar

---

## Histórico

Registrar:

- Modelo utilizado
- Prompt
- Versão
- Usuário solicitante
- Data/Hora

---

# Fluxo Principal

```text
Abrir Feedback

↓

Solicitar Recomendação IA

↓

Construir Contexto

↓

Executar Modelo

↓

Exibir PDI

↓

Editar / Aprovar / Descartar
```

---

# Regras de Negócio

RN001

Somente feedbacks concluídos poderão gerar recomendações de PDI.

---

RN002

A IA não poderá criar PDIs automaticamente.

---

RN003

Toda recomendação dependerá da aprovação do usuário.

---

RN004

O histórico do colaborador será utilizado conforme as políticas de privacidade da organização.

---

RN005

Toda geração deverá ser auditada.

---

RN006

O modelo e a versão do prompt deverão ser registrados.

---

RN007

Caso a IA esteja indisponível, o PDI poderá ser elaborado manualmente.

---

RN008

Nenhum PDI oficial será criado sem confirmação explícita do usuário.

---

# Critérios de Aceite

- [ ] Gerar recomendação de PDI.
- [ ] Permitir edição.
- [ ] Permitir regeneração.
- [ ] Permitir aprovação.
- [ ] Registrar auditoria.
- [ ] Registrar versão do modelo.

---

# Casos de Erro

- Feedback inexistente.
- Feedback não concluído.
- IA indisponível.
- Timeout do provedor.
- Usuário sem permissão.

---

# APIs

```http
POST /ai/feedbacks/{id}/development-plan

GET  /ai/feedbacks/{id}/development-plan

POST /ai/feedbacks/{id}/development-plan/regenerate

PATCH /ai/development-plan-suggestions/{id}
```

---

# Banco de Dados

Tabelas:

- ai_requests
- ai_responses
- development_plan_suggestions
- ai_prompt_versions
- audit_logs

---

# Telas

- Recomendação de PDI
- Editor do Plano
- Histórico de Recomendações

---

# Auditoria

Registrar:

- Solicitação.
- Modelo utilizado.
- Prompt.
- Tokens consumidos.
- Tempo de resposta.
- Aprovação.
- Edição.
- Descarte.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Geração implementada.
- Editor funcionando.
- Versionamento implementado.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- EPIC-05 — Feedback e Desenvolvimento
- US068 — Sugerir Feedback com IA
- US073 — Configurar Modelos de IA

---

# Observações

As recomendações geradas pela IA representam apenas sugestões.

O PDI oficial continuará sendo criado e aprovado por um gestor ou responsável autorizado.

As sugestões deverão indicar claramente que foram produzidas com apoio de Inteligência Artificial.

---

# Instruções para Implementação (Codex)

## Criar

- Serviço de recomendação de PDI.
- Context Builder.
- Editor.
- Regeneração.
- Versionamento.
- Auditoria.
- Testes.

## Não Implementar

- Aprovação automática.
- Publicação automática do PDI.
- Agendamento automático de treinamentos.

## Critérios

- Arquitetura desacoplada.
- APIs REST.
- Retry controlado.
- Cache opcional.
- Tratamento de falhas do provedor.

---

# Arquitetura Aplicada

**Aggregate Root:** AIDevelopmentPlanSuggestion

**Relacionamentos:**

Feedback

↓

AIDevelopmentPlanSuggestion

↓

AIRequest

↓

AIResponse

↓

AIAudit

**Persistência:** Prisma ORM

**Princípio:** A recomendação de PDI representa uma proposta assistida por IA, construída a partir do histórico e contexto do colaborador, preservando a decisão humana sobre sua adoção, edição ou descarte.
