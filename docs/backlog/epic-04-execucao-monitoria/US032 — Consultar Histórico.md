# US032 — Consultar Histórico de Monitorias

**Epic:** EPIC-04 — Execução de Monitorias

**ID:** US032

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 08

**Status:** Backlog

---

# História

Como monitor, supervisor ou gestor,

Quero consultar monitorias realizadas,

Para acompanhar o histórico das avaliações e analisar seus resultados.

---

# Objetivo

Implementar o módulo de consulta do histórico de monitorias, permitindo localizar avaliações concluídas, visualizar seus detalhes, acompanhar alterações e acessar todas as evidências relacionadas.

Nenhuma informação histórica poderá ser alterada.

---

# Valor de Negócio

O histórico permite:

- Auditoria completa.
- Consulta rápida.
- Rastreabilidade.
- Apoio ao feedback.
- Apoio às contestações.
- Base para indicadores.

---

# Escopo

## Pesquisa

Permitir pesquisar por:

- Código da monitoria
- Avaliado
- Monitor
- Supervisor
- Equipe
- Área
- Operação
- Canal
- Formulário
- Versão
- Status
- Classificação
- Nota
- Período

---

## Filtros

Filtrar por:

- Data da avaliação
- Data do atendimento
- Período
- Operação
- Canal
- Equipe
- Área
- Status
- Nota mínima
- Nota máxima

---

## Lista

Exibir:

- Código
- Avaliado
- Monitor
- Nota
- Classificação
- Data
- Status

---

## Detalhes

Visualizar:

- Dados do atendimento
- Formulário utilizado
- Versão
- Todas as respostas
- Comentários
- Evidências
- Nota
- Critérios eliminatórios
- Tempo gasto

---

## Linha do Tempo

Exibir:

- Criação
- Alterações
- Salvamentos
- Finalização
- Downloads
- Eventos relacionados

---

## Navegação

Permitir navegar entre:

- Seções
- Perguntas
- Respostas
- Evidências

---

## Comparação

Preparar estrutura para comparação entre monitorias (funcionalidade futura).

---

# Fluxo Principal

```text
Usuário

↓

Pesquisar Monitorias

↓

Selecionar Resultado

↓

Visualizar Detalhes

↓

Consultar Histórico
```

---

# Regras de Negócio

RN001

Monitorias concluídas serão somente leitura.

---

RN002

Usuários visualizarão apenas monitorias autorizadas pelo modelo de permissões.

---

RN003

Toda consulta deverá respeitar o escopo organizacional do usuário.

---

RN004

Downloads de evidências deverão ser auditados.

---

RN005

Toda consulta detalhada deverá ser registrada na auditoria.

---

RN006

Monitorias canceladas deverão ser identificadas visualmente.

---

RN007

A versão do formulário utilizada deverá ser sempre exibida.

---

# Critérios de Aceite

- [ ] Pesquisar monitorias.
- [ ] Filtrar resultados.
- [ ] Visualizar detalhes.
- [ ] Consultar respostas.
- [ ] Consultar evidências.
- [ ] Exibir linha do tempo.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Monitoria inexistente.
- Usuário sem permissão.
- Evidência indisponível.
- Registro arquivado.

---

# APIs

```http
GET /evaluations

GET /evaluations/{id}

GET /evaluations/{id}/history

GET /evaluations/{id}/answers

GET /evaluations/{id}/timeline
```

---

# Banco de Dados

Tabelas:

- evaluations
- evaluation_answers
- evaluation_scores
- evaluation_comments
- evaluation_evidences
- evaluation_history
- audit_logs

---

# Telas

- Consulta de Monitorias
- Detalhes da Monitoria
- Linha do Tempo
- Histórico de Alterações

---

# Auditoria

Registrar:

- Consultas.
- Downloads.
- Visualizações detalhadas.
- Exportações.

---

# Definition of Done

- Consulta implementada.
- Filtros funcionando.
- Linha do tempo disponível.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US031 — Finalizar Monitoria

---

# Observações

Este módulo não permite alterações.

Sua finalidade é exclusivamente consulta e rastreabilidade.

---

# Instruções para Implementação (Codex)

## Criar

- Consulta.
- Pesquisa.
- Filtros.
- Linha do tempo.
- Visualização de respostas.
- Auditoria.
- Testes.

## Não Implementar

- Edição.
- Contestação.
- Feedback.

## Critérios

- Alta performance.
- Paginação.
- APIs REST.
- Somente leitura.
- Controle de acesso via RBAC.

---

# Arquitetura Aplicada

**Padrão:** CQRS (Query Side)

**Persistência:** Prisma ORM

**Relacionamentos:**

Evaluation

↓

Answers

↓

Comments

↓

Evidence

↓

History

↓

Score

**Princípio:** A consulta das monitorias deve ser otimizada para leitura, preservando a imutabilidade dos dados e oferecendo uma visão completa do histórico da avaliação.
