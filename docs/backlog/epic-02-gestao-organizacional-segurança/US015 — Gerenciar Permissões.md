# US015 — Gerenciar Permissões

**Epic:** EPIC-02 — Gestão Organizacional e Segurança

**ID:** US015

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 03

**Status:** Done

---

# História

Como administrador da plataforma,

Quero gerenciar permissões,

Para controlar exatamente quais operações cada perfil poderá executar dentro do sistema.

---

# Objetivo

Implementar o módulo de Gestão de Permissões responsável por controlar todas as ações disponíveis na plataforma.

As permissões serão atribuídas aos perfis e utilizadas pelo mecanismo de autorização (RBAC).

---

# Valor de Negócio

Este módulo garante:

- Segurança granular.
- Controle de acesso por funcionalidade.
- Flexibilidade para evolução do sistema.
- Reutilização entre módulos.

---

# Escopo

## Cadastro

Permitir cadastrar permissões contendo:

- Nome
- Código
- Módulo
- Recurso
- Ação
- Descrição
- Status

---

## Consulta

Permitir pesquisar por:

- Nome
- Código
- Módulo
- Recurso
- Ação
- Status

---

## Visualização

Exibir:

- Nome
- Código
- Módulo
- Ação
- Quantidade de perfis vinculados
- Status

---

## Atualização

Permitir alterar:

- Nome
- Descrição
- Status

Não permitir alteração do código interno.

---

## Associação

Permitir visualizar:

- Perfis vinculados
- Usuários impactados

---

# Estrutura da Permissão

Cada permissão deverá seguir o padrão.

```text
MODULO.RECURSO.ACAO
```

Exemplos.

```text
USERS.READ

USERS.CREATE

USERS.UPDATE

USERS.DELETE

FORMS.READ

FORMS.PUBLISH

EVALUATIONS.CREATE

AI.EXECUTE

DASHBOARD.VIEW
```

---

# Organização

As permissões deverão ser agrupadas por módulo.

```text
AUTH

USERS

ROLES

PERMISSIONS

FORMS

EVALUATIONS

FEEDBACK

APPEALS

AI

CALIBRATION

DASHBOARD

SETTINGS

AUDIT
```

---

# Regras de Negócio

RN001

O código da permissão deverá ser único.

---

RN002

Toda permissão pertence a um único módulo.

---

RN003

Permissões poderão ser associadas a vários perfis.

---

RN004

Permissões não poderão ser atribuídas diretamente aos usuários.

---

RN005

Toda alteração deverá ser registrada em auditoria.

---

RN006

Permissões do sistema poderão ser protegidas contra edição.

---

RN007

Alterações nas permissões deverão refletir imediatamente nas próximas validações de acesso.

---

# Fluxo Principal

```text
Administrador

↓

Criar Permissão

↓

Definir Módulo

↓

Definir Ação

↓

Salvar

↓

Associar ao Perfil
```

---

# Critérios de Aceite

- [ ] Criar permissão.
- [ ] Editar permissão.
- [ ] Consultar permissão.
- [ ] Pesquisar permissões.
- [ ] Inativar permissão.
- [ ] Associar a perfis.
- [ ] Consultar perfis vinculados.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Código duplicado.
- Permissão inexistente.
- Módulo inválido.
- Permissão protegida.

---

# APIs

```http
GET    /permissions

GET    /permissions/{id}

POST   /permissions

PUT    /permissions/{id}

PATCH  /permissions/{id}/status

PATCH  /permissions/{id}/status

GET    /permissions/{id}/roles
```

---

# Banco de Dados

Tabelas envolvidas.

- permissions
- role_permissions
- audit_logs

---

# Telas

- Lista de Permissões
- Cadastro
- Edição
- Detalhes
- Perfis Vinculados

---

# Auditoria

Registrar:

- Criação.
- Alteração.
- Ativação.
- Inativação.
- Associação com perfis.
- Usuário responsável.
- Data e hora.
- Endereço IP.

---

# Definition of Done

- CRUD implementado.
- Associação com perfis funcionando.
- Auditoria implementada.
- APIs documentadas.
- Interface concluída.
- Testes implementados.

---

# Dependências

- US014 — Gerenciar Perfis

---

# Observações

Permissões representam ações executáveis.

Usuários nunca receberão permissões diretamente.

Toda autorização será realizada através da combinação:

Usuário → Perfil → Permissões

## Requisitos consolidados da antiga US076

O catálogo deve suportar, conforme aplicável ao recurso, ações de visualizar,
criar, editar, excluir logicamente, aprovar, exportar, configurar e administrar.
Toda mudança de permissão ou associação deve ser versionada e auditada.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD completo.
- DTOs.
- Controllers.
- Services.
- Repository.
- Validações.
- Auditoria.
- Testes.

## Não Implementar

- CRUD de Perfis.
- CRUD de Usuários.

## Critérios

- RBAC.
- Exclusão lógica.
- Auditoria obrigatória.
- APIs REST.
- Código desacoplado.

---

# Arquitetura Aplicada

**Modelo:** RBAC

**Relacionamentos:**

Permission → Roles (N:N)

Role ↔ Users (N:N)

**Persistência:** Prisma ORM

**Autorização:** Guards + Decorators

**Princípio:** Todas as ações executadas na plataforma deverão ser protegidas por permissões explícitas, garantindo controle granular e rastreabilidade do acesso.
