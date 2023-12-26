//Importando modulo e classe via desestruturação
const { Pessoa } = require("./E/mod2");
const mod2 = require("./E/mod2");

const p1 = new Pessoa("Fábio", "Henrique");
console.log(p1.nome);
console.log(p1.sobrenome);
console.log(p1.nomeCompleto());

console.log(mod2.multiplica(10, 10));




//Importando modulos e caminhos com path
const path = require('path')
console.log(path.resolve(__dirname, '../', '../'))
console.log(path.resolve(__dirname, 'arquivo', 'imagem'))
console.log(path.resolve(__filename))


// filename é o arquivo atual
console.log(__filename)

// dirname é a pasta atual
console.log(__dirname)