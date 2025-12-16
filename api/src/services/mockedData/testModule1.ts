import { Test } from '../../types';

export const testModule1: Test = {
  id: 1,
  moduleId: 1,
  title: 'Teste - O que é Git?',
  questions: [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'O que é o Git?',
      options: [
        'Um editor de código',
        'Um sistema de controle de versões distribuído',
        'Uma linguagem de programação',
        'Um banco de dados'
      ],
      correctAnswer: 'Um sistema de controle de versões distribuído'
    },
    {
      id: 2,
      type: 'descriptive',
      question: 'Explique a diferença entre Git e GitHub.',
      correctAnswer: 'Git é o sistema de controle de versões, GitHub é uma plataforma que hospeda repositórios Git'
    },
    {
      id: 3,
      type: 'code-completion',
      question: 'Qual comando inicializa um novo repositório Git?',
      codePrefix: 'git ',
      correctAnswer: 'init'
    },
    {
      id: 4,
      type: 'multiple-choice',
      question: 'O que é o Working Tree?',
      options: [
        'O diretório .git',
        'O diretório de trabalho com arquivos atuais',
        'O staging area',
        'O repositório remoto'
      ],
      correctAnswer: 'O diretório de trabalho com arquivos atuais'
    },
    {
      id: 5,
      type: 'descriptive',
      question: 'Descreva o propósito do Staging Area no Git.',
      correctAnswer: 'Área intermediária para preparar commits, permite selecionar quais mudanças incluir no próximo commit'
    }
  ]
};