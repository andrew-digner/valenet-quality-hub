# Status do Projeto — Valenet Quality Hub

Atualizado em 29/07/2026.

## Visão geral

| Sprint   | User Stories | Progresso | Estado                           |
| -------- | ------------ | --------: | -------------------------------- |
| Sprint 1 | US001–US006  |      100% | Concluída e congelada            |
| Sprint 2 | US007–US012  |      100% | Concluída e congelada (`v0.2.0`) |
| Sprint 3 | US013–US018  |      100% | Concluída e congelada (`v0.3.0`) |

## Sprint 3

| ID    | Entrega                                                       | Estado |
| ----- | ------------------------------------------------------------- | ------ |
| US013 | Gestão de usuários, filtros, paginação, estados e soft delete | Done   |
| US014 | Papéis, associação de usuários e permissões                   | Done   |
| US015 | Catálogo de permissões e RBAC persistido                      | Done   |
| US016 | Empresas, unidades, áreas, equipes, cargos e hierarquia       | Done   |
| US017 | Consulta e revogação de sessões e dispositivos                | Done   |
| US018 | Auditoria corporativa, consultas e exportações                | Done   |

## Implementação homologada

- CRUDs administrativos completos no backend e frontend para usuários, papéis,
  permissões, empresas, unidades, áreas, equipes e cargos.
- Filtros, pesquisa, paginação, validações, tratamento de erros e inativação.
- RBAC persistido com associações usuário–papel e papel–permissão.
- Autorização com Guards e decorators, sem permissões associadas diretamente ao
  usuário.
- Auditoria administrativa, de consultas e de revogação de sessões.
- Exportação da auditoria em CSV, Excel e PDF.
- Testes unitários, de integração e E2E ampliados.

## Validações

- Prettier, ESLint, typecheck e testes: aprovados.
- Testes backend: 38/38 aprovados; frontend: 1/1 aprovado.
- Cobertura backend: 94,20% statements, 76,82% branches, 91,56% functions e
  95,10% lines.
- Prisma validate e Prisma generate: aprovados.
- Builds backend e frontend: aprovados.
- Pre-commit local homologado com carregamento automático do ambiente de testes;
  `DATABASE_URL` permanece obrigatória e é obtida dos arquivos de ambiente sem
  credenciais incorporadas ao hook ou aos scripts.

## Homologação Docker

- Docker Build: aprovado.
- Docker Compose: aprovado.
- Backend: healthy.
- Frontend: healthy.
- PostgreSQL: healthy.
- Redis: healthy.
- Container migrate: executado com sucesso (`Exited 0`).

## Restrições preservadas

- Nenhuma história posterior a US018 foi implementada ou alterada.
- Sprints 1 e 2 permanecem congeladas.
- A arquitetura Modular Monolith e o contrato `/api/v1` foram preservados.
