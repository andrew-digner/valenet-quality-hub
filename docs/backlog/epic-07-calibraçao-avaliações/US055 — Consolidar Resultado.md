# US055 — Consolidar Resultado da Calibração

**Epic:** EPIC-07 — Calibração de Avaliações

**ID:** US055

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 14

**Status:** Backlog

---

# História

Como moderador da sessão de calibração,

Quero consolidar o resultado da calibração,

Para registrar o consenso oficial do grupo e documentar os critérios acordados para futuras avaliações.

---

# Objetivo

Implementar a consolidação da calibração, permitindo registrar o consenso obtido entre os participantes, documentar justificativas, divergências discutidas e decisões tomadas durante a sessão.

O consenso deverá permanecer como referência para treinamentos e padronização das avaliações.

---

# Valor de Negócio

A consolidação permite:

- Padronizar interpretações.
- Reduzir divergências futuras.
- Registrar decisões técnicas.
- Criar base de conhecimento.
- Fortalecer a governança da Qualidade.

---

# Escopo

## Consenso

Permitir registrar:

- Nota consensual
- Classificação consensual
- Respostas consensuais
- Critérios eliminatórios consensuais

---

## Justificativas

Registrar:

- Motivos das decisões
- Pontos discutidos
- Divergências relevantes
- Orientações para futuras avaliações

---

## Decisões

Permitir registrar:

- Critérios revisados
- Interpretações acordadas
- Recomendações
- Ações de treinamento

---

## Resultado

Gerar:

- Resumo executivo
- Estatísticas da sessão
- Indicadores de concordância
- Resultado oficial da calibração

---

## Encerramento

Ao concluir:

- Encerrar sessão
- Bloquear alterações
- Disponibilizar histórico

---

# Fluxo Principal

```text
Comparação Concluída

↓

Discussão

↓

Registrar Consenso

↓

Salvar

↓

Encerrar Sessão
```

---

# Regras de Negócio

RN001

Somente o moderador poderá consolidar o consenso.

---

RN002

O consenso somente poderá ser registrado após a comparação das avaliações.

---

RN003

As avaliações individuais permanecerão inalteradas.

---

RN004

Toda decisão deverá possuir justificativa.

---

RN005

Após encerrada, a sessão será somente leitura.

---

RN006

Toda alteração deverá ser auditada.

---

RN007

O consenso ficará disponível para consultas futuras.

---

RN008

O encerramento atualizará automaticamente os indicadores da sessão.

---

# Critérios de Aceite

- [ ] Registrar consenso.
- [ ] Registrar justificativas.
- [ ] Consolidar estatísticas.
- [ ] Encerrar sessão.
- [ ] Disponibilizar histórico.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Sessão inexistente.
- Comparação não concluída.
- Usuário sem permissão.
- Sessão encerrada.

---

# APIs

```http
POST  /calibrations/{id}/consensus

GET   /calibrations/{id}/consensus

PATCH /calibrations/{id}/completions
```

---

# Banco de Dados

Tabelas:

- calibration_consensus
- calibration_consensus_answers
- calibration_history
- audit_logs

---

# Telas

- Registro do Consenso
- Resumo da Calibração
- Encerramento da Sessão
- Histórico

---

# Auditoria

Registrar:

- Criação do consenso.
- Alterações.
- Encerramento da sessão.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Consenso implementado.
- Encerramento funcionando.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US054 — Comparar Divergências entre Avaliadores

---

# Observações

O consenso é uma referência metodológica e não altera monitorias nem avaliações individuais.

As decisões registradas poderão servir de base para treinamentos, revisões de formulários e atualização dos processos de Qualidade.

---

# Instruções para Implementação (Codex)

## Criar

- Registro do consenso.
- Respostas consensuais.
- Justificativas.
- Encerramento da sessão.
- Auditoria.
- Testes.

## Não Implementar

- Atualização automática de monitorias.
- Recomendações por IA.
- Notificações.

## Critérios

- APIs REST.
- Workflow baseado em estados.
- Código desacoplado.
- Histórico imutável.

---

# Arquitetura Aplicada

**Aggregate Root:** CalibrationConsensus

**Relacionamentos:**

CalibrationSession

↓

CalibrationConsensus

↓

CalibrationConsensusAnswer

↓

CalibrationHistory

↓

CalibrationAudit

**Persistência:** Prisma ORM

**Princípio:** O consenso representa o entendimento oficial obtido durante a sessão de calibração, preservando as avaliações individuais e registrando uma referência institucional para orientar futuras avaliações e ações de desenvolvimento.
