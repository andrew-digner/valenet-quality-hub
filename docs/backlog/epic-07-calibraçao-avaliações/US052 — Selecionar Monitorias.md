# US052 — Selecionar Monitorias para Calibração

**Epic:** EPIC-07 — Calibração de Avaliações

**ID:** US052

**Prioridade:** P0 (Crítica)

**Story Points:** 8

**Sprint:** Sprint 13

**Status:** Backlog

---

# História

Como moderador da calibração,

Quero selecionar monitorias para compor uma sessão de calibração,

Para garantir que todos os participantes realizem avaliações sobre o mesmo conjunto de atendimentos.

---

# Objetivo

Implementar a seleção de monitorias para uma sessão de calibração, permitindo incluir, remover e organizar avaliações que serão utilizadas pelos calibradores.

As monitorias selecionadas deverão permanecer imutáveis durante toda a sessão.

---

# Valor de Negócio

A seleção padronizada das monitorias:

- Garante igualdade entre avaliadores.
- Permite comparação consistente.
- Evita diferenças de contexto.
- Facilita auditorias.

---

# Escopo

## Seleção

Permitir selecionar monitorias por:

- Código
- Colaborador avaliado
- Operação
- Canal
- Formulário
- Período
- Nota
- Classificação

---

## Filtros

Filtrar por:

- Data da monitoria
- Monitor responsável
- Supervisor
- Equipe
- Área
- Status
- Formulário
- Versão

---

## Inclusão

Permitir:

- Seleção individual
- Seleção em lote
- Remoção antes da publicação

---

## Validação

Permitir incluir apenas:

- Monitorias concluídas
- Monitorias não canceladas
- Monitorias compatíveis com o objetivo da sessão

---

## Organização

Permitir:

- Ordenação
- Definição da sequência de avaliação
- Identificação de prioridade

---

# Fluxo Principal

```text
Abrir Sessão

↓

Pesquisar Monitorias

↓

Selecionar

↓

Validar

↓

Adicionar à Sessão
```

---

# Regras de Negócio

RN001

Somente monitorias concluídas poderão ser selecionadas.

---

RN002

Uma monitoria poderá participar de diversas sessões de calibração.

---

RN003

Após a publicação da sessão, não será permitida alteração da lista de monitorias.

---

RN004

Toda inclusão ou remoção deverá ser auditada.

---

RN005

Monitorias canceladas não poderão ser selecionadas.

---

RN006

A versão do formulário utilizada deverá ser preservada.

---

RN007

A ordem das monitorias deverá ser mantida durante toda a sessão.

---

RN008

Somente o moderador poderá alterar a lista antes da publicação.

---

# Critérios de Aceite

- [ ] Pesquisar monitorias.
- [ ] Aplicar filtros.
- [ ] Adicionar monitorias.
- [ ] Remover monitorias antes da publicação.
- [ ] Validar elegibilidade.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Monitoria inexistente.
- Monitoria cancelada.
- Sessão publicada.
- Usuário sem permissão.
- Monitoria duplicada na mesma sessão.

---

# APIs

```http
GET    /calibrations/{id}/evaluations

POST   /calibrations/{id}/evaluations

DELETE /calibrations/{id}/evaluations/{evaluationId}

GET    /evaluations/search
```

---

# Banco de Dados

Tabelas:

- calibration_sessions
- calibration_evaluations
- evaluations
- audit_logs

---

# Telas

- Seleção de Monitorias
- Pesquisa
- Lista da Sessão
- Resumo

---

# Auditoria

Registrar:

- Inclusão.
- Remoção.
- Alteração da ordem.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Seleção implementada.
- Pesquisa funcionando.
- Filtros disponíveis.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US051 — Criar Sessão de Calibração

---

# Observações

As monitorias adicionadas à sessão serão utilizadas por todos os participantes da calibração.

Após a publicação da sessão, a lista torna-se imutável.

---

# Instruções para Implementação (Codex)

## Criar

- Pesquisa de monitorias.
- Inclusão e remoção.
- Ordenação.
- Auditoria.
- Testes.

## Não Implementar

- Avaliações dos calibradores.
- Comparação.
- Consenso.

## Critérios

- APIs REST.
- Paginação.
- Controle de acesso por RBAC.
- Código desacoplado.

---

# Arquitetura Aplicada

**Aggregate Root:** CalibrationSession

**Relacionamentos:**

CalibrationSession

↓

CalibrationEvaluation

↓

Evaluation

↓

Audit

**Persistência:** Prisma ORM

**Princípio:** A sessão de calibração deve manter uma lista imutável de monitorias após sua publicação, garantindo que todos os participantes avaliem exatamente o mesmo conjunto de dados e preservando a comparabilidade dos resultados.
