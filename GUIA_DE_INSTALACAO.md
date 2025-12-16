# Guia de Instalação - MasterGit

Este documento detalha o processo de configuração do ambiente de desenvolvimento e execução do objeto de aprendizagem MasterGit.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (versão 16 ou superior): [Download Node.js](https://nodejs.org/)
- **Gerenciador de Pacotes**: `npm` (geralmente vem com o Node.js) ou `yarn`.
- **Git**: Para clonar o repositório.

## Passo a Passo de Instalação

### 1. Clonar o Repositório

Abra seu terminal e execute o seguinte comando para baixar o código fonte:

```bash
git clone https://github.com/femedici/master-git-api.git
cd master-git-api
```

### 2. Instalar Dependências

Navegue até a pasta do projeto

```bash
cd api/
```

instale as bibliotecas necessárias.

Usando **npm**:

```bash
npm install
```

### 3. Executar em Modo de Desenvolvimento

Para iniciar a aplicação localmente e visualizar as alterações em tempo real:

Usando **npm**:

```bash
npm run dev
```

O terminal exibirá o endereço local (geralmente `http://localhost:5173/`) onde a aplicação está rodando. Abra este link no seu navegador.

Os arquivos estáticos serão gerados na pasta `dist/`.

## Estrutura de Pastas

Após a instalação, você verá a seguinte estrutura de diretórios:

```
src/
├── components/          # Componentes reutilizáveis (Terminal, Visualizer, etc.)
├── pages/              # Páginas da aplicação (Home, Módulos, Testes)
├── context/            # Gerenciamento de estado global (Progresso)
├── data/               # Dados estáticos dos módulos e lições
├── services/           # Lógica de persistência de dados
└── types/             # Definições de tipos TypeScript
```
