# Catálogo Oficial de Módulos

## Convenção

- Diretórios e identificadores técnicos usam inglês, minúsculas e plural quando
  representam um conjunto de recursos.
- Classes e entidades permanecem no singular em `PascalCase`.
- Nomes da interface são apresentados em português.
- A raiz do monorepo usa `apps/frontend` e `apps/backend`.
- `settings` é o nome técnico oficial para configurações.

## Aplicações

| Aplicação | Caminho oficial | Responsabilidade                              |
| --------- | --------------- | --------------------------------------------- |
| Frontend  | `apps/frontend` | Interface Next.js e composição das features   |
| Backend   | `apps/backend`  | API REST NestJS, workers e módulos de negócio |

## Módulos backend e features frontend

| Nome técnico    | Nome na interface           | Responsabilidade                                 |
| --------------- | --------------------------- | ------------------------------------------------ |
| `auth`          | Autenticação                | Identidade, tokens e sessões                     |
| `users`         | Usuários e acessos          | Usuários, perfis, permissões e escopos           |
| `forms`         | Formulários                 | Formulários, versões, seções, perguntas e opções |
| `evaluations`   | Monitorias                  | Avaliações, respostas, evidências e resultados   |
| `feedbacks`     | Feedbacks e desenvolvimento | Feedbacks, ciência e planos de desenvolvimento   |
| `appeals`       | Contestações                | Contestações, revisões, evidências e decisões    |
| `calibrations`  | Calibrações                 | Sessões, participantes e resultados              |
| `dashboards`    | Dashboards e indicadores    | Métricas, análises, filtros e exportações        |
| `ai`            | Inteligência Artificial     | Providers, prompts, execuções e resultados       |
| `settings`      | Configurações               | Parâmetros, valores por escopo e histórico       |
| `audit`         | Auditoria                   | Registros imutáveis de ações e mudanças          |
| `notifications` | Notificações e automações   | Templates, entregas e agendamentos               |
| `integrations`  | Integrações                 | Adapters para sistemas externos                  |

## Estrutura do backend

```text
apps/backend/src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── forms/
│   ├── evaluations/
│   ├── feedbacks/
│   ├── appeals/
│   ├── calibrations/
│   ├── dashboards/
│   ├── ai/
│   ├── settings/
│   ├── audit/
│   ├── notifications/
│   └── integrations/
├── shared/
└── config/
```

## Estrutura do frontend

```text
apps/frontend/src/
├── app/
├── components/
├── features/
│   ├── users/
│   ├── forms/
│   ├── evaluations/
│   ├── feedbacks/
│   ├── appeals/
│   ├── calibrations/
│   ├── dashboards/
│   ├── ai/
│   ├── settings/
│   ├── audit/
│   ├── notifications/
│   └── integrations/
├── hooks/
├── services/
├── stores/
├── types/
├── schemas/
└── utils/
```

O módulo `auth` pode expor componentes e serviços de autenticação no frontend,
mas autenticação não será implementada durante a criação da fundação técnica.
