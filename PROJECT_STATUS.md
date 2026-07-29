# Projeto

- Nome: Valenet Quality Hub
- Data da última atualização: 28/07/2026
- Versão: 0.1.0
- Sprint atual: Sprint 02 — Fundação Técnica
- Última entrega: implementação de US007–US012 concluída; homologação pendente
- Próxima entrega: concluir validações de US009 e US010; Sprint 03 não iniciada

# Status Geral

| Item                 | Status                                                                 |
| -------------------- | ---------------------------------------------------------------------- |
| Sprint atual         | Sprint 02 — Em validação (4 Done, 2 em Review)                         |
| Percentual concluído | 12,5% geral; 66,7% da Sprint 02                                        |
| Build                | Aprovado para backend, frontend e imagens Docker                       |
| Docker               | Validação bloqueada: CLI Docker indisponível neste ambiente            |
| PostgreSQL           | Disponível, migrations aplicadas e integração validada                 |
| Frontend             | Fundação responsiva concluída na US003; sem funcionalidades de negócio |
| Backend              | Fundação, health check, banco e autenticação concluídos                |
| Prisma               | Schema válido, client gerado, migrations e seed executados             |
| Testes               | Suíte base já aprovou 11; última repetição teve timeout no E2E de auth |
| Lint                 | Aprovado sem warnings                                                  |
| Typecheck            | Aprovado em modo strict                                                |
| GitHub               | CI, PR validation, release preparation e Dependabot configurados       |

# Progresso das Sprints

| Sprint    | Status       | Percentual | Data início | Data conclusão |
| --------- | ------------ | ---------: | ----------- | -------------- |
| Sprint 01 | Concluída    |       100% | 28/07/2026  | 28/07/2026     |
| Sprint 02 | Em validação |      66,7% | 28/07/2026  | —              |
| Sprint 03 | Não iniciada |         0% | —           | —              |
| Sprint 04 | Não iniciada |         0% | —           | —              |
| Sprint 05 | Não iniciada |         0% | —           | —              |
| Sprint 06 | Não iniciada |         0% | —           | —              |
| Sprint 07 | Não iniciada |         0% | —           | —              |
| Sprint 08 | Não iniciada |         0% | —           | —              |
| Sprint 09 | Não iniciada |         0% | —           | —              |
| Sprint 10 | Não iniciada |         0% | —           | —              |
| Sprint 11 | Não iniciada |         0% | —           | —              |
| Sprint 12 | Não iniciada |         0% | —           | —              |
| Sprint 13 | Não iniciada |         0% | —           | —              |
| Sprint 14 | Não iniciada |         0% | —           | —              |
| Sprint 15 | Não iniciada |         0% | —           | —              |
| Sprint 16 | Não iniciada |         0% | —           | —              |
| Sprint 17 | Não iniciada |         0% | —           | —              |
| Sprint 18 | Não iniciada |         0% | —           | —              |
| Sprint 19 | Não iniciada |         0% | —           | —              |
| Sprint 20 | Não iniciada |         0% | —           | —              |

# Backlog

| ID    | Título                                                            | Epic    | Status    | Responsável   | Dependências        | Observações                                  |
| ----- | ----------------------------------------------------------------- | ------- | --------- | ------------- | ------------------- | -------------------------------------------- |
| US001 | Estruturar o Monorepo                                             | EPIC-01 | Concluída | Não atribuído | Nenhuma             | Sprint 01; critérios marcados como atendidos |
| US002 | Configurar Backend (NestJS)                                       | EPIC-01 | Concluída | Não atribuído | US001               | Sprint 01; fundação backend                  |
| US003 | Configurar Frontend (Next.js)                                     | EPIC-01 | Concluída | Não atribuído | US001               | Sprint 01; fundação frontend                 |
| US004 | Configurar Banco de Dados (PostgreSQL + Prisma)                   | EPIC-01 | Concluída | Não atribuído | US001, US002        | Sprint 01; persistência validada             |
| US005 | Configurar Autenticação e Autorização                             | EPIC-01 | Concluída | Não atribuído | US001, US002, US004 | Sprint 01; autenticação e RBAC fundacional   |
| US006 | Configurar Docker e Ambiente Local                                | EPIC-01 | Concluída | Não atribuído | US001–US004         | Sprint 01; ambiente local validado           |
| US007 | Configurar Design System                                          | EPIC-01 | Concluída | Não atribuído | US003               | Sprint 02; `packages/ui`                     |
| US008 | Configurar Observabilidade                                        | EPIC-01 | Concluída | Não atribuído | US002, US004        | Sprint 02; logs, métricas e health           |
| US009 | Configurar CI/CD                                                  | EPIC-01 | Review    | Não atribuído | US001, US002        | Docker CLI indisponível para homologação     |
| US010 | Configurar Testes Automatizados                                   | EPIC-01 | Review    | Não atribuído | US002, US003        | Cobertura global abaixo da meta              |
| US011 | Configurar Qualidade de Código                                    | EPIC-01 | Concluída | Não atribuído | US001               | Sprint 02; lint, hooks e commits             |
| US012 | Configurar Gerenciamento de Configurações e Variáveis de Ambiente | EPIC-01 | Concluída | Não atribuído | US002, US004        | Sprint 02; ConfigModule e Zod                |
| US013 | Gerenciar Usuários                                                | EPIC-02 | Backlog   | Não atribuído | US014               | Sprint 03                                    |
| US014 | Gerenciar Perfis (Roles)                                          | EPIC-02 | Backlog   | Não atribuído | US013, US015        | Sprint 03                                    |
| US015 | Gerenciar Permissões                                              | EPIC-02 | Backlog   | Não atribuído | US014               | Sprint 03                                    |
| US016 | Gerenciar Estrutura Organizacional                                | EPIC-02 | Backlog   | Não atribuído | US013               | Sprint 04                                    |
| US017 | Gerenciar Sessões e Dispositivos                                  | EPIC-02 | Backlog   | Não atribuído | US005, US013        | Sprint 04                                    |
| US018 | Auditoria de Segurança                                            | EPIC-02 | Backlog   | Não atribuído | US005, US008        | Sprint 04                                    |
| US019 | Gerenciar Formulários de Avaliação                                | EPIC-03 | Backlog   | Não atribuído | US024               | Sprint 05                                    |
| US020 | Gerenciar Seções dos Formulários                                  | EPIC-03 | Backlog   | Não atribuído | US019               | Sprint 05                                    |
| US021 | Gerenciar Perguntas                                               | EPIC-03 | Backlog   | Não atribuído | US020               | Sprint 05                                    |
| US022 | Gerenciar Opções de Resposta                                      | EPIC-03 | Backlog   | Não atribuído | US021               | Sprint 05                                    |
| US023 | Configurar Regras de Avaliação                                    | EPIC-03 | Backlog   | Não atribuído | US021, US022        | Sprint 06                                    |
| US024 | Versionar Formulários                                             | EPIC-03 | Backlog   | Não atribuído | US019, US020        | Sprint 06                                    |
| US025 | Publicar Formulários                                              | EPIC-03 | Backlog   | Não atribuído | US023, US024        | Sprint 06                                    |
| US026 | Biblioteca de Templates de Formulários                            | EPIC-03 | Backlog   | Não atribuído | US019, US024        | Sprint 06                                    |
| US027 | Criar Monitoria                                                   | EPIC-04 | Backlog   | Não atribuído | US025               | Sprint 07                                    |
| US028 | Executar Avaliação                                                | EPIC-04 | Backlog   | Não atribuído | US023, US027        | Sprint 07                                    |
| US029 | Gerenciar Evidências da Monitoria                                 | EPIC-04 | Backlog   | Não atribuído | US027, US028        | Sprint 07                                    |
| US030 | Calcular Resultado da Monitoria                                   | EPIC-04 | Backlog   | Não atribuído | US023, US028        | Sprint 08                                    |
| US031 | Finalizar Monitoria                                               | EPIC-04 | Backlog   | Não atribuído | US028, US029, US030 | Sprint 08                                    |
| US032 | Consultar Histórico de Monitorias                                 | EPIC-04 | Backlog   | Não atribuído | US031               | Sprint 08                                    |
| US033 | Duplicar Monitoria                                                | EPIC-04 | Backlog   | Não atribuído | US027, US031        | Sprint 08                                    |
| US034 | Exportar Monitorias                                               | EPIC-04 | Backlog   | Não atribuído | US031, US032        | Sprint 08                                    |
| US035 | Gerenciar Feedbacks                                               | EPIC-05 | Backlog   | Não atribuído | US031               | Sprint 09                                    |
| US036 | Gerenciar Plano de Desenvolvimento Individual (PDI)               | EPIC-05 | Backlog   | Não atribuído | US035               | Sprint 09                                    |
| US037 | Acompanhar Plano de Desenvolvimento                               | EPIC-05 | Backlog   | Não atribuído | US036               | Sprint 09                                    |
| US038 | Registrar Ciência do Colaborador                                  | EPIC-05 | Backlog   | Não atribuído | US035               | Sprint 10                                    |
| US039 | Gerenciar Anexos do Feedback                                      | EPIC-05 | Backlog   | Não atribuído | US035               | Sprint 10                                    |
| US040 | Consultar Histórico de Feedbacks                                  | EPIC-05 | Backlog   | Não atribuído | US035, US036        | Sprint 10                                    |
| US041 | Agendar Sessões de Feedback                                       | EPIC-05 | Backlog   | Não atribuído | US035, US036        | Sprint 10                                    |
| US042 | Exportar Feedbacks                                                | EPIC-05 | Backlog   | Não atribuído | US040, US041        | Sprint 10                                    |
| US043 | Abrir Contestação                                                 | EPIC-06 | Backlog   | Não atribuído | US031, US038        | Sprint 11                                    |
| US044 | Analisar Contestação                                              | EPIC-06 | Backlog   | Não atribuído | US043               | Sprint 11                                    |
| US045 | Registrar Parecer Técnico                                         | EPIC-06 | Backlog   | Não atribuído | US044               | Sprint 11                                    |
| US046 | Reavaliar Monitoria                                               | EPIC-06 | Backlog   | Não atribuído | US030, US045        | Sprint 12                                    |
| US047 | Decidir Contestação                                               | EPIC-06 | Backlog   | Não atribuído | US045, US046        | Sprint 12                                    |
| US048 | Consultar Histórico de Contestações                               | EPIC-06 | Backlog   | Não atribuído | US047               | Sprint 12                                    |
| US049 | Gerenciar Evidências da Contestação                               | EPIC-06 | Backlog   | Não atribuído | US043, US044        | Sprint 12                                    |
| US050 | Exportar Contestações                                             | EPIC-06 | Backlog   | Não atribuído | US048, US049        | Sprint 12                                    |
| US051 | Criar Sessão de Calibração                                        | EPIC-07 | Backlog   | Não atribuído | EPIC-04             | Sprint 13                                    |
| US052 | Selecionar Monitorias para Calibração                             | EPIC-07 | Backlog   | Não atribuído | US051               | Sprint 13                                    |
| US053 | Registrar Avaliações dos Calibradores                             | EPIC-07 | Backlog   | Não atribuído | US030, US052        | Sprint 13                                    |
| US054 | Comparar Divergências entre Avaliadores                           | EPIC-07 | Backlog   | Não atribuído | US053               | Sprint 14                                    |
| US055 | Consolidar Resultado da Calibração                                | EPIC-07 | Backlog   | Não atribuído | US054               | Sprint 14                                    |
| US056 | Consultar Histórico de Calibrações                                | EPIC-07 | Backlog   | Não atribuído | US055               | Sprint 14                                    |
| US057 | Gerenciar Participantes da Calibração                             | EPIC-07 | Backlog   | Não atribuído | US051               | Sprint 14                                    |
| US058 | Exportar Calibrações                                              | EPIC-07 | Backlog   | Não atribuído | US056, US057        | Sprint 14                                    |
| US059 | Dashboard Executivo                                               | EPIC-08 | Backlog   | Não atribuído | EPIC-04, EPIC-05    | Sprint 15                                    |
| US060 | Dashboard Operacional                                             | EPIC-08 | Backlog   | Não atribuído | EPIC-04, EPIC-05    | Sprint 15                                    |
| US061 | Dashboard Individual do Avaliador                                 | EPIC-08 | Backlog   | Não atribuído | EPIC-04, EPIC-07    | Sprint 15                                    |
| US062 | Dashboard de Feedback e PDI                                       | EPIC-08 | Backlog   | Não atribuído | EPIC-05             | Sprint 16                                    |
| US063 | Dashboard de Contestações                                         | EPIC-08 | Backlog   | Não atribuído | EPIC-06             | Sprint 16                                    |
| US064 | Dashboard de Calibração                                           | EPIC-08 | Backlog   | Não atribuído | EPIC-07             | Sprint 16                                    |
| US065 | Configurar Indicadores (KPIs)                                     | EPIC-08 | Backlog   | Não atribuído | US059, US060        | Sprint 16                                    |
| US066 | Exportar Dashboards                                               | EPIC-08 | Backlog   | Não atribuído | US059, US060        | Sprint 16                                    |
| US067 | Gerar Resumo Inteligente da Monitoria                             | EPIC-09 | Backlog   | Não atribuído | EPIC-04, US073      | Sprint 17                                    |
| US068 | Sugerir Feedback com IA                                           | EPIC-09 | Backlog   | Não atribuído | EPIC-04, EPIC-05    | Sprint 17                                    |
| US069 | Recomendar Plano de Desenvolvimento (PDI)                         | EPIC-09 | Backlog   | Não atribuído | EPIC-05, US068      | Sprint 17                                    |
| US070 | Identificar Tendências e Padrões                                  | EPIC-09 | Backlog   | Não atribuído | EPIC-08, US073      | Sprint 18                                    |
| US071 | Assistente Inteligente da Qualidade                               | EPIC-09 | Backlog   | Não atribuído | EPIC-08, US073      | Sprint 18                                    |
| US072 | Classificar Comentários com IA                                    | EPIC-09 | Backlog   | Não atribuído | EPIC-04, EPIC-05    | Sprint 18                                    |
| US073 | Configurar Modelos de IA                                          | EPIC-09 | Backlog   | Não atribuído | US067, US068        | Sprint 18                                    |
| US074 | Auditar Interações com IA                                         | EPIC-09 | Backlog   | Não atribuído | US067, US068        | Sprint 18                                    |
| US077 | Configurar Parâmetros da Plataforma                               | EPIC-10 | Backlog   | Não atribuído | US013, US014        | Sprint 19                                    |
| US078 | Gerenciar Auditoria do Sistema                                    | EPIC-10 | Backlog   | Não atribuído | US013, US014        | Sprint 20                                    |
| US079 | Gerenciar Integrações                                             | EPIC-10 | Backlog   | Não atribuído | US013, US014        | Sprint 20                                    |
| US080 | Monitoramento e Saúde da Plataforma                               | EPIC-10 | Backlog   | Não atribuído | US079               | Sprint 20                                    |
| US081 | Backup e Recuperação                                              | EPIC-10 | Backlog   | Não atribuído | US077, US080        | Sprint 20                                    |
| US082 | Configurações Gerais e Multiempresa                               | EPIC-10 | Backlog   | Não atribuído | US013, US014        | Sprint 20                                    |

Legenda: `Backlog` = não iniciada; `Em andamento` = execução iniciada; `Concluída` = critérios atendidos; `Bloqueada` = impedimento ativo; `Cancelada` = removida do plano. Os identificadores US075 e US076 estão aposentados por consolidação e não são User Stories ativas.

# Última entrega

- Data: 28/07/2026
- Resumo: US007–US012 implementadas; US007, US008, US011 e US012 concluídas; US009 e US010 em Review.
- Arquivos alterados: `packages/ui`, `packages/config`, backend, frontend, workflows GitHub, testes, configuração de ambiente e documentação.
- Validações executadas: documentação, formatação, lint, typecheck, 11 testes, Prisma validate/generate e builds Next.js/NestJS.
- Critérios pendentes: Docker build/up/ps não executados por ausência da CLI; cobertura backend em 66,15% statements, 57,95% branches, 52,7% functions e 63,84% lines; repetição final teve timeout no setup do E2E de autenticação; nenhuma US013+ iniciada.

# Próxima prioridade

- Próxima prioridade: homologar US009 em ambiente com Docker e elevar a cobertura da US010 às metas.
- Objetivo: encerrar a Sprint 02 antes de qualquer trabalho de Sprint 03.
- Dependências: Docker Desktop/CLI disponível e ampliação da suíte automatizada.

# Pendências

- Definir responsáveis pelas User Stories.
- Definir datas de início e conclusão das sprints futuras.
- Configurar branch protection no GitHub para tornar os checks e reviews obrigatórios.
- Executar `docker compose build`, `docker compose up -d` e `docker compose ps` em host com Docker.
- Elevar cobertura backend para 80/75/80/80 e ampliar cobertura do Design System.

# Riscos

## Riscos técnicos

- Branch protection depende de configuração administrativa no GitHub.
- O schema Prisma inicial ainda não representa o modelo de negócio completo, que depende das histórias autorizadas.

## Riscos arquiteturais

- Dependências circulares declaradas entre US013/US014/US015, US019/US024 e US067/US068/US073 podem dificultar a ordem de execução e exigem refinamento antes do início.
- A arquitetura orientada a eventos, BullMQ e providers de IA ainda estão apenas definidos documentalmente.
- O catálogo canônico de módulos deve permanecer sincronizado com qualquer implementação futura para evitar deriva arquitetural.

## Riscos funcionais

- Nenhuma capacidade de negócio do PRD foi implementada; o produto ainda é uma fundação técnica.
- Gestão de usuários, perfis, permissões e escopo organizacional ainda não está disponível.
- Monitorias, formulários, feedbacks, contestações, calibrações, dashboards e IA permanecem integralmente no backlog.

# Decisões

- ADR-001: adotar Modular Monolith.
- ADR-002: adotar Next.js e NestJS com TypeScript.
- ADR-003: adotar PostgreSQL e Prisma ORM.
- ADR-004: adotar Redis e BullMQ.
- ADR-005: desacoplar IA por providers e adapters.
- ADR-006: adotar REST como padrão oficial e seguir o contrato canônico da API.
- ADR-007: adotar RBAC com validação de escopo no backend.
- ADR-008: adotar arquitetura orientada a eventos.
- ADR-009: adotar governança documental, precedência explícita e contratos canônicos.
- O backlog oficial contém 80 User Stories ativas; US075 e US076 estão aposentadas e não podem ser reutilizadas.
- O `PROJECT_STATUS.md` passa a ser a fonte oficial de acompanhamento e deve ser atualizado ao final de toda tarefa.

# Histórico

| Sprint    | Data       | Resumo                                                                                                             |
| --------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| Sprint 01 | 28/07/2026 | Bootstrap inicial do repositório registrado no Git.                                                                |
| Sprint 01 | 28/07/2026 | US001, US002 e US003 registradas como concluídas; Sprint 01 em 50%.                                                |
| Sprint 01 | 28/07/2026 | Criado o sistema oficial de acompanhamento em `PROJECT_STATUS.md` e atualizada a regra obrigatória no `AGENTS.md`. |
| Sprint 01 | 28/07/2026 | US004, US005 e US006 concluídas; Sprint 01 validada integralmente e encerrada em 100%.                             |
| Sprint 02 | 28/07/2026 | Implementação concluída; US009 e US010 em Review por Docker indisponível e cobertura insuficiente.                 |
| Sprint 02 | 29/07/2026 | lint-staged ajustado para particionamento portátil de argumentos e execução sem sobreposição no Windows.           |

# Métricas

| Métrica               | Valor |
| --------------------- | ----: |
| Total de User Stories |    80 |
| Concluídas            |    10 |
| Em andamento          |     2 |
| Backlog               |    68 |
| Bloqueadas            |     0 |
| Percentual geral      | 12,5% |
