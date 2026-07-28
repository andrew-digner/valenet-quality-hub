# TEST_TEMPLATE.md

# Valenet Quality Hub

## Padrão Oficial de Testes

Versão: 1.0

---

# Objetivo

Este documento define os padrões oficiais para implementação de testes automatizados do Valenet Quality Hub.

Todos os módulos deverão possuir testes compatíveis com sua criticidade.

Nenhuma funcionalidade será considerada concluída sem testes.

---

# Objetivos dos Testes

Os testes devem garantir:

- Correção das regras de negócio
- Estabilidade da aplicação
- Segurança contra regressões
- Facilidade de refatoração
- Confiabilidade das integrações

---

# Pirâmide de Testes

A estratégia oficial seguirá a Pirâmide de Testes.

```text
                E2E
             (Poucos)

        Integração
        (Quantidade Média)

    Unitários
(Maior Quantidade)
```

---

# Frameworks

## Backend

- Jest
- Supertest

---

## Frontend

- Vitest
- React Testing Library

---

## E2E

- Playwright

---

# Cobertura Mínima

| Tipo       | Meta |
| ---------- | ---- |
| Statements | 80%  |
| Branches   | 80%  |
| Functions  | 80%  |
| Lines      | 80%  |

Módulos críticos devem buscar cobertura superior a 90%.

---

# Estrutura

```text
tests/

unit/

integration/

e2e/

fixtures/

mocks/

factories/

helpers/
```

---

# Estrutura por Módulo

```text
users/

user.service.spec.ts

user.controller.spec.ts

user.repository.spec.ts

user.e2e.spec.ts
```

---

# Testes Unitários

Responsáveis por validar:

- regras de negócio;
- cálculos;
- validações;
- serviços;
- helpers;
- mappers.

Nunca acessar banco de dados.

Nunca chamar APIs externas.

Utilizar mocks.

---

# Testes de Integração

Responsáveis por validar:

- Controllers
- Services
- Banco
- Prisma
- APIs internas

Utilizar banco isolado para testes.

---

# Testes End-to-End

Validar o fluxo completo.

Exemplos:

- Login
- Criar usuário
- Publicar formulário
- Criar monitoria
- Aplicar feedback
- Abrir contestação

---

# Testes de Componentes React

Todo componente deverá validar:

- Renderização
- Eventos
- Estados
- Props
- Acessibilidade

---

# Estados Obrigatórios

Toda página deverá possuir testes para:

- Loading
- Empty State
- Error State
- Success State

---

# Testes de APIs

Toda API deverá validar:

- Sucesso
- Erros de validação
- Autenticação
- Autorização
- Paginação
- Filtros
- Respostas padronizadas

---

# Testes de Permissão

Toda funcionalidade deverá validar:

- Usuário autorizado
- Usuário sem permissão
- Perfil incorreto
- Escopo incorreto

---

# Testes de Auditoria

Validar que operações críticas geram registros de auditoria.

Exemplos:

- Criar usuário
- Publicar monitoria
- Aplicar feedback
- Alterar configurações

---

# Testes da IA

Validar:

- Recebimento do prompt
- Persistência da resposta
- Registro do modelo
- Registro do score
- Tratamento de falhas do provider

Utilizar mocks para provedores externos.

---

# Fixtures

Criar dados reutilizáveis.

Exemplos:

```text
user.fixture.ts

evaluation.fixture.ts

feedback.fixture.ts
```

---

# Factories

Criar fábricas para geração de entidades.

Exemplo.

```typescript
UserFactory.create();

EvaluationFactory.createPublished();

FeedbackFactory.createPending();
```

---

# Mocks

Nunca mockar regras de negócio.

Mockar apenas:

- APIs externas
- Azure OpenAI
- SMTP
- Redis
- Storage
- CRM
- Telefonia

---

# Helpers

Criar helpers para:

- autenticação;
- criação de usuários;
- geração de tokens;
- setup de ambiente.

---

# Banco de Testes

Nunca utilizar banco de produção.

Utilizar ambiente exclusivo.

Exemplo.

```text
DATABASE_URL_TEST
```

---

# Dados de Teste

Nunca depender de dados existentes.

Cada teste deverá criar e limpar seus próprios dados.

---

# Independência

Cada teste deve ser executável isoladamente.

A ordem de execução não pode influenciar o resultado.

---

# Performance

Testes unitários devem ser rápidos.

Evitar chamadas externas e operações desnecessárias.

---

# CI/CD

A pipeline deverá executar automaticamente:

- Lint
- Type Check
- Testes Unitários
- Testes de Integração
- Build
- Testes End-to-End (quando aplicável)

O deploy será bloqueado em caso de falha.

---

# Checklist

Antes de concluir uma funcionalidade:

- [ ] Testes unitários criados
- [ ] Testes de integração criados
- [ ] Fluxos principais testados
- [ ] Permissões testadas
- [ ] Auditoria testada
- [ ] Estados da UI testados
- [ ] Cobertura mínima atingida
- [ ] Pipeline aprovada

---

# Casos Obrigatórios

Cada funcionalidade deverá possuir, no mínimo:

## Cenários Positivos

- Fluxo principal executado com sucesso.

## Cenários Negativos

- Dados inválidos.
- Usuário sem permissão.
- Recurso inexistente.
- Regra de negócio violada.

## Casos Limite

- Valores mínimos.
- Valores máximos.
- Campos opcionais.
- Campos obrigatórios.

---

# Filosofia

Testes automatizados fazem parte do produto.

Uma funcionalidade sem testes não é considerada pronta.

Os testes devem ser simples, confiáveis, independentes e fáceis de manter, garantindo que futuras evoluções do Valenet Quality Hub ocorram com segurança e previsibilidade.
