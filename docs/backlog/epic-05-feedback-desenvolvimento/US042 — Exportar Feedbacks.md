# US042 — Exportar Feedbacks

**Epic:** EPIC-05 — Feedback e Desenvolvimento

**ID:** US042

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 10

**Status:** Backlog

---

# História

Como monitor, supervisor, gestor ou RH,

Quero exportar feedbacks,

Para compartilhar devolutivas, arquivar registros oficiais e apoiar auditorias e processos de gestão de pessoas.

---

# Objetivo

Implementar o módulo de exportação de feedbacks, permitindo gerar documentos completos ou resumidos em diferentes formatos, preservando todas as informações relevantes do processo de devolutiva.

As exportações deverão respeitar o modelo de permissões da plataforma e registrar auditoria completa.

---

# Valor de Negócio

Esta funcionalidade permite:

- Compartilhamento de feedbacks.
- Arquivamento oficial.
- Auditorias.
- Integrações futuras.
- Apoio ao RH.
- Registro documental do desenvolvimento.

---

# Escopo

## Formatos

Permitir exportação em:

- PDF
- Excel (.xlsx)
- CSV
- JSON

---

## Conteúdo

Permitir exportar:

- Dados do feedback
- Dados da monitoria
- Nota
- Classificação
- Pontos positivos
- Oportunidades de melhoria
- Plano de Desenvolvimento (PDI)
- Ciência do colaborador
- Histórico resumido
- Anexos (links)

---

## Exportação em Lote

Permitir exportar múltiplos feedbacks utilizando filtros.

---

## Filtros

Selecionar:

- Período
- Colaborador
- Supervisor
- Monitor
- Operação
- Equipe
- Tipo
- Status

---

## Modelos

Disponibilizar:

- Relatório Executivo
- Relatório Completo
- Histórico do Colaborador
- Exportação Personalizada

---

## Processamento

Exportações grandes deverão ser processadas em background.

---

# Fluxo Principal

```text
Selecionar Feedback(s)

↓

Escolher Formato

↓

Gerar Arquivo

↓

Download
```

---

# Regras de Negócio

RN001

Somente usuários autorizados poderão exportar feedbacks.

---

RN002

Exportações deverão respeitar o escopo organizacional do usuário.

---

RN003

Dados pessoais deverão seguir as diretrizes da LGPD.

---

RN004

Toda exportação deverá ser registrada em auditoria.

---

RN005

Exportações em lote deverão ser executadas de forma assíncrona quando excederem o limite configurado.

---

RN006

Anexos não deverão ser incorporados ao arquivo; apenas referências seguras deverão ser disponibilizadas.

---

RN007

Arquivos exportados deverão conter data e hora da geração.

---

# Critérios de Aceite

- [ ] Exportar em PDF.
- [ ] Exportar em Excel.
- [ ] Exportar em CSV.
- [ ] Exportar em JSON.
- [ ] Exportar em lote.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Feedback inexistente.
- Usuário sem permissão.
- Falha na geração.
- Limite excedido.

---

# APIs

```http
POST /feedbacks/export

GET  /feedback-exports/{id}

GET  /feedback-exports/{id}/download
```

---

# Banco de Dados

Tabelas:

- feedbacks
- feedback_export_jobs
- feedback_export_files
- audit_logs

---

# Telas

- Exportar Feedbacks
- Configuração da Exportação
- Histórico de Exportações
- Download

---

# Auditoria

Registrar:

- Usuário.
- Data/Hora.
- Formato.
- Quantidade de feedbacks.
- Filtros utilizados.
- Resultado da exportação.

---

# Definition of Done

- Exportação implementada.
- PDF funcionando.
- Excel funcionando.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US040 — Consultar Histórico de Feedbacks
- US041 — Agendar Sessões de Feedback

---

# Observações

Os arquivos exportados representam uma fotografia do feedback no momento da geração.

Novas alterações não modificam arquivos já exportados.

---

# Instruções para Implementação (Codex)

## Criar

- Serviço de exportação.
- Templates PDF.
- Excel.
- CSV.
- JSON.
- Processamento em background.
- Auditoria.
- Testes.

## Não Implementar

- Envio automático por e-mail.
- Integrações externas.
- Agendamento recorrente.

## Critérios

- Processamento assíncrono.
- APIs REST.
- Arquitetura modular.
- Baixo acoplamento.

---

# Arquitetura Aplicada

**Padrão:** CQRS + Background Jobs

**Componentes:**

FeedbackExportService

↓

ExportJob

↓

PDFGenerator

↓

ExcelGenerator

↓

CSVGenerator

↓

Storage

**Persistência:** Prisma ORM

**Princípio:** A exportação de feedbacks deve ser desacoplada do fluxo operacional, garantindo desempenho, rastreabilidade e conformidade com as políticas de segurança e privacidade da organização.
