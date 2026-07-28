# Governança da Documentação

## Objetivo

Este documento define a fonte de verdade, a precedência e as regras de manutenção
da documentação do Valenet Quality Hub.

## Hierarquia de precedência

Em caso de conflito, prevalece o documento de nível superior:

1. ADR aprovado mais recente aplicável ao tema.
2. `docs/architecture/ARCHITECTURE.md`.
3. `docs/architecture/DECISIONS.md`.
4. Documentos técnicos canônicos:
   - `docs/architecture/API_CONTRACT.md`;
   - `docs/architecture/MODULE_CATALOG.md`;
   - `database/DATABASE.md`.
5. Padrões de engenharia em `ai/CODING_STANDARDS.md` e
   `ai/NAMING_CONVENTIONS.md`.
6. Templates em `ai/`.
7. Backlog oficial em `docs/backlog/`.
8. PRD em `docs/prd/PRD.md`, para requisitos e visão do produto.
9. README e demais guias operacionais.

O `AGENTS.md` resume regras obrigatórias para agentes, mas não substitui os
documentos normativos. Ele deve permanecer alinhado a esta hierarquia.

## Fonte oficial do backlog

O diretório `docs/backlog/` é a única fonte oficial de épicos e User Stories.

- `docs/backlog/PRODUCT_BACKLOG.md` é o índice oficial.
- Cada User Story possui um único arquivo e um único identificador `USnnn`.
- Os arquivos dos épicos mantêm o agrupamento e as referências.
- O PRD descreve capacidades e requisitos, mas não mantém uma segunda numeração
  de User Stories.
- Novas histórias somente podem ser adicionadas ao backlog oficial, sem
  reutilizar identificadores.

## Fonte oficial dos contratos

- Respostas HTTP: `docs/architecture/API_CONTRACT.md`.
- Nomes de módulos e caminhos: `docs/architecture/MODULE_CATALOG.md`.
- Modelo de dados: `database/DATABASE.md`.
- Decisões arquiteturais: `docs/adr/`.

Exemplos em outros documentos são ilustrativos e devem reproduzir exatamente os
contratos canônicos.

## Regras de manutenção

- Toda mudança arquitetural exige ADR.
- Toda mudança de contrato exige atualização do documento canônico e de seus
  exemplos.
- Toda mudança de nomenclatura deve ser aplicada ao catálogo de módulos antes
  dos documentos consumidores.
- Não duplicar requisitos completos entre PRD e backlog.
- Links relativos devem apontar para arquivos existentes.
- Documentos devem usar UTF-8 e Markdown.
- Identificadores de épicos e histórias não podem ser reutilizados.

## Estado consolidado

Esta governança entra em vigor com o ADR-009. A numeração oficial preservada é a
do backlog detalhado existente, de `US001` a `US082`, com `US075` e `US076` aposentadas por consolidação.
