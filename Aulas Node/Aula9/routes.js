//importando modulos
const homeController = require("./controllers/homeController");
const contatoController = require('./controllers/contatoController')
//importando modulo express
const express = require("express");
//inicializando modulo express(router)
const route = express.Router();

//rotas da home
route.get("/", homeController.paginaInicial);
route.post("/", homeController.trataPost);

//rotas de contato
route.get('/contato', contatoController.paginaInicial)

//exportando modulo routes
module.exports = route;
