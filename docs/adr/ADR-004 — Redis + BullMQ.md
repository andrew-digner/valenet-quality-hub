# ADR-004 — Redis + BullMQ

**Status:** Aprovado

---

# Objetivo

Separar processamento síncrono de processamento assíncrono.

---

# Redis

Será utilizado para:

- Cache
- Sessões
- Permissões
- Dashboard
- Configurações

---

# BullMQ

Será utilizado para:

- IA
- Relatórios
- Exportações
- Importações
- Notificações
- Webhooks

---

# Motivação

Nenhum processamento pesado deverá bloquear requisições HTTP.

Todo processamento superior a aproximadamente 2 segundos deverá ser executado em fila.

---

# Benefícios

- Performance
- Escalabilidade
- Retry automático
- Monitoramento
- Reprocessamento
- Alta disponibilidade
