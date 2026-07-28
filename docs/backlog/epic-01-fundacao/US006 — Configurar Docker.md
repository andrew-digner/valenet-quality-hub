# US006 — Configurar Docker e Ambiente Local

**Epic:** EPIC-01 — Fundação da Plataforma  
**ID:** US006  
**Prioridade:** P0 (Crítica)  
**Story Points:** 8  
**Sprint:** Sprint 01  
**Status:** Done

---

# História

**Como** desenvolvedor da plataforma,

**Quero** executar todo o ambiente de desenvolvimento utilizando Docker,

**Para que** qualquer membro da equipe consiga iniciar o projeto de forma rápida, consistente e padronizada.

---

# Objetivo

Criar um ambiente local totalmente containerizado para desenvolvimento do Valenet Quality Hub.

Ao final desta User Story, qualquer desenvolvedor deverá conseguir iniciar toda a plataforma utilizando apenas comandos documentados.

---

# Valor de Negócio

Esta User Story garante:

- Padronização do ambiente.
- Redução de problemas de configuração.
- Onboarding mais rápido.
- Ambientes reproduzíveis.
- Facilidade para CI/CD.

---

# Escopo

## Containers

Criar containers para:

- PostgreSQL
- Redis
- API (NestJS)
- Frontend (Next.js)

Preparar estrutura para futuros serviços, como Worker e Nginx.

---

## Docker Compose

Criar um arquivo `docker-compose.yml` contendo todos os serviços necessários para desenvolvimento.

---

## Redes

Criar uma rede privada para comunicação entre os containers.

---

## Volumes

Persistir:

- Dados do PostgreSQL
- Cache do Redis
- Dependências quando aplicável

---

## Variáveis de Ambiente

Criar:

```text
.env.example

.env.local

.env.development
```

Documentar todas as variáveis obrigatórias.

---

## Scripts

Adicionar scripts para:

```bash
docker compose up

docker compose down

docker compose logs

docker compose restart
```

Também incluir scripts no `package.json` para facilitar a execução.

---

## Health Checks

Configurar Health Check para:

- PostgreSQL
- Redis
- API

---

## Documentação

Criar documentação contendo:

- Pré-requisitos
- Como subir o ambiente
- Como parar os containers
- Como atualizar imagens
- Como limpar volumes
- Como resetar o banco

---

## Estrutura

```text
docker/

postgres/

redis/

Dockerfile.api

Dockerfile.web

docker-compose.yml

docker-compose.override.yml
```

---

# Fora do Escopo

- Deploy em Produção
- Kubernetes
- Nginx
- Monitoramento
- Escalabilidade

Esses itens serão tratados em Epics futuras.

---

# Critérios de Aceite

- [x] Docker Compose executa sem erros.
- [x] PostgreSQL disponível.
- [x] Redis disponível.
- [x] API inicia corretamente.
- [x] Frontend inicia corretamente.
- [x] Volumes persistentes configurados.
- [x] Health Checks funcionando.
- [x] Documentação criada.

---

# Dependências

- US001 — Estruturar o Monorepo
- US002 — Configurar Backend
- US003 — Configurar Frontend
- US004 — Configurar Banco de Dados

---

# Entregáveis

- Docker Compose.
- Dockerfiles.
- Estrutura docker/.
- Variáveis de ambiente.
- Scripts de inicialização.
- Documentação de ambiente.

---

# Requisitos Técnicos

- Docker
- Docker Compose
- PostgreSQL
- Redis
- Node.js LTS

---

# Critérios Técnicos

O ambiente deverá:

- iniciar com um único comando;
- funcionar em Windows, Linux e macOS;
- permitir hot reload para API e Frontend;
- utilizar volumes persistentes;
- isolar os serviços em rede privada.

---

# Riscos

- Diferenças entre sistemas operacionais.
- Configuração incorreta de volumes.
- Problemas de rede entre containers.
- Imagens desatualizadas.

---

# Definition of Ready (DoR)

- Estrutura do projeto criada.
- Backend configurado.
- Frontend configurado.
- Banco de dados configurado.

---

# Definition of Done (DoD)

- Ambiente inicia corretamente.
- Containers estáveis.
- Documentação validada.
- Build aprovado.
- Scripts funcionando.

---

# Arquivos Esperados

```text
docker/

postgres/

redis/

Dockerfile.api

Dockerfile.web

docker-compose.yml

docker-compose.override.yml

.env.example

README.md
```

---

# Observações

Toda a equipe deverá utilizar este ambiente como padrão para desenvolvimento local.

Não serão aceitas configurações específicas de máquina que não estejam documentadas.

---

# Instruções para Implementação (Codex)

## Objetivo

Criar um ambiente de desenvolvimento totalmente containerizado para o Valenet Quality Hub.

## Criar

- Dockerfiles da API e Frontend.
- Docker Compose.
- Configuração do PostgreSQL.
- Configuração do Redis.
- Volumes persistentes.
- Health Checks.
- Scripts utilitários.

## Não Implementar

- Kubernetes.
- Deploy em Produção.
- Balanceamento de carga.
- Escalabilidade horizontal.

## Critérios

- Ambiente reproduzível.
- Configuração simples.
- Inicialização com poucos comandos.
- Compatível com todas as plataformas suportadas.

---

# Arquitetura Aplicada

**Containerização:** Docker

**Orquestração Local:** Docker Compose

**Banco:** PostgreSQL

**Cache:** Redis

**Rede:** Bridge Network Privada

**Persistência:** Volumes Docker

**Princípio:** Qualquer desenvolvedor deve conseguir executar toda a plataforma localmente em poucos minutos, utilizando apenas a documentação oficial.
