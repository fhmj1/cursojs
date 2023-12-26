//Importando modulos
const path = require('path')
const axios = require('axios')
const app = require('./mod1')

console.log(app)

console.log(app.nome)
console.log(app.sobrenome)

const p2 = new app.Pessoa('Luiz')
console.log(p2.nome)

