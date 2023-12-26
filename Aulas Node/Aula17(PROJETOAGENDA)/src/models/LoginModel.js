// Importa as bibliotecas necessárias
const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

// Define o esquema do modelo usando o Mongoose
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Cria o modelo usando o esquema
const LoginModel = mongoose.model("Login", LoginSchema);

// Define a classe Login
class Login {
  // Construtor que recebe os dados do corpo (body) da requisição
  constructor(body) {
    this.body = body;
    this.errors = []; // Array para armazenar mensagens de erro
    this.user = null; // Usuário associado ao login
  }

  // Método para registrar um novo usuário
  async registrar() {
    this.valida(); // Chama o método de validação
    if (this.errors.length > 0) return; // Se houver erros, encerra a operação

    await this.usuarioExiste(); // Verifica se o usuário já existe

    if (this.errors.length > 0) return; // Se houver erros, encerra a operação

    // Gera um salt e utiliza para criar um hash da senha
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    // Cria um novo usuário no banco de dados
    this.user = await LoginModel.create(this.body);
  }

  // Método para realizar o login
  async logar() {
    // Busca o usuário no banco de dados pelo e-mail
    this.user = await LoginModel.findOne({ email: this.body.email });

    // Verifica se o usuário não existe ou se o e-mail e senha não coincidem
    if (
      !this.user ||
      (!validator.isEmail(this.body.email) &&
        !bcryptjs.compareSync(this.body.password, this.user.password))
    ) {
      this.errors.push("E-mail inválido");
      this.errors.push("Senha inválida");
      this.user = null;
      return;
    }

    // Verifica se o e-mail é inválido
    if (!this.user || !validator.isEmail(this.body.email)) {
      this.errors.push("E-mail inválido");
      return;
    }

    // Verifica se a senha é inválida
    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      console.log(`Senha enviada no login: ${this.body.password}`);
      console.log(`Senha registrada no cadastro: ${this.user.password}`);
      this.errors.push("Senha inválida");
      this.user = null;
      return;
    }
  }

  // Método para validar os dados do corpo da requisição
  valida() {
    this.limpar(); // Chama o método para "limpar" os dados

    // Verifica se o e-mail é válido
    if (!validator.isEmail(this.body.email)) {
      this.errors.push("E-mail inválido");
    }

    // Verifica se a senha possui o tamanho correto
    if (this.body.password.length < 6 || this.body.password.length > 20) {
      this.errors.push("Senha precisa ter entre 6 e 20 caracteres");
    }
  }

  // Método para verificar se o usuário já existe no banco de dados
  async usuarioExiste() {
    try {
      const user = await LoginModel.findOne({ email: this.body.email });
      if (user) this.errors.push("Conta já existe.");

    } catch (e) {
      console.log(e);
    }
  }

  // Método para "limpar" os dados do corpo da requisição
  limpar() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

// Exporta a classe para ser utilizada em outros arquivos
module.exports = Login;