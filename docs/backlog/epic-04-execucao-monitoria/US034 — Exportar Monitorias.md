# US034 — Exportar Monitorias

**Epic:** EPIC-04 — Execução de Monitorias

**ID:** US034

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 08

**Status:** Backlog

---

# História

Como monitor, supervisor ou gestor,

Quero exportar monitorias,

Para compartilhar avaliações, realizar auditorias externas e armazenar registros oficiais da operação.

---

# Objetivo

Implementar o módulo de exportação das monitorias, permitindo gerar documentos completos ou resumidos em diferentes formatos, preservando todas as informações relevantes da avaliação.

As exportações deverão respeitar as permissões do usuário e registrar auditoria completa.

---

# Valor de Negócio

Esta funcionalidade possibilita:

- Compartilhamento de avaliações.
- Auditorias externas.
- Arquivamento oficial.
- Integração com outros sistemas.
- Apoio ao feedback.

---

# Escopo

## Formatos

Permitir exportação em:

- PDF
- Excel (.xlsx)
- CSV
- JSON (integrações)

---

## Conteúdo

Permitir exportar:

- Dados da monitoria
- Dados do atendimento
- Formulário utilizado
- Versão do formulário
- Respostas
- Comentários
- Evidências (links)
- Nota
- Classificação
- Critérios eliminatórios
- Auditoria resumida

---

## Exportação em Lote

Permitir exportar múltiplas monitorias utilizando filtros.

---

## Filtros

Selecionar:

- Período
- Operação
- Canal
- Monitor
- Avaliado
- Equipe
- Área
- Status
- Classificação

---

## Modelos

Disponibilizar:

- Relatório Executivo
- Relatório Completo
- Relatório Técnico
- Exportação Personalizada

---

## Agendamento

Preparar estrutura para exportações agendadas (implementação futura).

---

# Fluxo Principal

```text
Usuário

↓

Selecionar Monitoria(s)

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

Somente usuários autorizados poderão exportar monitorias.

---

RN002

Exportações deverão respeitar o escopo organizacional do usuário.

---

RN003

Dados sensíveis deverão seguir as políticas da LGPD.

---

RN004

Links para evidências deverão respeitar permissões de acesso.

---

RN005

Toda exportação deverá ser registrada em auditoria.

---

RN006

Arquivos exportados deverão conter identificação da versão do formulário utilizada.

---

RN007

Exportações em lote deverão ser executadas de forma assíncrona quando excederem o limite configurado.

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

- Monitoria inexistente.
- Usuário sem permissão.
- Falha na geração do arquivo.
- Limite de exportação excedido.

---

# APIs

```http
POST /evaluations/export

GET  /exports/{id}

GET  /exports/{id}/download
```

---

# Banco de Dados

Tabelas:

- evaluations
- export_jobs
- export_files
- audit_logs

---

# Telas

- Exportar Monitorias
- Configuração da Exportação
- Histórico de Exportações
- Download

---

# Auditoria

Registrar:

- Usuário.
- Data/Hora.
- Formato.
- Quantidade de monitorias.
- Filtros utilizados.
- Resultado da exportação.

---

# Definition of Done

- Exportação implementada.
- Geração de PDF.
- Geração de Excel.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US031 — Finalizar Monitoria
- US032 — Consultar Histórico

---

# Observações

As exportações deverão utilizar a versão oficial da monitoria concluída.

Arquivos gerados não poderão modificar os dados originais.

---

# Instruções para Implementação (Codex)

## Criar

- Serviço de exportação.
- Templates PDF.
- Exportação Excel.
- Exportação CSV.
- Exportação JSON.
- Histórico de exportações.
- Auditoria.
- Testes.

## Não Implementar

- Envio automático por e-mail.
- Agendamento recorrente.
- Integrações externas.

## Critérios

- Processamento assíncrono para grandes volumes.
- APIs REST.
- Baixo acoplamento.
- Compatível com futuras integrações.

---

# Arquitetura Aplicada

**Padrão:** CQRS + Background Jobs

**Componentes:**

ExportService

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

**Princípio:** A geração de exportações deve ser desacoplada do fluxo operacional das monitorias, utilizando processamento assíncrono quando necessário para garantir desempenho, escalabilidade e rastreabilidade.
