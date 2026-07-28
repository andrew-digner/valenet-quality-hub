# US050 — Exportar Contestações

**Epic:** EPIC-06 — Contestações e Revisões de Monitorias

**ID:** US050

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 12

**Status:** Backlog

---

# História

Como analista, gestor, auditor ou RH,

Quero exportar processos de contestação,

Para compartilhar registros oficiais, apoiar auditorias e manter documentação formal das decisões.

---

# Objetivo

Implementar o módulo de exportação das contestações, permitindo gerar relatórios completos ou resumidos contendo todas as informações do processo de revisão.

As exportações deverão respeitar as permissões do usuário e registrar auditoria completa.

---

# Valor de Negócio

Esta funcionalidade permite:

- Auditorias internas e externas.
- Compartilhamento formal.
- Arquivamento.
- Compliance.
- Integrações futuras.
- Preservação documental.

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

- Dados da contestação
- Monitoria vinculada
- Feedback relacionado
- Parecer técnico
- Reavaliação
- Decisão final
- Histórico
- Timeline
- Evidências (links)
- SLA
- Auditoria resumida

---

## Exportação em Lote

Permitir exportar múltiplas contestações utilizando filtros.

---

## Filtros

Selecionar:

- Período
- Colaborador
- Analista
- Gestor
- Operação
- Categoria
- Prioridade
- Status
- Resultado

---

## Modelos

Disponibilizar:

- Relatório Executivo
- Relatório Completo
- Relatório Jurídico
- Relatório Técnico
- Exportação Personalizada

---

## Processamento

Exportações volumosas deverão ser executadas em background.

---

# Fluxo Principal

```text
Selecionar Contestação(ões)

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

Somente usuários autorizados poderão exportar contestações.

---

RN002

A exportação deverá respeitar o escopo organizacional do usuário.

---

RN003

Dados pessoais deverão seguir as políticas de LGPD.

---

RN004

Toda exportação deverá ser registrada em auditoria.

---

RN005

Exportações em lote deverão utilizar processamento assíncrono.

---

RN006

Os anexos não serão incorporados ao arquivo exportado, apenas referências seguras.

---

RN007

O relatório deverá informar data, hora e usuário responsável pela geração.

---

RN008

As informações exportadas representarão o estado oficial da contestação no momento da geração.

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

- Contestação inexistente.
- Usuário sem permissão.
- Falha na geração.
- Limite excedido.

---

# APIs

```http
POST /appeals/export

GET  /appeal-exports/{id}

GET  /appeal-exports/{id}/download
```

---

# Banco de Dados

Tabelas:

- appeal_export_jobs
- appeal_export_files
- audit_logs

---

# Telas

- Exportar Contestações
- Configuração da Exportação
- Histórico de Exportações
- Download

---

# Auditoria

Registrar:

- Usuário.
- Data/Hora.
- Formato.
- Quantidade de processos.
- Filtros utilizados.
- Resultado da exportação.

---

# Definition of Done

- Exportação implementada.
- PDF funcionando.
- Excel funcionando.
- CSV funcionando.
- JSON funcionando.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US048 — Consultar Histórico de Contestações
- US049 — Gerenciar Evidências da Contestação

---

# Observações

Os arquivos exportados representam um snapshot do processo no momento da geração.

Alterações posteriores não modificam exportações já realizadas.

---

# Instruções para Implementação (Codex)

## Criar

- Serviço de exportação.
- Templates PDF.
- Excel.
- CSV.
- JSON.
- Processamento assíncrono.
- Auditoria.
- Testes.

## Não Implementar

- Envio por e-mail.
- Agendamento recorrente.
- Integrações externas.

## Critérios

- Processamento em background.
- APIs REST.
- Arquitetura modular.
- Baixo acoplamento.

---

# Arquitetura Aplicada

**Padrão:** CQRS + Background Jobs

**Componentes:**

AppealExportService

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

**Princípio:** A exportação das contestações deve ser desacoplada do fluxo operacional, garantindo desempenho, rastreabilidade, conformidade e preservação do estado oficial do processo no momento da geração.
