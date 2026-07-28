# Product Backlog Oficial

**Produto:** Valenet Quality Hub  
**Status:** Em planejamento  
**Fonte oficial:** este índice e os arquivos de épicos e User Stories deste diretório.

## Governança

Este diretório é a única fonte oficial de User Stories. O PRD mantém visão, requisitos e capacidades do produto, sem numeração paralela. A numeração oficial usa identificadores entre `US001` e `US082`; `US075` e `US076` foram aposentados por consolidação e não podem ser reutilizados. Consulte `../DOCUMENTATION_GOVERNANCE.md`.

## Identificadores aposentados

| ID    | Motivo                                                | Destino canônico     |
| ----- | ----------------------------------------------------- | -------------------- |
| US075 | Duplicava a gestão de usuários                        | US013                |
| US076 | Sobrepunha perfis, permissões e escopo organizacional | US014, US015 e US016 |

## Estado e prioridade

- Estados permitidos: `Backlog`, `Ready`, `In Progress`, `Review`, `Done` e `Blocked`.
- Prioridades permitidas: `P0`, `P1`, `P2` e `P3`.
- O estado registrado no arquivo individual da história é o estado oficial.

## Índice oficial

### EPIC-01 — Fundação da Plataforma

Documento: `epic-01-fundacao/EPIC-01 — Fundação da Plataforma.md`

| ID    | User Story                                                        | Arquivo                                                 |
| ----- | ----------------------------------------------------------------- | ------------------------------------------------------- |
| US001 | Estruturar o Monorepo                                             | `epic-01-fundacao/US001 — Estruturar o Monorepo.md`     |
| US002 | Configurar Backend (NestJS)                                       | `epic-01-fundacao/US002 — Configurar Backend (NestJ.md` |
| US003 | Configurar Frontend (Next.js)                                     | `epic-01-fundacao/US003 — Configurar Frontend (Next.md` |
| US004 | Configurar Banco de Dados (PostgreSQL + Prisma)                   | `epic-01-fundacao/US004 — Configurar Banco de Dados.md` |
| US005 | Configurar Autenticação e Autorização                             | `epic-01-fundacao/US005 — Configurar Autenticação.md`   |
| US006 | Configurar Docker e Ambiente Local                                | `epic-01-fundacao/US006 — Configurar Docker.md`         |
| US007 | Configurar Design System                                          | `epic-01-fundacao/US007 — Configurar Design System.md`  |
| US008 | Configurar Observabilidade                                        | `epic-01-fundacao/US008 — Configurar Observabilidad.md` |
| US009 | Configurar CI/CD                                                  | `epic-01-fundacao/US009 — Configurar CICD.md`           |
| US010 | Configurar Testes Automatizados                                   | `epic-01-fundacao/US010 — Configurar Testes Automat.md` |
| US011 | Configurar Qualidade de Código                                    | `epic-01-fundacao/US011 — Configurar Qualidade.md`      |
| US012 | Configurar Gerenciamento de Configurações e Variáveis de Ambiente | `epic-01-fundacao/US012 — Configurar Gerenciamento.md`  |

### EPIC-02 — Gestão Organizacional e Segurança

Documento: `epic-02-gestao-organizacional-segurança/EPIC-02 — Gestão Organizacional.md`

| ID    | User Story                         | Arquivo                                                                        |
| ----- | ---------------------------------- | ------------------------------------------------------------------------------ |
| US013 | Gerenciar Usuários                 | `epic-02-gestao-organizacional-segurança/US013 — Gerenciar Usuários.md`        |
| US014 | Gerenciar Perfis (Roles)           | `epic-02-gestao-organizacional-segurança/US014 — Gerenciar Perfis (Roles).md`  |
| US015 | Gerenciar Permissões               | `epic-02-gestao-organizacional-segurança/US015 — Gerenciar Permissões.md`      |
| US016 | Gerenciar Estrutura Organizacional | `epic-02-gestao-organizacional-segurança/US016 — Gerenciar Estrutura Organ.md` |
| US017 | Gerenciar Sessões e Dispositivos   | `epic-02-gestao-organizacional-segurança/US017 — Gerenciar Sessões e Dispo.md` |
| US018 | Auditoria de Segurança             | `epic-02-gestao-organizacional-segurança/US018 — Auditoria de Segurança.md`    |

### EPIC-03 — Gestão de Formulários de Avaliação

Documento: `epic-03-gestao-formularios-avaliação/EPIC-03 — Gestão de Formulários.md`

| ID    | User Story                             | Arquivo                                                                     |
| ----- | -------------------------------------- | --------------------------------------------------------------------------- |
| US019 | Gerenciar Formulários de Avaliação     | `epic-03-gestao-formularios-avaliação/US019 — Gerenciar Formulários.md`     |
| US020 | Gerenciar Seções dos Formulários       | `epic-03-gestao-formularios-avaliação/US020 — Gerenciar Seções dos Form.md` |
| US021 | Gerenciar Perguntas                    | `epic-03-gestao-formularios-avaliação/US021 — Gerenciar Perguntas.md`       |
| US022 | Gerenciar Opções de Resposta           | `epic-03-gestao-formularios-avaliação/US022 — Gerenciar Opções de Respo.md` |
| US023 | Configurar Regras de Avaliação         | `epic-03-gestao-formularios-avaliação/US023 — Configurar Regras de Aval.md` |
| US024 | Versionar Formulários                  | `epic-03-gestao-formularios-avaliação/US024 — Versionar Formulários.md`     |
| US025 | Publicar Formulários                   | `epic-03-gestao-formularios-avaliação/US025 — Publicar Formulários.md`      |
| US026 | Biblioteca de Templates de Formulários | `epic-03-gestao-formularios-avaliação/US026 — Biblioteca de Templates.md`   |

### EPIC-04 — Execução de Monitorias

Documento: `epic-04-execucao-monitoria/EPIC-04 — Execução de Monitorias.md`

| ID    | User Story                        | Arquivo                                                      |
| ----- | --------------------------------- | ------------------------------------------------------------ |
| US027 | Criar Monitoria                   | `epic-04-execucao-monitoria/US027 — Criar Monitoria.md`      |
| US028 | Executar Avaliação                | `epic-04-execucao-monitoria/US028 — Executar Avaliação.md`   |
| US029 | Gerenciar Evidências da Monitoria | `epic-04-execucao-monitoria/US029 — Gerenciar Evidências.md` |
| US030 | Calcular Resultado da Monitoria   | `epic-04-execucao-monitoria/US030 — Calcular Resultado.md`   |
| US031 | Finalizar Monitoria               | `epic-04-execucao-monitoria/US031 — Finalizar Monitoria.md`  |
| US032 | Consultar Histórico de Monitorias | `epic-04-execucao-monitoria/US032 — Consultar Histórico.md`  |
| US033 | Duplicar Monitoria                | `epic-04-execucao-monitoria/US033 — Duplicar Monitoria.md`   |
| US034 | Exportar Monitorias               | `epic-04-execucao-monitoria/US034 — Exportar Monitorias.md`  |

### EPIC-05 — Feedback e Desenvolvimento

Documento: `epic-05-feedback-desenvolvimento/EPIC-05 — Feedback e Desenvolvime.md`

| ID    | User Story                                          | Arquivo                                                                 |
| ----- | --------------------------------------------------- | ----------------------------------------------------------------------- |
| US035 | Gerenciar Feedbacks                                 | `epic-05-feedback-desenvolvimento/US035 — Gerenciar Feedbacks.md`       |
| US036 | Gerenciar Plano de Desenvolvimento Individual (PDI) | `epic-05-feedback-desenvolvimento/US036 — Gerenciar Plano de Desenv.md` |
| US037 | Acompanhar Plano de Desenvolvimento                 | `epic-05-feedback-desenvolvimento/US037 — Acompanhar Plano de Desen.md` |
| US038 | Registrar Ciência do Colaborador                    | `epic-05-feedback-desenvolvimento/US038 — Registrar Ciência do Cola.md` |
| US039 | Gerenciar Anexos do Feedback                        | `epic-05-feedback-desenvolvimento/US039 — Gerenciar Anexos do Feedb.md` |
| US040 | Consultar Histórico de Feedbacks                    | `epic-05-feedback-desenvolvimento/US040 — Consultar Histórico.md`       |
| US041 | Agendar Sessões de Feedback                         | `epic-05-feedback-desenvolvimento/US041 — Agendar Sessões de Feedba.md` |
| US042 | Exportar Feedbacks                                  | `epic-05-feedback-desenvolvimento/US042 — Exportar Feedbacks.md`        |

### EPIC-06 — Contestações e Revisões de Monitorias

Documento: `epic-06-contestaçoes-revisoes-monitoria/EPIC-06 — Contestações e Revisões.md`

| ID    | User Story                          | Arquivo                                                                        |
| ----- | ----------------------------------- | ------------------------------------------------------------------------------ |
| US043 | Abrir Contestação                   | `epic-06-contestaçoes-revisoes-monitoria/US043 — Abrir Contestação.md`         |
| US044 | Analisar Contestação                | `epic-06-contestaçoes-revisoes-monitoria/US044 — Analisar Contestação.md`      |
| US045 | Registrar Parecer Técnico           | `epic-06-contestaçoes-revisoes-monitoria/US045 — Registrar Parecer Técnico.md` |
| US046 | Reavaliar Monitoria                 | `epic-06-contestaçoes-revisoes-monitoria/US046 — Reavaliar Monitoria.md`       |
| US047 | Decidir Contestação                 | `epic-06-contestaçoes-revisoes-monitoria/US047 — Decidir Contestação.md`       |
| US048 | Consultar Histórico de Contestações | `epic-06-contestaçoes-revisoes-monitoria/US048 — Consultar Histórico.md`       |
| US049 | Gerenciar Evidências da Contestação | `epic-06-contestaçoes-revisoes-monitoria/US049 — Gerenciar Evidências.md`      |
| US050 | Exportar Contestações               | `epic-06-contestaçoes-revisoes-monitoria/US050 — Exportar Contestações.md`     |

### EPIC-07 — Calibração de Avaliações

Documento: `epic-07-calibraçao-avaliações/EPIC-07 — Calibração de Avaliaçõe.md`

| ID    | User Story                              | Arquivo                                                              |
| ----- | --------------------------------------- | -------------------------------------------------------------------- |
| US051 | Criar Sessão de Calibração              | `epic-07-calibraçao-avaliações/US051 — Criar Sessão de Calibraçã.md` |
| US052 | Selecionar Monitorias para Calibração   | `epic-07-calibraçao-avaliações/US052 — Selecionar Monitorias.md`     |
| US053 | Registrar Avaliações dos Calibradores   | `epic-07-calibraçao-avaliações/US053 — Registrar Avaliações.md`      |
| US054 | Comparar Divergências entre Avaliadores | `epic-07-calibraçao-avaliações/US054 — Comparar Divergências.md`     |
| US055 | Consolidar Resultado da Calibração      | `epic-07-calibraçao-avaliações/US055 — Consolidar Resultado.md`      |
| US056 | Consultar Histórico de Calibrações      | `epic-07-calibraçao-avaliações/US056 — Consultar Histórico.md`       |
| US057 | Gerenciar Participantes da Calibração   | `epic-07-calibraçao-avaliações/US057 — Gerenciar Participantes.md`   |
| US058 | Exportar Calibrações                    | `epic-07-calibraçao-avaliações/US058 — Exportar Calibrações.md`      |

### EPIC-08 — Dashboards e Analytics

Documento: `epic-08-dashboard-analytics/EPIC-08 — Dashboards e Analytics.md`

| ID    | User Story                        | Arquivo                                                            |
| ----- | --------------------------------- | ------------------------------------------------------------------ |
| US059 | Dashboard Executivo               | `epic-08-dashboard-analytics/US059 — Dashboard Executivo.md`       |
| US060 | Dashboard Operacional             | `epic-08-dashboard-analytics/US060 — Dashboard Operacional.md`     |
| US061 | Dashboard Individual do Avaliador | `epic-08-dashboard-analytics/US061 — Dashboard Individual.md`      |
| US062 | Dashboard de Feedback e PDI       | `epic-08-dashboard-analytics/US062 — Dashboard de Feedback.md`     |
| US063 | Dashboard de Contestações         | `epic-08-dashboard-analytics/US063 — Dashboard de Contestações.md` |
| US064 | Dashboard de Calibração           | `epic-08-dashboard-analytics/US064 — Dashboard de Calibração.md`   |
| US065 | Configurar Indicadores (KPIs)     | `epic-08-dashboard-analytics/US065 — Configurar Indicadores.md`    |
| US066 | Exportar Dashboards               | `epic-08-dashboard-analytics/US066 — Exportar Dashboards.md`       |

### EPIC-09 — Inteligência Artificial

Documento: `epic-09-inteligencia-artificial/EPIC-09 — Inteligência Artificial.md`

| ID    | User Story                                | Arquivo                                                                |
| ----- | ----------------------------------------- | ---------------------------------------------------------------------- |
| US067 | Gerar Resumo Inteligente da Monitoria     | `epic-09-inteligencia-artificial/US067 — Gerar Resumo Inteligente.md`  |
| US068 | Sugerir Feedback com IA                   | `epic-09-inteligencia-artificial/US068 — Sugerir Feedback com IA.md`   |
| US069 | Recomendar Plano de Desenvolvimento (PDI) | `epic-09-inteligencia-artificial/US069 — Recomendar Plano de Desen.md` |
| US070 | Identificar Tendências e Padrões          | `epic-09-inteligencia-artificial/US070 — Identificar Tendências.md`    |
| US071 | Assistente Inteligente da Qualidade       | `epic-09-inteligencia-artificial/US071 — Assistente Inteligente.md`    |
| US072 | Classificar Comentários com IA            | `epic-09-inteligencia-artificial/US072 — Classificar Comentários.md`   |
| US073 | Configurar Modelos de IA                  | `epic-09-inteligencia-artificial/US073 — Configurar Modelos de IA.md`  |
| US074 | Auditar Interações com IA                 | `epic-09-inteligencia-artificial/US074 — Auditar Interações com IA.md` |

### EPIC-10 — Administração e Governança da Plataforma

Documento: `epic-10-administracao-governanca/EPIC-10 — Administração e Governa.md`

| ID    | User Story                          | Arquivo                                                             |
| ----- | ----------------------------------- | ------------------------------------------------------------------- |
| US077 | Configurar Parâmetros da Plataforma | `epic-10-administracao-governanca/US077 — Configurar Parâmetros.md` |
| US078 | Gerenciar Auditoria do Sistema      | `epic-10-administracao-governanca/US078 — Gerenciar Auditoria.md`   |
| US079 | Gerenciar Integrações               | `epic-10-administracao-governanca/US079 — Gerenciar Integrações.md` |
| US080 | Monitoramento e Saúde da Plataforma | `epic-10-administracao-governanca/US080 — Monitoramento e Saúde.md` |
| US081 | Backup e Recuperação                | `epic-10-administracao-governanca/US081 — Backup e Recuperação.md`  |
| US082 | Configurações Gerais e Multiempresa | `epic-10-administracao-governanca/US082 — Configurações Gerais.md`  |

## Definition of Ready

Uma história pode iniciar quando objetivo, escopo, critérios de aceite, dependências, permissões, auditoria e impacto técnico estiverem definidos e sem conflito com o PRD ou os ADRs.

## Definition of Done

Uma história somente pode ser concluída quando estiver implementada no escopo autorizado, testada, documentada, auditável, segura, acessível e validada pelos checks aplicáveis da fundação.
