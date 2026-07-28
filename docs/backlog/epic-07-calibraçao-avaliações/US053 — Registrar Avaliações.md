# US053 — Registrar Avaliações dos Calibradores

**Epic:** EPIC-07 — Calibração de Avaliações

**ID:** US053

**Prioridade:** P0 (Crítica)

**Story Points:** 21

**Sprint:** Sprint 13

**Status:** Backlog

---

# História

Como participante de uma sessão de calibração,

Quero avaliar as monitorias selecionadas,

Para registrar minha interpretação individual dos critérios de avaliação antes da consolidação do consenso.

---

# Objetivo

Implementar o processo de avaliação individual das monitorias em uma sessão de calibração, garantindo que cada participante realize sua avaliação de forma independente, sem acesso às respostas dos demais avaliadores.

Cada avaliação deverá permanecer isolada até a conclusão da sessão ou sua liberação pelo moderador.

---

# Valor de Negócio

A avaliação independente garante:

- Imparcialidade.
- Consistência metodológica.
- Comparações confiáveis.
- Identificação de divergências reais.
- Base para treinamentos.

---

# Escopo

## Iniciar Avaliação

Permitir:

- Abrir monitoria da sessão
- Visualizar atendimento
- Visualizar formulário
- Visualizar evidências
- Visualizar contexto da avaliação

---

## Responder

Permitir responder todas as perguntas utilizando a mesma estrutura da monitoria oficial.

Tipos suportados:

- Sim / Não
- Múltipla escolha
- Texto
- Nota
- Escala
- Número
- Percentual

---

## Comentários

Permitir registrar:

- Comentários por pergunta
- Comentários gerais
- Observações técnicas

---

## Cálculo

Atualizar automaticamente:

- Nota parcial
- Nota final
- Critérios eliminatórios
- Classificação

Utilizando o mesmo Motor de Regras da plataforma.

---

## Auto Save

Salvar automaticamente:

- Respostas
- Comentários
- Progresso

---

## Finalização

Permitir:

- Salvar rascunho
- Concluir avaliação
- Reabrir somente se permitido pelo moderador

---

# Fluxo Principal

```text
Abrir Sessão

↓

Selecionar Monitoria

↓

Responder Avaliação

↓

Salvar Automaticamente

↓

Calcular Resultado

↓

Concluir Avaliação
```

---

# Regras de Negócio

RN001

Cada participante poderá responder apenas sua própria avaliação.

---

RN002

As respostas permanecerão ocultas para os demais participantes.

---

RN003

A avaliação utilizará exatamente a mesma versão do formulário da monitoria original.

---

RN004

A nota deverá ser calculada utilizando o Motor de Regras oficial.

---

RN005

Toda alteração deverá ser auditada.

---

RN006

Após concluir, a avaliação ficará bloqueada, salvo autorização do moderador.

---

RN007

Participantes não poderão visualizar o consenso antes da liberação.

---

RN008

Cada avaliação possuirá identificador próprio.

---

# Critérios de Aceite

- [ ] Iniciar avaliação.
- [ ] Registrar respostas.
- [ ] Salvar automaticamente.
- [ ] Calcular nota.
- [ ] Finalizar avaliação.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Sessão inexistente.
- Participante não autorizado.
- Sessão encerrada.
- Avaliação já concluída.
- Motor de cálculo indisponível.

---

# APIs

```http
GET    /calibrations/{id}/evaluations/{evaluationId}

POST   /calibration-evaluations

PATCH  /calibration-evaluations/{id}

PATCH  /calibration-evaluations/{id}/autosave

POST   /calibration-evaluations/{id}/completions
```

---

# Banco de Dados

Tabelas:

- calibration_evaluations
- calibration_answers
- calibration_scores
- calibration_comments
- audit_logs

---

# Telas

- Execução da Calibração
- Respostas
- Comentários
- Barra de Progresso
- Resultado Individual

---

# Auditoria

Registrar:

- Início.
- Alteração das respostas.
- Auto Save.
- Cálculo da nota.
- Finalização.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Avaliação implementada.
- Auto Save funcionando.
- Cálculo automático.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US030 — Calcular Resultado da Monitoria
- US052 — Selecionar Monitorias para Calibração

---

# Observações

As avaliações individuais da calibração não alteram a monitoria original.

Elas existem exclusivamente para medir a consistência entre os avaliadores.

---

# Instruções para Implementação (Codex)

## Criar

- Tela de avaliação.
- Registro de respostas.
- Auto Save.
- Comentários.
- Cálculo automático.
- Auditoria.
- Testes.

## Não Implementar

- Comparação entre avaliadores.
- Consenso.
- Dashboard.

## Critérios

- Reutilizar o Motor de Regras.
- APIs REST.
- Código desacoplado.
- Isolamento entre participantes.

---

# Arquitetura Aplicada

**Aggregate Root:** CalibrationEvaluation

**Relacionamentos:**

CalibrationSession

↓

CalibrationEvaluation

↓

CalibrationAnswer

↓

CalibrationComment

↓

CalibrationScore

**Persistência:** Prisma ORM

**Princípio:** Cada avaliação da calibração representa uma interpretação individual e independente da monitoria, preservando o isolamento entre participantes até a etapa de comparação e consenso.
