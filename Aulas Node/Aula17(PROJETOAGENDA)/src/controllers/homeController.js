// Importa o modelo Contato
const Contato = require('../models/ContatoModel');

// Exporta a função index que será utilizada como controlador para a rota '/'
exports.index = async (req, res) => {
  // Cria uma nova instância da classe Contato, passando o corpo da requisição (req.body) como parâmetro
  const contato = new Contato(req.body);

  // Chama o método buscaContatos assíncrono na instância de Contato para obter a lista de contatos
  const contatos = await contato.buscaContatos();

  // Renderiza a página 'index', passando os contatos encontrados como variável para o template
  res.render("index", { contatos });
};