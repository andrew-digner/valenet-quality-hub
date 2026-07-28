# Infraestrutura local

Os diretórios `postgres/` e `redis/` reservam configurações locais específicas
dos serviços. A configuração canônica permanece no `docker-compose.yml` para
que o ambiente seja portátil e iniciado com um único comando.

Não adicione dumps, credenciais ou dados persistidos a este diretório. O estado
é mantido exclusivamente nos volumes nomeados do Docker.
