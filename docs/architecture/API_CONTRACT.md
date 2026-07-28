# Contrato Padrão da API

## Escopo

Este é o contrato canônico para todas as APIs REST do Valenet Quality Hub.
Todas as rotas são versionadas sob `/api/v1`.

## Princípios

- O corpo da resposta sempre contém `success`.
- Respostas de sucesso contêm `data`.
- Respostas de erro contêm `error` e não contêm `data`.
- Metadados não relacionados à paginação ficam em `meta`.
- Listas paginadas usam `pagination`.
- Campos ausentes não são representados por formatos alternativos.
- Datas e horários usam ISO 8601 em UTC.

## Sucesso com recurso

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000"
  },
  "meta": {
    "correlationId": "01JABCDEF1234567890"
  }
}
```

O status HTTP deve representar o resultado, normalmente `200` ou `201`.

## Sucesso sem conteúdo

Operações sem representação de resposta retornam HTTP `204` sem corpo.

## Lista sem paginação

Use apenas quando a cardinalidade for estritamente limitada pelo domínio:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "correlationId": "01JABCDEF1234567890"
  }
}
```

## Lista paginada

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 0,
    "totalPages": 0
  },
  "meta": {
    "correlationId": "01JABCDEF1234567890"
  }
}
```

Regras:

- `page` inicia em `1`.
- `pageSize` deve respeitar os limites definidos pelo endpoint.
- `total` representa a quantidade total após aplicação dos filtros.
- `totalPages` é derivado de `total` e `pageSize`.

## Erro de negócio ou infraestrutura

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Recurso não encontrado.",
    "details": []
  },
  "meta": {
    "correlationId": "01JABCDEF1234567890"
  }
}
```

Regras:

- `code` é estável, em inglês e `UPPER_SNAKE_CASE`.
- `message` é segura e apresentada em português.
- `details` é sempre uma lista e não expõe dados internos.
- Stack traces, tokens, credenciais e dados sensíveis nunca são retornados.

## Erro de validação

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Não foi possível validar os dados informados.",
    "details": [
      {
        "field": "email",
        "code": "INVALID_EMAIL",
        "message": "Informe um e-mail válido."
      }
    ]
  },
  "meta": {
    "correlationId": "01JABCDEF1234567890"
  }
}
```

Erros de validação usam HTTP `422`. JSON malformado e parâmetros
estruturalmente inválidos usam HTTP `400`.

## Metadata

`meta` é opcional, mas, quando presente, possui formato de objeto. O
`correlationId` deve ser propagado em todas as respostas com corpo e também no
header de resposta definido pela aplicação.

Informações de paginação não devem ser duplicadas em `meta`.

## Transições de estado

Rotas representam recursos. Transições como publicação, cancelamento,
aprovação, rejeição e ciência devem ser modeladas por sub-recursos nominais ou
atualização do recurso, evitando verbos na URL. O contrato específico será
definido na User Story correspondente sem contrariar esta regra.

## Status HTTP

| Status | Uso                                               |
| ------ | ------------------------------------------------- |
| 200    | Consulta ou alteração concluída com representação |
| 201    | Recurso criado                                    |
| 204    | Operação concluída sem representação              |
| 400    | Requisição estruturalmente inválida               |
| 401    | Não autenticado                                   |
| 403    | Não autorizado                                    |
| 404    | Recurso não encontrado                            |
| 409    | Conflito de estado ou unicidade                   |
| 422    | Falha de validação semântica                      |
| 429    | Limite de requisições excedido                    |
| 500    | Erro interno sem exposição de detalhes            |
