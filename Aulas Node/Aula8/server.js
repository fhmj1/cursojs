//importando modulo express
const express = require("express");
//inicializando modulo express
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`<form action = '/' method = POST>
  Nome: <input type='text' name='nome'>
  <button>Enviar</button>
  </form>`);
});

app.get("/testes/:idUsuarios?/:parametro?", (req, res) => {
  console.log(req.query);
  res.send(req.query.nome);
});

// app.get("/testes/:idUsuarios?/:parametro?", (req, res) => {
//   console.log(req.params);
//   res.send(req.params);
// });

app.post("/", (req, res) => {
  console.log(req.body);
  res.send(`Olá ${req.body.nome}`);
});

app.listen(3000, () => {
  console.log("Acessar http://localhost:3000");
  console.log("Servidor executando na porta 3000");
});
