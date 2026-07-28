# US030 — Calcular Resultado da Monitoria

**Epic:** EPIC-04 — Execução de Monitorias

**ID:** US030

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 08

**Status:** Backlog

---

# História

Como monitor de qualidade,

Quero que a nota da monitoria seja calculada automaticamente,

Para garantir avaliações consistentes, imparciais e alinhadas às regras definidas no formulário.

---

# Objetivo

Implementar o cálculo automático do resultado da monitoria utilizando o Motor de Regras configurado na EPIC-03.

O cálculo deverá ocorrer em tempo real durante o preenchimento da avaliação e gerar o resultado oficial ao finalizar a monitoria.

---

# Valor de Negócio

O cálculo automático elimina erros manuais, aumenta a confiabilidade das avaliações e garante padronização entre todos os monitores.

---

# Escopo

## Cálculo em Tempo Real

Atualizar automaticamente:

- Nota parcial
- Nota final
- Percentual de conclusão
- Critérios eliminatórios
- Classificação

Sempre que uma resposta for alterada.

---

## Aplicação das Regras

Executar:

- Pesos das perguntas
- Pesos das seções
- Método de cálculo
- Arredondamento
- Tratamento de N/A
- Critérios eliminatórios
- Classificação final

---

## Resultado

Gerar:

- Nota obtida
- Nota máxima
- Percentual
- Classificação
- Situação (Aprovado/Reprovado)
- Motivo de eliminação (quando houver)

---

## Histórico

Registrar:

- Todas as execuções do cálculo
- Resultado anterior
- Resultado atualizado
- Data/Hora
- Usuário responsável

---

## Simulação

Permitir recalcular a monitoria sempre que houver alteração das respostas enquanto ela estiver aberta.

---

# Fluxo Principal

```text
Responder Pergunta

↓

Executar Motor de Regras

↓

Aplicar Pesos

↓

Aplicar Critérios Eliminatórios

↓

Calcular Nota

↓

Atualizar Resultado

↓

Exibir ao Usuário
```

---

# Regras de Negócio

RN001

Toda alteração de resposta deverá disparar um novo cálculo.

---

RN002

Critérios eliminatórios deverão prevalecer sobre qualquer nota obtida.

---

RN003

A nota deverá respeitar o método de cálculo configurado no formulário.

---

RN004

Monitorias concluídas não poderão ser recalculadas.

---

RN005

Toda execução deverá ser registrada em auditoria.

---

RN006

O cálculo deverá produzir resultados determinísticos para as mesmas entradas.

---

RN007

A classificação deverá seguir as faixas configuradas no formulário.

---

RN008

A nota final deverá ser persistida ao concluir a monitoria.

---

# Critérios de Aceite

- [ ] Atualizar nota automaticamente.
- [ ] Aplicar pesos corretamente.
- [ ] Aplicar critérios eliminatórios.
- [ ] Atualizar classificação.
- [ ] Persistir resultado final.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Regra inexistente.
- Configuração inválida.
- Pergunta obrigatória sem resposta.
- Monitoria inexistente.
- Motor de cálculo indisponível.

---

# APIs

```http
POST /evaluations/{id}/calculate

GET  /evaluations/{id}/score

GET  /evaluations/{id}/classification
```

---

# Banco de Dados

Tabelas:

- evaluations
- evaluation_answers
- evaluation_scores
- form_scoring_rules
- audit_logs

---

# Telas

- Execução da Monitoria
- Resumo da Avaliação
- Resultado Parcial
- Resultado Final

---

# Auditoria

Registrar:

- Execução do cálculo.
- Alteração da nota.
- Alteração da classificação.
- Critério eliminatório aplicado.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Motor de cálculo integrado.
- Nota atualizada em tempo real.
- Resultado persistido.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US023 — Configurar Regras de Avaliação
- US028 — Executar Avaliação

---

# Observações

Esta User Story reutiliza exclusivamente o Motor de Regras implementado na EPIC-03.

Nenhuma regra de cálculo deverá ser duplicada neste módulo.

---

# Instruções para Implementação (Codex)

## Criar

- Integração com o Scoring Engine.
- Atualização automática da nota.
- Persistência do resultado.
- Auditoria.
- Testes.

## Não Implementar

- Alteração das regras de cálculo.
- Feedback.
- Dashboards.

## Critérios

- Reutilizar o motor de regras.
- Alta performance.
- Resultados determinísticos.
- APIs REST.
- Código desacoplado.

---

# Arquitetura Aplicada

**Padrão:** Strategy + Domain Service

**Componentes:**

Evaluation

↓

ScoringEngine

↓

CalculationStrategy

↓

EvaluationScore

↓

ClassificationService

**Persistência:** Prisma ORM

**Princípio:** O cálculo do resultado da monitoria deverá reutilizar integralmente o Motor de Regras da plataforma, garantindo consistência entre simulações, execução e relatórios, sem duplicação de lógica de negócio.
