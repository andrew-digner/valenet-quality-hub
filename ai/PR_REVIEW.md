# PR_REVIEW.md

# Valenet Quality Hub

## Guia Oficial de Revisão de Pull Requests

Versão: 1.0

---

# Objetivo

Este documento define os critérios oficiais para revisão de Pull Requests do Valenet Quality Hub.

Todo Pull Request deverá ser revisado utilizando este checklist.

O objetivo é garantir:

- Qualidade do código
- Consistência arquitetural
- Segurança
- Performance
- Manutenibilidade
- Conformidade com o PRD

Nenhum PR deverá ser aprovado sem atender aos critérios abaixo.

---

# Escopo da Revisão

A revisão deve avaliar:

- Regras de negócio
- Arquitetura
- Código
- Banco de dados
- APIs
- Interface
- Segurança
- Performance
- Testes
- Documentação

---

# Checklist Geral

## Requisitos

- [ ] A implementação atende ao PRD.
- [ ] Os critérios de aceite foram atendidos.
- [ ] Não existem funcionalidades fora do escopo.
- [ ] O comportamento esperado foi preservado.

---

## Arquitetura

- [ ] Segue Modular Monolith.
- [ ] Mantém baixo acoplamento.
- [ ] Não cria dependências circulares.
- [ ] Não viola ADRs.
- [ ] Segue a estrutura oficial dos módulos.

---

## Código

- [ ] Código simples.
- [ ] Código legível.
- [ ] Sem duplicação.
- [ ] Sem funções excessivamente longas.
- [ ] Sem comentários desnecessários.
- [ ] Sem código morto.
- [ ] Sem TODOs.

---

## TypeScript

- [ ] Sem uso de `any`.
- [ ] Tipagem completa.
- [ ] Interfaces reutilizadas.
- [ ] Enums utilizados quando apropriado.
- [ ] Tipos consistentes.

---

## Backend

- [ ] Controller sem regra de negócio.
- [ ] Services organizados.
- [ ] Repository apenas com acesso ao banco.
- [ ] DTOs utilizados corretamente.
- [ ] Exceptions específicas.

---

## Frontend

- [ ] Componentes reutilizáveis.
- [ ] Hooks separados.
- [ ] Sem chamadas HTTP diretamente em componentes.
- [ ] Estados tratados corretamente.
- [ ] Responsividade validada.

---

## Banco de Dados

- [ ] Migration criada.
- [ ] Índices revisados.
- [ ] Constraints revisadas.
- [ ] Soft Delete respeitado.
- [ ] Integridade referencial preservada.

---

## APIs

- [ ] Endpoints seguem padrão REST.
- [ ] Swagger atualizado.
- [ ] DTOs corretos.
- [ ] Paginação implementada quando aplicável.
- [ ] Filtros implementados quando aplicável.
- [ ] Versionamento respeitado.

---

## Segurança

- [ ] Autenticação implementada.
- [ ] Autorização implementada.
- [ ] Escopo validado.
- [ ] Dados sensíveis protegidos.
- [ ] Sem exposição de informações internas.

---

## Auditoria

- [ ] Operações críticas registram auditoria.
- [ ] Histórico preservado.
- [ ] Logs consistentes.

---

## Performance

- [ ] Consultas eficientes.
- [ ] Paginação utilizada.
- [ ] Processamentos assíncronos quando necessários.
- [ ] Cache avaliado.

---

## Interface

- [ ] Design System respeitado.
- [ ] Tema Light.
- [ ] Tema Dark.
- [ ] Acessibilidade.
- [ ] Navegação consistente.

---

## Testes

- [ ] Testes unitários.
- [ ] Testes de integração.
- [ ] Casos positivos.
- [ ] Casos negativos.
- [ ] Casos limite.
- [ ] Cobertura mínima mantida.

---

## Documentação

- [ ] Swagger atualizado.
- [ ] Documentação técnica atualizada.
- [ ] ADR atualizado (quando necessário).
- [ ] Changelog atualizado (quando aplicável).

---

# Critérios de Rejeição

O Pull Request deverá ser rejeitado caso:

- Não atenda ao PRD.
- Quebre a arquitetura definida.
- Introduza duplicação de código.
- Reduza a cobertura de testes.
- Não possua auditoria onde obrigatória.
- Ignore regras de segurança.
- Introduza dependências não aprovadas.
- Não compile.
- Falhe nos testes automatizados.

---

# Critérios de Aprovação

Um Pull Request poderá ser aprovado quando:

- Todos os checklists forem atendidos.
- A pipeline estiver verde.
- Os testes forem aprovados.
- A documentação estiver atualizada.
- Não houver pendências críticas.
- O código estiver consistente com os padrões do projeto.

---

# Fluxo de Revisão

```text
Pull Request

↓

CI/CD

↓

Lint

↓

Type Check

↓

Testes

↓

Code Review

↓

Ajustes (se necessário)

↓

Nova revisão

↓

Aprovação

↓

Merge
```

---

# Boas Práticas

Durante a revisão:

- Priorizar sugestões objetivas.
- Explicar o motivo de mudanças solicitadas.
- Questionar decisões arquiteturais quando necessário.
- Evitar discussões sobre estilo já definido pelos padrões oficiais.
- Manter foco na qualidade do produto.

---

# Definition of Ready para Merge

O Pull Request somente poderá ser mesclado quando:

- [ ] Pipeline aprovada.
- [ ] Revisão técnica aprovada.
- [ ] Testes aprovados.
- [ ] Documentação atualizada.
- [ ] Sem conflitos.
- [ ] PR sincronizado com a branch principal.

---

# Filosofia

A revisão de código é uma etapa de garantia de qualidade, não apenas uma validação técnica.

Todo Pull Request deve contribuir para manter o Valenet Quality Hub consistente, seguro, escalável e fácil de evoluir ao longo do tempo.
