# US039 — Gerenciar Anexos do Feedback

**Epic:** EPIC-05 — Feedback e Desenvolvimento

**ID:** US039

**Prioridade:** P1 (Alta)

**Story Points:** 8

**Sprint:** Sprint 10

**Status:** Backlog

---

# História

Como monitor, supervisor ou gestor,

Quero anexar documentos ao feedback,

Para complementar a devolutiva com materiais de apoio, registros e evidências relacionadas ao desenvolvimento do colaborador.

---

# Objetivo

Implementar o gerenciamento de anexos dos feedbacks, permitindo adicionar, consultar, baixar e excluir documentos vinculados ao processo de devolutiva.

Os anexos deverão possuir controle de acesso, auditoria e armazenamento seguro.

---

# Valor de Negócio

Os anexos enriquecem o processo de feedback, permitindo registrar:

- Planos de ação.
- Materiais de treinamento.
- Evidências complementares.
- Documentos assinados.
- Registros de reuniões.

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

---

## Associação

Os anexos poderão ser vinculados a:

- Feedback
- Comentário
- Plano de Desenvolvimento (PDI)

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

---

## Consulta

Permitir:

- Listar anexos
- Visualizar detalhes
- Download
- Preview quando suportado

---

## Exclusão

Permitir exclusão apenas enquanto o feedback estiver em Rascunho ou Em Revisão.

Após encerrado:

- Exclusão lógica.
- Manutenção do histórico.

---

## Limites

Configurar:

- Tamanho máximo
- Quantidade máxima
- Tipos permitidos

---

# Fluxo Principal

```text
Abrir Feedback

↓

Adicionar Anexo

↓

Upload

↓

Validação

↓

Armazenamento

↓

Disponível para Consulta
```

---

# Regras de Negócio

RN001

Todo anexo deverá estar vinculado a um feedback.

---

RN002

Arquivos deverão ser validados antes do upload.

---

RN003

O hash deverá ser armazenado para garantir integridade.

---

RN004

Feedbacks encerrados não poderão receber novos anexos.

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

O acesso aos anexos deverá respeitar as permissões do feedback.

---

# Critérios de Aceite

- [ ] Upload de anexos.
- [ ] Download.
- [ ] Preview.
- [ ] Exclusão lógica.
- [ ] Controle de permissões.
- [ ] Auditoria funcionando.

---

# Casos de Erro

- Arquivo inválido.
- Tamanho excedido.
- Feedback inexistente.
- Usuário sem permissão.
- Upload interrompido.

---

# APIs

```http
POST   /feedbacks/{id}/attachments

GET    /feedbacks/{id}/attachments

GET    /attachments/{id}

DELETE /attachments/{id}

GET    /attachments/{id}/download
```

---

# Banco de Dados

Tabelas:

- feedback_attachments
- storage_files
- audit_logs

---

# Telas

- Lista de Anexos
- Upload
- Visualizador
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
- Download funcionando.
- Preview disponível.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US035 — Gerenciar Feedbacks

---

# Observações

O armazenamento deverá reutilizar a infraestrutura corporativa definida para arquivos da plataforma.

---

# Instruções para Implementação (Codex)

## Criar

- Upload.
- Download.
- Preview.
- Controle de permissões.
- Auditoria.
- Testes.

## Não Implementar

- OCR.
- Assinatura digital.
- IA para classificação de documentos.

## Critérios

- Armazenamento externo.
- Exclusão lógica.
- APIs REST.
- Código desacoplado.

---

# Arquitetura Aplicada

**Storage:** S3 Compatible (MinIO/AWS S3/Azure Blob)

**Persistência:** Prisma ORM

**Integridade:** Hash SHA-256

**Relacionamentos:**

Feedback

↓

FeedbackAttachment

↓

StorageFile

**Princípio:** Os anexos do feedback devem utilizar a infraestrutura corporativa de armazenamento, garantindo segurança, rastreabilidade e reutilização dos componentes já implementados para o gerenciamento de arquivos da plataforma.
