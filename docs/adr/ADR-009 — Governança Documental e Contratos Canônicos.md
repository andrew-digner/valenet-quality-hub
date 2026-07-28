# ADR-009 — Governança Documental e Contratos Canônicos

**Status:** Aprovado  
**Data:** 2026-07-27

## Contexto

O projeto possuía duas numerações de User Stories, formatos divergentes de
resposta HTTP, nomes diferentes para os mesmos módulos e caminhos conflitantes
para as aplicações do monorepo.

## Decisão

Adotar:

- `docs/backlog/` como única fonte oficial de épicos e User Stories;
- a numeração única `US001` a `US082`, com `US075` e `US076` aposentadas por consolidação;
- `docs/architecture/API_CONTRACT.md` como contrato HTTP canônico;
- `docs/architecture/MODULE_CATALOG.md` como catálogo canônico de módulos;
- `apps/frontend` e `apps/backend` como caminhos oficiais;
- nomes técnicos plurais para módulos de recursos;
- a hierarquia definida em `docs/DOCUMENTATION_GOVERNANCE.md`.

O backlog resumido antes incorporado ao PRD deixa de possuir identificadores
próprios. As capacidades e requisitos do PRD permanecem válidos e são
rastreados pelo backlog oficial.

## Justificativa

A decisão elimina identificadores ambíguos e reduz o risco de implementações
incompatíveis sem alterar requisitos funcionais ou regras de negócio. Os nomes
escolhidos acompanham as convenções REST, as tabelas no plural e a estrutura
física inicial já existente.

## Consequências

- Todo novo requisito implementável deve ser associado a um arquivo no backlog
  oficial.
- Exemplos de resposta devem seguir o contrato canônico.
- Referências legadas a `apps/api`, `apps/web`, `backend/` ou `frontend/` como
  raízes de aplicação devem ser substituídas pelos caminhos oficiais.
- Alterações futuras exigem novo ADR quando mudarem esta decisão.
