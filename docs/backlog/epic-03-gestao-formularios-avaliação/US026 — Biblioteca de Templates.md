# US026 — Biblioteca de Templates de Formulários

**Epic:** EPIC-03 — Gestão de Formulários de Avaliação

**ID:** US026

**Prioridade:** P1 (Alta)

**Story Points:** 13

**Sprint:** Sprint 06

**Status:** Backlog

---

# História

Como administrador de qualidade,

Quero criar e reutilizar templates de formulários,

Para acelerar a criação de novos formulários e garantir padronização entre diferentes operações.

---

# Objetivo

Implementar uma biblioteca corporativa de templates de formulários, permitindo reutilizar estruturas previamente aprovadas.

Os templates poderão servir como base para novos formulários, preservando boas práticas e reduzindo retrabalho.

---

# Valor de Negócio

Esta funcionalidade proporciona:

- Padronização.
- Reutilização.
- Maior produtividade.
- Redução de erros.
- Governança dos formulários.

---

# Escopo

## Biblioteca

Permitir visualizar todos os templates disponíveis.

Cada template deverá conter:

- Nome
- Código
- Categoria
- Operação
- Canal
- Versão
- Autor
- Data de criação
- Status

---

## Criar Template

Permitir criar templates:

- a partir de um formulário existente;
- do zero.

---

## Utilizar Template

Permitir criar um novo formulário utilizando um template como base.

A nova estrutura deverá ser independente do template original.

---

## Categorias

Permitir organizar templates por:

- Atendimento
- Suporte
- Cobrança
- Comercial
- Financeiro
- Backoffice
- Personalizado

---

## Busca

Pesquisar por:

- Nome
- Categoria
- Canal
- Operação
- Tags
- Autor

---

## Favoritos

Permitir marcar templates como favoritos.

---

## Compartilhamento

Definir visibilidade:

- Privado
- Área
- Empresa
- Global

---

## Versionamento

Templates também deverão possuir controle de versão.

Novas alterações gerarão novas versões.

---

## Importação

Preparar estrutura para:

- JSON
- YAML

---

## Exportação

Permitir exportar templates em formato estruturado.

---

## Preview

Exibir:

- Estrutura completa
- Seções
- Perguntas
- Regras
- Pesos
- Informações gerais

Sem necessidade de edição.

---

# Fluxo Principal

```text
Administrador

↓

Selecionar Formulário

↓

Salvar como Template

↓

Biblioteca

↓

Novo Formulário

↓

Selecionar Template

↓

Criar Cópia

↓

Editar

↓

Publicar
```

---

# Regras de Negócio

RN001

Templates são independentes dos formulários criados a partir deles.

---

RN002

Alterações em um template não afetam formulários existentes.

---

RN003

Templates poderão possuir múltiplas versões.

---

RN004

Toda criação deverá ser auditada.

---

RN005

Toda utilização do template deverá ser registrada para fins estatísticos.

---

RN006

Templates arquivados não poderão ser utilizados em novos formulários.

---

RN007

A importação deverá validar compatibilidade de versão.

---

RN008

A exportação não deverá incluir informações sensíveis da organização.

---

# Critérios de Aceite

- [ ] Criar template.
- [ ] Criar formulário a partir de template.
- [ ] Consultar biblioteca.
- [ ] Pesquisar templates.
- [ ] Favoritar template.
- [ ] Exportar template.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Template inexistente.
- Template arquivado.
- Arquivo inválido.
- Versão incompatível.
- Permissão insuficiente.

---

# APIs

```http
GET    /templates

GET    /templates/{id}

POST   /templates

POST   /templates/{id}/instantiate

POST   /templates/import

GET    /templates/{id}/export

PATCH  /templates/{id}/favorite
```

---

# Banco de Dados

Tabelas:

- form_templates
- template_versions
- template_usage
- audit_logs

---

# Telas

- Biblioteca de Templates
- Detalhes do Template
- Preview
- Importação
- Exportação

---

# Auditoria

Registrar:

- Criação.
- Alteração.
- Utilização.
- Exportação.
- Importação.
- Favoritos.

---

# Definition of Done

- Biblioteca implementada.
- Reutilização funcionando.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US019 — Gerenciar Formulários
- US024 — Versionar Formulários
- US025 — Publicar Formulários

---

# Observações

Os templates representam modelos reutilizáveis.

Todo formulário criado a partir de um template será uma entidade independente.

---

# Instruções para Implementação (Codex)

## Criar

- Biblioteca de templates.
- Versionamento.
- Importação/exportação.
- Favoritos.
- Compartilhamento.
- Auditoria.
- Testes.

## Não Implementar

- Marketplace público.
- Compartilhamento entre empresas diferentes.
- IA para geração de templates.

## Critérios

- Reutilização sem acoplamento.
- Versionamento próprio.
- APIs REST.
- Código modular.
- Estrutura preparada para futuras integrações.

---

# Arquitetura Aplicada

**Padrão:** Prototype Pattern

**Relacionamentos:**

Template

↓

TemplateVersion

↓

Sections

↓

Questions

↓

Options

↓

Rules

↓

Novo Formulário

**Persistência:** Prisma ORM

**Princípio:** Os templates funcionam como protótipos reutilizáveis, permitindo criar novos formulários de forma rápida, mantendo independência entre o modelo original e as instâncias derivadas.
