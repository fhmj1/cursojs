//Classe
class Pessoa {
  constructor(nome, sobrenome) {
    this.nome = nome;
    this.sobrenome = sobrenome;
  }
  //Método da classe
  nomeCompleto() {
    return this.nome + " " + this.sobrenome;
  }
}

//Função
function multiplica(x, y) {
  return x * y;
}

//exportando uma classe e uma função
module.exports = {
  multiplica,
  Pessoa,
};
