# EPIC-07 — Calibração de Avaliações

**ID:** EPIC-07

**Release:** R7 — Consistência das Avaliações

**Prioridade:** P0 (Crítica)

**Status:** Backlog

---

# Objetivo

Implementar o processo corporativo de calibração das avaliações, permitindo que múltiplos avaliadores analisem a mesma monitoria, comparem resultados, identifiquem divergências e consolidem um consenso.

Esta Epic garante consistência metodológica entre monitores e fortalece a governança da Qualidade.

---

# Visão Geral

O fluxo será composto por:

- Criação da sessão de calibração
- Seleção das monitorias
- Definição dos participantes
- Avaliações independentes
- Comparação das avaliações
- Consolidação do consenso
- Encerramento da calibração

---

# Objetivos de Negócio

- Padronizar critérios de avaliação.
- Reduzir divergências entre avaliadores.
- Melhorar a confiabilidade das monitorias.
- Medir aderência entre monitores.
- Criar histórico de calibrações.
- Apoiar treinamentos da equipe.

---

# Escopo

## Sessões de Calibração

- Criar
- Editar
- Cancelar
- Encerrar

---

## Participantes

- Adicionar avaliadores
- Remover participantes
- Definir moderador
- Controlar presença

---

## Avaliações

- Avaliações independentes
- Registro individual
- Comparação automática
- Diferenças por pergunta

---

## Consenso

- Registrar decisão final
- Justificar divergências
- Consolidar resultado

---

## Indicadores

- Divergência média
- Índice de concordância
- Tempo de calibração
- Participação

---

## Histórico

- Sessões
- Avaliações
- Consensos
- Auditoria

---

# Fora do Escopo

- Dashboards corporativos
- IA para sugestão de consenso
- Gamificação

---

# Dependências

- EPIC-04 — Execução de Monitorias
- EPIC-05 — Feedback e Desenvolvimento

---

# User Stories

| ID    | História                                | Prioridade |
| ----- | --------------------------------------- | ---------- |
| US051 | Criar Sessão de Calibração              | P0         |
| US052 | Selecionar Monitorias para Calibração   | P0         |
| US053 | Registrar Avaliações dos Calibradores   | P0         |
| US054 | Comparar Divergências entre Avaliadores | P0         |
| US055 | Consolidar Resultado da Calibração      | P0         |
| US056 | Consultar Histórico de Calibrações      | P1         |
| US057 | Gerenciar Participantes da Calibração   | P1         |
| US058 | Exportar Calibrações                    | P1         |

---

# Critérios de Sucesso

Ao final desta Epic deverá ser possível:

- Criar sessões de calibração.
- Avaliar monitorias por múltiplos avaliadores.
- Comparar respostas automaticamente.
- Medir divergências.
- Consolidar consenso.
- Consultar histórico.
- Exportar resultados.

---

# Arquitetura Impactada

- Backend
- Frontend
- Banco de Dados
- Motor de Comparação
- Auditoria
- Relatórios

---

# Riscos

- Divergências sem justificativa.
- Avaliações influenciadas entre participantes.
- Perda da independência das avaliações.
- Consensos não documentados.

---

# Definition of Ready

- Monitorias concluídas disponíveis para calibração.
- Avaliadores cadastrados.

---

# Definition of Done

- APIs implementadas.
- Interface concluída.
- Workflow operacional.
- Auditoria funcionando.
- Testes automatizados aprovados.

---

# Resultado Esperado

Ao concluir esta Epic, o Valenet Quality Hub permitirá executar sessões formais de calibração, garantindo alinhamento entre avaliadores, reduzindo inconsistências e fortalecendo a confiabilidade das avaliações e indicadores da organização.
