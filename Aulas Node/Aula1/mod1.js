//Classe
class Pessoa {
  constructor(nome) {
    this.nome = nome;
  }
}


const nome = 'Fábio'
const sobrenome = 'Henrique'
const exemplo = 'exemplo'
const item = 'item'


//Modos de exportar

// exports.exemplo = exemplo
// module.exports.item = item


module.exports = {
  nome, sobrenome, Pessoa
}



