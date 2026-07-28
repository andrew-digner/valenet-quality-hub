# US013 — Gerenciar Usuários

**Epic:** EPIC-02 — Gestão Organizacional e Segurança

**ID:** US013

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 03

**Status:** Backlog

---

# História

Como administrador da plataforma,

Quero gerenciar usuários,

Para controlar quem pode acessar o Valenet Quality Hub e quais responsabilidades cada pessoa possui.

---

# Objetivo

Implementar o módulo completo de Gestão de Usuários.

O módulo deverá permitir administrar todo o ciclo de vida dos usuários da plataforma, incluindo criação, edição, ativação, inativação, bloqueio, pesquisa e consulta.

Todas as operações deverão ser auditadas.

---

# Valor de Negócio

Este módulo centraliza o gerenciamento dos colaboradores que utilizarão o sistema.

Todos os demais módulos dependerão desta funcionalidade.

---

# Escopo

## Cadastro

Permitir cadastrar usuários contendo.

- Nome
- Matrícula
- E-mail corporativo
- Telefone
- Área
- Equipe
- Cargo
- Perfil
- Status

---

## Consulta

Permitir pesquisar utilizando.

- Nome
- Matrícula
- E-mail
- Área
- Equipe
- Perfil
- Status

---

## Visualização

Exibir.

- Dados pessoais
- Perfil
- Área
- Equipe
- Cargo
- Último acesso
- Data de criação
- Situação

---

## Atualização

Permitir alterar.

- Nome
- Área
- Equipe
- Cargo
- Perfil
- Telefone

Não permitir alteração da matrícula.

---

## Ativação

Permitir reativar usuários.

---

## Inativação

Realizar exclusão lógica.

Nunca excluir registros fisicamente.

---

## Bloqueio

Permitir bloquear acesso imediatamente.

Sessões ativas deverão ser encerradas.

---

## Histórico

Registrar.

- criação;
- alterações;
- bloqueios;
- desbloqueios;
- ativações;
- inativações.

---

# Fluxo Principal

```text
Administrador

↓

Novo Usuário

↓

Preencher Dados

↓

Validar

↓

Salvar

↓

Associar Perfil

↓

Usuário Disponível
```

---

# Fluxo de Inativação

```text
Administrador

↓

Seleciona Usuário

↓

Inativar

↓

Confirmar

↓

Registrar Auditoria

↓

Encerrar Sessões
```

---

# Regras de Negócio

RN001

Matrícula deve ser única.

---

RN002

E-mail corporativo deve ser único.

---

RN003

Todo usuário deverá possuir exatamente um perfil.

---

RN004

Todo usuário deverá estar vinculado a uma área.

---

RN005

Todo usuário deverá pertencer a uma equipe.

---

RN006

Usuários inativos não poderão autenticar.

---

RN007

Usuários bloqueados terão todas as sessões encerradas.

---

RN008

Toda alteração deverá ser auditada.

---

RN009

Não será permitido excluir usuários fisicamente.

---

# Permissões

Administrador

- Criar
- Editar
- Inativar
- Bloquear

Supervisor

- Apenas consulta

Monitor

- Apenas consulta do próprio cadastro

---

# Critérios de Aceite

- [ ] Criar usuário.
- [ ] Editar usuário.
- [ ] Consultar usuário.
- [ ] Pesquisar usuários.
- [ ] Ativar usuário.
- [ ] Inativar usuário.
- [ ] Bloquear usuário.
- [ ] Registrar auditoria.
- [ ] Encerrar sessões quando necessário.

---

# Casos de Erro

- Matrícula duplicada.
- E-mail duplicado.
- Área inexistente.
- Equipe inexistente.
- Perfil inexistente.
- Usuário inexistente.

---

# APIs

```http
GET    /users

GET    /users/{id}

POST   /users

PUT    /users/{id}

PATCH  /users/{id}/status

PATCH  /users/{id}/status

PATCH  /users/{id}/block
```

---

# Banco de Dados

Tabelas envolvidas.

- users
- user_profiles
- user_sessions
- audit_logs

---

# Telas

- Lista de Usuários
- Cadastro
- Edição
- Detalhes
- Histórico

---

# Auditoria

Registrar.

- Quem criou.
- Quem alterou.
- Data.
- IP.
- Alterações realizadas.

---

# Definition of Done

- CRUD implementado.
- Testes criados.
- Auditoria funcionando.
- APIs documentadas.
- Interface concluída.
- Build aprovado.

---

# Dependências

US014

Gerenciar Perfis

US016

Gerenciar Áreas

US017

Gerenciar Equipes

---

# Observações

Este módulo representa a principal fonte de identidade da plataforma.

Todas as funcionalidades futuras utilizarão a entidade Usuário como referência principal.

## Requisitos consolidados da antiga US075

- Permitir nome social e CPF opcional, respeitando LGPD e mascaramento.
- Vincular o usuário a empresa, unidade, operação, equipe e supervisor quando
  esses níveis estiverem habilitados.
- Suportar os estados ativo, inativo, bloqueado, suspenso e pendente de
  ativação.
- Permitir redefinição de senha, troca obrigatória de senha, encerramento de
  sessões, desbloqueio e reenvio de convite conforme permissão.
- Auditar alterações de estado e ações administrativas de segurança.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD completo.
- DTOs.
- Controllers.
- Services.
- Repository.
- Validações.
- Testes.
- Auditoria.

## Não Implementar

- Permissões.
- Perfis.
- Áreas.
- Equipes.

Esses módulos possuem User Stories próprias.

## Critérios

- Exclusão lógica.
- Auditoria obrigatória.
- APIs REST.
- Validação de duplicidade.
- Compatível com RBAC.
