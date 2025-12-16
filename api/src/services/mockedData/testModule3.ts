import { Test } from '../../types';

export const testModule3: Test = {
  id: 3,
  moduleId: 3,
  title: 'Teste - Masterizando o uso do Git',
  questions: [
    {
      id: 11,
      type: 'code-completion',
      question: 'Qual comando salva alterações temporariamente?',
      codePrefix: 'git ',
      correctAnswer: 'stash'
    },
    {
      id: 12,
      type: 'multiple-choice',
      question: 'Qual a diferença entre git revert e git reset?',
      options: [
        'Não há diferença',
        'revert cria um novo commit desfazendo mudanças, reset altera o histórico',
        'reset cria um novo commit, revert altera o histórico',
        'Ambos fazem a mesma coisa'
      ],
      correctAnswer: 'revert cria um novo commit desfazendo mudanças, reset altera o histórico'
    },
    {
      id: 13,
      type: 'descriptive',
      question: 'Como você resolveria um conflito de merge no Git?',
      correctAnswer: 'Editar arquivos com conflitos, remover marcadores de conflito, git add nos arquivos resolvidos, git commit'
    },
    {
      id: 14,
      type: 'code-completion',
      question: 'Qual comando mostra o histórico de commits?',
      codePrefix: 'git ',
      correctAnswer: 'log'
    },
    {
      id: 15,
      type: 'descriptive',
      question: 'Descreva um fluxo Git completo desde a criação de uma feature até o merge.',
      correctAnswer: 'git branch feature -> git switch feature -> desenvolvimento -> git add -> git commit -> git push -> Pull Request -> code review -> git merge'
    }
  ]
};