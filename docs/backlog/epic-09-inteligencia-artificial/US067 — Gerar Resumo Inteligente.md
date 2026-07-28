# US067 — Gerar Resumo Inteligente da Monitoria

**Epic:** EPIC-09 — Inteligência Artificial

**ID:** US067

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 17

**Status:** Backlog

---

# História

Como monitor, supervisor ou gestor,

Quero gerar um resumo inteligente da monitoria utilizando IA,

Para compreender rapidamente os principais pontos do atendimento, reduzindo o tempo de leitura da avaliação completa.

---

# Objetivo

Implementar a geração automática de resumos utilizando Inteligência Artificial, consolidando as informações da monitoria em uma visão objetiva, destacando pontos positivos, oportunidades de melhoria, riscos e conclusão geral.

O resumo deverá ser apresentado como sugestão e nunca substituir os registros oficiais da monitoria.

---

# Valor de Negócio

A funcionalidade permite:

- Reduzir tempo de análise.
- Padronizar resumos.
- Facilitar reuniões de feedback.
- Melhorar comunicação.
- Apoiar gestores.

---

# Escopo

## Geração

Permitir gerar resumo considerando:

- Dados da monitoria
- Respostas do formulário
- Comentários do avaliador
- Nota obtida
- Classificação
- Critérios eliminatórios
- Metadados da monitoria

---

## Estrutura do Resumo

Gerar automaticamente:

- Resumo Geral
- Pontos Fortes
- Oportunidades de Melhoria
- Principais Evidências
- Riscos Identificados
- Conclusão

---

## Regeneração

Permitir:

- Gerar novamente
- Atualizar contexto
- Comparar versões

---

## Aprovação

Permitir ao usuário:

- Aceitar resumo
- Editar antes de salvar
- Descartar sugestão

---

## Histórico

Registrar:

- Versão do resumo
- Modelo utilizado
- Prompt utilizado
- Usuário solicitante
- Data/Hora

---

# Fluxo Principal

```text
Abrir Monitoria

↓

Solicitar Resumo IA

↓

Construir Contexto

↓

Executar Modelo

↓

Exibir Resumo

↓

Aceitar / Editar / Descartar
```

---

# Regras de Negócio

RN001

Somente monitorias concluídas poderão gerar resumo.

---

RN002

A IA não poderá alterar dados da monitoria.

---

RN003

O resumo será tratado como sugestão até aprovação do usuário.

---

RN004

Toda geração deverá ser auditada.

---

RN005

O contexto enviado deverá respeitar as regras de segurança e LGPD.

---

RN006

O sistema deverá permitir regenerar o resumo utilizando o mesmo contexto ou contexto atualizado.

---

RN007

A versão do modelo e do prompt deverão ser registradas.

---

RN008

Caso a IA esteja indisponível, a monitoria continuará normalmente.

---

# Critérios de Aceite

- [ ] Gerar resumo.
- [ ] Exibir resumo estruturado.
- [ ] Permitir edição.
- [ ] Permitir regeneração.
- [ ] Registrar auditoria.
- [ ] Registrar versão do modelo.

---

# Casos de Erro

- Monitoria inexistente.
- Monitoria não concluída.
- IA indisponível.
- Timeout do provedor.
- Usuário sem permissão.

---

# APIs

```http
POST /ai/evaluations/{id}/summary

GET  /ai/evaluations/{id}/summary

POST /ai/evaluations/{id}/summary/regenerate

PATCH /ai/evaluation-summaries/{id}
```

---

# Banco de Dados

Tabelas:

- ai_requests
- ai_responses
- evaluation_summaries
- ai_prompt_versions
- audit_logs

---

# Telas

- Resumo Inteligente
- Comparação de Versões
- Histórico de Resumos

---

# Auditoria

Registrar:

- Solicitação.
- Modelo utilizado.
- Prompt.
- Tokens consumidos.
- Tempo de resposta.
- Aprovação.
- Edição.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Geração implementada.
- Aprovação funcionando.
- Versionamento implementado.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- EPIC-04 — Execução de Monitorias
- US073 — Configurar Modelos de IA

---

# Observações

O resumo gerado pela IA é um apoio ao processo de análise e não substitui a avaliação realizada pelo monitor.

Sempre deverá existir identificação clara de que o conteúdo foi produzido por Inteligência Artificial.

---

# Instruções para Implementação (Codex)

## Criar

- Serviço de resumo.
- Context Builder.
- Versionamento.
- Comparação entre versões.
- Auditoria.
- Testes.

## Não Implementar

- Alteração automática da monitoria.
- Publicação automática.
- Decisões automáticas.

## Critérios

- Arquitetura desacoplada.
- APIs REST.
- Retry controlado.
- Cache opcional.
- Tratamento de falhas do provedor.

---

# Arquitetura Aplicada

**Aggregate Root:** AISummary

**Relacionamentos:**

Evaluation

↓

AISummary

↓

AIRequest

↓

AIResponse

↓

AIAudit

**Persistência:** Prisma ORM

**Princípio:** O resumo inteligente representa uma sugestão gerada por IA baseada no contexto da monitoria, preservando a autonomia do usuário para aceitar, editar ou descartar o conteúdo antes de qualquer utilização.
