# US071 — Assistente Inteligente da Qualidade

**Epic:** EPIC-09 — Inteligência Artificial

**ID:** US071

**Prioridade:** P1 (Alta)

**Story Points:** 21

**Sprint:** Sprint 18

**Status:** Backlog

---

# História

Como monitor, supervisor, gestor ou analista de qualidade,

Quero utilizar um assistente inteligente integrado à plataforma,

Para esclarecer dúvidas, consultar informações, interpretar indicadores e receber orientações sobre os processos de Qualidade de forma rápida e contextualizada.

---

# Objetivo

Implementar um assistente conversacional baseado em Inteligência Artificial capaz de responder perguntas sobre monitorias, formulários, feedbacks, PDIs, contestações, calibrações e indicadores, utilizando exclusivamente dados permitidos pelas regras de acesso do usuário.

O assistente deverá atuar como apoio operacional e consultivo, nunca executando ações automaticamente.

---

# Valor de Negócio

A funcionalidade permite:

- Reduzir tempo de busca por informações.
- Apoiar novos colaboradores.
- Padronizar respostas.
- Melhorar a tomada de decisão.
- Aumentar produtividade.
- Centralizar conhecimento.

---

# Escopo

## Consultas

Permitir perguntas como:

- Quantas monitorias realizei este mês?
- Quais feedbacks estão pendentes?
- Qual equipe possui menor média?
- Quais PDIs estão vencidos?
- Qual o SLA das contestações?
- Como interpretar este indicador?

---

## Explicações

Responder sobre:

- Critérios dos formulários
- Regras de negócio
- KPIs
- Processos
- Fluxos da plataforma
- Políticas internas

---

## Apoio Analítico

Permitir:

- Explicar dashboards
- Interpretar gráficos
- Resumir indicadores
- Comparar períodos
- Identificar principais variações

---

## Contexto

Utilizar:

- Perfil do usuário
- Permissões
- Operação
- Dados analíticos
- Configurações da plataforma

---

## Conversação

Permitir:

- Histórico da conversa
- Continuidade do contexto
- Sugestões de perguntas
- Feedback sobre respostas

---

## Auditoria

Registrar:

- Pergunta
- Contexto utilizado
- Modelo
- Prompt
- Tempo de resposta
- Tokens
- Usuário

---

# Fluxo Principal

```text
Abrir Assistente

↓

Enviar Pergunta

↓

Construir Contexto

↓

Consultar IA

↓

Validar Resposta

↓

Exibir Resultado
```

---

# Regras de Negócio

RN001

O assistente somente responderá utilizando dados permitidos ao usuário.

---

RN002

Nenhuma ação operacional será executada automaticamente.

---

RN003

Respostas deverão indicar quando forem baseadas em IA.

---

RN004

Toda interação deverá ser auditada.

---

RN005

O histórico de conversas respeitará as políticas de retenção da organização.

---

RN006

O sistema deverá informar quando não possuir confiança suficiente para responder.

---

RN007

O contexto utilizado respeitará as diretrizes de segurança e LGPD.

---

RN008

O assistente deverá informar a data de referência dos dados utilizados sempre que aplicável.

---

# Critérios de Aceite

- [ ] Responder perguntas contextualizadas.
- [ ] Respeitar permissões do usuário.
- [ ] Manter histórico da conversa.
- [ ] Explicar indicadores.
- [ ] Informar limitações quando necessário.
- [ ] Registrar auditoria.

---

# Casos de Erro

- IA indisponível.
- Timeout do provedor.
- Usuário sem permissão.
- Dados indisponíveis.
- Contexto insuficiente.

---

# APIs

```http
POST /ai/assistant/chat

GET  /ai/assistant/conversations

GET  /ai/assistant/conversations/{id}

DELETE /ai/assistant/conversations/{id}
```

---

# Banco de Dados

Tabelas:

- ai_conversations
- ai_messages
- ai_requests
- ai_responses
- ai_prompt_versions
- audit_logs

---

# Telas

- Assistente Inteligente
- Histórico de Conversas
- Sugestões de Perguntas
- Configurações

---

# Auditoria

Registrar:

- Pergunta.
- Resposta.
- Modelo utilizado.
- Prompt.
- Tokens consumidos.
- Tempo de resposta.
- Feedback do usuário.
- Data/Hora.

---

# Definition of Done

- Assistente implementado.
- Histórico funcionando.
- Controle de contexto implementado.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- EPIC-08 — Dashboards e Analytics
- US073 — Configurar Modelos de IA
- US074 — Auditar Interações com IA

---

# Observações

O assistente atua exclusivamente como apoio à tomada de decisão.

Nenhuma alteração em dados da plataforma poderá ser realizada por meio do chat.

Todas as respostas deverão indicar claramente quando forem geradas por Inteligência Artificial.

---

# Instruções para Implementação (Codex)

## Criar

- Chat conversacional.
- Gerenciador de contexto.
- Histórico de conversas.
- Sugestões de perguntas.
- Auditoria.
- Testes.

## Não Implementar

- Execução de comandos administrativos.
- Alterações automáticas de dados.
- Agentes autônomos.

## Critérios

- Arquitetura desacoplada.
- APIs REST.
- Contexto por sessão.
- Tratamento de falhas.
- Observabilidade completa.

---

# Arquitetura Aplicada

**Aggregate Root:** AIConversation

**Relacionamentos:**

User

↓

AIConversation

↓

AIMessage

↓

AIRequest

↓

AIResponse

↓

AIAudit

**Persistência:** Prisma ORM

**Princípio:** O Assistente Inteligente representa uma interface conversacional segura para consulta e interpretação dos dados da plataforma, respeitando rigorosamente permissões, governança e supervisão humana.
