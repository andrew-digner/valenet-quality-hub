# US066 — Exportar Dashboards

**Epic:** EPIC-08 — Dashboards e Analytics

**ID:** US066

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 16

**Status:** Backlog

---

# História

Como gestor, coordenador ou diretor,

Quero exportar dashboards e indicadores,

Para compartilhar informações estratégicas, apoiar reuniões gerenciais e manter registros oficiais dos resultados da operação.

---

# Objetivo

Implementar a exportação dos dashboards da plataforma, permitindo gerar arquivos em diferentes formatos contendo os indicadores, gráficos e tabelas apresentados na interface.

As exportações deverão respeitar as permissões do usuário e representar um snapshot dos dados no momento da geração.

---

# Valor de Negócio

A exportação permite:

- Compartilhamento executivo.
- Apoio às reuniões gerenciais.
- Arquivamento histórico.
- Auditorias.
- Integrações futuras.
- Governança dos indicadores.

---

# Escopo

## Formatos

Permitir exportação em:

- PDF
- Excel (.xlsx)
- CSV
- JSON

---

## Dashboards

Permitir exportar:

- Dashboard Executivo
- Dashboard Operacional
- Dashboard Individual
- Dashboard de Feedback e PDI
- Dashboard de Contestações
- Dashboard de Calibração

---

## Conteúdo

Exportar:

- KPIs
- Gráficos
- Rankings
- Indicadores
- Tabelas
- Metadados
- Filtros aplicados

---

## Exportação em Lote

Permitir exportar múltiplos dashboards utilizando os mesmos filtros.

---

## Processamento

Exportações volumosas deverão ser executadas em background.

---

## Histórico

Registrar:

- Usuário
- Dashboard
- Formato
- Data/Hora
- Filtros utilizados

---

# Fluxo Principal

```text
Selecionar Dashboard

↓

Aplicar Filtros

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

Somente usuários autorizados poderão exportar dashboards.

---

RN002

A exportação deverá respeitar as permissões do usuário.

---

RN003

Toda exportação deverá ser registrada em auditoria.

---

RN004

Exportações em lote utilizarão processamento assíncrono.

---

RN005

Os arquivos representarão o estado do dashboard no momento da geração.

---

RN006

Filtros aplicados deverão constar no relatório.

---

RN007

Os gráficos deverão ser exportados com qualidade adequada para apresentação.

---

RN008

Arquivos temporários deverão ser removidos automaticamente após o período de retenção configurado.

---

# Critérios de Aceite

- [ ] Exportar PDF.
- [ ] Exportar Excel.
- [ ] Exportar CSV.
- [ ] Exportar JSON.
- [ ] Exportação em lote.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Dashboard inexistente.
- Usuário sem permissão.
- Falha na geração.
- Timeout na exportação.
- Limite excedido.

---

# APIs

```http
POST /analytics/exports

GET  /analytics/exports/{id}

GET  /analytics/exports/{id}/download

GET  /analytics/exports/history
```

---

# Banco de Dados

Tabelas:

- analytics_export_jobs
- analytics_export_files
- audit_logs

---

# Telas

- Exportar Dashboard
- Configuração da Exportação
- Histórico de Exportações
- Download

---

# Auditoria

Registrar:

- Usuário.
- Dashboard exportado.
- Formato.
- Data/Hora.
- Filtros.
- Resultado da operação.

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

- US059 — Dashboard Executivo
- US060 — Dashboard Operacional
- US061 — Dashboard Individual
- US062 — Dashboard de Feedback e PDI
- US063 — Dashboard de Contestações
- US064 — Dashboard de Calibração
- US065 — Configurar Indicadores (KPIs)

---

# Observações

As exportações representam um snapshot dos indicadores no momento da geração.

Atualizações posteriores dos dashboards não modificam arquivos já exportados.

---

# Instruções para Implementação (Codex)

## Criar

- Serviço de exportação.
- Templates PDF.
- Excel.
- CSV.
- JSON.
- Processamento assíncrono.
- Histórico de exportações.
- Auditoria.
- Testes.

## Não Implementar

- Envio automático por e-mail.
- Agendamento recorrente.
- Compartilhamento por link público.

## Critérios

- Processamento em background.
- APIs REST.
- Arquitetura modular.
- Baixo acoplamento.

---

# Arquitetura Aplicada

**Padrão:** CQRS + Background Jobs

**Componentes:**

AnalyticsExportService

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

↓

AuditLog

**Persistência:** Prisma ORM

**Princípio:** A exportação dos dashboards deve ser desacoplada da geração dos indicadores, garantindo desempenho, rastreabilidade, segurança e preservação do estado analítico no momento da geração do relatório.
