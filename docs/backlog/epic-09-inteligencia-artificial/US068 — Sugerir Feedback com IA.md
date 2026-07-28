# US068 — Sugerir Feedback com IA

**Epic:** EPIC-09 — Inteligência Artificial

**ID:** US068

**Prioridade:** P0 (Crítica)

**Story Points:** 21

**Sprint:** Sprint 17

**Status:** Backlog

---

# História

Como monitor ou analista de qualidade,

Quero receber uma sugestão de feedback gerada por Inteligência Artificial,

Para reduzir o tempo de elaboração do feedback e aumentar a padronização da comunicação com o colaborador.

---

# Objetivo

Implementar um serviço de IA capaz de gerar uma sugestão estruturada de feedback utilizando o contexto da monitoria, destacando pontos positivos, oportunidades de melhoria e recomendações.

O conteúdo deverá ser apresentado como sugestão e dependerá sempre da aprovação do usuário antes de ser utilizado.

---

# Valor de Negócio

A funcionalidade permite:

- Reduzir tempo de escrita.
- Padronizar feedbacks.
- Melhorar a comunicação.
- Apoiar novos avaliadores.
- Aumentar produtividade.

---

# Escopo

## Geração

Gerar feedback considerando:

- Resultado da monitoria
- Respostas do formulário
- Comentários do avaliador
- Critérios eliminatórios
- Histórico do colaborador (quando permitido)
- Contexto operacional

---

## Estrutura

Gerar:

- Introdução
- Reconhecimento dos pontos fortes
- Oportunidades de melhoria
- Orientações práticas
- Próximos passos
- Encerramento

---

## Personalização

Permitir configurar:

- Tom do texto
- Nível de formalidade
- Tamanho
- Idioma
- Modelo de feedback

---

## Aprovação

Permitir:

- Editar sugestão
- Aceitar
- Descartar
- Regenerar

---

## Versionamento

Registrar:

- Modelo utilizado
- Prompt
- Versão
- Usuário
- Data/Hora

---

# Fluxo Principal

```text
Abrir Monitoria

↓

Solicitar Feedback IA

↓

Construir Contexto

↓

Executar Modelo

↓

Exibir Sugestão

↓

Editar / Aprovar / Descartar
```

---

# Regras de Negócio

RN001

Somente monitorias concluídas poderão gerar feedback.

---

RN002

A IA não poderá publicar feedback automaticamente.

---

RN003

Toda sugestão dependerá da aprovação do usuário.

---

RN004

O histórico do colaborador somente será utilizado quando autorizado pela política da organização.

---

RN005

Toda geração deverá ser auditada.

---

RN006

O modelo e a versão do prompt deverão ser registrados.

---

RN007

Caso a IA esteja indisponível, o feedback poderá ser elaborado manualmente.

---

RN008

Nenhum dado da monitoria será alterado automaticamente.

---

# Critérios de Aceite

- [ ] Gerar sugestão de feedback.
- [ ] Permitir edição.
- [ ] Permitir regeneração.
- [ ] Permitir aprovação.
- [ ] Registrar auditoria.
- [ ] Registrar versão do modelo.

---

# Casos de Erro

- Monitoria inexistente.
- Monitoria não concluída.
- IA indisponível.
- Timeout.
- Usuário sem permissão.

---

# APIs

```http
POST /ai/evaluations/{id}/feedback

GET  /ai/evaluations/{id}/feedback

POST /ai/evaluations/{id}/feedbacks/regenerate

PATCH /ai/feedback-suggestions/{id}
```

---

# Banco de Dados

Tabelas:

- ai_requests
- ai_responses
- feedback_suggestions
- ai_prompt_versions
- audit_logs

---

# Telas

- Sugestão de Feedback
- Editor de Feedback
- Histórico de Sugestões

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

- EPIC-04 — Execução de Monitorias
- EPIC-05 — Feedback e Desenvolvimento
- US073 — Configurar Modelos de IA

---

# Observações

A sugestão gerada pela IA não representa o feedback oficial.

O conteúdo somente será utilizado após validação explícita do avaliador.

Todo feedback aprovado deverá indicar internamente que contou com apoio da IA, preservando a rastreabilidade.

---

# Instruções para Implementação (Codex)

## Criar

- Serviço de geração de feedback.
- Context Builder.
- Editor.
- Regeneração.
- Versionamento.
- Auditoria.
- Testes.

## Não Implementar

- Publicação automática.
- Envio automático ao colaborador.
- Alteração automática do PDI.

## Critérios

- Arquitetura desacoplada.
- APIs REST.
- Retry controlado.
- Cache opcional.
- Tratamento de falhas do provedor.

---

# Arquitetura Aplicada

**Aggregate Root:** AIFeedbackSuggestion

**Relacionamentos:**

Evaluation

↓

AIFeedbackSuggestion

↓

AIRequest

↓

AIResponse

↓

AIAudit

**Persistência:** Prisma ORM

**Princípio:** A sugestão de feedback representa um conteúdo assistido por IA, construído a partir do contexto da monitoria e sujeito à revisão, edição e aprovação humana antes de qualquer utilização oficial.
