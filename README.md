# App-frontend

Aplicação frontend para a plataforma QuestIO utilizando React

---

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Rodar o Projeto](#rodar-o-projeto)

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina.

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Docker](https://docs.docker.com/engine/install/)
- npm (geralmente incluído com o Node.js)
- Plugins (Recomendados) Vscode
  - Prettier
  - Eslint
  - EditorConfig

## Instalação

```bash
git clone https://github.com/QuestIO42/App-frontend.git

cd App-frontend.git
npm i
```

## Rodar o projeto

- Crie e copie as variáveis de ambiente dos exemplos

  ```bash
  cp .env.development.example .env.development
  cp .env.production.example .env.production
  ```

- Para rodar o projeto em modo de desenvolvimento utilize
  ```bash
  npm run dev
  ```
- Para rodar o projeto em modo de desenvolvimento utilize
  ```bash
  npm run start
  ```
