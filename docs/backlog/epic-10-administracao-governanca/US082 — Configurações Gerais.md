# US082 — Configurações Gerais e Multiempresa

**Epic:** EPIC-10 — Administração e Governança da Plataforma

**ID:** US082

**Prioridade:** P1 (Alta)

**Story Points:** 21

**Sprint:** Sprint 20

**Status:** Backlog

---

# História

Como administrador da plataforma,

Quero configurar empresas, unidades organizacionais e parâmetros específicos de cada organização,

Para permitir que múltiplas empresas utilizem o sistema de forma isolada, segura e personalizada.

---

# Objetivo

Implementar um módulo de administração multiempresa (multi-tenant), permitindo gerenciar organizações, estruturas organizacionais, configurações específicas por empresa e políticas de isolamento dos dados.

Cada empresa deverá possuir autonomia administrativa, respeitando as configurações globais da plataforma.

---

# Valor de Negócio

Esta funcionalidade permite:

- Atender múltiplas empresas.
- Isolar dados entre organizações.
- Personalizar configurações.
- Facilitar expansão comercial.
- Melhorar governança.
- Reduzir custo operacional.

---

# Escopo

## Empresas

Permitir cadastrar:

- Razão social
- Nome fantasia
- CNPJ
- Logotipo
- Idioma
- Fuso horário
- Status
- Domínio corporativo

---

## Estrutura Organizacional

Gerenciar:

- Empresas
- Unidades
- Operações
- Departamentos
- Equipes

---

## Configurações por Empresa

Permitir configurar:

- Idioma
- Tema
- SLA
- Políticas
- IA habilitada
- Integrações
- Feature Flags

---

## Isolamento

Garantir:

- Separação lógica dos dados
- Controle de acesso por empresa
- Auditoria segregada
- Configurações independentes

---

## Administração

Permitir:

- Ativar empresa
- Desativar empresa
- Suspender acesso
- Alterar configurações
- Consultar utilização

---

## Métricas

Exibir:

- Usuários ativos
- Monitorias
- Consumo de IA
- Espaço utilizado
- Integrações
- Utilização da licença

---

# Fluxo Principal

```text
Cadastrar Empresa

↓

Configurar Estrutura

↓

Definir Parâmetros

↓

Ativar Empresa

↓

Operação
```

---

# Regras de Negócio

RN001

Cada usuário deverá pertencer a pelo menos uma empresa.

---

RN002

Dados de empresas distintas deverão permanecer isolados.

---

RN003

Administradores globais poderão acessar todas as empresas.

---

RN004

Administradores da empresa visualizarão apenas seu próprio tenant.

---

RN005

Toda alteração deverá ser auditada.

---

RN006

Configurações globais prevalecerão quando não houver configuração específica da empresa.

---

RN007

A suspensão da empresa impedirá novos acessos sem excluir seus dados.

---

RN008

Cada empresa poderá possuir políticas próprias dentro dos limites definidos pela plataforma.

---

# Critérios de Aceite

- [ ] Cadastrar empresa.
- [ ] Configurar estrutura.
- [ ] Configurar parâmetros específicos.
- [ ] Garantir isolamento dos dados.
- [ ] Exibir métricas.
- [ ] Registrar auditoria.

---

# Casos de Erro

- CNPJ duplicado.
- Empresa inexistente.
- Usuário sem permissão.
- Domínio já utilizado.
- Configuração inválida.

---

# APIs

```http
GET    /tenants

GET    /tenants/{id}

POST   /tenants

PUT    /tenants/{id}

PATCH  /tenants/{id}/status

GET    /tenants/{id}/usage

GET    /tenants/{id}/settings
```

---

# Banco de Dados

Tabelas:

- tenants
- tenant_settings
- tenant_domains
- tenant_usage
- organizations
- audit_logs

---

# Telas

- Empresas
- Configurações da Empresa
- Estrutura Organizacional
- Utilização
- Status

---

# Auditoria

Registrar:

- Criação.
- Alteração.
- Ativação.
- Suspensão.
- Configurações.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Multiempresa implementado.
- Isolamento funcionando.
- Configurações por tenant implementadas.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US013 — Gerenciar Usuários
- US014 — Gerenciar Perfis
- US015 — Gerenciar Permissões
- US016 — Gerenciar Estrutura Organizacional
- US077 — Configurar Parâmetros da Plataforma
- US079 — Gerenciar Integrações

---

# Observações

O modelo multiempresa deverá garantir isolamento lógico entre organizações, permitindo que cada empresa possua usuários, configurações, integrações e métricas próprias.

A arquitetura deverá suportar expansão para centenas de empresas sem necessidade de alterações estruturais.

---

# Instruções para Implementação (Codex)

## Criar

- CRUD de empresas.
- Configurações por tenant.
- Isolamento lógico.
- Métricas de utilização.
- Auditoria.
- Testes.

## Não Implementar

- Compartilhamento automático de dados entre empresas.
- Migração automática entre tenants.
- Exclusão física de empresas.

## Critérios

- Arquitetura multi-tenant.
- APIs REST.
- Isolamento obrigatório.
- Observabilidade.
- Baixo acoplamento.

---

# Arquitetura Aplicada

**Aggregate Root:** Tenant

**Relacionamentos:**

Platform

↓

Tenant

↓

TenantSetting

↓

Organization

↓

TenantUsage

↓

AuditLog

**Persistência:** Prisma ORM

**Princípio:** O modelo multiempresa deve garantir isolamento lógico entre organizações, permitindo personalização, segurança e governança sem comprometer a escalabilidade da plataforma.
