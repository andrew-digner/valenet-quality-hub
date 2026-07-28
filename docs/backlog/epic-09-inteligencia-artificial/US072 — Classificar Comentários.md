# US072 — Classificar Comentários com IA

**Epic:** EPIC-09 — Inteligência Artificial

**ID:** US072

**Prioridade:** P1 (Alta)

**Story Points:** 13

**Sprint:** Sprint 18

**Status:** Backlog

---

# História

Como gestor, analista ou coordenador de qualidade,

Quero que a Inteligência Artificial classifique automaticamente os comentários registrados na plataforma,

Para identificar temas recorrentes, categorizar oportunidades de melhoria e facilitar análises estratégicas.

---

# Objetivo

Implementar um mecanismo de Inteligência Artificial capaz de analisar comentários registrados em monitorias, feedbacks, PDIs, contestações e calibrações, classificando automaticamente seu conteúdo em categorias e temas previamente definidos ou sugeridos pela IA.

A classificação deverá servir como apoio analítico e nunca substituir a interpretação humana.

---

# Valor de Negócio

A funcionalidade permite:

- Identificar padrões recorrentes.
- Reduzir análises manuais.
- Melhorar dashboards.
- Apoiar treinamentos.
- Descobrir causas recorrentes.
- Facilitar mineração de conhecimento.

---

# Escopo

## Fontes

Permitir analisar comentários provenientes de:

- Monitorias
- Feedbacks
- PDIs
- Contestações
- Calibrações

---

## Classificação

Identificar automaticamente:

- Categoria
- Subcategoria
- Tema principal
- Competência relacionada
- Processo relacionado

---

## Sentimento

Classificar:

- Positivo
- Neutro
- Negativo

---

## Priorização

Identificar:

- Alta criticidade
- Média criticidade
- Baixa criticidade

---

## Palavras-chave

Extrair:

- Termos relevantes
- Expressões recorrentes
- Assuntos predominantes

---

## Agrupamento

Permitir identificar:

- Comentários semelhantes
- Tendências
- Assuntos emergentes
- Causas recorrentes

---

## Histórico

Registrar:

- Modelo utilizado
- Prompt
- Data
- Usuário solicitante
- Confiança da classificação

---

# Fluxo Principal

```text
Selecionar Comentários

↓

Construir Contexto

↓

Executar IA

↓

Classificar Conteúdo

↓

Salvar Classificação

↓

Disponibilizar para Analytics
```

---

# Regras de Negócio

RN001

A classificação será apenas uma sugestão analítica.

---

RN002

Comentários originais jamais poderão ser alterados.

---

RN003

Toda classificação deverá informar o nível de confiança.

---

RN004

Toda execução deverá ser auditada.

---

RN005

A classificação poderá ser reprocessada utilizando modelos mais recentes.

---

RN006

Os comentários deverão respeitar as políticas de anonimização quando aplicável.

---

RN007

A IA não removerá nem ocultará comentários.

---

RN008

Os resultados deverão alimentar os dashboards analíticos.

---

# Critérios de Aceite

- [ ] Classificar comentários.
- [ ] Identificar sentimento.
- [ ] Extrair palavras-chave.
- [ ] Agrupar comentários semelhantes.
- [ ] Exibir confiança.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Comentário inexistente.
- IA indisponível.
- Timeout.
- Usuário sem permissão.
- Modelo indisponível.

---

# APIs

```http
POST /ai/comments/classify

GET /ai/comments/classifications

GET /ai/comments/classifications/{id}

POST /ai/comments/reclassify
```

---

# Banco de Dados

Tabelas:

- ai_comment_classifications
- ai_requests
- ai_responses
- ai_prompt_versions
- audit_logs

---

# Telas

- Classificações IA
- Detalhes da Classificação
- Histórico
- Reprocessamento

---

# Auditoria

Registrar:

- Comentário analisado.
- Modelo utilizado.
- Prompt.
- Tokens consumidos.
- Tempo de resposta.
- Classificação gerada.
- Confiança.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Classificação implementada.
- Sentimento funcionando.
- Agrupamento funcionando.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- EPIC-04 — Execução de Monitorias
- EPIC-05 — Feedback e Desenvolvimento
- EPIC-06 — Contestações
- EPIC-07 — Calibração
- US073 — Configurar Modelos de IA

---

# Observações

As classificações produzidas pela IA possuem caráter analítico.

Elas serão utilizadas principalmente para enriquecer dashboards, indicadores e mecanismos de busca, sem alterar os registros originais da plataforma.

---

# Instruções para Implementação (Codex)

## Criar

- Serviço de classificação.
- Classificador de sentimento.
- Extração de palavras-chave.
- Agrupamento semântico.
- Reprocessamento.
- Auditoria.
- Testes.

## Não Implementar

- Exclusão automática de comentários.
- Moderação automática.
- Alteração dos textos originais.

## Critérios

- Arquitetura desacoplada.
- APIs REST.
- Processamento assíncrono.
- Cache quando aplicável.
- Observabilidade completa.

---

# Arquitetura Aplicada

**Aggregate Root:** AICommentClassification

**Relacionamentos:**

Comment

↓

AICommentClassification

↓

AIRequest

↓

AIResponse

↓

AIAudit

**Persistência:** Prisma ORM

**Princípio:** A classificação inteligente representa uma camada analítica complementar aos comentários da plataforma, enriquecendo os dados com categorias, sentimentos e agrupamentos sem alterar o conteúdo original produzido pelos usuários.
