# US040 — Consultar Histórico de Feedbacks

**Epic:** EPIC-05 — Feedback e Desenvolvimento

**ID:** US040

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 10

**Status:** Backlog

---

# História

Como monitor, supervisor, gestor ou RH,

Quero consultar o histórico de feedbacks dos colaboradores,

Para acompanhar sua evolução, identificar padrões de desempenho e apoiar decisões de desenvolvimento.

---

# Objetivo

Implementar o módulo de consulta do histórico de feedbacks, permitindo pesquisar, filtrar e visualizar todas as devolutivas registradas para um colaborador, preservando o histórico completo e a rastreabilidade do processo.

---

# Valor de Negócio

O histórico permite:

- Acompanhar evolução do colaborador.
- Identificar recorrências.
- Apoiar avaliações de desempenho.
- Facilitar auditorias.
- Servir de base para planos de desenvolvimento.

---

# Escopo

## Pesquisa

Permitir pesquisar por:

- Colaborador
- Supervisor
- Monitor
- Equipe
- Área
- Operação
- Tipo de feedback
- Status
- Período

---

## Filtros

Filtrar por:

- Data
- Nota da monitoria
- Classificação
- Tipo
- Responsável
- Plano de Desenvolvimento associado

---

## Lista

Exibir:

- Data
- Colaborador
- Tipo
- Nota
- Status
- Responsável

---

## Detalhes

Visualizar:

- Monitoria vinculada
- Resumo da avaliação
- Comentários
- Pontos fortes
- Oportunidades de melhoria
- PDI relacionado
- Ciência do colaborador
- Anexos

---

## Linha do Tempo

Apresentar:

- Criação
- Revisões
- Publicação
- Ciência
- Encerramento

---

## Indicadores

Exibir:

- Quantidade de feedbacks
- Média das notas
- Evolução da classificação
- Quantidade de PDIs
- Feedbacks pendentes

---

# Fluxo Principal

```text
Pesquisar Colaborador

↓

Selecionar Histórico

↓

Visualizar Feedback

↓

Consultar Evolução
```

---

# Regras de Negócio

RN001

Somente usuários autorizados poderão consultar feedbacks.

---

RN002

A consulta deverá respeitar o escopo organizacional do usuário.

---

RN003

Feedbacks encerrados serão somente leitura.

---

RN004

Toda consulta detalhada deverá ser auditada.

---

RN005

O histórico deverá exibir a versão da monitoria utilizada.

---

RN006

PDIs relacionados deverão ser exibidos quando existirem.

---

RN007

Comentários privados deverão respeitar permissões de acesso.

---

RN008

Feedbacks arquivados permanecerão disponíveis para consulta histórica.

---

# Critérios de Aceite

- [ ] Pesquisar feedbacks.
- [ ] Filtrar resultados.
- [ ] Visualizar detalhes.
- [ ] Consultar linha do tempo.
- [ ] Visualizar PDIs relacionados.
- [ ] Exibir indicadores.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Feedback inexistente.
- Usuário sem permissão.
- Colaborador inexistente.
- Histórico indisponível.

---

# APIs

```http
GET /feedbacks

GET /feedbacks/{id}

GET /feedbacks/{id}/history

GET /feedbacks/{id}/timeline

GET /employees/{id}/feedbacks
```

---

# Banco de Dados

Tabelas:

- feedbacks
- feedback_history
- development_plans
- evaluations
- audit_logs

---

# Telas

- Histórico de Feedbacks
- Detalhes do Feedback
- Linha do Tempo
- Evolução do Colaborador

---

# Auditoria

Registrar:

- Consultas.
- Visualizações detalhadas.
- Downloads de anexos.
- Exportações.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Consulta implementada.
- Pesquisa funcionando.
- Filtros disponíveis.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US035 — Gerenciar Feedbacks
- US036 — Gerenciar Plano de Desenvolvimento
- US038 — Registrar Ciência do Colaborador

---

# Observações

O histórico representa uma visão consolidada da evolução do colaborador ao longo do tempo.

Não será permitida qualquer alteração nos registros por meio deste módulo.

---

# Instruções para Implementação (Codex)

## Criar

- Consulta.
- Pesquisa.
- Filtros.
- Linha do tempo.
- Indicadores.
- Auditoria.
- Testes.

## Não Implementar

- Alteração de feedbacks.
- Contestações.
- Dashboards corporativos.

## Critérios

- Alta performance.
- Paginação.
- APIs REST.
- Somente leitura.
- Controle de acesso baseado em RBAC.

---

# Arquitetura Aplicada

**Padrão:** CQRS (Query Side)

**Persistência:** Prisma ORM

**Relacionamentos:**

Employee

↓

Feedback

↓

Evaluation

↓

DevelopmentPlan

↓

Acknowledgement

↓

Attachments

**Princípio:** O histórico de feedbacks deve fornecer uma visão consolidada, imutável e auditável da evolução do colaborador, permitindo consultas rápidas e suporte às decisões de gestão de pessoas.
