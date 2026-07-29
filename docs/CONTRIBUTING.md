# Contribuição

## Branches

- `main`: versão estável.
- `develop`: integração da próxima versão.
- `feature/*`, `fix/*` e `hotfix/*`: trabalho isolado.

Commits seguem Conventional Commits. O hook `commit-msg` executa Commitlint; o
hook `pre-commit` executa lint-staged, typecheck e testes. Pull Requests exigem
review e os checks de documentação, formatação, lint, tipos, Prisma, testes e
build.

Arquivos usam `kebab-case`, componentes/classes/tipos usam `PascalCase`,
variáveis usam `camelCase`, constantes usam `UPPER_SNAKE_CASE` e imports são
ordenados pelo ESLint.
