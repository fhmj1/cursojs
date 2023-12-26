//importando modulo express
const express = require("express");
//inicializando modulo express
const app = express();
//importando modulo routes
const routes = require("./routes");
//importando modulo path
const path = require("path");

//tratamento de requisições POST
app.use(express.urlencoded({ extended: true }));

//importando o local absoluto do modulo public
app.use(express.static(path.resolve(__dirname, "public")));

//importando o local absoluto do modulo view e utilizando a engine EJS
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

//express utilizará as rotas do arquivo routes
app.use(routes);

app.listen(3000, () => {
  console.log("Acessar http://localhost:3000");
  console.log("Servidor executando na porta 3000");
});
