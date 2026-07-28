# C4_DEPLOYMENT.md

# C4 Model — Nível 5 (Deployment Architecture)

## Valenet Quality Hub

Versão: 1.0

---

# Objetivo

Este documento descreve a arquitetura de implantação (Deployment Architecture) do Valenet Quality Hub.

Seu objetivo é definir como os componentes do sistema serão distribuídos na infraestrutura, garantindo:

- Alta disponibilidade;
- Escalabilidade horizontal;
- Segurança;
- Observabilidade;
- Facilidade de manutenção;
- Baixo tempo de indisponibilidade.

Este documento complementa o modelo C4 tradicional e servirá como referência para implantação em ambientes de Desenvolvimento, Homologação e Produção.

---

# Visão Geral

```text

                           Internet

                               │

                     HTTPS / TLS 1.3

                               │

                      Azure Application Gateway
                               │
                               ▼

                           NGINX Reverse Proxy

                               │

              ┌─────────────────────────────────┐

              │                                 │

              ▼                                 ▼

      Frontend (Next.js)               Backend (NestJS)

              │                                 │

              └──────────────┬──────────────────┘

                             │

               Internal Private Network

                             │

      ┌───────────────┬───────────────┬───────────────┐

      ▼               ▼               ▼

 PostgreSQL        Redis         BullMQ Workers

      │               │               │

      └───────────────┼───────────────┘

                      ▼

              Azure Blob Storage

                      │

          ┌───────────┼─────────────┐

          ▼           ▼             ▼

     Azure OpenAI   CRM      Telefonia / WhatsApp

```

---

# Ambientes

A plataforma possuirá ambientes independentes.

```text
Development

↓

Homologation

↓

Production
```

Cada ambiente possuirá:

- banco independente;
- Redis independente;
- Storage independente;
- configurações independentes.

Nunca compartilhar banco entre ambientes.

---

# Ambiente de Desenvolvimento

Objetivo.

Desenvolvimento local.

Infraestrutura.

- Docker Compose
- PostgreSQL
- Redis
- MinIO (opcional)
- Mailpit
- BullMQ

Todos executados localmente.

---

# Ambiente de Homologação

Objetivo.

Validação funcional.

Infraestrutura semelhante à produção.

Diferenças.

- menor capacidade;
- menor quantidade de workers.

---

# Ambiente de Produção

Objetivo.

Operação oficial.

Infraestrutura.

- Alta disponibilidade
- Monitoramento
- Backup automático
- Escalabilidade

---

# Frontend

Tecnologia.

Next.js

Executado como container Docker.

Responsabilidades.

- Interface
- Dashboards
- Formulários
- Login
- Consumo das APIs

---

# Backend

Tecnologia.

NestJS

Executado em container Docker.

Responsabilidades.

- APIs
- IA
- Auditoria
- Integrações
- Segurança

---

# Banco de Dados

PostgreSQL

Responsabilidades.

- Persistência
- Integridade
- Histórico

Características.

- WAL habilitado
- Backups automáticos
- Índices
- UUID
- SSL obrigatório

---

# Redis

Responsabilidades.

- Cache
- Sessões
- Configurações
- Permissões

Nunca armazenar informações permanentes.

---

# Workers

BullMQ.

Executarão.

- IA
- Relatórios
- Exportações
- Importações
- Notificações

Workers poderão ser escalados independentemente.

---

# Blob Storage

Azure Blob Storage.

Armazenará.

- gravações
- PDFs
- evidências
- anexos
- exportações

Nenhum arquivo será salvo no servidor da aplicação.

---

# Inteligência Artificial

Arquitetura.

```text
Backend

↓

AI Provider

↓

Azure OpenAI

↓

Resposta

↓

Persistência
```

A arquitetura permitirá múltiplos Providers.

---

# Balanceamento

Toda requisição deverá passar por:

```text
Internet

↓

Application Gateway

↓

NGINX

↓

Containers
```

Benefícios.

- SSL
- Balanceamento
- Compressão
- Cache
- Segurança

---

# Observabilidade

Todos os serviços deverão enviar métricas.

```text
Application

↓

OpenTelemetry

↓

Prometheus

↓

Grafana
```

---

# Logs

Todos os containers enviarão logs para uma solução centralizada.

Exemplos.

- Grafana Loki
- Azure Monitor
- Elastic Stack

Nunca consultar logs diretamente nos containers.

---

# Health Checks

Todos os serviços deverão possuir.

```text
/health

/ready

/live
```

Esses endpoints serão utilizados pelo orquestrador.

---

# Escalabilidade

Escalabilidade horizontal.

```text
Frontend

1 → N

Backend

1 → N

Workers

1 → N
```

Banco permanecerá centralizado.

---

# Backup

Backup diário.

Tipos.

- Completo
- Incremental

Todos criptografados.

Retenção configurável.

---

# Disaster Recovery

A arquitetura deverá permitir.

- restauração rápida;
- recuperação do banco;
- recuperação do storage;
- recuperação das filas.

---

# Segurança

Todo tráfego deverá utilizar.

HTTPS

TLS 1.3

Firewall

Rate Limiting

CORS

Helmet

WAF (quando disponível)

---

# Ambientes

Cada ambiente possuirá.

```text
.env.development

.env.homolog

.env.production
```

Nunca utilizar credenciais no código.

---

# CI/CD

Fluxo.

```text
GitHub

↓

GitHub Actions

↓

Build

↓

Testes

↓

Docker Image

↓

Registry

↓

Deploy
```

---

# Docker

Cada serviço possuirá sua própria imagem.

```text
frontend

backend

worker
```

---

# Kubernetes (Futuro)

A arquitetura deverá permitir migração para Kubernetes.

Estrutura prevista.

```text
Ingress

↓

Frontend Pods

↓

Backend Pods

↓

Worker Pods

↓

Redis

↓

PostgreSQL

↓

Storage
```

Sem necessidade de alterar o código.

---

# Disponibilidade

Objetivo.

99,5%

Tempo máximo anual de indisponibilidade.

Aproximadamente 44 horas.

---

# Observabilidade Obrigatória

Métricas.

- CPU
- Memória
- Tempo de resposta
- Tempo das APIs
- Tempo da IA
- Uso do banco
- Filas
- Cache
- Erros

---

# Alarmes

Deverão existir alertas para.

- API indisponível
- Banco indisponível
- Redis indisponível
- Workers parados
- IA indisponível
- Crescimento das filas
- Erros acima do limite

---

# Objetivo Arquitetural

A infraestrutura foi projetada para suportar:

- milhões de monitorias;
- milhares de usuários simultâneos;
- crescimento contínuo;
- novos canais de atendimento;
- múltiplos modelos de IA;
- futura arquitetura baseada em Kubernetes;
- futura operação multiempresa.

Todas as decisões de infraestrutura deverão preservar simplicidade operacional, escalabilidade e segurança.
