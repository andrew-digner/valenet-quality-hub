# US014 — Gerenciar Perfis (Roles)

**Epic:** EPIC-02 — Gestão Organizacional e Segurança

**ID:** US014

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 03

**Status:** Done

---

# História

Como administrador da plataforma,

Quero gerenciar perfis de acesso,

Para controlar quais funcionalidades cada grupo de usuários poderá utilizar.

---

# Objetivo

Implementar o módulo completo de Gestão de Perfis (Roles), permitindo criar, editar, inativar e organizar perfis utilizados pelo sistema de autorização (RBAC).

Cada perfil agrupa um conjunto de permissões que será atribuído aos usuários.

---

# Valor de Negócio

Este módulo elimina a necessidade de configurar permissões individualmente para cada usuário.

Toda a autorização do sistema será baseada em perfis.

---

# Escopo

## Cadastro

Permitir cadastrar perfis contendo.

- Nome
- Código
- Descrição
- Status
- Nível Hierárquico

---

## Consulta

Permitir pesquisar por.

- Nome
- Código
- Status

---

## Visualização

Exibir.

- Nome
- Código
- Quantidade de usuários
- Quantidade de permissões
- Data de criação
- Última alteração

---

## Atualização

Permitir alterar.

- Nome
- Descrição
- Status
- Hierarquia

Não permitir alteração do código interno.

---

## Ativação

Permitir ativar perfis.

---

## Inativação

Realizar exclusão lógica.

Perfis vinculados a usuários não poderão ser removidos.

---

## Associação de Permissões

Permitir associar permissões ao perfil.

Essa associação será utilizada pelo RBAC.

---

## Associação de Usuários

Permitir visualizar todos os usuários vinculados ao perfil.

---

# Fluxo Principal

```text
Administrador

↓

Criar Perfil

↓

Informar Dados

↓

Selecionar Permissões

↓

Salvar

↓

Perfil Disponível
```

---

# Fluxo de Alteração

```text
Administrador

↓

Selecionar Perfil

↓

Editar

↓

Salvar

↓

Atualizar Permissões

↓

Registrar Auditoria
```

---

# Regras de Negócio

RN001

O nome do perfil deverá ser único.

---

RN002

O código interno do perfil deverá ser único.

---

RN003

Todo perfil deverá possuir pelo menos uma permissão.

---

RN004

Perfis inativos não poderão ser atribuídos a novos usuários.

---

RN005

Não será permitido excluir perfis utilizados por usuários.

---

RN006

Toda alteração deverá ser registrada em auditoria.

---

RN007

A alteração das permissões de um perfil deverá refletir imediatamente nas próximas autorizações dos usuários vinculados.

---

RN008

Perfis do sistema poderão ser protegidos contra edição ou exclusão.

---

# Perfis Padrão

O sistema deverá possuir inicialmente.

- Administrador
- Supervisor
- Monitor
- Consultor
- Gestor
- Auditor

Esses perfis poderão ser alterados conforme configuração da empresa.

---

# Permissões

Administrador

- CRUD completo

Supervisor

- Consulta

Monitor

- Nenhuma operação administrativa

---

# Critérios de Aceite

- [ ] Criar perfil.
- [ ] Editar perfil.
- [ ] Consultar perfil.
- [ ] Pesquisar perfil.
- [ ] Ativar perfil.
- [ ] Inativar perfil.
- [ ] Associar permissões.
- [ ] Consultar usuários vinculados.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Nome duplicado.
- Código duplicado.
- Perfil inexistente.
- Perfil protegido.
- Perfil em uso.
- Permissão inexistente.

---

# APIs

```http
GET    /roles

GET    /roles/{id}

POST   /roles

PUT    /roles/{id}

PATCH  /roles/{id}/status

PATCH  /roles/{id}/status

GET    /roles/{id}/users

PUT    /roles/{id}/permissions
```

---

# Banco de Dados

Tabelas envolvidas.

- roles
- role_permissions
- user_roles
- audit_logs

---

# Telas

- Lista de Perfis
- Cadastro
- Edição
- Permissões
- Usuários Vinculados

---

# Auditoria

Registrar.

- Criação.
- Alteração.
- Inativação.
- Alteração de permissões.
- Usuário responsável.
- Data e hora.
- IP.

---

# Definition of Done

- CRUD implementado.
- Associação de permissões funcionando.
- Auditoria funcionando.
- APIs documentadas.
- Interface concluída.
- Testes implementados.

---

# Dependências

US013 — Gerenciar Usuários

US015 — Gerenciar Permissões

---

# Observações

Perfis representam grupos de permissões.

Usuários nunca receberão permissões diretamente.

Toda autorização ocorrerá por meio dos perfis.

## Requisitos consolidados da antiga US076

- Permitir múltiplos perfis por usuário e a definição de perfil padrão.
- Aplicar escopo organizacional por empresa, unidade, operação, equipe,
  supervisor ou colaborador, conforme a estrutura definida na US016.
- Manter histórico das alterações de perfis, associações, escopos, responsável,
  data, hora e justificativa opcional.
- Impedir a remoção do último perfil ativo necessário ao acesso do usuário.
- Manter RBAC centralizado, sem ACL por registro ou permissão diretamente
  associada ao usuário.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD de perfis.
- Associação de permissões.
- Associação de usuários.
- DTOs.
- Controllers.
- Services.
- Repository.
- Testes.
- Auditoria.

## Não Implementar

- CRUD de usuários.
- CRUD de permissões.

Esses módulos possuem User Stories próprias.

## Critérios

- Utilizar RBAC.
- Exclusão lógica.
- Auditoria obrigatória.
- APIs REST.
- Código desacoplado.
- Alta reutilização.

---

# Arquitetura Aplicada

**Modelo:** Role-Based Access Control (RBAC)

**Relacionamentos:**

Role → Permissions (N:N)

Role ↔ Users (N:N)

**Persistência:** Prisma ORM

**Autorização:** Guards + Decorators

**Princípio:** Toda autorização da plataforma será baseada exclusivamente em perfis, evitando permissões diretas atribuídas aos usuários.
