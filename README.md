# 1Closet - Sistema de Gerenciamento de Usuários com Geração de Dossiê

Este projeto é uma API RESTful desenvolvida em Node.js com Express, MongoDB e PDFKit. Ele permite gerenciar usuários e gerar automaticamente um dossiê em formato PDF com as informações do usuário. A API também oferece endpoints para listar, buscar, criar e gerar dossiês para os usuários.

## Funcionalidades

- **Criar Usuário**: Adicionar um novo usuário e gerar um dossiê em PDF com as informações fornecidas.
- **Listar Usuários**: Listar todos os usuários registrados.
- **Buscar Usuário**: Buscar um usuário específico pelo `manychatId`.
- **Gerar Dossiê em PDF**: Gerar automaticamente um dossiê com base nas informações do usuário.
- **Download do Dossiê**: Fornecer um link para baixar o dossiê PDF gerado para cada usuário.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento para a API.
- **Express**: Framework para criação de rotas e middlewares.
- **MongoDB**: Banco de dados NoSQL para armazenar informações dos usuários.
- **Mongoose**: ODM (Object Data Modeling) para interagir com o MongoDB.
- **PDFKit**: Biblioteca para gerar o dossiê dos usuários em formato PDF.
- **Postman**: Ferramenta para testar a API.

## Instalação e Configuração

### Pré-requisitos

- **Node.js** (v18 ou superior)
- **MongoDB** (local ou MongoDB Atlas)

### Passo a Passo

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/1closet/1closet-mongoDb
   cd 1closet-mongoDb
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure o MongoDB:**

   Crie um arquivo `.env` na raiz do projeto com a seguinte estrutura:

   ```bash
   MONGO_URI= url do MondoDB
   PORT=3000
   ```

   Ajuste a URL do MongoDB conforme o ambiente (local ou MongoDB Atlas).

4. **Inicie o servidor:**

   ```bash
   npm start
   ```

   O servidor será iniciado e estará disponível em `http://localhost:3000`.

## Endpoints da API

### 1. Criar Usuário e Gerar Dossiê

- **POST** `/users`

- **Descrição**: Cria um novo usuário e gera um dossiê PDF.

- **Corpo da Requisição** (JSON):

  ```json
  {
    "manychatId": "123456789",
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "telefone": "1234567890",
    "tom": "claro",
    "subtom": "frio",
    "contraste": "alto",
    "temperatura": "fria",
    "intensidade": "alta",
    "profundidade": "média",
    "estacao": "Inverno",
    "coresFavoritas": ["azul", "cinza"]
  }
  ```

- **Resposta** (JSON):

  ```json
  {
    "message": "Usuário criado com sucesso. Baixe aqui o seu dossiê:",
    "downloadLink": "http://localhost:3000/pdfs/dossie_123456789.pdf"
  }
  ```

### 2. Listar Todos os Usuários

- **GET** `/users`

- **Descrição**: Lista todos os usuários registrados.

- **Resposta** (JSON):

  ```json
  [
    {
      "manychatId": "123456789",
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "telefone": "1234567890",
      "tom": "claro",
      "subtom": "frio",
      "contraste": "alto",
      "temperatura": "fria",
      "intensidade": "alta",
      "profundidade": "média",
      "estacao": "Inverno",
      "coresFavoritas": ["azul", "cinza"],
      "dossieCompleto": "/pdfs/dossie_123456789.pdf"
    }
  ]
  ```

### 3. Buscar Usuário por ID

- **GET** `/users/:id`

- **Descrição**: Busca um usuário específico pelo `manychatId`.

- **Resposta** (JSON):

  ```json
  {
    "manychatId": "123456789",
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "telefone": "1234567890",
    "tom": "claro",
    "subtom": "frio",
    "contraste": "alto",
    "temperatura": "fria",
    "intensidade": "alta",
    "profundidade": "média",
    "estacao": "Inverno",
    "coresFavoritas": ["azul", "cinza"],
    "dossieCompleto": "/pdfs/dossie_123456789.pdf"
  }
  ```

## Estrutura do Projeto

```
├── adapters
│   ├── in
│   │   └── UserController.js        # Controlador que lida com as requisições HTTP
│   └── out
│       └── MongoUserRepository.js    # Repositório para interagir com o MongoDB
├── pdfs                              # Pasta onde os PDFs são gerados
├── domain
│   ├── models
│   │   └── User.js                   # Modelo de dados Mongoose para o MongoDB
│   └── UserService.js                # Lógica de negócio da aplicação
├── config
│   └── database.js                   # Configuração do banco de dados
├── .env                              # Arquivo de configuração do ambiente
├── app.js                            # Arquivo principal de configuração da aplicação
├── package.json                      # Dependências do projeto
└── README.md                         # Documentação do projeto
```

## Testando a API

Use o **Postman** ou **cURL** para testar os endpoints da API. Aqui está um exemplo de como criar um novo usuário usando `curl`:

```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{
  "manychatId": "123456789",
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "telefone": "1234567890",
  "tom": "claro",
  "subtom": "frio",
  "contraste": "alto",
  "temperatura": "fria",
  "intensidade": "alta",
  "profundidade": "média",
  "estacao": "Inverno",
  "coresFavoritas": ["azul", "cinza"]
}'
```

## Contribuindo

1. Faça um fork do projeto
2. Crie uma nova branch (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).