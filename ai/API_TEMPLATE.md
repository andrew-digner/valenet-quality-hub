# API_TEMPLATE.md

# Valenet Quality Hub

## Template Oficial para APIs REST

Versão: 1.0

---

# Objetivo

Este documento define o padrão oficial para implementação de APIs REST no Valenet Quality Hub.

Todas as APIs deverão seguir rigorosamente este padrão.

O contrato canônico de respostas está em
`../docs/architecture/API_CONTRACT.md`. Em caso de divergência, o documento
canônico prevalece.

O objetivo é garantir:

- Consistência
- Facilidade de consumo
- Documentação padronizada
- Segurança
- Escalabilidade
- Facilidade para desenvolvimento assistido por IA

---

# Convenções Gerais

Base URL

```text
/api/v1
```

Todas as URLs deverão utilizar:

- substantivos
- plural
- inglês

Correto

```text
/users

/forms

/evaluations

/feedbacks
```

Errado

```text
/getUsers

/createUser

/doLogin

/publishEvaluation
```

---

# Métodos HTTP

Utilizar apenas:

| Método | Utilização           |
| ------ | -------------------- |
| GET    | Consultar            |
| POST   | Criar                |
| PUT    | Atualização completa |
| PATCH  | Atualização parcial  |
| DELETE | Exclusão lógica      |

---

# Estrutura de Pastas

```text
controllers/

dto/

services/

validators/

swagger/
```

---

# Controller

Responsável apenas por:

- receber requisição;
- validar DTO;
- chamar Service;
- retornar resposta.

Nunca implementar regra de negócio.

---

# Versionamento

Obrigatório.

```text
/api/v1
```

Mudanças incompatíveis deverão criar:

```text
/api/v2
```

Nunca quebrar versões existentes.

---

# Paginação

Toda listagem deverá utilizar.

Query Parameters

```text
?page=1

?pageSize=20

?sort=name

?order=asc
```

Resposta

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 250,
    "totalPages": 13
  },
  "meta": {
    "correlationId": "01JABCDEF1234567890"
  }
}
```

---

# Filtros

Sempre utilizar Query Parameters.

Exemplo.

```text
GET

/evaluations

?status=PUBLISHED

?teamId=123

?startDate=2026-01-01

?endDate=2026-01-31
```

---

# Payload de Sucesso

Padrão.

```json
{
  "success": true,
  "data": {},
  "meta": {
    "correlationId": "01JABCDEF1234567890"
  }
}
```

Nunca retornar dados fora desse padrão.

---

# Payload de Erro

```json
{
  "success": false,
  "error": {
    "code": "EVALUATION_NOT_FOUND",
    "message": "Monitoria não encontrada.",
    "details": []
  },
  "meta": {
    "correlationId": "01JABCDEF1234567890"
  }
}
```

Erros de validação utilizam `code` igual a `VALIDATION_ERROR` e uma entrada em
`details` para cada campo inválido, conforme o contrato canônico.

---

# HTTP Status

| Código | Utilização          |
| ------ | ------------------- |
| 200    | OK                  |
| 201    | Criado              |
| 204    | Sem conteúdo        |
| 400    | Requisição inválida |
| 401    | Não autenticado     |
| 403    | Sem permissão       |
| 404    | Não encontrado      |
| 409    | Conflito            |
| 422    | Erro de validação   |
| 500    | Erro interno        |

---

# DTOs

Obrigatórios.

Entrada.

```text
CreateEvaluationDto

UpdateEvaluationDto

PublishEvaluationDto
```

Saída.

```text
EvaluationResponseDto
```

Nunca reutilizar DTOs para operações diferentes.

---

# Validação

Obrigatório utilizar.

- class-validator
- class-transformer

Exemplo.

```typescript
@IsUUID()

@IsString()

@IsEnum()

@IsOptional()
```

---

# Autenticação

Obrigatória.

JWT

Bearer Token

Exemplo.

```text
Authorization

Bearer <token>
```

---

# Autorização

Toda operação deverá validar.

- usuário;
- perfil;
- permissão;
- escopo.

---

# Swagger

Todo endpoint deverá possuir.

- Summary
- Description
- Tags
- Request
- Response
- Exemplos
- Erros possíveis

---

# Auditoria

Obrigatória para:

- criação;
- edição;
- exclusão lógica;
- publicação;
- feedback;
- contestação.

---

# Idempotência

Operações críticas deverão suportar Idempotency-Key quando aplicável.

Exemplo.

```text
POST /evaluations
```

---

# Upload

Uploads deverão utilizar:

```text
multipart/form-data
```

Nunca enviar arquivos em Base64.

---

# Download

Arquivos deverão possuir:

- Content-Type correto
- Content-Disposition
- Cache-Control adequado

---

# Exportações

Executar de forma assíncrona.

Fluxo.

```text
Solicitação

↓

Fila

↓

Processamento

↓

Arquivo

↓

Download
```

---

# Rate Limit

Obrigatório.

Exemplo.

```text
100 requisições/minuto
```

Valores poderão ser configuráveis.

---

# Cache

Endpoints somente leitura poderão utilizar cache.

Nunca aplicar cache em operações de escrita.

---

# Logs

Registrar.

- método;
- endpoint;
- usuário;
- duração;
- status;
- correlationId.

Nunca registrar dados sensíveis.

---

# Correlation ID

Toda requisição deverá possuir um Correlation ID para rastreabilidade entre serviços e logs.

---

# Exemplos de Endpoints

## Usuários

```text
GET     /users

GET     /users/{id}

POST    /users

PATCH   /users/{id}

DELETE  /users/{id}
```

---

## Formulários

```text
GET     /forms

POST    /forms

PATCH   /forms/{id}

POST    /forms/{id}/publications

GET     /forms/{id}/versions
```

---

## Monitorias

```text
GET     /evaluations

GET     /evaluations/{id}

POST    /evaluations

PATCH   /evaluations/{id}

POST    /evaluations/{id}/publications

POST    /evaluations/{id}/cancellationslations
```

---

## Feedbacks

```text
POST /feedbacks

GET /feedbacks

PATCH /feedbacks/{id}

POST /feedbacks/{id}/acknowledgementsments
```

---

## Contestações

```text
POST /appeals

PATCH /appeals/{id}

GET /appeals

POST /appeals/{id}/decisionss
```

---

# Checklist

Antes de publicar uma API:

- [ ] DTO criado
- [ ] Validação implementada
- [ ] Swagger atualizado
- [ ] Autenticação aplicada
- [ ] Autorização aplicada
- [ ] Auditoria implementada
- [ ] Tratamento de erros
- [ ] Paginação
- [ ] Filtros
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Documentação atualizada

---

# Filosofia

Toda API deverá ser:

- Simples
- Consistente
- Versionada
- Segura
- Documentada
- Testável
- Observável

As APIs representam o contrato oficial entre Frontend, Backend e integrações externas. A estabilidade desse contrato é essencial para a evolução do Valenet Quality Hub.
