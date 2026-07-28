# US073 — Configurar Modelos de IA

**Epic:** EPIC-09 — Inteligência Artificial

**ID:** US073

**Prioridade:** P1 (Alta)

**Story Points:** 13

**Sprint:** Sprint 18

**Status:** Backlog

---

# História

Como administrador da plataforma,

Quero configurar os modelos de Inteligência Artificial utilizados pelo sistema,

Para controlar provedores, modelos, prompts, parâmetros e políticas de utilização sem necessidade de alterações no código da aplicação.

---

# Objetivo

Implementar um módulo administrativo para gerenciamento dos recursos de Inteligência Artificial da plataforma, permitindo configurar modelos, prompts, parâmetros, limites de consumo, políticas de uso e regras de roteamento entre provedores.

---

# Valor de Negócio

Esta funcionalidade permite:

- Reduzir dependência técnica.
- Facilitar troca de provedores.
- Controlar custos.
- Melhorar governança.
- Versionar prompts.
- Padronizar resultados.

---

# Escopo

## Provedores

Permitir configurar:

- OpenAI
- Azure OpenAI
- AWS Bedrock
- Google Gemini
- Ollama
- Outros provedores compatíveis

---

## Modelos

Configurar:

- Nome
- Versão
- Provider
- Context Window
- Limite de Tokens
- Temperatura
- Top P
- Frequency Penalty
- Presence Penalty

---

## Prompts

Permitir:

- Criar
- Editar
- Versionar
- Publicar
- Arquivar

Para funcionalidades como:

- Resumo
- Feedback
- PDI
- Insights
- Assistente
- Classificação

---

## Políticas

Configurar:

- Limite de tokens
- Limite diário
- Limite mensal
- Timeout
- Retry
- Fallback entre modelos

---

## Roteamento

Permitir definir:

- Modelo padrão
- Modelo por funcionalidade
- Prioridade dos provedores
- Estratégias de fallback

---

## Testes

Disponibilizar:

- Ambiente de testes
- Simulação de prompts
- Pré-visualização da resposta
- Comparação entre modelos

---

# Fluxo Principal

```text
Selecionar Funcionalidade

↓

Selecionar Modelo

↓

Configurar Prompt

↓

Validar

↓

Publicar
```

---

# Regras de Negócio

RN001

Somente administradores poderão alterar configurações da IA.

---

RN002

Toda alteração deverá gerar uma nova versão do prompt.

---

RN003

Prompts publicados permanecerão disponíveis para auditoria.

---

RN004

Os modelos deverão informar capacidade e limitações.

---

RN005

Toda alteração deverá ser auditada.

---

RN006

Mudanças de configuração não deverão afetar interações já registradas.

---

RN007

Fallback deverá ser utilizado quando configurado e suportado.

---

RN008

Os limites de consumo deverão impedir excedentes configurados.

---

# Critérios de Aceite

- [ ] Configurar provedores.
- [ ] Configurar modelos.
- [ ] Versionar prompts.
- [ ] Configurar políticas.
- [ ] Testar prompts.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Modelo inexistente.
- Prompt inválido.
- Provider indisponível.
- Limite de tokens excedido.
- Usuário sem permissão.

---

# APIs

```http
GET    /ai/models

POST   /ai/models

PUT    /ai/models/{id}

GET    /ai/prompts

POST   /ai/prompts

PUT    /ai/prompts/{id}

POST   /ai/prompts/{id}/publications

GET    /ai/providers

POST   /ai/test
```

---

# Banco de Dados

Tabelas:

- ai_providers
- ai_models
- ai_prompt_templates
- ai_prompt_versions
- ai_model_policies
- ai_feature_configuration
- audit_logs

---

# Telas

- Provedores de IA
- Modelos
- Prompts
- Versionamento
- Testes
- Políticas

---

# Auditoria

Registrar:

- Criação.
- Alteração.
- Publicação.
- Arquivamento.
- Testes executados.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- CRUD implementado.
- Versionamento funcionando.
- Testes de prompts implementados.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US067 — Gerar Resumo Inteligente
- US068 — Sugerir Feedback com IA
- US069 — Recomendar PDI
- US070 — Identificar Tendências
- US071 — Assistente Inteligente
- US072 — Classificar Comentários

---

# Observações

As configurações deste módulo serão utilizadas por todos os serviços de IA da plataforma.

As alterações passam a valer apenas para novas requisições após a publicação da configuração.

---

# Instruções para Implementação (Codex)

## Criar

- Cadastro de provedores.
- Cadastro de modelos.
- Versionamento de prompts.
- Configuração de políticas.
- Ambiente de testes.
- Auditoria.
- Testes automatizados.

## Não Implementar

- Ajuste automático de prompts.
- Fine-tuning de modelos.
- Alteração automática de configurações.

## Critérios

- Arquitetura modular.
- APIs REST.
- Versionamento obrigatório.
- Fallback configurável.
- Observabilidade completa.

---

# Arquitetura Aplicada

**Aggregate Root:** AIModelConfiguration

**Relacionamentos:**

AIProvider

↓

AIModel

↓

AIPromptTemplate

↓

AIPromptVersion

↓

AIFeatureConfiguration

↓

AIPolicy

↓

AIAudit

**Persistência:** Prisma ORM

**Princípio:** Todas as funcionalidades de Inteligência Artificial devem consumir configurações centralizadas e versionadas, permitindo governança, rastreabilidade, controle de custos e flexibilidade para evolução tecnológica sem impacto no domínio da aplicação.
