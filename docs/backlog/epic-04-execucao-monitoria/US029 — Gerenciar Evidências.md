# US029 — Gerenciar Evidências da Monitoria

**Epic:** EPIC-04 — Execução de Monitorias

**ID:** US029

**Prioridade:** P0 (Crítica)

**Story Points:** 13

**Sprint:** Sprint 07

**Status:** Backlog

---

# História

Como monitor de qualidade,

Quero anexar evidências às respostas da monitoria,

Para comprovar os critérios avaliados e fornecer suporte às análises, feedbacks e contestações.

---

# Objetivo

Implementar o gerenciamento de evidências das monitorias, permitindo anexar arquivos, imagens, áudios, vídeos e links associados à avaliação ou a perguntas específicas.

Toda evidência deverá ser armazenada de forma segura, versionada quando necessário e auditada.

---

# Valor de Negócio

As evidências aumentam a confiabilidade da avaliação, reduzem divergências e facilitam processos de revisão e contestação.

---

# Escopo

## Upload

Permitir anexar:

- Imagens
- PDF
- Documentos Office
- Áudios
- Vídeos
- Links externos

---

## Associação

Permitir vincular evidências a:

- Monitoria
- Seção
- Pergunta
- Resposta

---

## Metadados

Registrar:

- Nome original
- Nome interno
- Tipo MIME
- Extensão
- Tamanho
- Hash (SHA-256)
- Usuário responsável
- Data/Hora
- Origem

---

## Visualização

Permitir:

- Preview de imagens
- Preview de PDF
- Reprodução de áudio
- Reprodução de vídeo
- Download

---

## Organização

Agrupar por:

- Pergunta
- Tipo
- Data
- Autor

---

## Exclusão

Permitir exclusão apenas enquanto a monitoria estiver em rascunho ou em andamento.

Após a conclusão, utilizar exclusão lógica.

---

## Limites

Configurar:

- Quantidade máxima de anexos
- Tamanho máximo por arquivo
- Tipos permitidos

---

# Fluxo Principal

```text
Responder Pergunta

↓

Adicionar Evidência

↓

Upload

↓

Validação

↓

Armazenamento

↓

Associação

↓

Disponível para Consulta
```

---

# Regras de Negócio

RN001

Toda evidência deverá estar vinculada a uma monitoria.

---

RN002

Quando configurado, a evidência será obrigatória para concluir a monitoria.

---

RN003

Arquivos deverão ser validados antes do upload.

---

RN004

O hash do arquivo deverá ser armazenado para garantir integridade.

---

RN005

Toda operação deverá ser auditada.

---

RN006

Arquivos infectados ou inválidos deverão ser rejeitados.

---

RN007

Monitorias concluídas não poderão receber novas evidências.

---

RN008

Downloads também deverão ser registrados em auditoria.

---

# Critérios de Aceite

- [ ] Realizar upload.
- [ ] Associar evidência à pergunta.
- [ ] Visualizar evidências.
- [ ] Fazer download.
- [ ] Validar tamanho e formato.
- [ ] Registrar auditoria.

---

# Casos de Erro

- Arquivo acima do limite.
- Tipo não permitido.
- Upload interrompido.
- Evidência inexistente.
- Monitoria concluída.
- Usuário sem permissão.

---

# APIs

```http
POST   /evaluations/{id}/evidences

GET    /evaluations/{id}/evidences

GET    /evidences/{id}

DELETE /evidences/{id}

GET    /evidences/{id}/download
```

---

# Banco de Dados

Tabelas:

- evaluation_evidences
- storage_files
- audit_logs

---

# Telas

- Upload de Evidências
- Galeria
- Visualizador
- Download

---

# Auditoria

Registrar:

- Upload.
- Download.
- Exclusão lógica.
- Falhas de upload.
- Alterações de metadados.

---

# Definition of Done

- Upload funcionando.
- Download funcionando.
- Preview implementado.
- APIs documentadas.
- Interface concluída.
- Testes automatizados.
- Auditoria implementada.

---

# Dependências

- US027 — Criar Monitoria
- US028 — Executar Avaliação

---

# Observações

As evidências deverão utilizar o serviço corporativo de armazenamento definido na EPIC-01.

Não será permitido armazenar arquivos diretamente no banco de dados.

---

# Instruções para Implementação (Codex)

## Criar

- Upload.
- Download.
- Preview.
- Associação com respostas.
- Validação de arquivos.
- Auditoria.
- Testes.

## Não Implementar

- OCR.
- Transcrição automática.
- IA para análise de evidências.

## Critérios

- Armazenamento externo.
- Hash SHA-256.
- Exclusão lógica.
- APIs REST.
- Código desacoplado.

---

# Arquitetura Aplicada

**Storage:** S3 Compatible (MinIO/AWS S3/Azure Blob)

**Persistência:** Prisma ORM

**Integridade:** Hash SHA-256

**Relacionamentos:**

Evaluation

↓

EvaluationAnswer

↓

EvaluationEvidence

↓

StorageFile

**Princípio:** Toda evidência deve possuir integridade verificável, rastreabilidade completa e armazenamento desacoplado da aplicação, garantindo segurança, desempenho e conformidade.
