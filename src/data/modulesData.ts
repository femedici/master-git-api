export interface Step {
  command: string;
  description: string;
  visualState: string; // Identifier for the visualizer state
  successMessage: string;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  steps: Step[];
}

export const modulesData: Module[] = [
  {
    id: 1,
    title: "Conceitos Básicos",
    description: "Aprenda a iniciar um repositório e salvar suas primeiras alterações.",
    steps: [
      {
        command: "git init",
        description: "O comando `git init` cria um novo repositório Git. Ele cria uma pasta oculta `.git` onde o Git armazena todo o histórico e configurações.",
        visualState: "init",
        successMessage: "Repositório inicializado com sucesso! A pasta .git foi criada."
      },
      {
        command: "git add .",
        description: "O `git add` move as alterações do Diretório de Trabalho (Working Directory) para a Área de Preparação (Staging Area). O `.` indica 'todos os arquivos'.",
        visualState: "add",
        successMessage: "Arquivos adicionados à área de stage!"
      },
      {
        command: 'git commit -m "first commit"',
        description: "O `git commit` grava as alterações da Área de Preparação no histórico do repositório. A flag `-m` permite adicionar uma mensagem descrevendo a mudança.",
        visualState: "commit",
        successMessage: "Commit realizado! Suas alterações foram salvas no histórico."
      }
    ]
  },
  {
    id: 2,
    title: "Ramificações (Branches)",
    description: "Trabalhe em paralelo sem afetar o código principal.",
    steps: [
      {
        command: "git branch feature",
        description: "O `git branch` cria uma nova ramificação (branch). Isso permite que você desenvolva novas funcionalidades isoladamente.",
        visualState: "branch",
        successMessage: "Branch 'feature' criada com sucesso!"
      },
      {
        command: "git checkout feature",
        description: "O `git checkout` (ou `git switch`) serve para mudar de uma branch para outra. Agora você estará trabalhando na branch 'feature'.",
        visualState: "checkout",
        successMessage: "Você mudou para a branch 'feature'!"
      }
    ]
  },
  {
    id: 3,
    title: "Avançado",
    description: "Gerencie mudanças temporárias e una históricos.",
    steps: [
      {
        command: "git stash",
        description: "O `git stash` guarda temporariamente as alterações que ainda não estão prontas para serem commitadas, limpando seu diretório de trabalho.",
        visualState: "stash",
        successMessage: "Alterações guardadas no stash!"
      },
      {
        command: "git merge feature",
        description: "O `git merge` une o histórico de uma branch (neste caso, 'feature') na branch atual.",
        visualState: "merge",
        successMessage: "Branch 'feature' fundida com sucesso!"
      }
    ]
  }
];
