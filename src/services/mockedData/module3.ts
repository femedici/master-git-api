import { Module } from '../../types';

export const module3: Module = {
  id: 3,
  title: 'Masterizando o uso do Git',
  description: 'Comandos avançados, resolução de conflitos e fluxo completo',
  isLocked: true,
  testId: 3,
  sessions: [
    {
      id: 7,
      title: 'Comandos Avançados',
      content: `**Conteúdo:**

git stash — salvar e restaurar alterações temporárias.
git rebase — reorganizar o histórico de forma linear.
git revert e git reset — desfazendo mudanças de diferentes formas.

Comandos avançados permitem manipular o histórico de forma precisa e resolver situações complexas no desenvolvimento.`,
      practicalExample: `git stash save "ajuste temporário" 
git rebase main 
git reset --hard HEAD~1`,
      isCompleted: false
    },
    {
      id: 8,
      title: 'Resolução de Conflitos e Diagnóstico',
      content: `**Conteúdo:**

Resolvendo conflitos de merge.
Corrigindo erros e diagnosticando o histórico.
Utilizando:
- git log para inspecionar commits.
- git blame para identificar autores de linhas.
- git reflog para restaurar commits perdidos.

Conflitos são naturais em projetos colaborativos. O Git fornece ferramentas poderosas para resolvê-los e diagnosticar problemas.`,
      practicalExample: `git merge main 
# Corrija conflitos no editor e finalize 
git add . 
git commit`,
      isCompleted: false
    },
    {
      id: 9,
      title: 'Projeto Final e Fluxo Completo',
      content: `**Conteúdo:**

Aplicar um fluxo Git completo: **branch → PR → merge → release**
Diagnosticar e otimizar fluxos em projetos reais.
Compreender o impacto de cada ação no histórico.

**Atividade prática final:**
Resolver conflitos reais, usar git stash, criar uma release e revisar o histórico.

Este é o momento de aplicar todos os conhecimentos adquiridos em um projeto real completo.`,
      practicalActivity: 'Resolver conflitos reais, usar git stash, criar uma release e revisar o histórico.',
      isCompleted: false
    }
  ]
};