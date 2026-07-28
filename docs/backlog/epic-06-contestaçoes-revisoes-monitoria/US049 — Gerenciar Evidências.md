# US049 — Gerenciar Evidências da Contestação

**Epic:** EPIC-06 — Contestações e Revisões de Monitorias

**ID:** US049

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 12

**Status:** Backlog

---

# História

Como colaborador, analista ou gestor de qualidade,

Quero anexar evidências às contestações,

Para fundamentar tecnicamente o processo de revisão da monitoria.

---

# Objetivo

Implementar o gerenciamento de evidências das contestações, permitindo anexar, consultar, baixar e remover documentos durante o período permitido pelo fluxo de análise.

As evidências deverão possuir rastreabilidade completa, controle de acesso e armazenamento seguro.

---

# Valor de Negócio

As evidências permitem:

- Fundamentar recursos.
- Apoiar análises técnicas.
- Reduzir divergências.
- Registrar documentos oficiais.
- Atender auditorias.

---

# Escopo

## Upload

Permitir anexar:

- PDF
- DOCX
- XLSX
- PPTX
- Imagens
- Áudios
- Vídeos
- Links externos

---

## Associação

As evidências poderão ser vinculadas a:

- Contestação
- Parecer Técnico
- Reavaliação

---

## Metadados

Registrar:

- Nome original
- Nome interno
- Tipo MIME
- Extensão
- Tamanho
- Hash SHA-256
- Usuário responsável
- Data/Hora
- Origem

---

## Consulta

Permitir:

- Listar evidências
- Preview
- Download
- Histórico

---

## Exclusão

Permitir exclusão apenas enquanto:

- Contestação em Rascunho
- Contestação Enviada

Após início da análise:

- Exclusão lógica.
- Histórico preservado.

---

## Limites

Configurar:

- Quantidade máxima
- Tamanho máximo
- Tipos permitidos

---

# Fluxo Principal

```text
Abrir Contestação

↓

Adicionar Evidência

↓

Upload

↓

Validação

↓

Armazenamento

↓

Disponível para Análise
```

---

# Regras de Negócio

RN001

Toda evidência deverá estar vinculada a uma contestação.

---

RN002

Arquivos deverão ser validados antes do upload.

---

RN003

O hash do arquivo deverá ser armazenado.

---

RN004

Após início da análise não será permitida exclusão física.

---

RN005

Toda operação deverá ser auditada.

---

RN006

Downloads deverão ser registrados.

---

RN007

Arquivos maliciosos deverão ser rejeitados.

---

RN008

O acesso deverá respeitar as permissões da contestação.

---

# Critérios de Aceite

- [ ] Upload funcionando.
- [ ] Download disponível.
- [ ] Preview implementado.
- [ ] Exclusão lógica.
- [ ] Controle de acesso.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Arquivo inválido.
- Limite excedido.
- Contestação inexistente.
- Usuário sem permissão.
- Upload interrompido.

---

# APIs

```http
POST   /appeals/{id}/attachments

GET    /appeals/{id}/attachments

GET    /appeal-attachments/{id}

DELETE /appeal-attachments/{id}

GET    /appeal-attachments/{id}/download
```

---

# Banco de Dados

Tabelas:

- appeal_attachments
- storage_files
- audit_logs

---

# Telas

- Upload de Evidências
- Lista de Evidências
- Preview
- Download

---

# Auditoria

Registrar:

- Upload.
- Download.
- Exclusão.
- Falhas de upload.
- Usuário responsável.
- Data/Hora.

---

# Definition of Done

- Upload implementado.
- Preview funcionando.
- Download disponível.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US043 — Abrir Contestação
- US044 — Analisar Contestação

---

# Observações

As evidências deverão utilizar o serviço corporativo de armazenamento compartilhado da plataforma.

Não será permitido armazenar arquivos diretamente no banco de dados.

---

# Instruções para Implementação (Codex)

## Criar

- Upload.
- Download.
- Preview.
- Associação.
- Auditoria.
- Testes.

## Não Implementar

- OCR.
- Transcrição automática.
- IA para análise documental.

## Critérios

- Reutilizar StorageService existente.
- Exclusão lógica.
- APIs REST.
- Código desacoplado.

---

# Arquitetura Aplicada

**Storage:** StorageService Compartilhado

**Persistência:** Prisma ORM

**Integridade:** Hash SHA-256

**Relacionamentos:**

Appeal

↓

AppealAttachment

↓

StorageFile

**Princípio:** As evidências das contestações devem reutilizar a infraestrutura corporativa de armazenamento, garantindo segurança, rastreabilidade e consistência em toda a plataforma.
