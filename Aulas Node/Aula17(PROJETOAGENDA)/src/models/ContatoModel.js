// Importa as bibliotecas necessárias
const validator = require("validator");
const mongoose = require("mongoose");

// Define o esquema do modelo usando o Mongoose
const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },        // Campo 'nome' do tipo String, obrigatório
  sobrenome: { type: String, required: false, default: "" },  // Campo 'sobrenome' do tipo String, opcional (padrão: "")
  email: { type: String, required: false, default: "" },      // Campo 'email' do tipo String, opcional (padrão: "")
  telefone: { type: String, required: false, default: "" },   // Campo 'telefone' do tipo String, opcional (padrão: "")
  data: { type: Date, default: Date.now },    // Campo 'data' do tipo Date, opcional (padrão: data atual)
});

// Cria o modelo usando o esquema
const ContatoModel = mongoose.model("Contato", ContatoSchema);

// Define a classe Contato
class Contato {
  constructor(body) {
    this.body = body;   // Inicializa o corpo (dados) da instância
    this.errors = [];   // Array para armazenar mensagens de erro
    this.contato = null; // Contato associado
  }

  // Método assíncrono para deletar um contato pelo ID
  async deletar(id) {
    if (typeof id !== "string") return;   // Verifica se o ID é uma string
    const contato = await ContatoModel.findOneAndDelete({ _id: id });  // Procura e deleta o contato pelo ID
    return contato;  // Retorna o contato deletado
  }

  // Método assíncrono para buscar todos os contatos ordenados por data decrescente
  async buscaContatos() {
    const contatos = await ContatoModel.find().sort({ data: -1 });  // Busca todos os contatos e os ordena por data decrescente
    console.log(contatos);  // Exibe os contatos no console (pode ser removido em produção)
    return contatos;  // Retorna a lista de contatos
  }

  // Método assíncrono para buscar um contato pelo ID
  async buscaPorId(id) {
    if (typeof id !== "string") return;  // Verifica se o ID é uma string
    const user = await ContatoModel.findById(id);  // Procura um contato pelo ID
    return user;  // Retorna o contato encontrado
  }

  // Método para validar os dados do corpo da requisição
  valida() {
    this.limpar();  // Chama o método para "limpar" os dados

    // Verifica se o campo 'nome' está preenchido
    if (!this.body.nome) {
      console.log(this.body.nome);
      this.errors.push("Nome é um campo obrigatório");
    }

    // Verifica se o campo 'email' é um e-mail válido (se preenchido)
    if (this.body.email && !validator.isEmail(this.body.email)) {
      console.log(this.body.email);
      this.errors.push("E-mail inválido");
    }

    // Verifica se pelo menos um dos campos 'telefone' ou 'email' está preenchido
    if (!this.body.telefone && !this.body.email) {
      this.errors.push("Um dos campos precisam ser preenchidos: email ou telefone");
    }
  }

  // Método assíncrono para registrar um novo contato
  async registrar() {
    this.valida();  // Chama o método de validação
    if (this.errors.length > 0) return;  // Se houver erros, encerra a operação
    this.contato = await ContatoModel.create(this.body);  // Cria um novo contato no banco de dados
  }

  // Método assíncrono para editar um contato pelo ID
  async editar(id) {
    console.log(id);
    if (typeof id !== "string") {
      return;
    }

    this.valida();  // Chama o método de validação

    if (this.errors.length > 0) {
      return;
    }

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });  // Encontra e atualiza o contato no banco de dados
  }

  // Método para "limpar" os dados do corpo da requisição
  limpar() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone,
    };
  }
}

// Exporta a classe para ser utilizada em outros arquivos
module.exports = Contato;