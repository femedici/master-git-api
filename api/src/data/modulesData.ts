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
    description:
      "Aprenda a iniciar um repositório e salvar suas primeiras alterações.",
    steps: [
      {
        title: "O que é Git?",
        command: "git",
        description:
          "Git é um sistema de controle de versão distribuído. Ele rastreia alterações em arquivos e diretórios, permitindo que você volte no tempo, trabalhe em paralelo e colabore com outros desenvolvedores. Digite `git` no terminal para verificar se o Git está instalado.",
        visualState: "intro",
        successMessage: "Ótimo! O Git está instalado e pronto para uso.",
      },
      {
        title: "Clonando Repositório",
        command: "git clone https://github.com/exemplo/repo.git",
        description:
          "O comando `git clone` cria uma cópia local de um repositório remoto. Você pode usar qualquer link de repositório do GitHub",
        visualState: "clone",
        successMessage:
          "Repositório clonado com sucesso! Você baixou o projeto para sua máquina.",
      },
      {
        title: "Iniciando um Repositório",
        command: "git init",
        description:
          "O comando `git init` cria um novo repositório Git do zero. Ele cria uma pasta oculta `.git` onde o Git armazena todo o histórico e configurações.",
        visualState: "init",
        successMessage:
          "Repositório inicializado com sucesso! A pasta .git foi criada.",
      },
      {
        title: "Adicionando Arquivos",
        command: "git add .",
        description:
          "O `git add` move as alterações do Diretório de Trabalho (Working Directory) para a Área de Preparação (Staging Area). O `.` indica 'todos os arquivos'.",
        visualState: "add",
        successMessage: "Arquivos adicionados à área de stage!",
      },
      {
        title: "Salvando Alterações",
        command: 'git commit -m "first commit"',
        description:
          "O `git commit` grava as alterações da Área de Preparação no histórico do repositório. A flag `-m` permite adicionar uma mensagem descrevendo a mudança.",
        visualState: "commit",
        successMessage:
          "Commit realizado! Suas alterações foram salvas no histórico.",
      },
    ],
  },
  {
    id: 2,
    title: "Ramificações (Branches)",
    description: "Trabalhe em paralelo sem afetar o código principal.",
    steps: [
      {
        title: "Criando uma Branch",
        command: "git checkout -b <nome-da-branch>",
        description:
          "Uma branch é uma linha independente de desenvolvimento. O comando `git checkout -b` cria uma nova branch e já muda para ela automaticamente. Escolha um nome para sua branch (ex: feature-login).",
        visualState: "branch-create",
        successMessage: "Branch criada e ativa!",
      },
      {
        title: "Adicionando Funcionalidade",
        command: 'git commit -m "Adiciona feature"',
        description:
          "Vamos fazer um commit nesta nova branch. Essa alteração existirá apenas aqui por enquanto, deixando a branch principal intacta.",
        visualState: "branch-commit",
        successMessage: "Commit realizado na branch 'feature-nova'!",
      },
      {
        title: "Trocando de Branch",
        command: "git switch main",
        description:
          "O comando `git switch` alterna entre branches. Voltando para a `main`, você verá que a funcionalidade nova não está aqui.",
        visualState: "branch-switch-main",
        successMessage: "Você voltou para a branch 'main'. A feature sumiu!",
      },
      {
        title: "Voltando para a Feature",
        command: "git switch feature-nova",
        description:
          "Vamos voltar para a branch da feature. Veja como suas alterações reaparecem, pois elas estão salvas nessa linha do tempo.",
        visualState: "branch-switch-feature",
        successMessage:
          "De volta à 'feature-nova'. Suas alterações estão aqui.",
      },
    ],
  },
  {
    id: 3,
    title: "Avançado",
    description: "Gerencie mudanças temporárias e una históricos.",
    steps: [
      {
        title: "Guardando Alterações",
        command: "git stash",
        description:
          "O `git stash` guarda temporariamente as alterações que ainda não estão prontas para serem commitadas, limpando seu diretório de trabalho.",
        visualState: "stash",
        successMessage: "Alterações guardadas no stash!",
      },
      {
        title: "Unindo Branches",
        command: "git merge feature",
        description:
          "O `git merge` une o histórico de uma branch (neste caso, 'feature') na branch atual.",
        visualState: "merge",
        successMessage: "Branch 'feature' fundida com sucesso!",
      },
    ],
  },
];
