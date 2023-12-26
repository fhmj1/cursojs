//importando modulo express
const express = require("express");
//inicializando modulo express
const app = express();
//importando modulo routes
const routes = require("./routes");
//importando modulo path
const path = require("path");
//importando modulo middleware
const { meuMiddlewareGlobal } = require("./src/middlewares/middleware");
//importando modulo mongoose (mongoDB)
const mongoose = require("mongoose");
//importando modulo dotenv
require("dotenv").config();
//importando modulo session
const session = require("express-session");
//importando modulo connect-mongo
const MongoStore = require("connect-mongo")
//importando modulo flash
const flash = require("connect-flash");

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
