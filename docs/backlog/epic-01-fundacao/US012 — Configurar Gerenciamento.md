# US012 — Configurar Gerenciamento de Configurações e Variáveis de Ambiente

**Epic:** EPIC-01 — Fundação da Plataforma  
**ID:** US012  
**Prioridade:** P1 (Alta)  
**Story Points:** 5  
**Sprint:** Sprint 02  
**Status:** Done

---

# História

**Como** desenvolvedor da plataforma,

**Quero** centralizar todas as configurações da aplicação,

**Para que** o sistema seja seguro, flexível e facilmente configurável em diferentes ambientes.

---

# Objetivo

Criar uma arquitetura centralizada para gerenciamento de configurações, variáveis de ambiente e Feature Flags.

Ao final desta User Story nenhuma configuração deverá estar fixa no código da aplicação.

---

# Valor de Negócio

Esta User Story garante:

- Configuração centralizada.
- Facilidade de implantação.
- Segurança.
- Escalabilidade.
- Menor risco de erros entre ambientes.

---

# Escopo

## ConfigModule

Configurar o ConfigModule do NestJS como fonte oficial de configurações da aplicação.

---

## Validação

Validar todas as variáveis obrigatórias durante a inicialização utilizando Zod.

Caso exista alguma configuração inválida, a aplicação deverá interromper a inicialização com mensagem clara.

---

## Ambientes

Suportar os seguintes ambientes.

```text
Local

Development

Homologation

Production
```

Cada ambiente poderá possuir configurações específicas.

---

## Estrutura

Criar.

```text
config/

app.config.ts

database.config.ts

auth.config.ts

ai.config.ts

redis.config.ts

mail.config.ts

storage.config.ts

logging.config.ts

feature-flags.config.ts

index.ts
```

---

## Variáveis

Centralizar configurações para:

### Aplicação

- Nome
- Versão
- Porta
- Ambiente

---

### Banco de Dados

- DATABASE_URL
- Pool
- Timeout

---

### Redis

- Host
- Porta
- Senha

---

### Autenticação

- JWT Secret
- Refresh Secret
- Expiração

---

### IA

- Provider
- API Keys
- Modelos
- Limites

---

### Storage

- Upload
- Bucket
- Diretório

---

### Logs

- Nível
- Formato
- Retenção

---

### E-mail

- SMTP
- Templates
- Remetente

---

## Feature Flags

Criar estrutura para habilitar ou desabilitar funcionalidades.

Exemplo.

```text
AI_ENABLED

CALIBRATION_ENABLED

APPEALS_ENABLED

NOTIFICATIONS_ENABLED
```

---

## Ambiente Local

Criar.

```text
.env.example

.env.local

.env.development

.env.test
```

Nenhum segredo deverá ser versionado.

---

## Documentação

Documentar:

- todas as variáveis;
- valores obrigatórios;
- valores opcionais;
- exemplos de configuração;
- instruções para novos ambientes.

---

# Fora do Escopo

- Azure Key Vault
- AWS Secrets Manager
- HashiCorp Vault
- Configuração em Kubernetes

Esses recursos poderão ser implementados futuramente.

---

# Critérios de Aceite

- [x] ConfigModule configurado.
- [x] Validação automática funcionando.
- [x] Configurações centralizadas.
- [x] Estrutura por ambiente criada.
- [x] Feature Flags preparadas.
- [x] Documentação criada.

---

# Dependências

- US002 — Configurar Backend
- US004 — Configurar Banco de Dados

---

# Entregáveis

- Configuração centralizada.
- Estrutura de ambientes.
- Feature Flags.
- Validação automática.
- Documentação das variáveis.

---

# Requisitos Técnicos

- NestJS ConfigModule
- Zod
- dotenv

---

# Critérios Técnicos

A solução deverá:

- validar configurações na inicialização;
- impedir execução com configurações inválidas;
- permitir expansão para novos ambientes;
- manter segredos fora do repositório.

---

# Riscos

- Variáveis ausentes.
- Configurações duplicadas.
- Segredos versionados.
- Diferenças entre ambientes.

---

# Definition of Ready (DoR)

- Backend configurado.
- Estrutura de módulos criada.

---

# Definition of Done (DoD)

- Configurações centralizadas.
- Validação funcionando.
- Ambientes documentados.
- Aplicação inicializando corretamente.

---

# Arquivos Esperados

```text
apps/backend/src/config/

app.config.ts

database.config.ts

auth.config.ts

ai.config.ts

redis.config.ts

mail.config.ts

storage.config.ts

logging.config.ts

feature-flags.config.ts

index.ts

.env.example
```

---

# Observações

Nenhuma configuração deverá ser acessada diretamente por `process.env` fora da camada oficial de configuração.

Toda leitura de configuração deverá ocorrer por meio do serviço de configuração da aplicação.

---

# Instruções para Implementação (Codex)

## Objetivo

Criar a camada oficial de gerenciamento de configurações do Valenet Quality Hub.

## Criar

- ConfigModule.
- Arquivos de configuração por domínio.
- Validação com Zod.
- Estrutura de Feature Flags.
- Documentação das variáveis.
- Arquivos `.env.example`.

## Não Implementar

- Serviços externos de gerenciamento de segredos.
- Configurações específicas de nuvem.
- Integração com Azure Key Vault.

## Critérios

- Configuração tipada.
- Validação automática.
- Fácil manutenção.
- Compatível com múltiplos ambientes.
- Segura para produção.

---

# Arquitetura Aplicada

**Configuração:** NestJS ConfigModule

**Validação:** Zod

**Formato:** Arquivos tipados por domínio

**Ambientes:** Local, Desenvolvimento, Homologação e Produção

**Feature Flags:** Estrutura preparada para habilitar ou desabilitar funcionalidades.

**Princípio:** Toda configuração da plataforma deverá possuir uma única fonte de verdade, ser validada durante a inicialização e permanecer desacoplada da lógica de negócio.
