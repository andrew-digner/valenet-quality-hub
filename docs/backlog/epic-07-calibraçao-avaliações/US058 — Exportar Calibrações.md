# US058 — Exportar Calibrações

**Epic:** EPIC-07 — Calibração de Avaliações

**ID:** US058

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 14

**Status:** Backlog

---

# História

Como gestor, coordenador de qualidade ou auditor,

Quero exportar os resultados das calibrações,

Para compartilhar informações, apoiar auditorias e manter registros oficiais das sessões realizadas.

---

# Objetivo

Implementar o módulo de exportação das sessões de calibração, permitindo gerar relatórios completos ou resumidos contendo todas as informações relevantes da sessão.

As exportações deverão respeitar as permissões do usuário e registrar auditoria completa.

---

# Valor de Negócio

Esta funcionalidade permite:

- Compartilhamento formal.
- Auditorias.
- Arquivamento.
- Apoio a treinamentos.
- Compliance.
- Integrações futuras.

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

- Dados da sessão
- Participantes
- Moderador
- Monitorias avaliadas
- Avaliações individuais
- Comparação das avaliações
- Divergências identificadas
- Consenso
- Indicadores
- Histórico
- Timeline

---

## Exportação em Lote

Permitir exportar múltiplas sessões utilizando filtros.

---

## Filtros

Selecionar:

- Período
- Moderador
- Participante
- Operação
- Formulário
- Status
- Percentual de concordância

---

## Modelos

Disponibilizar:

- Relatório Executivo
- Relatório Completo
- Relatório Estatístico
- Relatório de Treinamento
- Exportação Personalizada

---

## Processamento

Exportações volumosas deverão ser executadas em background.

---

# Fluxo Principal

```text
Selecionar Sessão(ões)

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

Somente usuários autorizados poderão exportar calibrações.

---

RN002

A exportação deverá respeitar o escopo organizacional do usuário.

---

RN003

Dados pessoais deverão seguir as diretrizes da LGPD.

---

RN004

Toda exportação deverá ser registrada em auditoria.

---

RN005

Exportações em lote deverão utilizar processamento assíncrono.

---

RN006

Arquivos exportados representarão o estado oficial da sessão no momento da geração.

---

RN007

Relatórios deverão informar data, hora e usuário responsável pela geração.

---

RN008

Os relatórios deverão preservar as avaliações individuais e o consenso de forma separada.

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

- Sessão inexistente.
- Usuário sem permissão.
- Falha na geração.
- Limite excedido.

---

# APIs

```http
POST /calibrations/export

GET  /calibration-exports/{id}

GET  /calibration-exports/{id}/download
```

---

# Banco de Dados

Tabelas:

- calibration_export_jobs
- calibration_export_files
- audit_logs

---

# Telas

- Exportar Calibrações
- Configuração da Exportação
- Histórico de Exportações
- Download

---

# Auditoria

Registrar:

- Usuário.
- Data/Hora.
- Formato.
- Quantidade de sessões.
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

- US056 — Consultar Histórico de Calibrações
- US057 — Gerenciar Participantes da Calibração

---

# Observações

Os arquivos exportados representam um snapshot da sessão no momento da geração.

Alterações futuras não modificam exportações já realizadas.

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

- Envio automático por e-mail.
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

CalibrationExportService

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

**Princípio:** A exportação das calibrações deve ser desacoplada do fluxo operacional, garantindo desempenho, rastreabilidade, conformidade e preservação do estado oficial da sessão no momento da geração.
