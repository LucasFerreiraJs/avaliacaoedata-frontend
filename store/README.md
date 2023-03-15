<h1 style="text-align: center; font-weight: bold;">Avaliação Técnica</h1>


## Preview 📸
<div align="center" style="display:flex; justify-content: space-between; margin:0 auto;" >
  <img src="static/pg-01.png" height="30" alt="users" >
  <!-- <img src="static/pg-02.png" alt="home" > -->
</div>


<h1 style="margin-bottom: 30px; margin-top: 30px; text-align: center; font-weight: bold;">Cadastro de Usuários🧑‍💼</h1>


## Sobre o Projeto
Frontend para avaliação técnica onde listamos e cadastramos usuários.
Backend disponível nesse repositório - [Backend](link)

### 🛠 Tecnologias
As seguintes ferramentas foram usadas na construção do projeto:

- [Nuxt](https://nuxtjs.org/)(vue)
- [Aspnet](https://dotnet.microsoft.com/en-us/apps/aspnet/apis)

### 🎲 Rodando o projeto

Configure baseUrl no arquivo nuxt.config.js na raiz do projeto para que o axios consiga consultar nossa aplicação backend
```
  axios: {
    baseURL: "https://localhost:7207"
  },
```

```bash
# Instale as dependências
$ yarn install
# ou
$ npm install

# Execute a aplicação
$ yarn dev
# ou
$ npm run dev
```