# US028 — Executar Avaliação

**Epic:** EPIC-04 — Execução de Monitorias

**ID:** US028

**Prioridade:** P0 (Crítica)

**Story Points:** 21

**Sprint:** Sprint 07

**Status:** Backlog

---

# História

Como monitor de qualidade,

Quero responder um formulário de avaliação,

Para registrar a qualidade de um atendimento de forma padronizada, consistente e auditável.

---

# Objetivo

Implementar a execução completa da monitoria, permitindo responder todas as perguntas do formulário publicado, registrar observações, justificativas e evidências, calcular a pontuação em tempo real e salvar automaticamente o progresso.

---

# Valor de Negócio

Esta funcionalidade representa o principal fluxo operacional da plataforma.

Todas as avaliações realizadas pela equipe de Qualidade serão executadas neste módulo.

---

# Escopo

## Carregamento

Ao iniciar a monitoria carregar:

- Dados da avaliação
- Formulário
- Versão
- Seções
- Perguntas
- Regras
- Pesos
- Configurações

---

## Navegação

Permitir:

- Navegar entre seções
- Navegar entre perguntas
- Expandir/Recolher seções
- Barra de progresso
- Indicador de conclusão

---

## Respostas

Permitir responder:

- Sim / Não
- Múltipla escolha
- Escolha única
- Escala
- Nota
- Texto livre
- Número
- Percentual
- Data
- Hora

---

## Comentários

Cada pergunta poderá possuir:

- Comentário opcional
- Comentário obrigatório
- Observações do monitor

---

## Evidências

Quando configurado:

- Upload de arquivos
- Imagens
- PDFs
- Áudios
- Links

---

## Auto Save

Salvar automaticamente:

- Respostas
- Comentários
- Evidências
- Progresso

Intervalo sugerido:

30 segundos

ou

Após qualquer alteração.

---

## Cálculo

Atualizar automaticamente:

- Nota parcial
- Nota final
- Critérios eliminatórios
- Classificação

Sem necessidade de finalizar a monitoria.

---

## Indicadores

Exibir:

- Percentual concluído
- Perguntas pendentes
- Perguntas obrigatórias
- Tempo de avaliação

---

# Fluxo Principal

```text
Monitor

↓

Abrir Monitoria

↓

Responder Perguntas

↓

Adicionar Comentários

↓

Adicionar Evidências

↓

Salvar Automaticamente

↓

Atualizar Nota

↓

Continuar
```

---

# Regras de Negócio

RN001

Perguntas obrigatórias deverão ser respondidas.

---

RN002

Perguntas eliminatórias deverão sinalizar imediatamente o impacto na nota.

---

RN003

Comentários obrigatórios deverão impedir a conclusão da monitoria caso estejam ausentes.

---

RN004

Evidências obrigatórias deverão ser validadas antes da finalização.

---

RN005

Toda resposta deverá possuir data/hora de alteração.

---

RN006

Toda alteração deverá ser auditada.

---

RN007

Monitorias concluídas não poderão ser editadas.

---

RN008

A nota parcial deverá refletir imediatamente as respostas registradas.

---

RN009

As respostas deverão respeitar o tipo configurado para cada pergunta.

---

# Critérios de Aceite

- [ ] Carregar formulário corretamente.
- [ ] Responder perguntas.
- [ ] Salvar automaticamente.
- [ ] Calcular nota parcial.
- [ ] Registrar comentários.
- [ ] Registrar evidências.
- [ ] Barra de progresso funcionando.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Pergunta inexistente.
- Resposta incompatível.
- Evidência inválida.
- Falha de upload.
- Monitoria concluída.
- Usuário sem permissão.

---

# APIs

```http
GET    /evaluations/{id}

GET    /evaluations/{id}/questions

PATCH  /evaluations/{id}/answers

PATCH  /evaluations/{id}/comments

PATCH  /evaluations/{id}/autosave
```

---

# Banco de Dados

Tabelas:

- evaluations
- evaluation_answers
- evaluation_comments
- evaluation_progress
- evaluation_scores
- audit_logs

---

# Telas

- Execução da Monitoria
- Navegação por Seções
- Comentários
- Barra de Progresso
- Resumo Parcial

---

# Auditoria

Registrar:

- Início da monitoria.
- Alteração de respostas.
- Inclusão de comentários.
- Upload de evidências.
- Salvamento automático.
- Tempo total de execução.

---

# Definition of Done

- Execução implementada.
- Auto Save funcionando.
- Nota parcial atualizada.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US023 — Configurar Regras de Avaliação
- US027 — Criar Monitoria

---

# Observações

A conclusão definitiva da monitoria será tratada na US031.

---

# Instruções para Implementação (Codex)

## Criar

- Tela de execução.
- Registro de respostas.
- Comentários.
- Auto Save.
- Barra de progresso.
- Cálculo em tempo real.
- Auditoria.
- Testes.

## Não Implementar

- Finalização da monitoria.
- Feedback.
- Contestação.

## Critérios

- Interface responsiva.
- Auto Save resiliente.
- Atualização instantânea da pontuação.
- APIs REST.
- Código modular.

---

# Arquitetura Aplicada

**Aggregate Root:** Evaluation

**Relacionamentos:**

Evaluation

↓

EvaluationAnswer

↓

EvaluationComment

↓

EvaluationProgress

↓

EvaluationScore

**Persistência:** Prisma ORM

**Princípio:** A execução da monitoria deve ser resiliente, permitir recuperação automática do progresso, calcular resultados em tempo real e preservar toda a rastreabilidade das respostas registradas.
