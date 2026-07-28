# ADR-005 — Arquitetura de Inteligência Artificial baseada em Providers

**Status:** Aprovado

---

# Contexto

O mercado de IA evolui rapidamente.

Não é aceitável acoplar a plataforma a um único fornecedor.

---

# Decisão

Será utilizado Adapter Pattern.

```text
AIProvider

↓

Azure OpenAI Adapter

↓

OpenAI Adapter

↓

Claude Adapter

↓

Gemini Adapter

↓

Local Model Adapter
```

---

# Interface Obrigatória

Todos os Providers deverão implementar a mesma interface.

```typescript
evaluate();

summarize();

generateFeedback();

generateEvidence();

healthCheck();
```

---

# Benefícios

- Troca simples de fornecedor.
- Testabilidade.
- Menor acoplamento.
- Evolução independente.
- Possibilidade de múltiplos modelos simultaneamente.

---

# Não será permitido

Importar SDKs diretamente nas regras de negócio.
