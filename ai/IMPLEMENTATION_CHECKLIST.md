# IMPLEMENTATION_CHECKLIST.md

# Valenet Quality Hub

## Checklist Oficial de Implementação

Versão: 1.0

---

# Objetivo

Este documento define os checklists obrigatórios para implementação de funcionalidades no Valenet Quality Hub.

Nenhuma entrega poderá ser considerada concluída sem atender aos critérios definidos neste documento.

Este checklist complementa:

- PRD
- ADRs
- Architecture
- Coding Standards
- Project Rules

---

# Fluxo Oficial

Toda implementação deverá seguir obrigatoriamente esta sequência.

```text
Entender o requisito

↓

Consultar PRD

↓

Consultar regras de negócio

↓

Consultar arquitetura

↓

Consultar modelo de dados

↓

Implementar

↓

Testar

↓

Documentar

↓

Revisar

↓

Entregar
```

---

# Checklist Geral

## Planejamento

- [ ] O requisito foi compreendido.
- [ ] O PRD foi consultado.
- [ ] As regras de negócio foram identificadas.
- [ ] Os ADRs relacionados foram consultados.
- [ ] Existe reutilização possível.
- [ ] Não será criado código duplicado.

---

## Arquitetura

- [ ] Segue Modular Monolith.
- [ ] Respeita Feature-Based Design.
- [ ] Não cria dependências circulares.
- [ ] Não quebra encapsulamento dos módulos.
- [ ] Utiliza interfaces públicas quando necessário.

---

## Backend

- [ ] Controller criado.
- [ ] Service criado.
- [ ] Repository criado.
- [ ] DTOs criados.
- [ ] Validators criados.
- [ ] Mapper criado.
- [ ] Eventos implementados.
- [ ] Exceptions implementadas.

---

## Frontend

- [ ] Página criada.
- [ ] Componentes reutilizáveis.
- [ ] Hooks separados.
- [ ] Services separados.
- [ ] Schemas criados.
- [ ] Tipos criados.
- [ ] Estados implementados.

---

## Banco

- [ ] Migration criada.
- [ ] Índices revisados.
- [ ] Constraints revisadas.
- [ ] Soft Delete respeitado.
- [ ] Auditoria prevista.

---

## APIs

- [ ] Endpoint criado.
- [ ] Swagger atualizado.
- [ ] DTO validado.
- [ ] Paginação implementada (quando aplicável).
- [ ] Filtros implementados (quando aplicável).
- [ ] Versionamento respeitado.

---

## Segurança

- [ ] JWT validado.
- [ ] Permissões implementadas.
- [ ] Escopo validado.
- [ ] Dados sensíveis protegidos.
- [ ] Logs sem informações confidenciais.

---

## Auditoria

- [ ] Operação auditada.
- [ ] Usuário registrado.
- [ ] Data registrada.
- [ ] Alterações registradas.
- [ ] Histórico preservado.

---

## Inteligência Artificial

(Quando aplicável)

- [ ] Provider utilizado corretamente.
- [ ] Prompt registrado.
- [ ] Modelo registrado.
- [ ] Score registrado.
- [ ] Evidências registradas.
- [ ] Tratamento de falhas implementado.

---

## Interface

- [ ] Responsiva.
- [ ] Tema Light.
- [ ] Tema Dark.
- [ ] Navegação por teclado.
- [ ] Componentes do Design System utilizados.

---

## Estados da Tela

Toda tela deverá possuir.

- [ ] Loading.
- [ ] Skeleton.
- [ ] Empty State.
- [ ] Error State.
- [ ] Success State.

---

## Formulários

(Quando aplicável)

- [ ] React Hook Form.
- [ ] Zod.
- [ ] Mensagens de erro.
- [ ] Placeholders.
- [ ] Campos obrigatórios destacados.

---

## Performance

- [ ] Lazy Loading.
- [ ] Paginação.
- [ ] Memoização (quando necessária).
- [ ] Cache avaliado.
- [ ] Processamentos pesados enviados para fila.

---

## Integrações

(Quando aplicável)

- [ ] Adapter utilizado.
- [ ] Timeout configurado.
- [ ] Retry implementado.
- [ ] Logs implementados.
- [ ] Tratamento de indisponibilidade.

---

## Testes

- [ ] Testes unitários.
- [ ] Testes de integração.
- [ ] Casos positivos.
- [ ] Casos negativos.
- [ ] Casos limite.
- [ ] Cobertura mínima atingida.

---

## Documentação

- [ ] Swagger atualizado.
- [ ] Documentação técnica atualizada.
- [ ] Changelog atualizado (quando aplicável).
- [ ] Comentários adicionados apenas onde necessário.

---

## Qualidade

- [ ] Build executado.
- [ ] Lint executado.
- [ ] Type Check executado.
- [ ] Sem warnings críticos.
- [ ] Sem código comentado.
- [ ] Sem TODOs.

---

# Checklist por Tipo de Entrega

## Nova Tela

- [ ] Layout criado.
- [ ] Componentes reutilizáveis.
- [ ] Breadcrumb.
- [ ] Filtros.
- [ ] Paginação.
- [ ] Estados da tela.
- [ ] Permissões.
- [ ] Testes.

---

## Nova API

- [ ] Endpoint REST.
- [ ] DTO.
- [ ] Swagger.
- [ ] Autorização.
- [ ] Auditoria.
- [ ] Testes.

---

## Novo Módulo

- [ ] Estrutura completa criada.
- [ ] Module registrado.
- [ ] Services.
- [ ] Repository.
- [ ] DTOs.
- [ ] Eventos.
- [ ] Testes.

---

## Nova Integração

- [ ] Adapter.
- [ ] Timeout.
- [ ] Retry.
- [ ] Logs.
- [ ] Monitoramento.
- [ ] Testes com mocks.

---

## Alteração no Banco

- [ ] Migration.
- [ ] Índices.
- [ ] Constraints.
- [ ] Compatibilidade.
- [ ] Dados históricos preservados.

---

# Critérios de Bloqueio

A implementação NÃO poderá ser entregue se:

- Existirem erros de build.
- Existirem erros de lint.
- Existirem falhas em testes.
- Não houver autorização implementada.
- Não houver auditoria em operações críticas.
- O PRD não tiver sido atendido.
- A documentação obrigatória estiver desatualizada.

---

# Definition of Done

Uma funcionalidade será considerada concluída somente quando:

- Implementação concluída.
- Critérios de aceite atendidos.
- Testes aprovados.
- Build aprovado.
- Revisão de código aprovada.
- Documentação atualizada.
- Homologação aprovada pelo Product Owner.

---

# Filosofia

A velocidade de entrega nunca deve comprometer a qualidade do software.

Este checklist existe para garantir que todas as funcionalidades do Valenet Quality Hub sejam entregues de forma consistente, segura, escalável e alinhada aos padrões definidos para o projeto.
