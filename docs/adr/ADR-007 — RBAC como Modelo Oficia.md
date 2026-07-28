# ADR-007 — RBAC como Modelo Oficial de Autorização

**Status:** Aprovado

**Data:** 27/07/2026

---

# Contexto

A plataforma possui diferentes perfis de usuário.

Exemplos.

- Administrador
- Monitor
- Supervisor
- Coordenador
- Gerente
- Atendente

Além disso, um mesmo perfil poderá possuir diferentes escopos.

---

# Problema

O controle de acesso precisava ser:

- flexível;
- escalável;
- parametrizável;
- simples de manter.

---

# Decisão

O modelo oficial será:

**RBAC (Role-Based Access Control)**

Com escopo organizacional.

---

# Modelo

A autorização será composta por quatro níveis.

```text
Usuário

↓

Perfil

↓

Permissão

↓

Escopo
```

---

# Escopo

O acesso poderá ser limitado por:

- Empresa (futuro)
- Área
- Equipe
- Usuário

---

# Exemplo

Um Supervisor poderá visualizar apenas:

```text
Área Comercial

↓

Equipe Belo Horizonte

↓

Atendentes da equipe
```

Enquanto um Administrador poderá visualizar toda a organização.

---

# Estrutura

```text
Users

↓

Profiles

↓

Permissions

↓

Scopes
```

---

# Regras

Nenhuma autorização poderá ocorrer apenas no Frontend.

Toda permissão deverá ser validada no Backend.

---

# Auditoria

Toda tentativa de acesso negado deverá ser registrada.

---

# Benefícios

- Flexibilidade
- Escalabilidade
- Segurança
- Facilidade de manutenção
- Parametrização por Área
