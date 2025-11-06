import { Module } from '../../types';

export const module1: Module = {
  id: 1,
  title: 'O que é Git?',
  description: 'Fundamentos do versionamento e estrutura interna do Git',
  isLocked: false,
  testId: 1,
  sessions: [
    {
      id: 1,
      title: 'Fundamentos do Versionamento',
      content: `**Conteúdo:**

Conceito de versionamento e histórico de alterações.
Entendendo o propósito do Git: o que é, por que existe e como funciona internamente.
Diferença entre Git e plataformas (GitHub, GitLab).

O Git é um sistema de controle de versões distribuído que permite acompanhar mudanças em arquivos e coordenar trabalho entre múltiplas pessoas. Criado por Linus Torvalds em 2005, o Git revolucionou a forma como desenvolvedores colaboram em projetos de software.

**Por que o Git é importante:**
- Histórico completo de alterações
- Trabalho em paralelo com branches
- Backup distribuído do código
- Resolução inteligente de conflitos`,
      isCompleted: false
    },
    {
      id: 2,
      title: 'Estrutura Interna do Git',
      content: `**Conteúdo:**

**Componentes internos:**
- **Repositório (.git)**: Local onde o Git armazena metadados e histórico
- **Working Tree**: Diretório de trabalho com arquivos atuais
- **Staging Area**: Área intermediária para preparar commits
- **Commits (snapshots imutáveis)**: Fotografias do projeto em determinado momento
- **Branches e o HEAD**: Ponteiros para diferentes linhas de desenvolvimento
- **O que são remotos (origin, upstream)**: Conexões com repositórios externos

A estrutura do Git é baseada em um grafo dirigido acíclico (DAG) onde cada commit aponta para seus pais, criando uma árvore de histórico imutável.`,
      isCompleted: false
    },
    {
      id: 3,
      title: 'Filosofia e Primeiros Passos',
      content: `**Conteúdo:**

A filosofia do Git: conteúdo-endereçável, distribuído e imutável.
Configuração inicial: nome, e-mail e primeiro commit.

**Atividade prática:** criar um repositório local, configurar o usuário e realizar o primeiro commit.`,
      practicalExample: `git init 
git config user.name "Seu Nome" 
git config user.email "seuemail@exemplo.com" 
git add . 
git commit -m "Primeiro commit"`,
      practicalActivity: 'Crie um novo repositório, configure suas informações de usuário e faça seu primeiro commit.',
      isCompleted: false
    }
  ]
};