//importando modulo express
const express = require("express");
//inicializando modulo express
const app = express();

/*         CRIAR    LER   ATUALIZAR  DELETE
    CRUD ->CREATE   READ   UPDATE    DELETE
            POST    GET     PUT      DELETE



POST será usado para criar alguma coisa
GET será usado para entregar alguma coisa



    http://meusite.com/ <- GET -> Entregue a pagina / 
    http://meusite.com/sobre <- GET -> Entregue a pagina /sobre
    http://meusite.com/contato <- GET -> Entregue a pagina /contato
*/

app.get("/", (req, res) => {
  res.send(`<form action = '/' method = POST>
  Nome: <input type='text' name='nome'>
  <button>Enviar</button>
  </form>`);
});

app.post('/', (req, res) => {
  res.send('formulario recebido')
})

app.get("/contato", (req, res) => {
  res.send("Olá você está na rota contato");
});

app.listen(3000, () => {
  console.log("Acessar http://localhost:3000");
  console.log("Servidor executando na porta 3000");
});