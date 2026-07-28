# ADR-006 — REST API como Padrão Oficial de Integração

**Status:** Aprovado

**Data:** 27/07/2026

**Responsável:** Arquitetura

---

# Contexto

O Valenet Quality Hub será integrado a diversos sistemas internos e externos.

Exemplos:

- CRM
- Telefonia
- WhatsApp
- Microsoft Entra ID
- Microsoft Teams
- Azure OpenAI
- Power BI
- Sistemas corporativos da Valenet

Era necessário definir um padrão único de comunicação.

---

# Problema

As opções avaliadas foram:

- REST
- GraphQL
- gRPC
- SOAP

A solução precisava ser:

- simples;
- amplamente suportada;
- facilmente documentável;
- compatível com integrações corporativas;
- amigável para desenvolvimento assistido por IA.

---

# Decisão

A arquitetura oficial utilizará:

**REST API**

Como padrão de comunicação síncrona.

---

# Convenções

Versionamento obrigatório.

```text
/api/v1/
```

Métodos permitidos.

```text
GET

POST

PUT

PATCH

DELETE
```

---

# Padrão de Resposta

O contrato canônico completo está definido em
`../architecture/API_CONTRACT.md`.

Sucesso

```json
{
  "success": true,
  "data": {},
  "meta": {
    "correlationId": "01JABCDEF1234567890"
  }
}
```

Erro

```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "Usuário não encontrado.",
    "details": []
  },
  "meta": {
    "correlationId": "01JABCDEF1234567890"
  }
}
```

---

# Requisitos Obrigatórios

Todas as APIs deverão possuir:

- OpenAPI (Swagger)
- Versionamento
- Autenticação
- Autorização
- Auditoria
- DTOs
- Validação
- Paginação
- Rate Limiting

---

# GraphQL

GraphQL poderá ser adotado futuramente apenas para cenários específicos de Analytics.

Não fará parte da arquitetura inicial.

---

# Consequências

Toda integração deverá ocorrer utilizando REST.

Nenhuma API poderá ser criada fora deste padrão sem aprovação arquitetural.
