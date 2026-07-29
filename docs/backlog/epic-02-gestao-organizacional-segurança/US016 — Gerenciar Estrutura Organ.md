# US016 — Gerenciar Estrutura Organizacional

**Epic:** EPIC-02 — Gestão Organizacional e Segurança

**ID:** US016

**Prioridade:** P0 (Crítica)

**Story Points:** 21

**Sprint:** Sprint 03

**Status:** Done

---

# História

Como administrador da plataforma,

Quero gerenciar a estrutura organizacional da empresa,

Para que os usuários sejam organizados corretamente dentro da operação e as monitorias possam ser distribuídas conforme a estrutura da organização.

---

# Objetivo

Implementar o módulo responsável pelo cadastro e manutenção da estrutura organizacional da empresa.

Esta estrutura será utilizada por praticamente todos os módulos do Valenet Quality Hub.

---

# Valor de Negócio

Permite representar fielmente a organização da empresa dentro da plataforma.

A estrutura organizacional será utilizada por:

- Usuários
- Monitorias
- Dashboards
- Indicadores
- Feedbacks
- IA
- Permissões
- Relatórios

---

# Escopo

## Empresas

Permitir:

- Criar
- Editar
- Ativar
- Inativar
- Consultar

Campos.

- Nome
- Nome Fantasia
- CNPJ
- Status

---

## Filiais

Permitir:

- Cadastro
- Alteração
- Consulta

Campos.

- Empresa
- Nome
- Código
- Cidade
- Estado

---

## Áreas

Permitir:

- Criar
- Editar
- Consultar
- Inativar

Exemplos.

- Atendimento
- Suporte
- Comercial
- Financeiro
- Cobrança

---

## Equipes

Permitir:

- Criar
- Editar
- Consultar
- Inativar

Cada equipe deverá pertencer a uma Área.

---

## Cargos

Permitir:

- Criar
- Editar
- Consultar

Exemplos.

- Monitor
- Supervisor
- Coordenador
- Gerente
- Diretor

---

## Hierarquia Organizacional

Representar.

```text
Empresa

↓

Filial

↓

Área

↓

Equipe

↓

Usuário
```

---

# Fluxo Principal

```text
Administrador

↓

Criar Empresa

↓

Criar Filiais

↓

Criar Áreas

↓

Criar Equipes

↓

Cadastrar Usuários
```

---

# Regras de Negócio

RN001

Toda Área deverá pertencer a uma Empresa.

---

RN002

Toda Equipe deverá pertencer a uma Área.

---

RN003

Todo Usuário deverá pertencer a uma Equipe.

---

RN004

Toda Equipe deverá possuir apenas uma Área.

---

RN005

Não permitir exclusão física.

---

RN006

Utilizar exclusão lógica.

---

RN007

Toda alteração deverá ser auditada.

---

RN008

Não permitir inativar uma Área que possua Equipes ativas.

---

RN009

Não permitir inativar uma Equipe que possua Usuários ativos.

---

# Critérios de Aceite

- [ ] CRUD de Empresas.
- [ ] CRUD de Filiais.
- [ ] CRUD de Áreas.
- [ ] CRUD de Equipes.
- [ ] CRUD de Cargos.
- [ ] Hierarquia funcionando.
- [ ] Auditoria funcionando.

---

# APIs

```http
GET    /companies
POST   /companies

GET    /branches
POST   /branches

GET    /areas
POST   /areas

GET    /teams
POST   /teams

GET    /positions
POST   /positions
```

---

# Banco de Dados

Tabelas.

- companies
- branches
- areas
- teams
- positions
- users
- audit_logs

---

# Telas

- Empresas
- Filiais
- Áreas
- Equipes
- Cargos

---

# Auditoria

Registrar.

- Criação
- Alteração
- Ativação
- Inativação
- Mudança de hierarquia

---

# Definition of Done

- CRUD implementado.
- Hierarquia funcionando.
- APIs documentadas.
- Testes implementados.
- Auditoria implementada.

---

# Dependências

US013 — Gerenciar Usuários

---

# Observações

Toda a estrutura organizacional deverá ser reutilizada pelos módulos de Monitorias, Dashboards, Feedback, IA e Relatórios.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD de Empresas.
- CRUD de Filiais.
- CRUD de Áreas.
- CRUD de Equipes.
- CRUD de Cargos.
- Validações.
- Auditoria.
- Testes.

## Não Implementar

- Regras específicas de Monitorias.
- Dashboards.
- Feedbacks.
- IA.

## Critérios

- Exclusão lógica.
- APIs REST.
- Arquitetura modular.
- Alta reutilização.
- Baixo acoplamento.

---

# Arquitetura Aplicada

**Modelo:** Estrutura Organizacional Hierárquica

**Relacionamentos:**

Empresa → Filiais → Áreas → Equipes → Usuários

**Persistência:** Prisma ORM

**Princípio:** Toda entidade operacional da plataforma deverá estar vinculada à estrutura organizacional, garantindo rastreabilidade, segmentação de dados e aplicação consistente das regras de negócio.
