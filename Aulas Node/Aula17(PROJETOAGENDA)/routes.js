// Importando módulos dos controladores e middlewares
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require('./src/controllers/contatoController')
const { requerLogin } = require('./src/middlewares/middleware');

// Importando o módulo Express
const express = require("express");

// Inicializando o módulo Express para rotas
const route = express.Router();

// Rotas da home
route.get("/", homeController.index);

// Rotas de login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

// Rotas de contato
route.get('/contato/index', requerLogin, contatoController.index)
route.post('/contato/register', requerLogin, contatoController.register)
route.get('/contato/index/:id', requerLogin, contatoController.editIndex)
route.post('/contato/edit/:id', requerLogin, contatoController.update)
route.get('/contato/delete/:id', requerLogin, contatoController.delete)

// Exportando o módulo de rotas
module.exports = route;