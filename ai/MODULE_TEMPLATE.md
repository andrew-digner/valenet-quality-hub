# MODULE_TEMPLATE.md

# Valenet Quality Hub

## Template Oficial para Criação de Módulos

Versão: 1.0

---

# Objetivo

Este documento define a estrutura oficial para criação de qualquer módulo do backend.

Todos os módulos deverão seguir rigorosamente este padrão.

Exemplos de módulos:

- auth
- users
- forms
- evaluations
- feedbacks
- appeals
- dashboard
- ai
- settings

---

# Estrutura Oficial

Todo módulo deverá possuir a seguinte estrutura.

```text
modules/

<module>/

├── controllers/
│   └── <module>.controller.ts
│
├── services/
│   └── <module>.service.ts
│
├── repositories/
│   └── <module>.repository.ts
│
├── dto/
│   ├── create-<module>.dto.ts
│   ├── update-<module>.dto.ts
│   ├── query-<module>.dto.ts
│   └── response-<module>.dto.ts
│
├── entities/
│   └── <module>.entity.ts
│
├── validators/
│   └── <module>.validator.ts
│
├── mappers/
│   └── <module>.mapper.ts
│
├── interfaces/
│   ├── repository.interface.ts
│   └── service.interface.ts
│
├── events/
│   ├── created.event.ts
│   ├── updated.event.ts
│   └── deleted.event.ts
│
├── exceptions/
│   └── <module>.exceptions.ts
│
├── tests/
│   ├── service.spec.ts
│   ├── controller.spec.ts
│   └── repository.spec.ts
│
├── constants/
│   └── constants.ts
│
├── enums/
│   └── status.enum.ts
│
├── module.ts
│
└── index.ts
```

---

# Responsabilidade de Cada Pasta

## controllers/

Receber requisições HTTP.

Responsável apenas por:

- receber parâmetros;
- validar DTO;
- chamar Service;
- retornar resposta.

Nunca implementar regra de negócio.

---

## services/

Responsável por:

- regras de negócio;
- autorização;
- auditoria;
- publicação de eventos;
- orquestração.

Toda lógica do módulo deverá ficar aqui.

---

## repositories/

Responsável exclusivamente pelo acesso ao banco.

Nunca:

- validar regras;
- publicar eventos;
- chamar APIs externas.

---

## dto/

Contém todos os objetos de entrada e saída da API.

Tipos recomendados.

```text
CreateDto

UpdateDto

QueryDto

ResponseDto
```

Todos deverão possuir validação.

---

## entities/

Representação da entidade de domínio.

Não representa diretamente o modelo do Prisma.

---

## validators/

Validações específicas da regra de negócio.

Exemplos.

- formulário publicado;
- monitoria encerrada;
- prazo expirado.

---

## mappers/

Responsável por converter.

Entity

↓

DTO

↓

Response

Nunca misturar conversões no Service.

---

## interfaces/

Contratos públicos do módulo.

Utilizar para desacoplamento.

---

## events/

Eventos publicados pelo módulo.

Exemplo.

```text
EvaluationPublishedEvent

FeedbackAppliedEvent
```

---

## exceptions/

Exceptions customizadas.

Exemplo.

```text
EvaluationClosedException

FeedbackExpiredException
```

---

## tests/

Obrigatório.

- Unitários
- Integração

Cobertura mínima.

80%.

---

## constants/

Constantes utilizadas apenas pelo módulo.

Nunca criar constantes globais desnecessariamente.

---

## enums/

Enums específicos do módulo.

---

# Arquivo module.ts

Responsável por registrar:

- Controllers
- Services
- Providers
- Repositories
- Imports
- Exports

---

# Arquivo index.ts

Exportação pública do módulo.

Exemplo.

```typescript
export * from './module';
export * from './services';
export * from './dto';
```

---

# Fluxo Oficial

Toda requisição deverá seguir.

```text
HTTP Request

↓

Controller

↓

DTO Validation

↓

Service

↓

Repository

↓

Prisma

↓

PostgreSQL

↓

Mapper

↓

Response DTO

↓

HTTP Response
```

---

# Auditoria

Toda operação crítica deverá gerar auditoria.

Obrigatório.

- create
- update
- delete
- publish
- cancel

---

# Eventos

Sempre publicar eventos após operações relevantes.

Exemplo.

```text
UserCreated

EvaluationPublished

FeedbackApplied

AppealAccepted
```

---

# Tratamento de Erros

Nunca retornar erros diretamente.

Utilizar.

Exceptions

↓

Exception Filter

↓

Resposta padronizada.

---

# Swagger

Todo endpoint deverá possuir.

- Summary
- Description
- Tags
- Responses
- Examples

---

# Validação

Todo DTO deverá utilizar.

- class-validator
- class-transformer

Nunca confiar apenas na validação do Frontend.

---

# Permissões

Toda operação deverá validar.

- usuário autenticado;
- perfil;
- permissão;
- escopo.

---

# Testes

Todo módulo deverá possuir:

## Controller

- sucesso;
- erro de validação;
- autorização.

---

## Service

- regra de negócio;
- cenários positivos;
- cenários negativos.

---

## Repository

- consultas;
- persistência;
- paginação.

---

# Checklist

Antes de considerar um módulo concluído:

- [ ] Estrutura criada.
- [ ] Controller implementado.
- [ ] Service implementado.
- [ ] Repository implementado.
- [ ] DTOs criados.
- [ ] Mappers criados.
- [ ] Validators criados.
- [ ] Eventos implementados.
- [ ] Auditoria implementada.
- [ ] Swagger atualizado.
- [ ] Testes unitários.
- [ ] Testes de integração.
- [ ] Cobertura mínima atingida.
- [ ] Documentação atualizada.

---

# Exemplo de Módulos

Todos deverão seguir exatamente esta estrutura.

```text
auth/

users/

forms/

evaluations/

feedbacks/

appeals/

calibrations/

dashboards/

notifications/

settings/

audit/

integrations/

ai/
```

---

# Filosofia

Cada módulo deve ser:

- Independente.
- Reutilizável.
- Testável.
- Desacoplado.
- Fácil de evoluir.

A estrutura dos módulos deverá permanecer consistente em todo o projeto, independentemente da equipe ou do agente de IA responsável pela implementação.
