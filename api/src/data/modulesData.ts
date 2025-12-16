export interface Step {
  title: string;
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
        title: "O que é Git?",
        command: "git",
        description: "Git é um sistema de controle de versão distribuído. Ele rastreia alterações em arquivos e diretórios, permitindo que você volte no tempo, trabalhe em paralelo e colabore com outros desenvolvedores.",
        visualState: "intro",
        successMessage: "Ótimo! O Git está instalado e pronto para uso."
      },
      {
        title: "Clonando Repositório",
        command: "git clone https://github.com/exemplo/repo.git",
        description: "O comando `git clone` cria uma cópia local de um repositório remoto. Você pode usar qualquer link de repositório do GitHub ou usar o exemplo abaixo.",
        visualState: "clone",
        successMessage: "Repositório clonado com sucesso! Você baixou o projeto para sua máquina."
      },
      {
        title: "Iniciando um Repositório",
        command: "git init",
        description: "O comando `git init` cria um novo repositório Git do zero. Ele cria uma pasta oculta `.git` onde o Git armazena todo o histórico e configurações.",
        visualState: "init",
        successMessage: "Repositório inicializado com sucesso! A pasta .git foi criada."
      },
      {
        title: "Adicionando Arquivos",
        command: "git add .",
        description: "O `git add` move as alterações do Diretório de Trabalho (Working Directory) para a Área de Preparação (Staging Area). O `.` indica 'todos os arquivos'.",
        visualState: "add",
        successMessage: "Arquivos adicionados à área de stage!"
      },
      {
        title: "Salvando Alterações",
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
        title: "Criando uma Branch",
        command: "git branch feature",
        description: "O `git branch` cria uma nova ramificação (branch). Isso permite que você desenvolva novas funcionalidades isoladamente.",
        visualState: "branch",
        successMessage: "Branch 'feature' criada com sucesso!"
      },
      {
        title: "Mudando de Branch",
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
        title: "Guardando Alterações",
        command: "git stash",
        description: "O `git stash` guarda temporariamente as alterações que ainda não estão prontas para serem commitadas, limpando seu diretório de trabalho.",
        visualState: "stash",
        successMessage: "Alterações guardadas no stash!"
      },
      {
        title: "Unindo Branches",
        command: "git merge feature",
        description: "O `git merge` une o histórico de uma branch (neste caso, 'feature') na branch atual.",
        visualState: "merge",
        successMessage: "Branch 'feature' fundida com sucesso!"
      }
    ]
  }
];
