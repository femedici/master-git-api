import { Test } from '../../types';

export const testModule2: Test = {
  id: 2,
  moduleId: 2,
  title: 'Teste - Como usar o Git',
  questions: [
    {
      id: 6,
      type: 'code-completion',
      question: 'Qual comando adiciona todos os arquivos ao staging area?',
      codePrefix: 'git ',
      correctAnswer: 'add .'
    },
    {
      id: 7,
      type: 'multiple-choice',
      question: 'Qual comando baixa um repositório remoto?',
      options: [
        'git pull',
        'git clone',
        'git fetch',
        'git download'
      ],
      correctAnswer: 'git clone'
    },
    {
      id: 8,
      type: 'code-completion',
      question: 'Qual comando cria uma nova branch?',
      codePrefix: 'git ',
      correctAnswer: 'branch'
    },
    {
      id: 9,
      type: 'descriptive',
      question: 'Explique o fluxo básico de trabalho com Git (editar → adicionar → confirmar → enviar).',
      correctAnswer: 'Editar arquivos, git add para staging, git commit para salvar, git push para enviar ao remoto'
    },
    {
      id: 10,
      type: 'multiple-choice',
      question: 'O que faz o comando git merge?',
      options: [
        'Cria uma nova branch',
        'Deleta uma branch',
        'Integra mudanças de uma branch em outra',
        'Envia commits para o remoto'
      ],
      correctAnswer: 'Integra mudanças de uma branch em outra'
    }
  ]
};