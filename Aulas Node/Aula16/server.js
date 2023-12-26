//importando modulo express
//inicializando modulo express
//importando modulo routes
//importando modulo path
//importando modulo middleware
//importando modulo mongoose (mongoDB)
//importando modulo dotenv
//importando modulo session
//importando modulo connect-mongo
//importando modulo flash
//importando modulo helmet
const express = require("express");
const app = express();
const routes = require("./routes");
const path = require("path");
const { meuMiddlewareGlobal } = require("./src/middlewares/middleware");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo")
const flash = require("connect-flash");
const helmet = require('helmet')
const csrf = require('csurf')

//inicializando helmet para segurança do projeto 
app.use(helmet())

//utilizando o session no projeto, para gravar sessões
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

//conexão com a base de dados (url está no arquivo protegido .env)
mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit("Banco de dados conectado");
  })
  .catch((e) => {
    console.log(e);
  });

//tratamento de requisições POST
app.use(express.urlencoded({ extended: true }));

//importando o local absoluto do modulo public
app.use(express.static(path.resolve(__dirname, "public")));

//importando o local absoluto do modulo view e utilizando a engine EJS
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csrf())
//utilizando o middleware global
app.use(meuMiddlewareGlobal);

//express utilizará as rotas do arquivo routes
app.use(routes);

app.on("Banco de dados conectado", () => {
  app.listen(3000, () => {
    console.log("Acessar http://localhost:3000");
    console.log("Servidor executando na porta 3000");
  });
});
