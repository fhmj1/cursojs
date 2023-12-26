// Importando módulos dos controladores e middlewares
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require('./src/controllers/contatoController')
const { loginRequired } = require('./src/middlewares/middleware');

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
route.get('/contato/index', loginRequired, contatoController.index)
route.post('/contato/register', loginRequired, contatoController.register)
route.get('/contato/index/:id', loginRequired, contatoController.editIndex)
route.post('/contato/edit/:id', loginRequired, contatoController.update)
route.get('/contato/delete/:id', loginRequired, contatoController.delete)

// Exportando o módulo de rotas
module.exports = route;