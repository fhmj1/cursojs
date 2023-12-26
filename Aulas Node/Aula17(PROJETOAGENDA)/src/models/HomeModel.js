// Importa a biblioteca mongoose
const mongoose = require("mongoose");

// Define o esquema do modelo usando o Mongoose
const HomeSchema = new mongoose.Schema({
  nome: { type: String, required: true },       // Campo 'nome' do tipo String, obrigatório
  sobrenome: { type: String, required: true },  // Campo 'sobrenome' do tipo String, obrigatório
  email: { type: String, required: true },      // Campo 'email' do tipo String, obrigatório
  telefone: { type: Number, required: true },   // Campo 'telefone' do tipo Number, obrigatório
});

// Cria o modelo usando o esquema
const HomeModel = mongoose.model("Home", HomeSchema);

// Define a classe Home (não possui implementação)
class Home {
    constructor(){
        
    }
}

// Exporta a classe para ser utilizada em outros arquivos
module.exports = Home;