# Observabilidade

A API emite logs JSON, `x-correlation-id` e `x-request-id`, registra duração,
status, método e rota e expõe métricas Prometheus em `/metrics`.

Health checks:

- `/health/live`: processo ativo;
- `/health/ready`: PostgreSQL e Redis disponíveis;
- `/health`: visão consolidada, incluindo worker como `not_configured`.

Logs não devem conter senha, token, CPF completo ou payload sensível. Dashboards
e alertas externos permanecem fora da Sprint 2.
