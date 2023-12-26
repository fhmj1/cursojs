// Importando módulos necessários
const express = require("express");
const app = express(); // Inicializando o aplicativo Express
const routes = require("./routes");
const path = require("path");
const { meuMiddlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');
const mongoose = require("mongoose");
require("dotenv").config(); // Configurando o dotenv para carregar variáveis de ambiente
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const helmet = require('helmet');
const csrf = require('csurf');

// Configuração de segurança com Helmet
app.use(helmet());

// Configuração do middleware para analisar corpos de solicitações em JSON
app.use(express.json());

// Configuração do Express para tratar solicitações POST codificadas (formulários)
app.use(express.urlencoded({ extended: true }));

// Configuração de sessão
const sessionOptions = (
  session({
    secret: "keyboard cat",
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true },
  })
);
app.use(sessionOptions);
app.use(flash());

// Conexão com o banco de dados MongoDB
mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit("Banco de dados conectado");
  })
  .catch((e) => {
    console.log(e);
  });

// Configuração do diretório estático para arquivos públicos
app.use(express.static(path.resolve(__dirname, "public")));

// Configuração do diretório de views e da engine de renderização (EJS)
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Configuração do middleware de proteção contra CSRF
app.use(csrf());

// Utilização de middlewares globais personalizados
app.use(meuMiddlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

// Configuração do Express para utilizar as rotas definidas no arquivo 'routes'
app.use(routes);

// Evento emitido quando a conexão com o banco de dados é estabelecida
app.on("Banco de dados conectado", () => {
  // Inicia o servidor na porta 3000
  app.listen(3000, () => {
    console.log("Acesse http://localhost:3000");
    console.log("Servidor executando na porta 3000");
  });
});