# Requisitos Iniciais do Sistema (Documentacao)

## 1. Síntese do Objeto

 MasterGit  é um  objeto de aprendizagem (OA)  interativo voltado para o desenvolvimento de domínio  conceitual e prático  de Git como sistema de controle de versão distribuído.  

O foco didático está em:

- Compreensão profunda de *branching* e navegação entre estados do repositório.  
- Uso contextualizado de `git switch`, `git checkout` e `git restore`.  
- Resolução de conflitos e estratégias de versionamento.  
- Boas práticas de colaboração científica e industrial.

O OA combina:

- Microunidades teóricas  
- Laboratórios guiados (repositórios *sandbox*)  
- Simulações de falhas  
- Desafios avaliativos orientados a problemas reais de pesquisa e engenharia de software  

---

## 2. Objetivos Educacionais (Aprendizagens Esperadas)

Ao concluir o OA, o(a) estudante deverá ser capaz de:

- Explicar o  modelo mental do Git  (objetos, commits, branches, HEAD, working tree, index).  
- Diferenciar e aplicar `git checkout`, `git switch` e `git restore`.  
- Aplicar  fluxos de branching  (feature, release, hotfix) com segurança.  
- Diagnosticar e resolver  conflitos de mesclagem  com documentação do raciocínio.  
- Projetar  estratégias de versionamento  (Git Flow, Trunk-Based) adequadas a contextos de pesquisa e produto.  
- Operacionalizar  colaboração : pull requests, code reviews, semantic commits, tags e releases.  
- Avaliar  riscos e trade-offs  de decisões de versionamento.  
- Garantir  reprodutibilidade  de experimentos científicos com branches, tags e controle de dependências.

---

## 3. Público-Alvo e Pré-Requisitos

 Público:   
Estudantes de Computação, Engenharias e áreas afins; profissionais de desenvolvimento.

 Pré-requisitos:   
Noções básicas de linha de comando (CLI).

---

## 4. Escopo e Organização em Módulos

### Módulos Principais

1.  Fundamentos Internos do Git   
   - Objetos (*blob, tree, commit*), refs, HEAD, áreas de trabalho.

2.  Navegação e Mudança de Contexto   
   - `git switch`, `git restore`, legado e riscos de `git checkout`.

3.  Fluxos de Branching e Colaboração   
   - Feature branches, pull requests, reviews, políticas de merge.

4.  Conflitos e Estratégias de Resolução   
   - Reproduzir conflitos, three-way merge, ferramentas de diff/merge.

5.  Versionamento, Tags e Releases   
   - Semantic Versioning, changelogs, automação de releases.

6.  Comandos Básicos do Git   
   - `git pull`, `git push`, `git checkout`, entre outros.

---

##  5. Metodologia Didática

-  Aprendizagem baseada em problemas (PBL) : estudos de caso com cenários de teste.  
-  Laboratórios práticos  com checkpoints automatizados e feedbacks.  
-  Ensino por contraste:  comparação entre `git checkout` e `git switch`.  
-  Pair/Mob Programming  com foco em revisão de código e comunicação técnica.

---

##  6. Requisitos Educacionais

### Competências e Habilidades

-  Técnicas:  domínio operacional de Git, resolução de conflitos, gestão de branches e releases.  
-  Científicas:  reprodutibilidade, rastreabilidade, ética e integridade de dados.  
-  Colaborativas:  comunicação em reviews, padronização de commits (semantic commits).

### Avaliação

-  Quizzes diagnósticos  por módulo.  
-  Checkpoints automáticos  nos laboratórios.  
-  Projeto final  com relatório, demo e defesa oral.

### Acessibilidade e Inclusão

- Conformidade  WCAG 2.1 AA  (contraste, navegação por teclado, legendas, alt text).  
- Recursos multilíngues (PT/EN) e ritmo de estudo flexível.

### Interoperabilidade

- Compatibilidade com  xAPI/SCORM  e  LTI  para integração com AVAs (Moodle, Canvas).  
- Recursos abertos em Markdown/HTML, repositórios públicos e issues.

### Ética e Integridade

- Políticas claras de autoria e citação em commits.  
- Critérios de avaliação incluem clareza do histórico e justificativa técnica.

---

## ⚙️ 8. Recursos e Infraestrutura

-  Ambiente de testes iniciais  com comandos básicos.  
-  Repositórios template  (GitHub/GitLab) com cenários de conflito.  
-  Execução via containers  (DevContainer) para uniformizar dependências.  
-  Integração com AVA institucional  via LTI + xAPI.

---

## 📈 9. Resultados Esperados

O OA promove:

- Autonomia técnica  
- Práticas colaborativas maduras  
- Reprodutibilidade científica  

O estudante será capaz de  projetar, operar e auditar estratégias de versionamento  alinhadas às exigências acadêmicas e industriais.

---

## Requisitos Funcionais (FR)

| Código | Descrição | Critério de Aceite |
|---------|------------|-------------------|
|  FR-01  | Cadastro e autenticação de usuário (MVP) | Login via e-mail/senha e OAuth (GitHub/Google). Mensagens de erro claras. |
|  FR-02  | Perfis e papéis (MVP) | Controle de acesso por papéis: Estudante, Instrutor, Admin. |
|  FR-03  | Matrícula em curso (MVP) | Autoinscrição ou via convite; curso aparece na dashboard. |
|  FR-04  | Núcleo de atividades/labs Git (MVP) | Sandbox efêmero por atividade com execução de comandos. |
|  FR-05  | Validação automática de comandos Git | Engine que valida `git switch`, `git checkout`, `git restore` e estados do repo. |
|  FR-06  | Sistema de conclusão e acompanhamento | Percentual de progresso e status por atividade. |
|  FR-07  | Avaliações e quizzes (MVP) | Quizzes autocorrigíveis e avaliações discursivas. |
|  FR-10  | Trilhas de aprendizagem e pré-requisitos | Liberação condicional de módulos conforme progresso. |
|  FR-11  | Repositórios template e cenários de conflito | Templates para feature, release e hotfix. |
|  FR-14  | Certificados e badges | Emissão de certificado e badges por competência. |
|  FR-15  | Analytics para instrutores | Painéis de progresso, heatmap de erros e exportação CSV/JSON. |
|  FR-16  | Banco de questões e reuso de atividades | CRUD de itens, versionamento e clonagem de atividades. |
|  FR-18  | Integração com AVA (LMS) | LTI 1.3 + xAPI/SCORM para notas e progresso. |

---

## 🧱 Requisitos Não Funcionais (NFR)

| Código | Descrição | Nível | Critério |
|---------|------------|--------|-----------|
|  NFR-01  | Usabilidade e acessibilidade | Alta | Conformidade WCAG 2.1 AA. Revisão automatizada e manual. |
|  NFR-02  | Desempenho | Alta | TTFB < 500ms; labs < 2s (95º percentil). |
|  NFR-06  | Privacidade e conformidade | Alta | LGPD/GDPR; consentimento e portabilidade. |
|  NFR-07  | Observabilidade | Média | Logs estruturados, tracing, métricas Prometheus. |
|  NFR-09  | Manutenibilidade | Média | Test coverage ≥ 80%; lint e padrões de código. |

---

## Entidades Principais

-  User  — perfil, papel, consentimentos.  
-  Course / Module / Activity  — conteúdo, pré-requisitos, checks.  
-  SandboxRun  — logs, resultados e métricas.  
-  Quiz / Question / Submission  — avaliações e respostas.  
-  ProjectSubmission  — URL do repositório, relatório, rubrica.  
-  Progress  — percentual, timestamps, checkpoints.  
-  Notification  — canal e status.  
-  AuditLog  — registro de ações (quem, o quê, quando).

---