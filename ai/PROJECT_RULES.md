# PROJECT_RULES.md

# Valenet Quality Hub

## Regras Obrigatórias do Projeto

Versão: 1.0

---

# Objetivo

Este documento define as regras obrigatórias que governam o desenvolvimento do Valenet Quality Hub.

Estas regras são mandatórias para qualquer implementação realizada por desenvolvedores ou agentes de Inteligência Artificial.

Nenhuma funcionalidade poderá ser implementada violando estas diretrizes.

---

# Ordem de Prioridade

Em caso de conflito, seguir integralmente a hierarquia definida em
`../docs/DOCUMENTATION_GOVERNANCE.md`.

---

# Regra 1 — Nunca Duplicar Código

Antes de criar qualquer arquivo verificar:

- Existe componente semelhante?
- Existe Service semelhante?
- Existe Hook semelhante?
- Existe Repository semelhante?
- Existe DTO semelhante?

Caso exista, reutilizar.

---

# Regra 2 — Nunca Quebrar a Arquitetura

Todo código deverá seguir a arquitetura oficial.

Não criar atalhos.

Não criar dependências cruzadas entre módulos.

---

# Regra 3 — Toda Funcionalidade Deve Ser Completa

Nunca implementar apenas parte da funcionalidade.

Uma entrega somente estará concluída quando possuir:

- Frontend
- Backend
- Banco
- Permissões
- Auditoria
- Testes
- Documentação

---

# Regra 4 — Toda Alteração Deve Ser Auditável

Operações críticas obrigatórias:

- Criar
- Editar
- Excluir (Soft Delete)
- Publicar
- Aplicar Feedback
- Contestar
- Alterar Configuração

Todas deverão registrar auditoria.

---

# Regra 5 — Nenhuma Regra de Negócio no Frontend

Frontend:

Responsável por interface.

Backend:

Responsável por regras de negócio.

Toda validação crítica deverá existir também no backend.

---

# Regra 6 — Toda API Deve Possuir

- DTO
- Validação
- Swagger
- Autorização
- Tratamento de erro
- Auditoria
- Testes

---

# Regra 7 — Toda Tela Deve Possuir

Obrigatoriamente:

- Loading
- Skeleton
- Empty State
- Error State
- Success State

Nenhuma página poderá ficar sem tratamento de estados.

---

# Regra 8 — Toda Tela Deve Ser Responsiva

Resoluções mínimas:

- Desktop
- Notebook
- Tablet

Mobile poderá ser suportado em versões futuras.

---

# Regra 9 — Permissões Sempre no Backend

Nunca confiar apenas no Frontend.

Toda operação deverá validar:

- Usuário autenticado
- Perfil
- Permissão
- Escopo

---

# Regra 10 — Toda Monitoria Deve Possuir Histórico

Nenhuma monitoria poderá ser sobrescrita.

Toda alteração deverá gerar histórico.

---

# Regra 11 — Formulários Nunca Perdem Histórico

Ao alterar um formulário:

Criar nova versão.

Nunca alterar versões publicadas.

Monitorias antigas permanecem vinculadas à versão utilizada na avaliação.

---

# Regra 12 — Feedbacks Nunca São Excluídos

Feedbacks fazem parte do histórico do colaborador.

Somente poderão ser cancelados.

Nunca removidos.

---

# Regra 13 — Contestações São Imutáveis

Após abertas:

Nunca editar o conteúdo original.

Novas informações deverão ser adicionadas como interações.

---

# Regra 14 — IA Sempre Deve Explicar

Toda resposta gerada pela IA deverá conter:

- Nota
- Justificativa
- Evidências
- Modelo utilizado
- Prompt utilizado
- Score de confiança

Nunca retornar apenas uma nota.

---

# Regra 15 — Processamentos Pesados Nunca Bloqueiam a API

Utilizar filas para:

- IA
- Exportações
- Importações
- Relatórios
- Notificações

---

# Regra 16 — Soft Delete Obrigatório

Nenhuma entidade crítica poderá ser excluída fisicamente.

Utilizar:

- deleted_at
- deleted_by

---

# Regra 17 — Banco Sempre por Migration

Nunca alterar banco manualmente.

Toda alteração estrutural deverá possuir migration versionada.

---

# Regra 18 — Logs Estruturados

Registrar:

- INFO
- WARN
- ERROR

Nunca registrar:

- Senhas
- Tokens
- Dados sensíveis em texto puro

---

# Regra 19 — Toda Integração Deve Ser Desacoplada

Utilizar Adapter Pattern.

Nunca importar SDKs diretamente nas regras de negócio.

---

# Regra 20 — Toda Entrega Deve Passar Pelo Checklist

Antes de finalizar:

- Build
- Lint
- Testes
- Cobertura
- Revisão
- Documentação

---

# Regra 21 — Versionamento

Mudanças incompatíveis em APIs deverão gerar nova versão.

Exemplo:

/api/v1

/api/v2

---

# Regra 22 — Configurações Nunca Hardcoded

Toda configuração deverá ser externa.

Exemplos:

- URLs
- Tokens
- Chaves
- Limites
- Timeouts

---

# Regra 23 — Internacionalização

Mesmo utilizando apenas português inicialmente, toda aplicação deverá ser preparada para múltiplos idiomas.

---

# Regra 24 — Observabilidade

Toda funcionalidade crítica deverá produzir:

- Logs
- Métricas
- Traces

---

# Regra 25 — Definição de Pronto

Uma funcionalidade somente será considerada concluída quando:

- Implementada.
- Testada.
- Documentada.
- Auditada.
- Segura.
- Responsiva.
- Aprovada em revisão.
- Compatível com o PRD.

---

# O que Nunca Fazer

Nunca:

- Criar código duplicado.
- Ignorar testes.
- Ignorar auditoria.
- Ignorar permissões.
- Alterar banco manualmente.
- Usar `any`.
- Colocar regra de negócio em Controllers ou Components.
- Criar dependências circulares entre módulos.
- Excluir dados históricos.
- Ignorar versionamento de formulários.

---

# Filosofia do Projeto

O Valenet Quality Hub é um software corporativo de missão crítica.

Todas as decisões de implementação deverão priorizar:

- Consistência.
- Segurança.
- Manutenibilidade.
- Escalabilidade.
- Clareza.
- Simplicidade.

Quando houver dúvida entre uma solução rápida e uma solução sustentável, escolher sempre a solução sustentável.
