import { Module } from '../../types';

export const module2: Module = {
  id: 2,
  title: 'Como usar o Git',
  description: 'Comandos básicos, fluxo de trabalho e colaboração com branches',
  isLocked: true,
  testId: 2,
  sessions: [
    {
      id: 4,
      title: 'Comandos Básicos',
      content: `**Conteúdo:**

git init, git add, git commit — criando e salvando versões.
git clone, git push, git pull — conectando-se a repositórios remotos.

Os comandos básicos do Git formam a base de todo fluxo de trabalho:
- **git init**: Inicializa um novo repositório
- **git add**: Adiciona arquivos ao staging area
- **git commit**: Salva um snapshot do projeto
- **git clone**: Copia um repositório remoto
- **git push**: Envia commits para repositório remoto
- **git pull**: Baixa e integra mudanças do repositório remoto`,
      practicalExample: `git clone https://github.com/usuario/repositorio.git 
git add . 
git commit -m "primeiro commit" 
git push origin main`,
      isCompleted: false
    },
    {
      id: 5,
      title: 'Fluxo de Trabalho e Estruturação',
      content: `**Conteúdo:**

Como estruturar um projeto versionado.
Ciclo de versionamento: **editar → adicionar → confirmar → enviar.**
Lidando com revisões e pequenas modificações.

**Atividade prática:**
- Criar um repositório versionado.
- Simular o ciclo de edição e envio de alterações.

O fluxo básico do Git segue um padrão consistente que, uma vez dominado, torna o desenvolvimento muito mais organizado e previsível.`,
      practicalActivity: 'Pratique o ciclo completo: faça alterações em arquivos, adicione ao staging, commit e push.',
      isCompleted: false
    },
    {
      id: 6,
      title: 'Colaboração e Branches',
      content: `**Conteúdo:**

Criação e integração de branches:
- git branch
- git merge  
- git switch

Introdução ao Pull Request (GitHub/GitLab).
Entendendo o versionamento colaborativo.

Branches permitem desenvolvimento paralelo e colaboração segura entre múltiplos desenvolvedores.`,
      practicalExample: `git branch feature-login 
git switch feature-login 
git commit -m "Adiciona tela de login" 
git push origin feature-login`,
      practicalActivity: 'Criar uma feature branch, realizar merge e publicar no remoto.',
      isCompleted: false
    }
  ]
};