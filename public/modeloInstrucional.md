# **MODELO INSTRUCIONAL — Master GIT**

---

## **MÓDULO 1 — INTRODUÇÃO AO GIT (Nível Inicial)**

### **Objetivo do Módulo**

Introduzir o estudante ao conceito de controle de versão utilizando Git, compreender como o Git organiza arquivos e diretórios, e realizar os primeiros comandos essenciais para iniciar um repositório local.

### **Conteúdo de Aprendizagem**

- O que é Git e para que serve.
- Git como **ferramenta de controle de versão distribuído**.
- Como o Git gerencia arquivos, diretórios e histórico.
- Instalação e configuração inicial (`git config`).
- Criando um repositório com `git init`.
- Adicionando arquivos ao controle do Git:

  - `git add <arquivo>`
  - `git add .`

- Registrando uma versão inicial com `git commit`.
- Visualizando o estado do repositório: `git status`.
- Estrutura básica de um repositório Git:

  - _working directory_
  - _staging area_
  - _repository_

### **Critérios de Conclusão**

- O aluno demonstra que entende o que é Git e controle de versão.
- Cria um repositório local utilizando `git init`.
- Realiza pelo menos 1 ciclo completo: **modificar → adicionar → commitar**.
- Compreende a relação entre arquivos, diretórios e versões.

### **Habilidades Adquiridas**

- Capacidade de iniciar projetos versionados com Git.
- Habilidade de registrar e controlar o histórico de arquivos.
- Entendimento dos estados de arquivos e da área de staging.
- Navegação e inspeção do status do repositório.

---

## **MÓDULO 2 — TRABALHANDO COM BRANCHES E FLUXO DE TRABALHO (Nível Mediano)**

### **Objetivo do Módulo**

Aprofundar os conceitos de colaboração e paralelização utilizando branches, aplicar comandos intermediários do Git e compreender o fluxo de push/pull com repositórios remotos.

### **Conteúdo de Aprendizagem**

- O que são **branches** e para que servem.
- Criação, navegação e remoção de branches:

  - `git branch`
  - `git checkout`
  - `git switch`
  - `git branch -d`

- Fluxo de desenvolvimento com branches.
- Unindo mudanças com `git merge`.
- Resolvendo pequenas divergências de merge.
- Introdução ao uso de repositórios remotos (GitHub/GitLab):

  - `git remote add origin`
  - `git push`
  - `git pull`
  - `git fetch`

- Envio de modificações para o repositório remoto:

  - `git push -u origin main`

- Baixando atualizações e atualizando o repositório local:

  - `git pull`

- Comando global de adição:

  - `git add -A` e quando utilizá-lo.

### **Critérios de Conclusão**

- O aluno demonstra entender o propósito de branches.
- Cria e alterna entre diferentes branches.
- Realiza merges simples e entende o fluxo.
- Envia e recebe atualizações de repositórios remotos.
- Usa corretamente `git add -A`, `git commit`, `git push` e `git pull`.

### **Habilidades Adquiridas**

- Capacidade de trabalhar com múltiplas linhas de desenvolvimento.
- Habilidade de integrar alterações de forma segura.
- Entendimento do fluxo local ↔ remoto.
- Confiabilidade no uso dos principais comandos intermediários do Git.

---

## **MÓDULO 3 — GIT AVANÇADO (Stash, PRs e Conflitos)**

### **Objetivo do Módulo**

Capacitar o aluno a lidar com cenários avançados do Git, gerenciar alterações temporárias, trabalhar profissionalmente com Pull Requests e resolver conflitos complexos.

### **Conteúdo de Aprendizagem**

- Conceito e uso de **Git Stash**:

  - `git stash`
  - Quando usar stash em fluxos reais.

- Entendendo conflitos de merge:

  - Como ocorrem
  - Como interpretar o arquivo conflitado
  - Como resolver manualmente
  - Confirmar resolução com `git add` e `git commit`

- Fluxo completo de Pull Request (PR):

  - Criação de PR no GitHub/GitLab
  - Revisão de código
  - Comentários e solicitações de mudança
  - Aprovação e merge via plataforma

### **Critérios de Conclusão**

- O aluno utiliza o **stash** para armazenar alterações temporárias.
- Entende e resolve conflitos reais em uma simulação de merge.
- Cria e gerencia um Pull Request completo.
- Demonstra autonomia no fluxo avançado de versionamento colaborativo.

### **Habilidades Adquiridas**

- Gerenciamento de contexto utilizando stash.
- Resolução de conflitos com segurança.
- Capacidade de trabalhar em equipes com PRs.
- Entendimento aprofundado de fluxos profissionais do Git.
