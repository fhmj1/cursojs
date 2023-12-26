//importando modulo express
const express = require("express");
//inicializando modulo express
const app = express();
//importando modulo routes
const routes = require("./routes");

//tratamento de requisições POST
app.use(express.urlencoded({ extended: true }));
//express utilizará as rotas do arquivo routes
app.use(routes);

app.listen(3000, () => {
  console.log("Acessar http://localhost:3000");
  console.log("Servidor executando na porta 3000");
});
