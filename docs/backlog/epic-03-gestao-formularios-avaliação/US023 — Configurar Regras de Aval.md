# US023 — Configurar Regras de Avaliação

**Epic:** EPIC-03 — Gestão de Formulários de Avaliação

**ID:** US023

**Prioridade:** P0 (Crítica)

**Story Points:** 21

**Sprint:** Sprint 06

**Status:** Backlog

---

# História

Como administrador de qualidade,

Quero configurar as regras de avaliação dos formulários,

Para que a nota seja calculada automaticamente conforme as políticas da empresa.

---

# Objetivo

Implementar o motor de regras responsável por calcular automaticamente a nota de uma avaliação, aplicando pesos, critérios eliminatórios, arredondamentos, regras condicionais e fórmulas de cálculo.

Cada versão do formulário poderá possuir sua própria configuração de regras.

---

# Valor de Negócio

O motor de regras garante que todas as avaliações sejam calculadas de forma consistente, transparente e auditável.

---

# Escopo

## Configuração Geral

Permitir configurar:

- Método de cálculo
- Nota máxima
- Nota mínima
- Casas decimais
- Regra de arredondamento
- Escala de notas
- Peso global

---

## Métodos de Cálculo

Suportar:

- Soma simples
- Média simples
- Média ponderada
- Percentual
- Pontuação acumulada
- Fórmula personalizada (estrutura preparada)

---

## Pesos

Permitir configurar pesos para:

- Seções
- Perguntas
- Opções de resposta

---

## Critérios Eliminatórios

Configurar perguntas ou respostas que eliminem automaticamente a avaliação.

Exemplos:

- Falha em autenticação do cliente.
- Descumprimento de procedimento obrigatório.
- Violação de norma regulatória.

---

## Regras Condicionais

Preparar estrutura para:

- Dependência entre perguntas
- Cálculo por grupo
- Exclusão de perguntas do cálculo
- Regras por canal ou operação

---

## Arredondamento

Permitir:

- Matemático
- Para cima
- Para baixo
- Sem arredondamento

---

## Tratamento de N/A

Definir comportamento para respostas "Não se Aplica":

- Ignorar no cálculo
- Considerar nota máxima
- Considerar nota zero

---

## Faixas de Resultado

Configurar classificações:

| Nota         | Classificação |
| ------------ | ------------- |
| 95–100       | Excelente     |
| 85–94        | Bom           |
| 70–84        | Regular       |
| Abaixo de 70 | Crítico       |

---

## Simulação

Disponibilizar simulador para validar as regras antes da publicação do formulário.

---

# Fluxo Principal

```text
Administrador

↓

Selecionar Formulário

↓

Configurar Regras

↓

Executar Simulação

↓

Validar Resultado

↓

Salvar
```

---

# Regras de Negócio

RN001

Toda versão de formulário deverá possuir exatamente uma configuração de cálculo.

---

RN002

A nota final deverá respeitar os limites mínimo e máximo configurados.

---

RN003

Critérios eliminatórios deverão prevalecer sobre qualquer cálculo de pontuação.

---

RN004

As regras só poderão ser alteradas em versões em rascunho.

---

RN005

Toda alteração deverá ser auditada.

---

RN006

A simulação não poderá alterar dados reais.

---

RN007

As regras deverão produzir resultados determinísticos para as mesmas entradas.

---

RN008

A configuração deverá ser validada antes da publicação.

---

# Critérios de Aceite

- [ ] Configurar método de cálculo.
- [ ] Configurar pesos.
- [ ] Configurar critérios eliminatórios.
- [ ] Configurar arredondamento.
- [ ] Configurar tratamento de N/A.
- [ ] Simular cálculo.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Peso inválido.
- Fórmula inválida.
- Critério eliminatório inconsistente.
- Configuração incompleta.
- Formulário publicado.

---

# APIs

```http
GET    /forms/{id}/scoring

PUT    /forms/{id}/scoring

POST   /forms/{id}/scoring/simulate
```

---

# Banco de Dados

Tabelas:

- form_scoring_rules
- form_versions
- form_questions
- question_options
- audit_logs

---

# Telas

- Configuração de Regras
- Simulador de Cálculo
- Visualização da Fórmula
- Histórico de Alterações

---

# Auditoria

Registrar:

- Criação
- Alteração
- Simulações
- Publicação
- Alterações de critérios eliminatórios

---

# Definition of Done

- Motor de cálculo implementado.
- Simulador funcionando.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US021 — Gerenciar Perguntas
- US022 — Gerenciar Opções de Resposta

---

# Observações

O motor deverá ser desacoplado da execução da monitoria para permitir reutilização em avaliações manuais, automáticas e simuladas.

---

# Instruções para Implementação (Codex)

## Criar

- Motor de cálculo.
- Configuração de regras.
- Simulador.
- DTOs.
- Services.
- Auditoria.
- Testes.

## Não Implementar

- Execução da monitoria.
- Dashboard.
- IA.

## Critérios

- Código desacoplado.
- Alta cobertura de testes.
- Algoritmos determinísticos.
- Compatível com futuras extensões.

---

# Arquitetura Aplicada

**Padrão:** Strategy Pattern

**Aggregate:** FormVersion

**Componentes:**

ScoringEngine

↓

CalculationStrategy

↓

ValidationRules

↓

ResultClassifier

**Persistência:** Prisma ORM

**Princípio:** O cálculo da avaliação deverá ser independente da execução da monitoria, permitindo reutilização em diferentes contextos e garantindo resultados consistentes, auditáveis e configuráveis.
