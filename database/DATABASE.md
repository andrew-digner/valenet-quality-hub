# DATABASE.md

# Banco de Dados

## Valenet Quality Hub

Versão: 1.0

---

# 1. Objetivo

Este documento define o modelo de dados oficial do Valenet Quality Hub.

Seu objetivo é servir como fonte única de verdade para toda a camada de persistência da plataforma, estabelecendo padrões para modelagem, armazenamento, versionamento e evolução do banco de dados.

Todas as implementações relacionadas ao banco deverão seguir obrigatoriamente as diretrizes aqui descritas.

Este documento será utilizado como referência para:

- Modelagem das entidades
- Criação do schema Prisma
- Migrations
- Repositories
- DTOs
- APIs
- Relatórios
- Dashboards
- Integrações
- Inteligência Artificial

---

# Escopo

O documento contempla:

- Estrutura lógica do banco
- Entidades
- Relacionamentos
- Regras de integridade
- Convenções de nomenclatura
- Estratégias de auditoria
- Soft Delete
- Versionamento
- Índices
- Constraints
- Estratégias de migração
- Seeds
- Performance
- Segurança
- Dicionário de Dados

Não contempla detalhes de infraestrutura, backup ou replicação, que são tratados na documentação de arquitetura.

---

# Objetivos do Modelo de Dados

O modelo de dados foi projetado para atender aos seguintes princípios:

- Integridade referencial
- Escalabilidade
- Baixo acoplamento
- Facilidade de evolução
- Alto desempenho
- Auditoria completa
- Histórico preservado
- Compatibilidade com Prisma ORM
- Compatibilidade com PostgreSQL

---

# Fonte da Verdade

Toda alteração estrutural deverá ser refletida neste documento antes da implementação técnica.

Em caso de divergência entre o banco implementado e esta documentação, a documentação deverá ser atualizada ou a alteração deverá ser revertida, conforme decisão arquitetural.

Este documento é considerado a referência oficial para a estrutura de dados do Valenet Quality Hub.

# 2. Princípios do Modelo de Dados

---

## Objetivo

Este capítulo define os princípios arquiteturais que orientam a modelagem do banco de dados do Valenet Quality Hub.

Todas as entidades deverão seguir obrigatoriamente estas diretrizes para garantir consistência, desempenho, segurança e facilidade de evolução.

---

# Banco de Dados Oficial

O banco oficial da plataforma será:

**PostgreSQL 17+**

O acesso ao banco será realizado exclusivamente através do Prisma ORM.

Não será permitido acesso direto ao banco pelas regras de negócio.

---

# Modelagem

A modelagem seguirá um modelo relacional normalizado.

Objetivos:

- Evitar duplicação de dados
- Garantir integridade referencial
- Facilitar manutenção
- Permitir crescimento da aplicação

A desnormalização somente será permitida quando houver justificativa de performance.

---

# Chaves Primárias

Todas as entidades utilizarão UUID como chave primária.

Exemplo.

```text
id UUID PRIMARY KEY
```

Não será permitido utilizar IDs sequenciais (`SERIAL` ou `BIGSERIAL`) como chave primária.

---

# Chaves Estrangeiras

Todas as relações deverão utilizar Foreign Keys.

Exemplo.

```text
user_id

evaluation_id

form_version_id

team_id
```

As Foreign Keys deverão possuir índices.

---

# Convenção de Nomes

## Tabelas

Sempre utilizar:

- inglês;
- plural;
- snake_case.

Exemplos.

```text
users

forms

evaluations

feedbacks

appeals

audit_logs
```

---

## Colunas

Sempre utilizar:

snake_case

Exemplos.

```text
created_at

updated_at

deleted_at

evaluation_score

feedback_deadline
```

---

## Índices

Formato.

```text
idx_<table>_<field>
```

Exemplo.

```text
idx_users_email

idx_evaluations_status

idx_feedbacks_due_date
```

---

## Constraints

Formato.

```text
fk_

pk_

uk_

chk_
```

Exemplo.

```text
fk_feedback_user

uk_users_email

chk_score_range
```

---

# Campos Obrigatórios

Todas as entidades deverão possuir os seguintes campos.

| Campo      | Tipo      | Obrigatório |
| ---------- | --------- | ----------- |
| id         | UUID      | Sim         |
| created_at | Timestamp | Sim         |
| updated_at | Timestamp | Sim         |
| created_by | UUID      | Sim*        |
| updated_by | UUID      | Sim*        |
| deleted_at | Timestamp | Não         |
| deleted_by | UUID      | Não         |

\* Quando aplicável ao contexto da operação.

---

# Soft Delete

Nenhuma entidade crítica poderá ser removida fisicamente.

A exclusão será realizada através do preenchimento de:

```text
deleted_at

deleted_by
```

Consultas da aplicação deverão ignorar registros excluídos, salvo quando explicitamente solicitado.

---

# Auditoria

Toda operação crítica deverá ser registrada.

Exemplos:

- criação;
- edição;
- exclusão lógica;
- publicação;
- cancelamento;
- aprovação;
- rejeição.

Os registros de auditoria serão armazenados na tabela `audit_logs`.

---

# Integridade Referencial

Todas as relações deverão possuir Foreign Keys.

A remoção em cascata (`CASCADE DELETE`) será evitada para preservar histórico.

Preferências:

- RESTRICT
- NO ACTION
- SET NULL (quando apropriado)

---

# Timestamps

Todos os timestamps deverão utilizar:

```text
TIMESTAMP WITH TIME ZONE
```

Todos armazenados em UTC.

A conversão para o fuso horário do usuário ocorrerá apenas na camada de apresentação.

---

# Valores Monetários

Quando necessário, utilizar:

```text
NUMERIC(18,2)
```

Nunca utilizar:

```text
FLOAT

DOUBLE
```

---

# Percentuais

Utilizar:

```text
NUMERIC(5,2)
```

Exemplos.

```text
97.50

85.25

100.00
```

---

# Notas de Monitoria

Notas deverão utilizar:

```text
NUMERIC(5,2)
```

Faixa válida.

```text
0.00

↓

100.00
```

---

# Campos Booleanos

Sempre utilizar:

```text
BOOLEAN
```

Nunca utilizar:

```text
CHAR

VARCHAR

INTEGER
```

para representar verdadeiro ou falso.

---

# Campos de Texto

Utilizar.

| Tipo    | Utilização     |
| ------- | -------------- |
| VARCHAR | Campos curtos  |
| TEXT    | Conteúdo longo |

Exemplos.

```text
Nome → VARCHAR

Descrição → TEXT

Justificativa IA → TEXT
```

---

# ENUMs

Sempre utilizar ENUMs para valores fechados.

Exemplos.

- Status
- Perfil
- Tipo
- Origem
- Canal

Nunca utilizar texto livre para esses casos.

---

# JSONB

Utilizar JSONB apenas quando os dados forem naturalmente dinâmicos.

Exemplos.

- Configurações
- Metadados
- Payloads externos
- Prompts da IA
- Respostas completas de APIs

Nunca utilizar JSONB para substituir modelagem relacional.

---

# Versionamento

Entidades que exigem histórico deverão utilizar versionamento.

Exemplos.

- Formulários
- Configurações
- Prompts
- Templates

Uma nova versão nunca substituirá a anterior.

---

# Histórico

O sistema prioriza preservação de histórico.

Sempre que possível:

Criar nova versão

↓

Manter histórico

↓

Evitar sobrescrita

---

# Índices

Todo índice deverá possuir justificativa.

Priorizar índices para:

- Foreign Keys
- Campos de busca
- Datas
- Status
- Protocolos
- Usuários

Evitar excesso de índices.

---

# Constraints

Utilizar sempre que possível.

Exemplos.

- UNIQUE
- CHECK
- FOREIGN KEY
- NOT NULL

A integridade deve ser garantida pelo banco e não apenas pela aplicação.

---

# Performance

Consultas deverão priorizar:

- Paginação
- Índices
- Filtros eficientes
- Seleção apenas das colunas necessárias

Evitar:

```sql
SELECT *
```

---

# Escalabilidade

O modelo deverá suportar:

- Milhões de monitorias
- Centenas de milhares de feedbacks
- Histórico completo
- Crescimento contínuo
- Operação futura em múltiplas empresas (multi-tenant)

---

# Compatibilidade com Prisma

Todas as entidades deverão ser compatíveis com o Prisma ORM.

Evitar recursos que dificultem:

- Migrations
- Introspecção
- Geração de Client

---

# Filosofia

O banco de dados é um ativo estratégico do Valenet Quality Hub.

A modelagem deve privilegiar:

- Integridade
- Clareza
- Evolução
- Desempenho
- Auditoria
- Preservação de histórico

Qualquer alteração estrutural deverá ser cuidadosamente avaliada para garantir compatibilidade com o restante da plataforma e com as decisões arquiteturais registradas nos ADRs.

# 3. Convenções Gerais

---

# Objetivo

Este capítulo estabelece as convenções oficiais para modelagem, implementação e manutenção do banco de dados do Valenet Quality Hub.

Essas convenções deverão ser seguidas em todas as entidades, migrations e modelos Prisma.

O objetivo é garantir um banco consistente, previsível e fácil de evoluir.

---

# Convenções do Prisma

O Prisma ORM será a única camada de acesso ao banco de dados.

Todos os modelos deverão seguir as convenções abaixo.

---

## Nome dos Models

Os Models deverão utilizar:

- Singular
- PascalCase
- Inglês

Exemplo.

```prisma
model User

model Evaluation

model Feedback

model Appeal
```

---

## Nome das Tabelas

As tabelas deverão utilizar:

- plural
- snake_case
- inglês

Sempre utilizar `@@map`.

Exemplo.

```prisma
model User {

...

@@map("users")

}
```

---

## Nome das Colunas

Quando necessário, utilizar `@map`.

Exemplo.

```prisma
createdAt DateTime @map("created_at")
```

Nunca expor snake_case na aplicação.

A aplicação sempre utilizará camelCase.

---

# Convenção de Datas

Na aplicação.

```typescript
createdAt;

updatedAt;

deletedAt;
```

No banco.

```text
created_at

updated_at

deleted_at
```

---

# Convenção de IDs

Todos os IDs utilizarão UUID.

Exemplo.

```prisma
id String @id @default(uuid()) @db.Uuid
```

Nunca utilizar:

```text
Int

BigInt

Serial
```

como chave primária.

---

# Convenção para Foreign Keys

Sempre utilizar.

```text
<entity>Id
```

Na aplicação.

```typescript
userId;

teamId;

evaluationId;

formVersionId;
```

No banco.

```text
user_id

team_id

evaluation_id

form_version_id
```

---

# Convenção para Relacionamentos

## Um para Muitos

Exemplo.

```prisma
model User {

evaluations Evaluation[]

}
```

---

## Muitos para Um

```prisma
model Evaluation {

user User

userId String

}
```

---

## Muitos para Muitos

Sempre utilizar tabela intermediária explícita.

Nunca utilizar relacionamento implícito do Prisma.

Exemplo.

```text
users

roles

user_roles
```

Isso facilita:

- auditoria;
- histórico;
- metadados da relação;
- compatibilidade futura.

---

# Convenção para Tabelas de Junção

Nome.

```text
user_roles

team_users

role_permissions

evaluation_tags
```

Sempre em ordem alfabética quando possível.

---

# Campos Obrigatórios

Toda entidade deverá conter.

```prisma
id

createdAt

updatedAt

createdBy

updatedBy

deletedAt

deletedBy
```

Quando aplicável.

---

# createdBy / updatedBy

Representam o usuário responsável pela operação.

Sempre referenciarão a tabela:

```text
users
```

Quando a operação for automática.

Utilizar usuário de sistema.

Exemplo.

```text
SYSTEM
```

---

# Soft Delete

Obrigatório.

Campos.

```text
deleted_at

deleted_by
```

Nunca excluir registros críticos.

---

# Índices

Utilizar.

```prisma
@@index()
```

Exemplo.

```prisma
@@index([status])

@@index([createdAt])

@@index([teamId])
```

Toda Foreign Key deverá possuir índice.

---

# Índices Compostos

Criar apenas quando houver necessidade comprovada.

Exemplo.

```prisma
@@index([teamId, status])

@@index([createdAt, status])
```

---

# Unique

Sempre utilizar.

```prisma
@@unique()
```

Exemplo.

```prisma
@@unique([email])
```

Ou.

```prisma
@@unique([formId, version])
```

---

# Nome das Constraints

Seguir padrão.

```text
pk_

fk_

uk_

chk_

idx_
```

Exemplo.

```text
pk_users

fk_feedback_user

uk_users_email

idx_forms_status
```

---

# ENUMs

Todos os ENUMs deverão ser centralizados.

Exemplo.

```prisma
enum EvaluationStatus {

DRAFT

PUBLISHED

CANCELED

}
```

Nunca utilizar VARCHAR para representar valores fechados.

---

# Valores Padrão

Sempre definir valores padrão quando possível.

Exemplo.

```prisma
createdAt DateTime @default(now())

updatedAt DateTime @updatedAt

isActive Boolean @default(true)
```

---

# Nullabilidade

Campos obrigatórios.

Nunca permitir NULL.

Campos opcionais.

Permitir NULL apenas quando fizer sentido de negócio.

Nunca utilizar NULL para representar estados.

---

# Exclusão Física

Permitida apenas para:

- tabelas temporárias;
- cache;
- filas;
- logs técnicos de curta retenção.

Todas as entidades de negócio utilizarão Soft Delete.

---

# Versionamento

Entidades críticas utilizarão versionamento.

Exemplos.

```text
forms

settings

prompts

templates
```

Nunca sobrescrever versões publicadas.

---

# Histórico

Sempre preservar histórico.

Exemplo.

```text
forms

↓

form_versions

↓

monitorias antigas continuam apontando para a versão correta
```

---

# Auditoria

Toda operação deverá registrar.

- usuário;
- data;
- entidade;
- operação;
- valores antigos;
- valores novos.

---

# Seeds

Nunca utilizar Seeds para dados transacionais.

Seeds somente para:

- perfis;
- permissões;
- configurações iniciais;
- status;
- áreas padrão;
- canais;
- tipos.

---

# Migrations

Toda alteração estrutural deverá ocorrer através do Prisma Migrate.

Nunca alterar tabelas manualmente.

Toda migration deverá ser:

- pequena;
- reversível quando possível;
- documentada.

---

# Compatibilidade

Toda modelagem deverá ser compatível com:

- Prisma ORM
- PostgreSQL
- PostgreSQL Extensions
- Read Replicas
- Particionamento futuro

---

# Performance

Toda entidade deverá considerar.

- índices;
- volume esperado;
- frequência de leitura;
- frequência de escrita.

Evitar otimizações prematuras.

---

# Multiempresa (Roadmap)

O banco deverá ser preparado para futura operação multiempresa.

Quando implementado, as entidades de negócio passarão a possuir:

```text
tenant_id
```

A versão inicial permanecerá single-tenant.

---

# Integridade

A integridade dos dados deverá ser garantida prioritariamente pelo banco de dados através de:

- Foreign Keys;
- Constraints;
- Índices;
- Regras de unicidade.

A aplicação complementará essas validações, mas nunca será a única responsável por elas.

---

# Convenções Resumidas

| Item               | Convenção             |
| ------------------ | --------------------- |
| Model              | Singular + PascalCase |
| Tabela             | Plural + snake_case   |
| Coluna             | snake_case            |
| Propriedade Prisma | camelCase             |
| Chave Primária     | UUID                  |
| Chave Estrangeira  | entity_id             |
| Datas              | UTC                   |
| Soft Delete        | Obrigatório           |
| Auditoria          | Obrigatória           |
| Versionamento      | Quando aplicável      |
| Relacionamento N:N | Tabela explícita      |
| Migrations         | Prisma Migrate        |
| ORM                | Prisma                |

---

# Filosofia

O modelo de dados deve permanecer simples, consistente e evolutivo.

Todas as convenções deste capítulo existem para garantir previsibilidade, facilitar o desenvolvimento assistido por IA e reduzir o custo de manutenção ao longo do ciclo de vida do Valenet Quality Hub.

# 4. Estrutura Organizacional

---

# Objetivo

A Estrutura Organizacional representa a hierarquia operacional da empresa dentro do Valenet Quality Hub.

Ela será utilizada para:

- Controle de acesso
- Escopo das permissões
- Dashboards
- Monitorias
- Feedbacks
- Contestação
- Calibração
- Indicadores
- SLAs
- Configurações específicas

Todas as entidades de negócio estarão vinculadas, direta ou indiretamente, à estrutura organizacional.

---

# Hierarquia Organizacional

A plataforma suportará a seguinte estrutura.

```text
Empresa (Roadmap)

↓

Área

↓

Equipe

↓

Usuário
```

Na versão inicial, o sistema será **single-tenant**, portanto a entidade **Empresa** não será implementada, mas o modelo permanecerá preparado para futura expansão.

---

# Entidades

A estrutura organizacional será composta pelas seguintes tabelas:

```text
areas

teams

team_users
```

---

# Área (areas)

Representa um departamento ou unidade operacional.

Exemplos:

- Atendimento
- Suporte Técnico
- Financeiro
- Comercial
- Ouvidoria
- Retenção

Uma Área poderá possuir diversas equipes.

---

## Estrutura

| Campo       | Tipo         | Obrigatório |
| ----------- | ------------ | ----------- |
| id          | UUID         | Sim         |
| name        | VARCHAR(150) | Sim         |
| code        | VARCHAR(50)  | Sim         |
| description | TEXT         | Não         |
| is_active   | BOOLEAN      | Sim         |
| created_at  | TIMESTAMP    | Sim         |
| updated_at  | TIMESTAMP    | Sim         |
| created_by  | UUID         | Sim         |
| updated_by  | UUID         | Sim         |
| deleted_at  | TIMESTAMP    | Não         |
| deleted_by  | UUID         | Não         |

---

## Índices

```text
PK(id)

UK(code)

IDX(name)

IDX(is_active)
```

---

## Constraints

Nome da Área obrigatório.

Código único.

Não permitir exclusão caso existam equipes vinculadas.

---

# Equipe (teams)

Representa uma equipe operacional pertencente a uma Área.

Exemplos:

- Atendimento BH
- Atendimento Regional Leste
- Suporte Nível 2
- Comercial Vendas Online

---

## Estrutura

| Campo          | Tipo         | Obrigatório |
| -------------- | ------------ | ----------- |
| id             | UUID         | Sim         |
| area_id        | UUID         | Sim         |
| name           | VARCHAR(150) | Sim         |
| code           | VARCHAR(50)  | Sim         |
| description    | TEXT         | Não         |
| leader_user_id | UUID         | Não         |
| is_active      | BOOLEAN      | Sim         |
| created_at     | TIMESTAMP    | Sim         |
| updated_at     | TIMESTAMP    | Sim         |
| created_by     | UUID         | Sim         |
| updated_by     | UUID         | Sim         |
| deleted_at     | TIMESTAMP    | Não         |
| deleted_by     | UUID         | Não         |

---

## Relacionamentos

```text
Área

1

↓

N

Equipe
```

---

## Índices

```text
IDX(area_id)

IDX(name)

IDX(leader_user_id)

UK(code)
```

---

# Team Users (team_users)

Tabela responsável por vincular usuários às equipes.

Foi escolhida uma tabela de relacionamento explícita para permitir histórico e futuras expansões.

Um usuário poderá participar de mais de uma equipe.

Uma equipe possuirá diversos usuários.

---

## Estrutura

| Campo      | Tipo      | Obrigatório |
| ---------- | --------- | ----------- |
| id         | UUID      | Sim         |
| team_id    | UUID      | Sim         |
| user_id    | UUID      | Sim         |
| start_date | DATE      | Sim         |
| end_date   | DATE      | Não         |
| is_primary | BOOLEAN   | Sim         |
| created_at | TIMESTAMP | Sim         |
| created_by | UUID      | Sim         |

---

## Relacionamentos

```text
Users

N

↓

team_users

↑

N

Teams
```

---

## Constraints

Não permitir duplicidade de vínculo ativo entre usuário e equipe.

Constraint recomendada.

```text
UNIQUE(team_id, user_id, end_date)
```

---

# Regras de Negócio

## Áreas

Uma Área poderá possuir várias equipes.

Uma Área não poderá ser excluída caso existam equipes ativas vinculadas.

A desativação de uma Área impedirá novas monitorias vinculadas a ela.

---

## Equipes

Uma equipe pertence obrigatoriamente a apenas uma Área.

Uma equipe poderá possuir um líder responsável.

Uma equipe poderá conter qualquer quantidade de usuários.

---

## Usuários

Um usuário poderá:

- pertencer a várias equipes;
- possuir uma equipe principal;
- mudar de equipe sem perder histórico.

O histórico de movimentação deverá ser preservado.

---

# Utilização no Sistema

A estrutura organizacional será utilizada por:

- Permissões RBAC
- Dashboard
- Indicadores
- Feedback
- Monitorias
- Contestação
- Calibração
- Filtros
- SLAs
- IA

---

# Consultas Frequentes

Exemplos de consultas esperadas.

```text
Usuários por equipe

Equipes por área

Monitorias por área

Monitorias por equipe

Feedbacks por equipe

Ranking por área

Indicadores por área

SLA por equipe
```

Todos esses cenários deverão possuir índices adequados.

---

# Evolução Futura

A estrutura foi preparada para suportar:

- Multiempresa
- Organograma multinível
- Filiais
- Regionais
- Coordenações
- Times temporários

Sem necessidade de remodelagem significativa.

---

# Próximas Entidades

Após a estrutura organizacional, serão modeladas as entidades de Segurança e Controle de Acesso:

- users
- roles
- permissions
- role_permissions
- user_roles

Essas entidades utilizarão a estrutura organizacional como base para definir escopos de acesso e governança da plataforma.

# 5. Segurança e Controle de Acesso

---

# Objetivo

O módulo de Segurança é responsável pela autenticação, autorização e governança de acesso ao Valenet Quality Hub.

Seu objetivo é garantir que cada usuário visualize e execute apenas as operações permitidas pelo seu perfil e escopo organizacional.

O modelo adotado é baseado em **RBAC (Role-Based Access Control)** com suporte a escopo por Área e Equipe.

---

# Visão Geral

As entidades deste módulo são:

```text
users

roles

permissions

role_permissions

user_roles
```

Relacionamento.

```text
Users

↓

User Roles

↓

Roles

↓

Role Permissions

↓

Permissions
```

---

# Usuários (users)

Representa todas as pessoas que acessam a plataforma.

Exemplos.

- Administrador
- Monitor
- Supervisor
- Coordenador
- Gerente
- Atendente

---

## Estrutura

| Campo         | Tipo             | Obrigatório |
| ------------- | ---------------- | ----------- |
| id            | UUID             | Sim         |
| employee_code | VARCHAR(50)      | Sim         |
| full_name     | VARCHAR(200)     | Sim         |
| email         | VARCHAR(255)     | Sim         |
| document      | VARCHAR(20)      | Não         |
| phone         | VARCHAR(30)      | Não         |
| avatar_url    | TEXT             | Não         |
| status        | ENUM(UserStatus) | Sim         |
| last_login_at | TIMESTAMP        | Não         |
| created_at    | TIMESTAMP        | Sim         |
| updated_at    | TIMESTAMP        | Sim         |
| created_by    | UUID             | Sim         |
| updated_by    | UUID             | Sim         |
| deleted_at    | TIMESTAMP        | Não         |
| deleted_by    | UUID             | Não         |

---

## Índices

```text
PK(id)

UK(email)

UK(employee_code)

IDX(status)

IDX(full_name)
```

---

## Regras

O e-mail deverá ser único.

O código do colaborador deverá ser único.

O login será realizado preferencialmente via Microsoft Entra ID.

A senha não será armazenada quando houver autenticação corporativa (SSO).

---

# Perfis (roles)

Define o perfil funcional do usuário.

Exemplos.

- Administrator
- Monitor
- Supervisor
- Coordinator
- Manager
- Agent

---

## Estrutura

| Campo       | Tipo         |
| ----------- | ------------ |
| id          | UUID         |
| name        | VARCHAR(100) |
| code        | VARCHAR(50)  |
| description | TEXT         |
| is_system   | BOOLEAN      |
| created_at  | TIMESTAMP    |
| updated_at  | TIMESTAMP    |

---

## Índices

```text
UK(code)

IDX(name)
```

---

# Permissões (permissions)

Representa uma ação executável dentro do sistema.

---

## Estrutura

| Campo       | Tipo         |
| ----------- | ------------ |
| id          | UUID         |
| module      | VARCHAR(100) |
| resource    | VARCHAR(100) |
| action      | VARCHAR(50)  |
| description | TEXT         |

---

## Exemplos

```text
users.create

users.update

users.delete

forms.publish

forms.archive

evaluations.publish

feedbacks.apply

appeals.approve

dashboard.view
```

---

## Índices

```text
IDX(module)

UK(resource, action)
```

---

# Role Permissions (role_permissions)

Relaciona perfis às permissões.

---

## Estrutura

| Campo         | Tipo      |
| ------------- | --------- |
| id            | UUID      |
| role_id       | UUID      |
| permission_id | UUID      |
| created_at    | TIMESTAMP |

---

## Constraint

```text
UNIQUE(role_id, permission_id)
```

---

# User Roles (user_roles)

Relaciona usuários aos perfis.

Um usuário poderá possuir múltiplos perfis.

Exemplos.

```text
Monitor

+

Supervisor
```

---

## Estrutura

| Campo      | Tipo      |
| ---------- | --------- |
| id         | UUID      |
| user_id    | UUID      |
| role_id    | UUID      |
| area_id    | UUID      |
| team_id    | UUID      |
| start_date | DATE      |
| end_date   | DATE      |
| created_at | TIMESTAMP |

---

## Escopo

Um perfil poderá possuir diferentes níveis de atuação.

Exemplos.

Administrador

```text
Empresa inteira
```

Supervisor

```text
Área Comercial
```

Monitor

```text
Equipe Atendimento BH
```

---

## Constraint

```text
UNIQUE(user_id, role_id, area_id, team_id)
```

---

# Fluxo de Autorização

```text
Login

↓

Usuário

↓

Perfis

↓

Permissões

↓

Escopo

↓

Autorização
```

---

# Regras de Negócio

## Usuários

- Um usuário pode possuir vários perfis.
- Um perfil pode ser limitado a uma área.
- Um perfil pode ser limitado a uma equipe.
- O histórico de alterações de perfil deve ser preservado.

---

## Perfis

Perfis de sistema não poderão ser excluídos.

Perfis personalizados poderão ser criados pelo Administrador.

---

## Permissões

Permissões são cadastradas pelo sistema e utilizadas para controlar ações específicas.

Novas permissões deverão ser adicionadas via migration e seeds.

---

# Auditoria

As seguintes operações deverão ser auditadas:

- Criação de usuário
- Alteração de usuário
- Bloqueio de usuário
- Alteração de perfil
- Alteração de permissões
- Alteração de escopo

---

# Consultas Frequentes

Exemplos.

```text
Quais perfis um usuário possui?

Quais permissões um perfil possui?

Quais usuários pertencem à equipe X?

Quais usuários possuem acesso à Área Comercial?

Quais administradores estão ativos?
```

Todos esses cenários deverão possuir índices adequados.

---

# Evolução Futura

O modelo suporta futuras funcionalidades como:

- Delegação temporária de acesso
- Perfis personalizados por empresa
- Escopos por filial
- Multiempresa (tenant_id)
- Políticas baseadas em atributos (ABAC)

Sem necessidade de remodelagem estrutural.

---

# Próximas Entidades

Após Segurança e Controle de Acesso, será modelado o núcleo funcional do sistema:

- forms
- form_versions
- form_sections
- form_questions
- question_options

Essas entidades representam o motor de monitoria e serão utilizadas tanto nas avaliações manuais quanto nas avaliações realizadas por Inteligência Artificial.

# 6. Motor de Formulários

---

# Objetivo

O Motor de Formulários é responsável por definir como as monitorias serão realizadas dentro do Valenet Quality Hub.

Toda avaliação, independentemente de ser executada manualmente ou por Inteligência Artificial, utilizará uma versão publicada de um formulário.

O modelo foi projetado para suportar:

- Versionamento completo
- Seções
- Perguntas
- Pesos
- Regras
- Critérios eliminatórios
- Campos obrigatórios
- IA
- Evolução futura sem perda de histórico

---

# Visão Geral

O módulo será composto pelas seguintes entidades.

```text
forms

↓

form_versions

↓

form_sections

↓

form_questions

↓

question_options
```

---

# Fluxo

```text
Formulário

↓

Nova Versão

↓

Seções

↓

Perguntas

↓

Publicação

↓

Monitorias
```

Após publicada, uma versão nunca poderá ser alterada.

---

# Formulários (forms)

Representa o formulário lógico.

Exemplos.

- Atendimento Voz
- Atendimento WhatsApp
- Ouvidoria
- Financeiro

A tabela `forms` representa apenas o cadastro principal.

As perguntas estarão nas versões.

---

## Estrutura

| Campo           | Tipo              |
| --------------- | ----------------- |
| id              | UUID              |
| name            | VARCHAR(200)      |
| code            | VARCHAR(50)       |
| description     | TEXT              |
| area_id         | UUID              |
| channel         | ENUM(ChannelType) |
| status          | ENUM(FormStatus)  |
| current_version | INTEGER           |
| created_at      | TIMESTAMP         |
| updated_at      | TIMESTAMP         |
| created_by      | UUID              |
| updated_by      | UUID              |
| deleted_at      | TIMESTAMP         |
| deleted_by      | UUID              |

---

## Índices

```text
UK(code)

IDX(area_id)

IDX(channel)

IDX(status)
```

---

# Regras

Um formulário pode possuir inúmeras versões.

Apenas uma versão poderá estar publicada.

---

# Form Versions (form_versions)

Representa cada versão publicada.

Nunca será alterada após publicação.

---

## Estrutura

| Campo             | Tipo                    |
| ----------------- | ----------------------- |
| id                | UUID                    |
| form_id           | UUID                    |
| version           | INTEGER                 |
| title             | VARCHAR(200)            |
| description       | TEXT                    |
| published_at      | TIMESTAMP               |
| published_by      | UUID                    |
| status            | ENUM(FormVersionStatus) |
| total_weight      | NUMERIC(8,2)            |
| maximum_score     | NUMERIC(8,2)            |
| minimum_score     | NUMERIC(8,2)            |
| ai_enabled        | BOOLEAN                 |
| feedback_required | BOOLEAN                 |
| appeal_allowed    | BOOLEAN                 |
| created_at        | TIMESTAMP               |

---

## Constraints

```text
UNIQUE(form_id, version)
```

---

# Regras

Versões publicadas são imutáveis.

Caso seja necessária alteração:

Criar nova versão.

Nunca editar uma versão publicada.

---

# Form Sections (form_sections)

Organiza perguntas em grupos.

Exemplos.

- Saudação
- Diagnóstico
- Solução
- Encerramento

---

## Estrutura

| Campo           | Tipo         |
| --------------- | ------------ |
| id              | UUID         |
| form_version_id | UUID         |
| title           | VARCHAR(200) |
| description     | TEXT         |
| display_order   | INTEGER      |
| weight          | NUMERIC(6,2) |
| is_required     | BOOLEAN      |

---

## Índices

```text
IDX(form_version_id)

IDX(display_order)
```

---

# Regras

As seções definem apenas organização.

A nota será calculada pelas perguntas.

---

# Form Questions (form_questions)

Representa cada pergunta do formulário.

Esta é a entidade mais importante do módulo.

---

## Estrutura

| Campo             | Tipo               |
| ----------------- | ------------------ |
| id                | UUID               |
| section_id        | UUID               |
| question          | TEXT               |
| help_text         | TEXT               |
| display_order     | INTEGER            |
| question_type     | ENUM(QuestionType) |
| weight            | NUMERIC(8,2)       |
| maximum_score     | NUMERIC(8,2)       |
| minimum_score     | NUMERIC(8,2)       |
| is_required       | BOOLEAN            |
| is_eliminatory    | BOOLEAN            |
| allows_comment    | BOOLEAN            |
| allows_attachment | BOOLEAN            |
| ai_evaluable      | BOOLEAN            |
| created_at        | TIMESTAMP          |

---

## Exemplos

```text
O atendente confirmou os dados do cliente?

↓

Sim

↓

Não
```

---

```text
O atendente demonstrou empatia?

↓

0 a 10
```

---

```text
A solução apresentada foi correta?

↓

Texto
```

---

# Tipos de Pergunta

Os tipos suportados serão.

```text
BOOLEAN

SINGLE_CHOICE

MULTIPLE_CHOICE

TEXT

NUMBER

DECIMAL

SCORE

DATE

TIME

FILE
```

Novos tipos poderão ser adicionados futuramente.

---

# Question Options (question_options)

Utilizada apenas para perguntas de seleção.

---

## Estrutura

| Campo         | Tipo         |
| ------------- | ------------ |
| id            | UUID         |
| question_id   | UUID         |
| label         | VARCHAR(200) |
| value         | VARCHAR(100) |
| score         | NUMERIC(8,2) |
| display_order | INTEGER      |
| is_default    | BOOLEAN      |

---

## Exemplo

```text
Sim

↓

100 pontos
```

```text
Parcialmente

↓

50 pontos
```

```text
Não

↓

0 pontos
```

---

# Regras de Negócio

## Formulários

- Um formulário possui várias versões.
- Apenas uma versão pode estar publicada.
- Um formulário pode ser arquivado.
- O código é único.

---

## Versões

- Nunca editar versão publicada.
- Monitorias sempre apontam para uma versão específica.
- A publicação cria uma fotografia permanente do formulário.

---

## Perguntas

Cada pergunta poderá:

- possuir peso;
- possuir nota máxima;
- possuir comentário obrigatório;
- aceitar anexos;
- ser eliminatória;
- ser avaliada pela IA.

---

## Critérios Eliminatórios

Perguntas marcadas como eliminatórias poderão zerar automaticamente a nota da monitoria ou aplicar outra regra configurável.

O comportamento será definido na configuração do formulário.

---

## Ordem

A ordem de apresentação será determinada por:

```text
display_order
```

Nunca pela data de criação.

---

# Consultas Frequentes

Exemplos.

```text
Buscar formulário ativo

↓

Buscar versão publicada

↓

Buscar seções

↓

Buscar perguntas

↓

Buscar opções
```

Todos esses cenários deverão possuir índices.

---

# Auditoria

Registrar:

- criação;
- nova versão;
- publicação;
- arquivamento;
- alteração de status.

Nunca registrar alterações em versões publicadas, pois elas são imutáveis.

---

# Evolução Futura

O modelo suporta:

- Perguntas condicionais
- Ramificações (Branching)
- Regras de cálculo customizadas
- Fórmulas
- Campos dinâmicos
- Bibliotecas de perguntas
- Templates reutilizáveis
- Formulários compartilhados entre áreas

Sem necessidade de remodelagem estrutural.

---

# Próximas Entidades

Após o Motor de Formulários, serão modeladas as entidades responsáveis pelas monitorias propriamente ditas:

- evaluations
- evaluation_answers
- evaluation_evidences

Essas entidades armazenarão o resultado das avaliações manuais e automáticas realizadas pela plataforma.

# 7. Motor de Monitorias

---

# Objetivo

O Motor de Monitorias é responsável por registrar todas as avaliações realizadas na plataforma.

Uma monitoria representa a avaliação completa de um atendimento, utilizando uma versão específica de um formulário.

A monitoria poderá ser realizada:

- Manualmente
- Pela Inteligência Artificial
- De forma híbrida (IA + Validação Humana)

Todo o histórico deverá ser preservado.

---

# Visão Geral

O módulo será composto pelas seguintes entidades.

```text
evaluations

↓

evaluation_answers

↓

evaluation_evidences

↓

evaluation_scores
```

---

# Fluxo

```text
Atendimento

↓

Importação

↓

Monitoria

↓

Respostas

↓

Cálculo da Nota

↓

Publicação

↓

Feedback

↓

Contestação (opcional)

↓

Dashboard
```

---

# Evaluations

Representa uma monitoria completa.

É a principal entidade do sistema.

---

## Estrutura

| Campo             | Tipo                   |
| ----------------- | ---------------------- |
| id                | UUID                   |
| protocol          | VARCHAR(100)           |
| external_id       | VARCHAR(150)           |
| channel           | ENUM(ChannelType)      |
| form_version_id   | UUID                   |
| evaluator_user_id | UUID                   |
| evaluated_user_id | UUID                   |
| team_id           | UUID                   |
| area_id           | UUID                   |
| ai_execution_id   | UUID                   |
| monitoring_type   | ENUM(MonitoringType)   |
| status            | ENUM(EvaluationStatus) |
| score             | NUMERIC(6,2)           |
| maximum_score     | NUMERIC(6,2)           |
| percentage        | NUMERIC(5,2)           |
| started_at        | TIMESTAMP              |
| completed_at      | TIMESTAMP              |
| published_at      | TIMESTAMP              |
| created_at        | TIMESTAMP              |
| updated_at        | TIMESTAMP              |
| created_by        | UUID                   |
| updated_by        | UUID                   |
| deleted_at        | TIMESTAMP              |
| deleted_by        | UUID                   |

---

## MonitoringType

```text
MANUAL

AI

HYBRID
```

---

## EvaluationStatus

```text
DRAFT

IN_PROGRESS

COMPLETED

PUBLISHED

CANCELED
```

---

## Índices

```text
PK(id)

IDX(protocol)

IDX(channel)

IDX(status)

IDX(team_id)

IDX(area_id)

IDX(evaluated_user_id)

IDX(evaluator_user_id)

IDX(form_version_id)

IDX(created_at)

IDX(published_at)
```

---

# Regras

Uma monitoria pertence obrigatoriamente a:

- um atendimento;
- um formulário;
- uma versão publicada;
- um colaborador avaliado.

Após publicada, a monitoria não poderá ser alterada.

Qualquer alteração posterior deverá ocorrer através de:

- Contestação;
- Nova avaliação;
- Revisão.

Nunca sobrescrevendo o registro original.

---

# Evaluation Answers

Armazena a resposta de cada pergunta.

---

## Estrutura

| Campo          | Tipo          |
| -------------- | ------------- |
| id             | UUID          |
| evaluation_id  | UUID          |
| question_id    | UUID          |
| option_id      | UUID          |
| answer_text    | TEXT          |
| answer_number  | NUMERIC(10,2) |
| score          | NUMERIC(6,2)  |
| is_eliminatory | BOOLEAN       |
| ai_generated   | BOOLEAN       |
| justification  | TEXT          |
| created_at     | TIMESTAMP     |

---

## Regras

Cada resposta pertence a:

- uma monitoria;
- uma pergunta.

As respostas nunca serão alteradas após a publicação.

---

# Evaluation Evidences

Armazena evidências utilizadas durante a avaliação.

Exemplos.

- Trechos da conversa.
- Áudios.
- Prints.
- PDFs.
- Links.
- Evidências geradas pela IA.

---

## Estrutura

| Campo              | Tipo               |
| ------------------ | ------------------ |
| id                 | UUID               |
| evaluation_id      | UUID               |
| answer_id          | UUID               |
| evidence_type      | ENUM(EvidenceType) |
| file_url           | TEXT               |
| transcript_excerpt | TEXT               |
| ai_reference       | TEXT               |
| created_at         | TIMESTAMP          |

---

## EvidenceType

```text
AUDIO

IMAGE

PDF

TRANSCRIPT

LINK

AI_REFERENCE
```

---

# Evaluation Scores

Tabela utilizada para armazenar o cálculo detalhado da nota.

---

## Estrutura

| Campo         | Tipo         |
| ------------- | ------------ |
| id            | UUID         |
| evaluation_id | UUID         |
| section_id    | UUID         |
| score         | NUMERIC(6,2) |
| maximum_score | NUMERIC(6,2) |
| percentage    | NUMERIC(5,2) |

---

# Benefícios

Permite recalcular dashboards sem precisar reprocessar todas as respostas.

Também facilita análises por seção.

---

# Regras de Negócio

## Publicação

Uma monitoria somente poderá ser publicada quando:

- Todas as perguntas obrigatórias forem respondidas.
- O cálculo da nota estiver concluído.
- Não existirem inconsistências.

---

## IA

Quando a monitoria for realizada pela IA, deverão ser registrados:

- Modelo utilizado.
- Prompt utilizado.
- Tempo de execução.
- Score de confiança.

Essas informações ficarão em tabelas específicas do módulo de IA.

---

## Histórico

Toda monitoria deverá manter:

- formulário utilizado;
- versão utilizada;
- respostas;
- evidências;
- cálculo da nota.

Mesmo que o formulário seja alterado futuramente.

---

## Reprocessamento

Caso seja necessário recalcular uma monitoria:

Nunca alterar os dados originais.

Criar nova versão do cálculo preservando o histórico.

---

# Consultas Frequentes

Exemplos.

```text
Monitorias por colaborador

Monitorias por equipe

Monitorias por área

Monitorias por formulário

Monitorias por período

Monitorias realizadas por IA

Monitorias pendentes de feedback

Monitorias contestadas
```

Todos esses cenários deverão possuir índices adequados.

---

# Auditoria

Registrar obrigatoriamente:

- criação;
- conclusão;
- publicação;
- cancelamento;
- reprocessamento;
- alteração de status.

---

# Evolução Futura

O modelo suporta:

- Dupla avaliação.
- Avaliação por múltiplos monitores.
- Avaliação por consenso.
- Avaliação contínua.
- Score por competência.
- Benchmark entre avaliadores.
- Avaliação assistida por IA.

Sem necessidade de remodelagem estrutural.

---

# Próximas Entidades

Após o Motor de Monitorias serão modelados:

- feedbacks
- development_plans
- acknowledgements

Essas entidades compõem o ciclo de desenvolvimento do colaborador após a conclusão da monitoria.

# 8. Gestão de Feedback

---

# Objetivo

O módulo de Feedback é responsável por registrar todo o processo de devolutiva da monitoria ao colaborador.

O Feedback representa a formalização da avaliação e constitui uma etapa obrigatória do ciclo de qualidade.

Todo Feedback deverá estar vinculado a uma monitoria publicada.

O módulo também controla:

- Prazo de aplicação
- Ciência do colaborador
- Plano de Desenvolvimento (PDI)
- Histórico
- Indicadores de SLA

---

# Visão Geral

O módulo será composto pelas seguintes entidades.

```text
feedbacks

↓

feedback_acknowledgements

↓

development_plans

↓

development_actions
```

---

# Fluxo

```text
Monitoria Publicada

↓

Feedback Criado

↓

Agendamento

↓

Aplicação

↓

Ciência do Colaborador

↓

Plano de Desenvolvimento (Opcional)

↓

Conclusão
```

---

# Feedbacks

Representa a devolutiva oficial da monitoria.

---

## Estrutura

| Campo                     | Tipo                 |
| ------------------------- | -------------------- |
| id                        | UUID                 |
| evaluation_id             | UUID                 |
| evaluator_user_id         | UUID                 |
| leader_user_id            | UUID                 |
| employee_user_id          | UUID                 |
| status                    | ENUM(FeedbackStatus) |
| due_date                  | TIMESTAMP            |
| scheduled_at              | TIMESTAMP            |
| applied_at                | TIMESTAMP            |
| comments                  | TEXT                 |
| strengths                 | TEXT                 |
| improvements              | TEXT                 |
| requires_development_plan | BOOLEAN              |
| created_at                | TIMESTAMP            |
| updated_at                | TIMESTAMP            |

---

## FeedbackStatus

```text
PENDING

SCHEDULED

APPLIED

ACKNOWLEDGED

OVERDUE

CANCELED
```

---

# Regras

Cada monitoria poderá possuir apenas um Feedback ativo.

O prazo será calculado conforme as regras da Área.

O sistema deverá alertar feedbacks próximos ao vencimento.

---

# Feedback Acknowledgements

Representa a ciência do colaborador.

---

## Estrutura

| Campo           | Tipo      |
| --------------- | --------- |
| id              | UUID      |
| feedback_id     | UUID      |
| acknowledged_by | UUID      |
| acknowledged_at | TIMESTAMP |
| comments        | TEXT      |

---

## Regras

A ciência não significa concordância.

Apenas confirma que o colaborador tomou conhecimento do feedback.

---

# Development Plans

Plano de Desenvolvimento Individual (PDI).

Criado quando o Feedback exigir acompanhamento.

---

## Estrutura

| Campo               | Tipo                    |
| ------------------- | ----------------------- |
| id                  | UUID                    |
| feedback_id         | UUID                    |
| responsible_user_id | UUID                    |
| status              | ENUM(DevelopmentStatus) |
| objective           | TEXT                    |
| expected_result     | TEXT                    |
| due_date            | DATE                    |
| completed_at        | TIMESTAMP               |

---

## DevelopmentStatus

```text
OPEN

IN_PROGRESS

COMPLETED

CANCELED
```

---

# Development Actions

Representa cada ação do PDI.

---

## Estrutura

| Campo               | Tipo               |
| ------------------- | ------------------ |
| id                  | UUID               |
| development_plan_id | UUID               |
| title               | VARCHAR(200)       |
| description         | TEXT               |
| due_date            | DATE               |
| completed_at        | TIMESTAMP          |
| status              | ENUM(ActionStatus) |

---

## ActionStatus

```text
OPEN

DONE

CANCELED
```

---

# Regras de Negócio

## Feedback

Todo Feedback pertence obrigatoriamente a uma monitoria publicada.

O Feedback somente poderá ser aplicado por usuários autorizados.

O prazo de aplicação será definido por Área ou Configuração Global.

---

## Ciência

O colaborador poderá registrar comentários.

A ciência deverá permanecer registrada permanentemente.

---

## Plano de Desenvolvimento

Será opcional.

Uma vez criado, deverá possuir histórico completo.

Todas as alterações deverão ser auditadas.

---

# Indicadores

O módulo deverá fornecer indicadores como:

- Feedbacks pendentes
- Feedbacks vencidos
- SLA de aplicação
- Tempo médio de aplicação
- PDIs em aberto
- PDIs concluídos
- Colaboradores em acompanhamento

---

# Auditoria

Registrar obrigatoriamente:

- criação;
- alteração;
- aplicação;
- ciência;
- criação de PDI;
- conclusão;
- cancelamento.

---

# Consultas Frequentes

```text
Feedbacks pendentes

Feedbacks vencidos

Feedbacks por líder

Feedbacks por colaborador

PDIs em aberto

PDIs concluídos

Tempo médio de aplicação

SLA por Área
```

Todos esses cenários deverão possuir índices específicos.

---

# Evolução Futura

O modelo suporta:

- Feedback coletivo
- Feedback em grupo
- Múltiplos responsáveis
- Assinatura eletrônica
- Registro de reuniões
- Integração com LMS
- Trilhas de capacitação
- Avaliação da efetividade do PDI

Sem necessidade de remodelagem estrutural.

---

# Próximas Entidades

Após o módulo de Feedback serão modeladas:

- appeals
- appeal_interactions
- appeal_decisions

Essas entidades serão responsáveis por controlar todo o fluxo de contestação das monitorias.

# 9. Gestão de Contestações

---

# Objetivo

O módulo de Contestações é responsável por controlar todo o processo de revisão de uma monitoria após sua publicação.

Uma contestação permite que a liderança ou o colaborador solicite uma reavaliação da monitoria quando identificar divergências na avaliação realizada.

Todo o processo deverá ser totalmente auditável.

Nenhuma informação original poderá ser sobrescrita.

---

# Visão Geral

O módulo será composto pelas seguintes entidades.

```text
appeals

↓

appeal_interactions

↓

appeal_reviews

↓

appeal_decisions
```

---

# Fluxo

```text
Monitoria Publicada

↓

Contestação Aberta

↓

Análise

↓

Interações

↓

Reavaliação

↓

Decisão

↓

Atualização dos Indicadores
```

---

# Appeals

Representa uma contestação.

---

## Estrutura

| Campo         | Tipo               |
| ------------- | ------------------ |
| id            | UUID               |
| evaluation_id | UUID               |
| requested_by  | UUID               |
| assigned_to   | UUID               |
| status        | ENUM(AppealStatus) |
| reason        | TEXT               |
| deadline_at   | TIMESTAMP          |
| opened_at     | TIMESTAMP          |
| closed_at     | TIMESTAMP          |
| created_at    | TIMESTAMP          |
| updated_at    | TIMESTAMP          |

---

## AppealStatus

```text
OPEN

UNDER_REVIEW

WAITING_INFORMATION

APPROVED

PARTIALLY_APPROVED

REJECTED

CANCELED
```

---

# Regras

Cada monitoria poderá possuir várias contestações ao longo do tempo.

Apenas uma contestação poderá permanecer aberta simultaneamente.

O prazo máximo será definido nas Configurações da Área.

---

# Appeal Interactions

Representa todas as interações durante a análise.

---

## Estrutura

| Campo          | Tipo      |
| -------------- | --------- |
| id             | UUID      |
| appeal_id      | UUID      |
| author_user_id | UUID      |
| message        | TEXT      |
| attachment_url | TEXT      |
| created_at     | TIMESTAMP |

---

## Objetivo

Registrar:

- comentários;
- solicitações;
- anexos;
- evidências;
- esclarecimentos.

Nada poderá ser editado após enviado.

---

# Appeal Reviews

Representa a reavaliação técnica da monitoria.

---

## Estrutura

| Campo            | Tipo         |
| ---------------- | ------------ |
| id               | UUID         |
| appeal_id        | UUID         |
| reviewer_user_id | UUID         |
| previous_score   | NUMERIC(6,2) |
| reviewed_score   | NUMERIC(6,2) |
| justification    | TEXT         |
| created_at       | TIMESTAMP    |

---

# Regras

A revisão nunca altera a monitoria original.

Ela produz uma nova avaliação técnica.

---

# Appeal Decisions

Representa a decisão final.

---

## Estrutura

| Campo      | Tipo                 |
| ---------- | -------------------- |
| id         | UUID                 |
| appeal_id  | UUID                 |
| decision   | ENUM(AppealDecision) |
| decided_by | UUID                 |
| comments   | TEXT                 |
| decided_at | TIMESTAMP            |

---

## AppealDecision

```text
APPROVED

PARTIALLY_APPROVED

REJECTED
```

---

# Regras de Negócio

## Abertura

A contestação somente poderá ser aberta dentro do prazo definido para a Área.

Após expirado o prazo, novas contestações não poderão ser criadas.

---

## Revisão

A revisão deverá ser realizada por usuário autorizado.

Preferencialmente diferente do avaliador original.

---

## Aprovação

Caso aprovada:

- recalcular nota;
- atualizar indicadores;
- registrar histórico;
- manter nota original para auditoria.

---

## Rejeição

A nota permanecerá inalterada.

Todo histórico será preservado.

---

# Indicadores

O módulo deverá fornecer:

- Contestações abertas
- Contestações em análise
- SLA médio
- Contestações aprovadas
- Contestações rejeitadas
- Percentual de reversão
- Tempo médio de decisão
- Contestações por monitor
- Contestações por área

---

# Auditoria

Registrar obrigatoriamente:

- abertura;
- alteração de status;
- novas interações;
- revisão;
- decisão;
- encerramento.

Nenhum registro poderá ser removido.

---

# Consultas Frequentes

```text
Contestações abertas

Contestações vencidas

Contestações por área

Contestações por monitor

Contestações aprovadas

Contestações rejeitadas

Tempo médio de análise

Percentual de reversão
```

Todos esses cenários deverão possuir índices específicos.

---

# Evolução Futura

O modelo suporta:

- múltiplos revisores;
- segunda instância;
- comitê de qualidade;
- votação;
- workflow configurável;
- notificações automáticas;
- integração com Teams e e-mail.

Sem necessidade de remodelagem estrutural.

---

# Próximas Entidades

Após o módulo de Contestações serão modeladas:

- calibrations
- calibration_sessions
- calibration_participants
- calibration_results

Essas entidades permitirão medir e melhorar a consistência entre os avaliadores, reduzindo divergências e aumentando a confiabilidade das monitorias.

# 10. Gestão de Calibração

---

# Objetivo

O módulo de Calibração é responsável por garantir a padronização das avaliações realizadas pelos monitores.

Uma calibração consiste na avaliação de um mesmo atendimento por dois ou mais avaliadores, permitindo medir a consistência das avaliações, identificar divergências e promover alinhamento entre os participantes.

Todo o histórico das calibrações deverá ser preservado.

---

# Visão Geral

O módulo será composto pelas seguintes entidades.

```text
calibrations

↓

calibration_participants

↓

calibration_evaluations

↓

calibration_results
```

---

# Fluxo

```text
Selecionar Atendimento

↓

Criar Sessão

↓

Definir Participantes

↓

Realizar Avaliações

↓

Comparar Resultados

↓

Reunião de Calibração

↓

Resultado Final

↓

Indicadores
```

---

# Calibrations

Representa uma sessão de calibração.

---

## Estrutura

| Campo           | Tipo                    |
| --------------- | ----------------------- |
| id              | UUID                    |
| title           | VARCHAR(200)            |
| description     | TEXT                    |
| evaluation_id   | UUID                    |
| form_version_id | UUID                    |
| status          | ENUM(CalibrationStatus) |
| scheduled_at    | TIMESTAMP               |
| started_at      | TIMESTAMP               |
| finished_at     | TIMESTAMP               |
| created_by      | UUID                    |
| created_at      | TIMESTAMP               |
| updated_at      | TIMESTAMP               |

---

## CalibrationStatus

```text
DRAFT

SCHEDULED

IN_PROGRESS

FINISHED

CANCELED
```

---

# Regras

Uma calibração utiliza exatamente uma monitoria como referência.

Todos os participantes avaliarão utilizando a mesma versão do formulário.

---

# Calibration Participants

Representa os participantes da calibração.

---

## Estrutura

| Campo          | Tipo                             |
| -------------- | -------------------------------- |
| id             | UUID                             |
| calibration_id | UUID                             |
| user_id        | UUID                             |
| role           | ENUM(CalibrationParticipantRole) |
| created_at     | TIMESTAMP                        |

---

## CalibrationParticipantRole

```text
FACILITATOR

MONITOR

SUPERVISOR

MANAGER

OBSERVER
```

---

# Regras

Uma calibração deverá possuir pelo menos dois avaliadores.

O facilitador será responsável por concluir a sessão.

---

# Calibration Evaluations

Representa a avaliação individual realizada por cada participante.

---

## Estrutura

| Campo          | Tipo         |
| -------------- | ------------ |
| id             | UUID         |
| calibration_id | UUID         |
| participant_id | UUID         |
| score          | NUMERIC(6,2) |
| completed_at   | TIMESTAMP    |

---

## Regras

Cada participante realiza sua avaliação de forma independente.

Os participantes não poderão visualizar as respostas dos demais antes do encerramento da etapa individual.

---

# Calibration Results

Resultado consolidado da calibração.

---

## Estrutura

| Campo                | Tipo         |
| -------------------- | ------------ |
| id                   | UUID         |
| calibration_id       | UUID         |
| average_score        | NUMERIC(6,2) |
| standard_deviation   | NUMERIC(6,2) |
| agreement_percentage | NUMERIC(5,2) |
| final_score          | NUMERIC(6,2) |
| summary              | TEXT         |
| created_at           | TIMESTAMP    |

---

# Objetivo

Permitir medir:

- alinhamento entre avaliadores;
- dispersão das notas;
- percentual de concordância;
- efetividade da calibração.

---

# Regras de Negócio

## Sessões

Uma sessão poderá possuir qualquer quantidade de participantes.

Todos deverão avaliar o mesmo atendimento.

---

## Avaliações

Cada participante poderá avaliar apenas uma vez.

Após enviada, a avaliação não poderá ser alterada.

---

## Resultado

Após encerramento da sessão:

- calcular média;
- calcular divergência;
- calcular percentual de concordância;
- registrar resultado consolidado.

---

# Indicadores

O módulo deverá fornecer:

- Quantidade de calibrações
- Participação por monitor
- Divergência média
- Índice de concordância
- Evolução por período
- Ranking de consistência dos avaliadores
- Tempo médio das sessões

---

# Auditoria

Registrar:

- criação;
- alteração;
- início;
- encerramento;
- inclusão de participantes;
- envio de avaliações;
- consolidação do resultado.

---

# Consultas Frequentes

```text
Calibrações em andamento

Calibrações concluídas

Participação por monitor

Índice de concordância

Histórico de calibrações

Calibrações por área

Calibrações por equipe
```

Todos esses cenários deverão possuir índices específicos.

---

# Evolução Futura

O modelo suporta:

- calibrações cegas;
- múltiplos formulários;
- sessões recorrentes;
- consenso eletrônico;
- integração com IA para comparação automática;
- benchmarking entre áreas.

---

# Próximas Entidades

Após o módulo de Calibração serão modeladas:

- ai_providers
- ai_executions
- ai_prompts
- ai_models
- ai_results

Essas entidades formarão o motor de Inteligência Artificial responsável pelas monitorias automáticas.

# 11. Motor de Inteligência Artificial

---

# Objetivo

O módulo de Inteligência Artificial é responsável por executar monitorias automáticas, auxiliar os monitores e fornecer justificativas técnicas para cada avaliação realizada.

Todo processamento realizado pela IA deverá ser totalmente auditável, reproduzível e rastreável.

A plataforma deverá permitir a substituição ou inclusão de novos provedores de IA sem impacto nas regras de negócio.

---

# Visão Geral

O módulo será composto pelas seguintes entidades.

```text
ai_providers

↓

ai_models

↓

ai_prompts

↓

ai_executions

↓

ai_results

↓

ai_tokens

↓

ai_costs
```

---

# Fluxo

```text
Monitoria

↓

Selecionar Provider

↓

Selecionar Modelo

↓

Gerar Prompt

↓

Executar IA

↓

Receber Resposta

↓

Calcular Nota

↓

Salvar Evidências

↓

Auditoria
```

---

# AI Providers

Representa o fornecedor da IA.

---

## Estrutura

| Campo         | Tipo                 |
| ------------- | -------------------- |
| id            | UUID                 |
| name          | VARCHAR(100)         |
| code          | VARCHAR(50)          |
| provider_type | ENUM(AIProviderType) |
| base_url      | TEXT                 |
| is_active     | BOOLEAN              |
| created_at    | TIMESTAMP            |
| updated_at    | TIMESTAMP            |

---

## AIProviderType

```text
OPENAI

AZURE_OPENAI

ANTHROPIC

GOOGLE

AWS_BEDROCK

CUSTOM
```

---

# AI Models

Representa os modelos disponíveis.

---

## Estrutura

| Campo            | Tipo         |
| ---------------- | ------------ |
| id               | UUID         |
| provider_id      | UUID         |
| name             | VARCHAR(100) |
| model_identifier | VARCHAR(150) |
| version          | VARCHAR(50)  |
| context_window   | INTEGER      |
| is_active        | BOOLEAN      |

---

## Exemplos

```text
GPT-5

Claude Sonnet

Gemini Pro

Llama

Mistral
```

---

# AI Prompts

Representa os prompts oficiais utilizados pela plataforma.

Todo prompt será versionado.

---

## Estrutura

| Campo      | Tipo         |
| ---------- | ------------ |
| id         | UUID         |
| name       | VARCHAR(150) |
| version    | INTEGER      |
| prompt     | TEXT         |
| objective  | TEXT         |
| is_active  | BOOLEAN      |
| created_by | UUID         |
| created_at | TIMESTAMP    |

---

## Regras

Nenhum prompt publicado poderá ser alterado.

Alterações criarão nova versão.

---

# AI Executions

Representa cada execução da IA.

---

## Estrutura

| Campo             | Tipo                    |
| ----------------- | ----------------------- |
| id                | UUID                    |
| evaluation_id     | UUID                    |
| provider_id       | UUID                    |
| model_id          | UUID                    |
| prompt_id         | UUID                    |
| execution_status  | ENUM(AIExecutionStatus) |
| started_at        | TIMESTAMP               |
| finished_at       | TIMESTAMP               |
| execution_time_ms | INTEGER                 |
| retry_count       | INTEGER                 |
| correlation_id    | UUID                    |

---

## AIExecutionStatus

```text
PENDING

RUNNING

SUCCESS

FAILED

CANCELED
```

---

# AI Results

Resultado produzido pela IA.

---

## Estrutura

| Campo            | Tipo         |
| ---------------- | ------------ |
| id               | UUID         |
| execution_id     | UUID         |
| final_score      | NUMERIC(6,2) |
| confidence_score | NUMERIC(5,2) |
| justification    | TEXT         |
| evidences        | JSONB        |
| raw_response     | JSONB        |
| created_at       | TIMESTAMP    |

---

# Objetivo

Permitir armazenar:

- Nota calculada
- Grau de confiança
- Justificativa
- Evidências
- Resposta original da IA

---

# AI Tokens

Controle de consumo.

---

## Estrutura

| Campo         | Tipo    |
| ------------- | ------- |
| id            | UUID    |
| execution_id  | UUID    |
| input_tokens  | INTEGER |
| output_tokens | INTEGER |
| total_tokens  | INTEGER |

---

# AI Costs

Controle financeiro.

---

## Estrutura

| Campo          | Tipo          |
| -------------- | ------------- |
| id             | UUID          |
| execution_id   | UUID          |
| estimated_cost | NUMERIC(12,6) |
| currency       | VARCHAR(10)   |
| created_at     | TIMESTAMP     |

---

# Regras de Negócio

## Execução

Cada monitoria poderá possuir múltiplas execuções.

Exemplos.

- Reprocessamento
- Mudança de modelo
- Nova versão do prompt

Todas deverão permanecer registradas.

---

## Prompt

Sempre registrar:

- versão;
- modelo;
- provider.

Nunca perder rastreabilidade.

---

## Resultado

Mesmo quando ocorrer erro.

Registrar:

- erro;
- tempo;
- tentativa;
- provider.

---

## Evidências

Toda nota atribuída pela IA deverá possuir justificativa.

Nunca retornar apenas uma nota.

---

# Indicadores

O módulo deverá fornecer:

- Monitorias por IA
- Tempo médio de execução
- Taxa de sucesso
- Taxa de erro
- Consumo de tokens
- Custo por monitoria
- Custo por modelo
- Precisão da IA
- Concordância IA × Monitor

---

# Auditoria

Registrar:

- execução;
- falha;
- reprocessamento;
- troca de modelo;
- troca de prompt.

---

# Consultas Frequentes

```text
Execuções por modelo

Execuções com erro

Monitorias por IA

Prompt mais utilizado

Modelo mais utilizado

Tempo médio

Consumo de tokens

Custo diário

Custo mensal

Precisão por modelo
```

Todos esses cenários deverão possuir índices específicos.

---

# Evolução Futura

O modelo suporta:

- Múltiplos Providers
- Fallback automático
- Ensemble de Modelos
- Prompt A/B Testing
- Avaliação multimodal
- Agentes especializados
- Fine-tuning
- Cache semântico
- Execução distribuída

Sem necessidade de remodelagem estrutural.

---

# Próximas Entidades

Após o módulo de IA serão modelados:

- notifications
- notification_templates
- notification_logs
- scheduled_jobs

Essas entidades serão responsáveis pela comunicação e automação da plataforma.

# 12. Notificações e Automações

---

# Objetivo

O módulo de Notificações é responsável por toda comunicação automática entre o sistema e seus usuários.

O objetivo é centralizar notificações, lembretes, alertas, automações e agendamentos em um único mecanismo reutilizável.

O módulo deverá suportar múltiplos canais de comunicação.

---

# Visão Geral

O módulo será composto pelas seguintes entidades.

```text
notification_templates

↓

notifications

↓

notification_deliveries

↓

scheduled_jobs
```

---

# Fluxo

```text
Evento

↓

Template

↓

Notificação

↓

Fila

↓

Entrega

↓

Confirmação

↓

Histórico
```

---

# Notification Templates

Representa os modelos de mensagens.

---

## Estrutura

| Campo      | Tipo                      |
| ---------- | ------------------------- |
| id         | UUID                      |
| code       | VARCHAR(100)              |
| name       | VARCHAR(200)              |
| channel    | ENUM(NotificationChannel) |
| subject    | VARCHAR(255)              |
| body       | TEXT                      |
| variables  | JSONB                     |
| is_active  | BOOLEAN                   |
| created_at | TIMESTAMP                 |
| updated_at | TIMESTAMP                 |

---

## NotificationChannel

```text
EMAIL

SYSTEM

TEAMS

WEBHOOK

SMS

WHATSAPP
```

---

## Exemplos

```text
Feedback Pendente

Contestação Aberta

Contestação Aprovada

Monitoria Publicada

PDI Vencendo

Calibração Agendada

IA Concluída
```

---

# Notifications

Representa uma notificação gerada.

---

## Estrutura

| Campo       | Tipo                       |
| ----------- | -------------------------- |
| id          | UUID                       |
| template_id | UUID                       |
| user_id     | UUID                       |
| title       | VARCHAR(255)               |
| message     | TEXT                       |
| channel     | ENUM(NotificationChannel)  |
| status      | ENUM(NotificationStatus)   |
| priority    | ENUM(NotificationPriority) |
| read_at     | TIMESTAMP                  |
| expires_at  | TIMESTAMP                  |
| created_at  | TIMESTAMP                  |

---

## NotificationStatus

```text
PENDING

QUEUED

SENT

DELIVERED

READ

FAILED

CANCELED
```

---

## NotificationPriority

```text
LOW

NORMAL

HIGH

CRITICAL
```

---

# Notification Deliveries

Histórico de envio.

---

## Estrutura

| Campo           | Tipo                 |
| --------------- | -------------------- |
| id              | UUID                 |
| notification_id | UUID                 |
| provider        | VARCHAR(100)         |
| external_id     | VARCHAR(255)         |
| status          | ENUM(DeliveryStatus) |
| sent_at         | TIMESTAMP            |
| delivered_at    | TIMESTAMP            |
| error_message   | TEXT                 |

---

## DeliveryStatus

```text
QUEUED

SENT

DELIVERED

FAILED
```

---

# Scheduled Jobs

Representa tarefas automáticas executadas pela plataforma.

---

## Estrutura

| Campo           | Tipo            |
| --------------- | --------------- |
| id              | UUID            |
| job_name        | VARCHAR(200)    |
| job_type        | ENUM(JobType)   |
| cron_expression | VARCHAR(100)    |
| last_execution  | TIMESTAMP       |
| next_execution  | TIMESTAMP       |
| status          | ENUM(JobStatus) |
| is_active       | BOOLEAN         |

---

## JobType

```text
REMINDER

NOTIFICATION

EXPORT

IMPORT

AI

SLA

CLEANUP

REPORT
```

---

## JobStatus

```text
WAITING

RUNNING

SUCCESS

FAILED

PAUSED
```

---

# Regras de Negócio

## Templates

Todo envio deverá utilizar um template.

Templates poderão possuir variáveis.

Exemplo.

```text
{{employeeName}}

{{score}}

{{feedbackDeadline}}
```

---

## Notificações

Uma notificação poderá ser enviada por múltiplos canais.

Exemplo.

Sistema

-

Email

-

Teams

---

## Reenvio

Em caso de falha:

O sistema poderá realizar novas tentativas conforme configuração.

Todas as tentativas deverão permanecer registradas.

---

## Agendamentos

Todas as tarefas automáticas deverão ser configuráveis.

Exemplos.

- SLA diário
- Lembrete de Feedback
- Limpeza de arquivos temporários
- Reprocessamento de IA
- Envio de relatórios

---

# Indicadores

O módulo deverá fornecer.

- Notificações enviadas
- Taxa de entrega
- Tempo médio
- Falhas
- Jobs executados
- Jobs com erro
- SLA dos Jobs
- Notificações por canal

---

# Auditoria

Registrar.

- criação;
- envio;
- leitura;
- falha;
- cancelamento;
- reenvio.

---

# Consultas Frequentes

```text
Notificações pendentes

Notificações não lidas

Notificações por usuário

Jobs em execução

Jobs com erro

Histórico de entregas

Notificações por canal
```

Todos esses cenários deverão possuir índices específicos.

---

# Evolução Futura

O modelo suporta:

- Push Notification
- Microsoft Teams
- Slack
- WhatsApp Business API
- SMS
- Fluxos automáticos
- Campanhas
- Mensagens em lote
- Preferências individuais de notificação

Sem necessidade de remodelagem estrutural.

---

# Próximas Entidades

Após o módulo de Notificações serão modeladas:

- audit_logs
- audit_changes
- audit_events

Essas entidades serão responsáveis por toda a rastreabilidade da plataforma e representarão a camada oficial de auditoria do Valenet Quality Hub.

# 13. Auditoria

---

# Objetivo

O módulo de Auditoria é responsável por registrar todas as operações críticas realizadas na plataforma.

Seu objetivo é garantir:

- Rastreabilidade
- Transparência
- Conformidade
- Segurança
- Investigação de incidentes
- Histórico completo

Nenhuma informação de auditoria poderá ser alterada ou excluída.

A auditoria representa a fonte oficial de evidências do sistema.

---

# Visão Geral

O módulo será composto pelas seguintes entidades.

```text
audit_logs

↓

audit_changes

↓

audit_events

↓

audit_sessions
```

---

# Fluxo

```text
Usuário

↓

Ação

↓

Evento

↓

Registro

↓

Alterações

↓

Consulta
```

---

# Audit Logs

Representa o registro principal da auditoria.

Cada operação gera exatamente um Audit Log.

---

## Estrutura

| Campo             | Tipo                 |
| ----------------- | -------------------- |
| id                | UUID                 |
| event_id          | UUID                 |
| user_id           | UUID                 |
| session_id        | UUID                 |
| module            | VARCHAR(100)         |
| entity            | VARCHAR(100)         |
| entity_id         | UUID                 |
| operation         | ENUM(AuditOperation) |
| ip_address        | VARCHAR(50)          |
| user_agent        | TEXT                 |
| correlation_id    | UUID                 |
| execution_time_ms | INTEGER              |
| created_at        | TIMESTAMP            |

---

## AuditOperation

```text
CREATE

UPDATE

DELETE

LOGIN

LOGOUT

PUBLISH

CANCEL

APPROVE

REJECT

EXPORT

IMPORT

EXECUTE

DOWNLOAD

UPLOAD
```

---

# Audit Changes

Representa todas as alterações realizadas.

Uma operação poderá alterar diversos campos.

---

## Estrutura

| Campo        | Tipo         |
| ------------ | ------------ |
| id           | UUID         |
| audit_log_id | UUID         |
| field_name   | VARCHAR(150) |
| old_value    | TEXT         |
| new_value    | TEXT         |

---

## Objetivo

Permitir visualizar exatamente:

Antes

↓

Depois

Para qualquer alteração.

---

# Audit Events

Representa os eventos registrados.

---

## Estrutura

| Campo       | Tipo                |
| ----------- | ------------------- |
| id          | UUID                |
| event_name  | VARCHAR(150)        |
| description | TEXT                |
| severity    | ENUM(AuditSeverity) |
| created_at  | TIMESTAMP           |

---

## AuditSeverity

```text
LOW

MEDIUM

HIGH

CRITICAL
```

---

# Audit Sessions

Representa uma sessão de utilização da plataforma.

---

## Estrutura

| Campo            | Tipo                |
| ---------------- | ------------------- |
| id               | UUID                |
| user_id          | UUID                |
| login_at         | TIMESTAMP           |
| logout_at        | TIMESTAMP           |
| ip_address       | VARCHAR(50)         |
| device           | VARCHAR(150)        |
| browser          | VARCHAR(150)        |
| operating_system | VARCHAR(150)        |
| status           | ENUM(SessionStatus) |

---

## SessionStatus

```text
ACTIVE

EXPIRED

LOGGED_OUT

REVOKED
```

---

# Operações Auditadas

Obrigatoriamente.

## Usuários

- Login
- Logout
- Criação
- Alteração
- Bloqueio
- Exclusão lógica

---

## Formulários

- Criação
- Nova versão
- Publicação
- Arquivamento

---

## Monitorias

- Criação
- Publicação
- Cancelamento
- Reprocessamento

---

## Feedbacks

- Criação
- Aplicação
- Ciência

---

## Contestações

- Abertura
- Revisão
- Aprovação
- Rejeição

---

## IA

- Execução
- Falha
- Reprocessamento
- Mudança de modelo
- Mudança de prompt

---

## Configurações

Toda alteração.

---

# Regras

Nenhum registro poderá ser:

- alterado;
- excluído;
- sobrescrito.

A auditoria é imutável.

---

# Consultas Frequentes

```text
Quem alterou um formulário?

Quem publicou uma monitoria?

Quem aprovou uma contestação?

Histórico completo de um usuário

Sessões ativas

Alterações por módulo

Exportações realizadas

Falhas críticas
```

Todos esses cenários deverão possuir índices específicos.

---

# Retenção

Os registros de auditoria deverão permanecer armazenados pelo período definido pela política corporativa.

A estratégia de arquivamento deverá preservar a possibilidade de consulta histórica.

---

# Segurança

Apenas usuários autorizados poderão consultar registros de auditoria.

Os logs nunca deverão conter:

- Senhas
- Tokens
- Chaves de API
- Dados sensíveis em texto puro

Informações sensíveis deverão ser mascaradas ou omitidas.

---

# Integrações

O módulo deverá permitir integração futura com soluções de observabilidade e SIEM.

Exemplos.

- Azure Monitor
- Grafana
- Datadog
- Splunk
- Elastic

---

# Indicadores

O módulo deverá fornecer.

- Operações por usuário
- Operações por módulo
- Eventos críticos
- Sessões ativas
- Tempo médio de sessão
- Falhas por período
- Alterações por entidade

---

# Evolução Futura

O modelo suporta:

- Assinatura digital de eventos
- Auditoria distribuída
- Exportação para Data Lake
- Trilhas de conformidade
- Detecção automática de comportamentos suspeitos
- Integração com SIEM

Sem necessidade de remodelagem estrutural.

---

# Próximas Entidades

Após o módulo de Auditoria serão modeladas:

- settings
- setting_groups
- setting_history

Essas entidades serão responsáveis por centralizar todas as configurações da plataforma.

# 14. Configurações Gerais

---

# Objetivo

O módulo de Configurações Gerais centraliza todos os parâmetros de funcionamento do Valenet Quality Hub.

Seu objetivo é permitir que administradores configurem o comportamento da plataforma sem necessidade de novas implementações.

As configurações poderão possuir escopo:

- Global
- Área
- Equipe
- Formulário

Sempre prevalecerá a configuração mais específica.

---

# Visão Geral

O módulo será composto pelas seguintes entidades.

```text
setting_groups

↓

settings

↓

setting_values

↓

setting_history
```

---

# Fluxo

```text
Grupo

↓

Configuração

↓

Valor

↓

Histórico

↓

Aplicação
```

---

# Setting Groups

Organiza as configurações por assunto.

---

## Estrutura

| Campo         | Tipo         |
| ------------- | ------------ |
| id            | UUID         |
| code          | VARCHAR(100) |
| name          | VARCHAR(150) |
| description   | TEXT         |
| display_order | INTEGER      |

---

## Exemplos

```text
General

Authentication

Forms

Evaluations

Feedback

Appeals

AI

Notifications

Dashboard

Security
```

---

# Settings

Representa uma configuração disponível no sistema.

---

## Estrutura

| Campo           | Tipo                  |
| --------------- | --------------------- |
| id              | UUID                  |
| group_id        | UUID                  |
| key             | VARCHAR(150)          |
| name            | VARCHAR(200)          |
| description     | TEXT                  |
| data_type       | ENUM(SettingDataType) |
| default_value   | TEXT                  |
| validation_rule | TEXT                  |
| is_required     | BOOLEAN               |
| is_editable     | BOOLEAN               |

---

## SettingDataType

```text
STRING

INTEGER

DECIMAL

BOOLEAN

DATE

TIME

JSON

ENUM
```

---

# Setting Values

Armazena o valor efetivamente utilizado.

---

## Estrutura

| Campo      | Tipo               |
| ---------- | ------------------ |
| id         | UUID               |
| setting_id | UUID               |
| scope_type | ENUM(SettingScope) |
| scope_id   | UUID               |
| value      | TEXT               |
| created_at | TIMESTAMP          |
| updated_at | TIMESTAMP          |
| updated_by | UUID               |

---

## SettingScope

```text
GLOBAL

AREA

TEAM

FORM
```

---

# Regra de Herança

As configurações serão resolvidas na seguinte ordem:

```text
Formulário

↓

Equipe

↓

Área

↓

Global
```

A primeira configuração encontrada será utilizada.

---

# Setting History

Histórico completo das alterações.

---

## Estrutura

| Campo            | Tipo      |
| ---------------- | --------- |
| id               | UUID      |
| setting_value_id | UUID      |
| old_value        | TEXT      |
| new_value        | TEXT      |
| changed_by       | UUID      |
| changed_at       | TIMESTAMP |
| reason           | TEXT      |

---

# Configurações Previstas

## Feedback

```text
Prazo máximo

Aplicação obrigatória

Permitir reagendamento

Permitir reaplicação
```

---

## Contestação

```text
Prazo para abertura

Prazo para decisão

Permitir múltiplas contestações

Necessita segunda aprovação
```

---

## IA

```text
Provider padrão

Modelo padrão

Prompt padrão

Score mínimo de confiança

Quantidade máxima de tentativas

Timeout

Temperatura

Top P
```

---

## Dashboard

```text
Período padrão

Página inicial

Atualização automática

Quantidade de registros
```

---

## Segurança

```text
Tempo da sessão

MFA obrigatório

Tempo de bloqueio

Tentativas máximas

Política de senha
```

---

## Monitoria

```text
Permitir publicação automática

Necessita aprovação

Nota mínima

Critério eliminatório

Escala de pontuação
```

---

## Notificações

```text
Email habilitado

Teams habilitado

WhatsApp habilitado

Dias para lembrete

Horário permitido
```

---

# Regras de Negócio

Todas as alterações deverão:

- gerar auditoria;
- registrar histórico;
- validar tipo do dado;
- validar regras de negócio.

Nenhuma configuração será aplicada sem validação.

---

# Consultas Frequentes

```text
Configurações globais

Configurações da área

Configurações do formulário

Histórico de alterações

Valores efetivos

Configurações herdadas
```

Todos esses cenários deverão possuir índices específicos.

---

# Auditoria

Registrar:

- criação;
- alteração;
- exclusão lógica;
- restauração;
- alteração de escopo.

---

# Evolução Futura

O modelo suporta:

- Feature Flags
- Configurações por Tenant
- Configurações por Usuário
- Rollout gradual
- A/B Testing
- Ambientes (Dev, Homologação, Produção)
- Configurações dinâmicas em tempo real

Sem necessidade de remodelagem estrutural.

---

# Filosofia

Todas as regras operacionais da plataforma que possam variar entre áreas, equipes ou clientes deverão ser tratadas como configurações, nunca como código.

Isso reduz a necessidade de novas versões da aplicação, aumenta a flexibilidade operacional e facilita a administração do Valenet Quality Hub.

# 15. ENUMs Oficiais

---

# Objetivo

Este capítulo centraliza todos os ENUMs utilizados pelo Valenet Quality Hub.

Todos os ENUMs deverão ser implementados no Prisma e reutilizados pelo Backend e Frontend.

Nenhum valor deverá ser representado por texto livre quando existir um ENUM correspondente.

---

# UserStatus

Representa a situação do usuário.

```text
ACTIVE

INACTIVE

BLOCKED

PENDING_ACTIVATION
```

---

# UserRole

Perfis do sistema.

```text
ADMINISTRATOR

QUALITY_MANAGER

QUALITY_COORDINATOR

QUALITY_ANALYST

SUPERVISOR

TEAM_LEADER

AGENT

VIEWER
```

---

# ChannelType

Canal de atendimento.

```text
VOICE

WHATSAPP

CHAT

EMAIL

OMNICHANNEL
```

---

# MonitoringType

Forma de realização da monitoria.

```text
MANUAL

AI

HYBRID
```

---

# EvaluationStatus

Situação da monitoria.

```text
DRAFT

IN_PROGRESS

COMPLETED

PUBLISHED

UNDER_APPEAL

CANCELED

ARCHIVED
```

---

# FormStatus

```text
DRAFT

PUBLISHED

ARCHIVED
```

---

# FormVersionStatus

```text
DRAFT

PUBLISHED

ARCHIVED
```

---

# QuestionType

Tipos de perguntas.

```text
BOOLEAN

SINGLE_CHOICE

MULTIPLE_CHOICE

TEXT

NUMBER

DECIMAL

SCORE

DATE

TIME

FILE
```

---

# FeedbackStatus

```text
PENDING

SCHEDULED

APPLIED

ACKNOWLEDGED

OVERDUE

CANCELED
```

---

# AppealStatus

```text
OPEN

UNDER_REVIEW

WAITING_INFORMATION

APPROVED

PARTIALLY_APPROVED

REJECTED

CANCELED
```

---

# AppealDecision

```text
APPROVED

PARTIALLY_APPROVED

REJECTED
```

---

# DevelopmentStatus

```text
OPEN

IN_PROGRESS

COMPLETED

CANCELED
```

---

# ActionStatus

```text
OPEN

DONE

CANCELED
```

---

# CalibrationStatus

```text
DRAFT

SCHEDULED

IN_PROGRESS

FINISHED

CANCELED
```

---

# CalibrationParticipantRole

```text
FACILITATOR

MONITOR

SUPERVISOR

COORDINATOR

MANAGER

OBSERVER
```

---

# AIProviderType

```text
OPENAI

AZURE_OPENAI

ANTHROPIC

GOOGLE

AWS_BEDROCK

CUSTOM
```

---

# AIExecutionStatus

```text
PENDING

RUNNING

SUCCESS

FAILED

CANCELED
```

---

# NotificationChannel

```text
SYSTEM

EMAIL

TEAMS

WHATSAPP

SMS

WEBHOOK
```

---

# NotificationStatus

```text
PENDING

QUEUED

SENT

DELIVERED

READ

FAILED

CANCELED
```

---

# NotificationPriority

```text
LOW

NORMAL

HIGH

CRITICAL
```

---

# DeliveryStatus

```text
QUEUED

SENT

DELIVERED

FAILED
```

---

# JobType

```text
REMINDER

NOTIFICATION

EXPORT

IMPORT

AI

REPORT

CLEANUP

SLA
```

---

# JobStatus

```text
WAITING

RUNNING

SUCCESS

FAILED

PAUSED
```

---

# AuditOperation

```text
CREATE

UPDATE

DELETE

LOGIN

LOGOUT

PUBLISH

APPROVE

REJECT

EXPORT

IMPORT

DOWNLOAD

UPLOAD

EXECUTE
```

---

# AuditSeverity

```text
LOW

MEDIUM

HIGH

CRITICAL
```

---

# SessionStatus

```text
ACTIVE

EXPIRED

LOGGED_OUT

REVOKED
```

---

# SettingDataType

```text
STRING

INTEGER

DECIMAL

BOOLEAN

DATE

TIME

JSON

ENUM
```

---

# SettingScope

```text
GLOBAL

AREA

TEAM

FORM
```

---

# EvidenceType

```text
AUDIO

IMAGE

VIDEO

PDF

TRANSCRIPT

LINK

AI_REFERENCE
```

---

# Convenções

Todos os ENUMs deverão seguir obrigatoriamente:

- PascalCase para o nome do ENUM.
- Valores em UPPER_SNAKE_CASE.
- Implementação única no Prisma.
- Reutilização obrigatória no Backend.
- Geração automática de tipos para o Frontend.

Nunca utilizar strings fixas ("magic strings") para representar estados do sistema.

---

# Evolução

Novos ENUMs deverão ser adicionados apenas quando representarem conjuntos fechados de valores.

Caso exista possibilidade de configuração dinâmica pelo usuário, deverá ser criada uma tabela de domínio em vez de um ENUM.

# 16. Modelo de Relacionamentos (ER Model)

---

# Objetivo

Este capítulo descreve os relacionamentos entre todas as entidades do Valenet Quality Hub.

Seu objetivo é definir a estrutura lógica do banco de dados, garantindo integridade referencial, baixo acoplamento e facilidade de evolução.

Todas as Foreign Keys da aplicação deverão seguir obrigatoriamente este modelo.

---

# Visão Geral

O banco está organizado em oito domínios principais.

```text
Organização
        │
        ▼
Segurança
        │
        ▼
Formulários
        │
        ▼
Monitorias
        │
        ├───────────────┐
        ▼               ▼
Feedback         Inteligência Artificial
        │               │
        └──────┬────────┘
               ▼
        Contestações
               │
               ▼
        Calibração
               │
               ▼
Dashboard / Analytics
               │
               ▼
Notificações
               │
               ▼
Auditoria
```

---

# Domínio Organizacional

```text
areas

1
│
│
└────────────── N
                │
                ▼

teams

1
│
│
└────────────── N
                │
                ▼

team_users

N
│
│
└────────────── 1
                │
                ▼

users
```

---

# Segurança

```text
users

N
│
│
└────────────── N

user_roles

N
│
│
└────────────── 1

roles

1
│
│
└────────────── N

role_permissions

N
│
│
└────────────── 1

permissions
```

---

# Formulários

```text
forms

1
│
│
└────────────── N

form_versions

1
│
├────────────── N
│
▼

form_sections

1
│
├────────────── N
│
▼

form_questions

1
│
├────────────── N
│
▼

question_options
```

---

# Monitorias

```text
evaluations

1
│
├────────────── N
│
▼

evaluation_answers

1
│
├────────────── N
│
▼

evaluation_evidences
```

---

# IA

```text
ai_providers

1
│
├────────────── N
│
▼

ai_models

1
│
├────────────── N
│
▼

ai_executions

1
│
├────────────── 1
│
▼

ai_results
```

---

# Feedback

```text
evaluations

1
│
│
└────────────── 1

feedbacks

1
│
├────────────── N
│
▼

feedback_acknowledgements

1
│
├────────────── N
│
▼

development_plans

1
│
├────────────── N
│
▼

development_actions
```

---

# Contestações

```text
evaluations

1
│
├────────────── N
│
▼

appeals

1
├────────────── N
│
▼

appeal_interactions

1
├────────────── N
│
▼

appeal_reviews

1
├────────────── 1
│
▼

appeal_decisions
```

---

# Calibração

```text
calibrations

1
├────────────── N
│
▼

calibration_participants

1
├────────────── N
│
▼

calibration_evaluations

1
├────────────── 1
│
▼

calibration_results
```

---

# Notificações

```text
notification_templates

1
├────────────── N
│
▼

notifications

1
├────────────── N
│
▼

notification_deliveries
```

---

# Configurações

```text
setting_groups

1
├────────────── N
│
▼

settings

1
├────────────── N
│
▼

setting_values

1
├────────────── N
│
▼

setting_history
```

---

# Auditoria

```text
audit_events

1
├────────────── N
│
▼

audit_logs

1
├────────────── N
│
▼

audit_changes
```

---

# Dependências Entre Módulos

```text
Organização
        │
        ▼
Segurança
        │
        ▼
Formulários
        │
        ▼
Monitorias
        │
 ┌──────┼─────────┐
 ▼      ▼         ▼
IA   Feedback  Contestação
 │      │         │
 └──────┼─────────┘
        ▼
 Calibração
        ▼
Dashboard
        ▼
Notificações
        ▼
Auditoria
```

---

# Ordem Recomendada das Migrations

As migrations deverão ser criadas respeitando as dependências entre as entidades.

```text
01_users

02_roles

03_permissions

04_user_roles

05_areas

06_teams

07_team_users

08_forms

09_form_versions

10_form_sections

11_form_questions

12_question_options

13_evaluations

14_evaluation_answers

15_evaluation_evidences

16_feedbacks

17_development_plans

18_appeals

19_calibrations

20_ai

21_notifications

22_settings

23_audit
```

---

# Dependências Críticas

## Monitoria

Depende de:

- Usuário
- Equipe
- Área
- Formulário
- Versão do formulário

---

## Feedback

Depende de:

- Monitoria
- Usuário

---

## Contestação

Depende de:

- Monitoria
- Feedback

---

## IA

Depende de:

- Monitoria
- Provider
- Modelo
- Prompt

---

## Dashboard

Consome dados de:

- Monitorias
- Feedbacks
- Contestações
- IA
- Calibração

Não possui tabelas próprias de negócio.

---

# Regras Gerais

Todas as Foreign Keys deverão utilizar:

```text
ON UPDATE RESTRICT
```

Para exclusão.

Preferencialmente:

```text
ON DELETE RESTRICT
```

Ou

```text
SET NULL
```

Nunca utilizar:

```text
CASCADE DELETE
```

em entidades de negócio.

---

# Filosofia

O modelo relacional foi projetado para preservar histórico, garantir integridade referencial e suportar a evolução contínua da plataforma.

Toda nova entidade deverá ser integrada respeitando os domínios existentes, evitando dependências cruzadas e mantendo o baixo acoplamento entre módulos.

# 17. Estratégia de Índices e Performance

---

# Objetivo

Este capítulo define a estratégia oficial de indexação e otimização do banco de dados do Valenet Quality Hub.

O objetivo é garantir alto desempenho para consultas operacionais, dashboards e integrações, mantendo o crescimento sustentável da plataforma.

Toda criação de índices deverá seguir as diretrizes descritas neste documento.

---

# Princípios

Os índices deverão ser criados para otimizar:

- Consultas frequentes
- Relacionamentos
- Dashboards
- Paginação
- Filtros
- Ordenações
- Relatórios

Evitar índices desnecessários para reduzir custo de escrita.

---

# Tipos de Índices

## Primary Key

Toda tabela possuirá índice primário.

Exemplo.

```text
PK(id)
```

---

## Foreign Keys

Toda Foreign Key deverá possuir índice.

Exemplo.

```text
IDX(user_id)

IDX(team_id)

IDX(form_version_id)
```

---

## Unique

Campos únicos deverão utilizar UNIQUE.

Exemplo.

```text
email

employee_code

form_code
```

---

## Compostos

Utilizar apenas quando existirem consultas recorrentes.

Exemplos.

```text
(team_id, status)

(area_id, created_at)

(status, published_at)

(user_id, created_at)
```

---

# Índices por Módulo

## Users

```text
email

employee_code

status

full_name
```

---

## Forms

```text
status

channel

area_id

current_version
```

---

## Form Versions

```text
form_id

status

published_at
```

---

## Evaluations

```text
status

channel

team_id

area_id

evaluated_user_id

evaluator_user_id

published_at

created_at

monitoring_type
```

---

## Feedbacks

```text
employee_user_id

leader_user_id

status

due_date

applied_at
```

---

## Appeals

```text
status

requested_by

assigned_to

deadline_at
```

---

## AI

```text
provider_id

model_id

execution_status

created_at
```

---

## Notifications

```text
user_id

status

channel

created_at
```

---

## Audit

```text
user_id

module

entity

entity_id

operation

created_at
```

---

# Paginação

Toda consulta listando registros deverá utilizar paginação.

Nunca retornar listas completas.

---

## Padrão

```text
page

pageSize

sort

order
```

---

## Limites

```text
Padrão

25 registros

Máximo

100 registros
```

---

# Ordenação

Toda consulta deverá possuir ordenação explícita.

Nunca depender da ordem física do banco.

Exemplo.

```text
created_at DESC
```

---

# Consultas

Sempre selecionar apenas os campos necessários.

Evitar.

```sql
SELECT *
```

Preferir.

```sql
SELECT
id,
name,
status
```

---

# Dashboards

Consultas analíticas deverão utilizar:

- índices específicos;
- agregações otimizadas;
- materialização futura (roadmap).

Evitar consultas complexas diretamente sobre tabelas transacionais.

---

# Pesquisa

Para pesquisas textuais.

Priorizar:

```text
ILIKE

GIN

Full Text Search
```

Conforme necessidade.

---

# JSONB

Quando houver JSONB indexável.

Utilizar.

```text
GIN INDEX
```

Somente quando houver consultas frequentes.

---

# Soft Delete

Todas as consultas deverão considerar:

```sql
deleted_at IS NULL
```

Índices compostos poderão ser utilizados para otimizar este cenário.

Exemplo.

```text
(status, deleted_at)

(created_at, deleted_at)
```

---

# Particionamento (Roadmap)

Quando o volume justificar.

Priorizar particionamento para.

```text
audit_logs

evaluations

ai_executions

notifications
```

Critério.

```text
Mês

Ano
```

---

# Arquivamento

Dados históricos poderão ser arquivados.

Exemplos.

- Auditoria antiga
- Execuções antigas de IA
- Logs
- Notificações expiradas

Sem afetar a integridade referencial.

---

# Performance Esperada

Objetivos.

## Login

< 500 ms

---

## Dashboard

< 2 segundos

---

## Busca

< 1 segundo

---

## Publicação de Monitoria

< 2 segundos

---

## Execução IA

Dependente do provider.

---

## Listagens

< 1 segundo

---

# Monitoramento

Deverão ser monitorados.

- Consultas lentas
- Índices não utilizados
- Locks
- Deadlocks
- Crescimento das tabelas
- Crescimento dos índices

---

# Boas Práticas

Sempre:

- utilizar paginação;
- utilizar filtros;
- utilizar índices;
- selecionar apenas colunas necessárias;
- revisar planos de execução.

Nunca:

- utilizar SELECT *;
- criar índices duplicados;
- criar índices sem justificativa;
- realizar JOINs desnecessários.

---

# Evolução

Toda nova tabela deverá possuir uma estratégia de indexação definida antes da implementação.

A criação de novos índices deverá considerar impacto em leitura, escrita e armazenamento.

A performance deve ser validada continuamente conforme o crescimento do volume de dados da plataforma.

# 18. Política de Retenção e Arquivamento

---

# Objetivo

Este capítulo define a política oficial de retenção, arquivamento e descarte de dados do Valenet Quality Hub.

Os objetivos são:

- Garantir conformidade com a LGPD
- Preservar evidências para auditoria
- Manter a performance do banco de dados
- Reduzir custos de armazenamento
- Definir regras claras para retenção e descarte

Toda estratégia de retenção deverá preservar a integridade referencial e a rastreabilidade dos dados.

---

# Princípios

A política de retenção deverá seguir os seguintes princípios:

- Preservação de histórico
- Integridade dos relacionamentos
- Rastreabilidade
- Conformidade legal
- Performance operacional

Nenhum dado crítico poderá ser removido sem atender aos critérios estabelecidos.

---

# Classificação dos Dados

Os dados da plataforma são classificados em quatro categorias.

## Dados Operacionais

Representam o estado atual da operação.

Exemplos:

- Usuários
- Equipes
- Formulários
- Configurações

Retenção:

Enquanto permanecerem ativos.

---

## Dados Históricos

Representam eventos concluídos.

Exemplos:

- Monitorias
- Feedbacks
- Contestações
- Calibrações

Retenção mínima:

5 anos

---

## Dados de Auditoria

Representam evidências da operação.

Exemplos:

- Audit Logs
- Alterações
- Sessões

Retenção mínima:

10 anos

Nunca poderão ser alterados.

---

## Dados Técnicos

Representam informações operacionais da infraestrutura.

Exemplos:

- Logs de execução
- Jobs
- Filas
- Cache

Retenção:

30 a 180 dias, conforme configuração.

---

# Política por Entidade

| Entidade                | Retenção   | Exclusão Física |
| ----------------------- | ---------- | --------------- |
| users                   | Permanente | Não             |
| forms                   | Permanente | Não             |
| form_versions           | Permanente | Não             |
| evaluations             | 5 anos     | Não             |
| evaluation_answers      | 5 anos     | Não             |
| feedbacks               | 5 anos     | Não             |
| development_plans       | 5 anos     | Não             |
| appeals                 | 5 anos     | Não             |
| calibrations            | 5 anos     | Não             |
| ai_executions           | 2 anos     | Opcional        |
| ai_results              | 2 anos     | Opcional        |
| notifications           | 1 ano      | Sim             |
| notification_deliveries | 1 ano      | Sim             |
| audit_logs              | 10 anos    | Não             |
| audit_changes           | 10 anos    | Não             |
| audit_sessions          | 5 anos     | Não             |

---

# Soft Delete

Todas as entidades de negócio utilizarão Soft Delete.

Campos obrigatórios.

```text
deleted_at

deleted_by
```

Os registros permanecerão armazenados até eventual política de arquivamento.

---

# Arquivamento

Dados históricos poderão ser movidos para tabelas ou bancos de arquivamento.

Exemplos:

```text
evaluations_archive

audit_logs_archive

notifications_archive
```

O arquivamento deverá preservar:

- Chaves primárias
- Relacionamentos
- Auditoria
- Datas
- Histórico

---

# Estratégia de Arquivamento

O processo será executado automaticamente.

Fluxo.

```text
Registro Antigo

↓

Elegível

↓

Arquivamento

↓

Validação

↓

Remoção da Base Operacional

↓

Disponível para Consulta Histórica
```

---

# Consulta de Dados Arquivados

Usuários autorizados poderão consultar dados arquivados.

A consulta deverá indicar claramente que o registro encontra-se em ambiente histórico.

---

# Exclusão Física

A exclusão física somente será permitida para:

- Logs temporários
- Cache
- Tokens expirados
- Filas concluídas
- Arquivos temporários

Nunca para entidades de negócio ou auditoria.

---

# Anonimização

Quando exigido por legislação ou política corporativa, dados pessoais poderão ser anonimizados.

Exemplos:

- Nome
- Documento
- Telefone
- E-mail

A anonimização deverá preservar:

- Estatísticas
- Indicadores
- Integridade referencial

---

# LGPD

O sistema deverá permitir:

- Identificação de dados pessoais
- Anonimização
- Exportação de dados
- Registro de consentimento (quando aplicável)
- Atendimento a solicitações legais

A exclusão de dados pessoais deverá respeitar obrigações legais de retenção.

---

# Backups

A política de backup será tratada na documentação de infraestrutura.

Entretanto:

- Dados arquivados deverão ser incluídos nos backups.
- A restauração deverá preservar integridade referencial.
- Backups não substituem arquivamento.

---

# Monitoramento

Deverão ser monitorados:

- Crescimento das tabelas
- Volume arquivado
- Espaço em disco
- Tempo de arquivamento
- Falhas no processo
- Dados elegíveis para arquivamento

---

# Indicadores

O sistema deverá disponibilizar indicadores como:

- Volume de dados ativos
- Volume arquivado
- Crescimento mensal
- Economia de armazenamento
- Tempo médio de arquivamento
- Falhas de arquivamento

---

# Evolução Futura

A política suporta:

- Data Lake
- Cold Storage
- Azure Blob Storage
- Amazon S3
- Data Warehouse
- Retenção por Tenant
- Políticas específicas por Área

Sem necessidade de remodelagem estrutural.

---

# Filosofia

O Valenet Quality Hub deverá preservar o máximo de histórico possível, garantindo conformidade, rastreabilidade e desempenho.

O arquivamento deve ser transparente para o usuário, seguro para a organização e compatível com futuras necessidades de auditoria e análise histórica.

# 19. Estratégia de Migrations e Versionamento

---

# Objetivo

Este capítulo define a estratégia oficial para evolução do banco de dados do Valenet Quality Hub.

Toda alteração estrutural deverá ser realizada de forma controlada, rastreável e reversível sempre que possível.

O objetivo é garantir:

- Evolução segura do banco
- Compatibilidade entre ambientes
- Integridade dos dados
- Facilidade de rollback
- Histórico completo das alterações

---

# Ferramenta Oficial

O gerenciamento de schema será realizado exclusivamente através do:

```text
Prisma Migrate
```

Não será permitido:

- Alterar tabelas manualmente;
- Executar comandos SQL diretamente em Produção;
- Criar tabelas sem Migration.

---

# Fluxo de Evolução

Toda alteração deverá seguir o fluxo abaixo.

```text
Alteração do DATABASE.md

↓

Atualização do schema.prisma

↓

Criação da Migration

↓

Code Review

↓

Testes

↓

Homologação

↓

Produção
```

Nenhuma migration deverá ser criada sem que a documentação esteja atualizada.

---

# Convenção de Nomes

As migrations deverão seguir o padrão.

```text
YYYYMMDDHHMM_descricao
```

Exemplos.

```text
202608011030_create_users

202608011145_create_forms

202608011300_add_feedback_deadline

202608021000_create_ai_module
```

O nome deverá descrever claramente o objetivo da alteração.

---

# Tipos de Migration

## Estrutural

Criação ou alteração de tabelas.

Exemplo.

```text
Nova tabela

Novo campo

Novo índice

Nova FK
```

---

## Dados

Inserção de dados obrigatórios.

Exemplos.

```text
Perfis

Permissões

Configurações

Enums de domínio
```

Preferencialmente utilizar Seeds quando apropriado.

---

## Correção

Alterações para correção de modelagem.

Sempre deverão possuir justificativa documentada.

---

# Ordem das Migrations

As migrations deverão respeitar a dependência entre entidades.

Exemplo.

```text
Users

↓

Roles

↓

Permissions

↓

Forms

↓

Evaluations

↓

Feedbacks

↓

Appeals

↓

AI

↓

Notifications

↓

Audit
```

Nunca criar uma Foreign Key antes da tabela referenciada.

---

# Regras

Toda migration deverá:

- Compilar corretamente;
- Executar em banco vazio;
- Executar sobre banco existente;
- Não causar perda de dados;
- Possuir revisão técnica.

---

# Alterações Permitidas

Permitido.

- Nova tabela
- Nova coluna
- Novo índice
- Nova FK
- Novo Enum
- Nova Constraint

---

# Alterações Críticas

Exigem aprovação arquitetural.

- Exclusão de tabela
- Exclusão de coluna
- Alteração de tipo
- Alteração de PK
- Alteração de FK
- Alteração de Enum utilizado

---

# Rollback

Sempre que possível, as migrations deverão permitir rollback.

Quando não for possível:

A migration deverá documentar claramente os impactos.

---

# Dados em Produção

Nunca remover dados automaticamente.

Caso seja necessária migração de dados:

Criar processo específico.

Fluxo.

```text
Nova estrutura

↓

Migração dos dados

↓

Validação

↓

Remoção da estrutura antiga
```

---

# Versionamento

Toda alteração estrutural deverá possuir:

- Migration
- Atualização do DATABASE.md
- Atualização do schema.prisma
- Atualização do Data Dictionary

Os quatro documentos deverão permanecer sincronizados.

---

# Ambientes

A sequência oficial será.

```text
Local

↓

Development

↓

Homologação

↓

Produção
```

Nenhuma migration poderá ser aplicada diretamente em Produção sem validação anterior.

---

# Seeds

Os Seeds deverão conter apenas dados de sistema.

Exemplos.

- Perfis
- Permissões
- Áreas padrão
- Configurações
- Templates
- Providers de IA

Nunca utilizar Seeds para dados operacionais.

---

# Estratégia para Novas Colunas

Adicionar coluna.

↓

Permitir NULL temporariamente.

↓

Migrar dados.

↓

Validar.

↓

Tornar obrigatória.

Evitar alterações destrutivas.

---

# Estratégia para Renomeação

Nunca renomear diretamente.

Fluxo recomendado.

```text
Criar nova coluna

↓

Migrar dados

↓

Atualizar aplicação

↓

Remover coluna antiga

↓

Nova migration
```

---

# Estratégia para Exclusão

Nunca remover imediatamente.

Fluxo.

```text
Descontinuar

↓

Marcar como obsoleto

↓

Remover referências

↓

Migration futura

↓

Remoção definitiva
```

---

# Integridade

Após cada migration deverão ser validados:

- Constraints
- Foreign Keys
- Índices
- Performance
- Integridade referencial

---

# Auditoria

Todas as alterações estruturais deverão registrar:

- Autor
- Data
- Motivo
- ADR relacionada (quando aplicável)

---

# Checklist

Antes de aprovar uma migration verificar.

- [ ] DATABASE.md atualizado
- [ ] schema.prisma atualizado
- [ ] Migration criada
- [ ] Seeds atualizados
- [ ] Índices revisados
- [ ] Testes executados
- [ ] Rollback analisado
- [ ] Documentação atualizada

---

# Filosofia

A evolução do banco de dados deve ser incremental, segura e previsível.

Nenhuma alteração estrutural deverá comprometer a estabilidade da plataforma ou colocar em risco os dados de negócio.

O banco de dados é um ativo estratégico do Valenet Quality Hub e sua evolução deve seguir o mesmo rigor aplicado ao desenvolvimento da aplicação.

# 20. Considerações Finais

---

# Objetivo

Este documento define oficialmente o modelo de dados do Valenet Quality Hub.

Todas as implementações relacionadas ao banco de dados deverão seguir obrigatoriamente as diretrizes estabelecidas neste documento.

O DATABASE.md representa a referência arquitetural para toda a camada de persistência da plataforma.

---

# Documentos Complementares

A implementação do banco de dados é complementada pelos seguintes artefatos,
quando existirem:

```text
DATABASE.md

↓

apps/backend/prisma/schema.prisma

↓

apps/backend/prisma/migrations/

↓

apps/backend/prisma/seed.ts
```

O dicionário de dados, as convenções, a estratégia de migrations e as regras
para seeds estão consolidados neste documento. Não existem documentos
complementares separados para esses temas.

---

# Responsabilidades

## DATABASE.md

Define:

- arquitetura do banco;
- entidades;
- relacionamentos;
- princípios;
- convenções;
- regras de modelagem.

---

## Artefatos Prisma

O `schema.prisma` materializa apenas os modelos autorizados para implementação.
O diretório de migrations mantém o histórico executável. O seed, quando
autorizado por uma User Story, mantém dados iniciais idempotentes.

---

# Ordem de Implementação

A implementação do banco deverá seguir obrigatoriamente a seguinte sequência.

```text
DATABASE.md

↓

schema.prisma

↓

Migration

↓

Seed

↓

Repository

↓

DTO

↓

Service

↓

API
```

---

# Controle de Alterações

Toda alteração estrutural deverá atualizar obrigatoriamente:

- DATABASE.md
- schema.prisma
- Migration correspondente

Nenhuma alteração será considerada concluída enquanto existir divergência entre documentação e implementação.

---

# Fonte Oficial

O DATABASE.md é considerado a fonte oficial para:

- Modelagem do banco;
- Relacionamentos;
- Integridade referencial;
- Estratégias de evolução;
- Arquitetura de persistência.

Em caso de divergência entre a implementação e este documento, a divergência deverá ser tratada por meio de revisão arquitetural e atualização da documentação.

---

# Evolução

Este documento deverá evoluir junto com o produto.

Novas entidades, relacionamentos, índices e estratégias deverão ser documentados antes da implementação.

Mudanças que impactem a arquitetura deverão ser registradas também por meio de um ADR.

---

# Filosofia

O banco de dados do Valenet Quality Hub foi projetado para ser:

- consistente;
- auditável;
- escalável;
- performático;
- evolutivo;
- preparado para Inteligência Artificial;
- preparado para grandes volumes de dados;
- preparado para futuras operações multiempresa.

Toda evolução deverá preservar esses princípios, garantindo que a plataforma continue sustentável e preparada para crescer ao longo dos próximos anos.
