# C4_CONTEXT.md

# C4 Model — Nível 1 (System Context)

## Valenet Quality Hub

Versão: 1.0

---

# Objetivo

Este documento apresenta a visão de contexto do Valenet Quality Hub utilizando o modelo C4 (Context Diagram).

Seu objetivo é identificar:

- O propósito do sistema.
- Quem utiliza a plataforma.
- Quais sistemas externos interagem com ela.
- Quais informações entram e saem.
- Os limites da responsabilidade da aplicação.

Este documento não detalha a arquitetura interna da solução.

---

# Visão Geral

O Valenet Quality Hub é uma plataforma corporativa de Gestão da Qualidade desenvolvida para centralizar todo o processo de monitoria dos atendimentos realizados pela Valenet.

A plataforma suporta monitorias manuais e automatizadas por Inteligência Artificial, gerenciamento de formulários, feedbacks, contestações, calibração de avaliadores, dashboards executivos e integrações com sistemas corporativos.

Seu principal objetivo é elevar a qualidade operacional através de indicadores confiáveis, automação e melhoria contínua.

---

# Diagrama de Contexto

```text

                                   CLIENTE

                                      │

                        Contato via Voz / WhatsApp

                                      │

                                      ▼

                     Plataforma de Telefonia / WhatsApp

                                      │

                                      ▼

                    ┌──────────────────────────────────────┐
                    │                                      │
                    │      VALENET QUALITY HUB             │
                    │                                      │
                    │ • Monitorias                         │
                    │ • Inteligência Artificial            │
                    │ • Feedbacks                          │
                    │ • Contestações                       │
                    │ • Calibração                         │
                    │ • Dashboards                         │
                    │ • Auditoria                          │
                    │                                      │
                    └──────────────────────────────────────┘

          ▲                 ▲                  ▲

          │                 │                  │

          │                 │                  │

   Microsoft Entra     Azure OpenAI        CRM Corporativo

          │                 │                  │

          └─────────────────┼──────────────────┘

                            │

                      Usuários Internos

```

---

# Atores

## Administrador

Responsável pela administração completa da plataforma.

Principais responsabilidades:

- Gerenciar usuários.
- Configurar perfis.
- Configurar áreas.
- Configurar integrações.
- Configurar IA.
- Gerenciar auditoria.
- Configurar SLAs.
- Gerenciar parâmetros globais.

---

## Monitor de Qualidade

Responsável pela execução das monitorias.

Responsabilidades:

- Realizar monitorias.
- Publicar avaliações.
- Registrar evidências.
- Aplicar feedbacks.
- Participar de calibrações.
- Analisar contestações (quando autorizado).

---

## Supervisor

Responsável pela gestão operacional da equipe.

Responsabilidades:

- Acompanhar indicadores.
- Aplicar feedbacks.
- Registrar planos de desenvolvimento.
- Abrir contestações.
- Acompanhar evolução dos colaboradores.

---

## Coordenador

Responsável pela gestão de múltiplas equipes.

Responsabilidades:

- Acompanhar dashboards.
- Monitorar indicadores.
- Validar calibrações.
- Aprovar processos.

---

## Gerente

Responsável pela visão estratégica.

Responsabilidades:

- Indicadores executivos.
- Tendências.
- Metas.
- Performance da operação.

---

## Atendente

Responsável pelos atendimentos.

Responsabilidades:

- Consultar monitorias.
- Registrar ciência.
- Acompanhar evolução.
- Solicitar contestação quando permitido.

---

## Inteligência Artificial

Atua como avaliador automatizado.

Responsabilidades:

- Avaliar atendimentos.
- Aplicar formulários.
- Produzir justificativas.
- Identificar evidências.
- Calcular notas.
- Gerar resumos executivos.
- Sugerir feedbacks.

---

# Sistemas Externos

## Plataforma de Telefonia

Responsável por disponibilizar:

- Áudio das chamadas.
- Metadados.
- Protocolo.
- Tempo de atendimento.
- Identificador da ligação.
- Transcrição (quando disponível).

A plataforma de telefonia permanece responsável pela gravação das chamadas.

---

## WhatsApp

Responsável por fornecer:

- Conversa.
- Participantes.
- Horários.
- Anexos.
- Mensagens.

---

## CRM Corporativo

Responsável pelos dados do cliente.

Informações consumidas:

- Cliente.
- Contrato.
- Produtos.
- Histórico.
- Motivo do contato.
- Regional.

O Quality Hub não é responsável pela gestão cadastral dos clientes.

---

## Microsoft Entra ID

Responsável por:

- Autenticação.
- SSO.
- Sincronização de usuários.
- Grupos.
- Perfis corporativos.

---

## Azure OpenAI (ou outro provedor)

Responsável pelo processamento da Inteligência Artificial.

Entradas:

- Transcrição.
- Formulário.
- Configurações.

Saídas:

- Respostas.
- Evidências.
- Justificativas.
- Score.
- Resumo.

---

## Microsoft Teams

Receberá notificações automáticas.

Exemplos:

- Feedback pendente.
- Contestação aberta.
- SLA vencido.
- IA concluída.

---

## SMTP

Responsável pelo envio de e-mails.

---

## Data Warehouse / BI

Consumirá dados analíticos da plataforma para construção de dashboards corporativos.

---

# Fluxos de Negócio

## Fluxo de Monitoria

```text
Cliente

↓

Atendimento

↓

Telefonia / WhatsApp

↓

Quality Hub

↓

Monitor ou IA

↓

Monitoria

↓

Dashboard

↓

Feedback

↓

Plano de Desenvolvimento
```

---

## Fluxo de IA

```text
Atendimento

↓

Transcrição

↓

Motor de IA

↓

Monitoria

↓

Publicação

↓

Indicadores
```

---

## Fluxo de Contestação

```text
Monitoria

↓

Contestação

↓

Reavaliação

↓

Parecer

↓

Atualização dos Indicadores
```

---

## Fluxo de Calibração

```text
Monitoria

↓

Avaliação por Múltiplos Monitores

↓

Comparação

↓

Consenso

↓

Indicadores
```

---

# Limites do Sistema

## Responsabilidades do Valenet Quality Hub

- Gestão de usuários.
- Gestão de formulários.
- Gestão de monitorias.
- Avaliação por IA.
- Feedback.
- Planos de desenvolvimento.
- Contestações.
- Calibração.
- Dashboards.
- Auditoria.
- Configurações.
- Integrações.

---

## Fora do Escopo

O sistema NÃO será responsável por:

- Telefonia.
- CRM.
- WhatsApp.
- Gravação das chamadas.
- Autenticação corporativa (quando houver SSO).
- Plataformas de BI.
- LMS.
- RH.

Essas responsabilidades pertencem aos sistemas integrados.

---

# Requisitos Arquiteturais

O sistema deverá:

- Operar de forma desacoplada.
- Integrar novos sistemas sem alteração das regras de negócio.
- Permitir múltiplos provedores de IA.
- Permitir novos canais de atendimento.
- Permitir futura operação multiempresa.

---

# Princípios Arquiteturais

Toda integração deverá ocorrer por:

- REST APIs.
- Webhooks.
- Eventos.
- Filas.
- Adaptadores.

Nunca por acesso direto ao banco de dados de outro sistema.

---

# Visão Estratégica

O Valenet Quality Hub é o núcleo da estratégia de Gestão da Qualidade da Valenet.

Sua missão é consolidar em uma única plataforma:

- Qualidade operacional.
- Inteligência Artificial.
- Desenvolvimento de colaboradores.
- Governança.
- Indicadores.
- Auditoria.
- Analytics.

A arquitetura foi concebida para suportar evolução contínua, crescimento do volume operacional e adoção de novas tecnologias, mantendo simplicidade, escalabilidade e baixo acoplamento.

---

# Próximos Diagramas

Este documento representa o **Nível 1 (Contexto)** do modelo C4.

Os documentos complementares são:

- **C4_CONTAINER.md** — Containers da solução.
- **C4_COMPONENT.md** — Componentes internos do backend.
- **C4_CODE.md** — Organização interna dos módulos.
- **C4_DEPLOYMENT.md** — Arquitetura de infraestrutura e implantação.
