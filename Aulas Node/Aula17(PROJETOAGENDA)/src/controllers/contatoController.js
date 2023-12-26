// Importa o modelo Contato
const Contato = require("../models/ContatoModel");

// Controlador para a rota '/contato'
exports.index = (req, res) => {
  // Renderiza a página 'contato' e passa um objeto vazio como variável para o template
  res.render("contato", { contato: {} });
};

// Controlador para a rota '/contato/register'
exports.register = async (req, res) => {
  try {
    // Cria uma nova instância da classe Contato, passando o corpo da requisição (req.body) como parâmetro
    const contato = new Contato(req.body);

    // Chama o método assíncrono 'registrar' na instância de Contato para criar um novo contato
    await contato.registrar();

    // Se houver erros no processo de registro
    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);  // Adiciona mensagens de erro às mensagens flash
      req.session.save(function () {
        return res.redirect("http://localhost:3000/contato/index");  // Redireciona para a página de contato
      });
      return;
    } else {
      req.flash("success", "Seu contato foi criado com sucesso");  // Adiciona mensagem de sucesso às mensagens flash
      req.session.save(function () {
        return res.redirect(
          `http://localhost:3000/contato/index/${contato.contato._id}`
        );  // Redireciona para a página de detalhes do contato criado
      });
    }
  } catch (e) {
    console.log(e);  // Exibe o erro no console (pode ser removido em produção)
    return res.render("404");  // Renderiza a página de erro 404 em caso de exceção
  }
};

// Controlador para a rota '/contato/edit/:id'
exports.editIndex = async function (req, res) {
  try {
    // Cria uma nova instância da classe Contato, passando o corpo da requisição (req.body) como parâmetro
    const contato = new Contato(req.body);

    // Se não houver um parâmetro 'id' na requisição, renderiza a página de erro 404
    if (!req.params.id) return res.render("404");

    // Busca um contato pelo ID fornecido
    const user = await contato.buscaPorId(req.params.id);

    // Se o contato não for encontrado, renderiza a página de erro 404
    if (!user) return res.render("404");

    // Renderiza a página 'contato', passando o contato encontrado como variável para o template
    res.render("contato", { contato: user });
  } catch (e) {
    console.log(e);
  }
};

// Controlador para a rota '/contato/update/:id'
exports.update = async (req, res) => {
  try {
    // Cria uma nova instância da classe Contato, passando o corpo da requisição (req.body) como parâmetro
    const contato = new Contato(req.body);

    // Chama o método assíncrono 'editar' na instância de Contato para atualizar um contato existente pelo ID
    await contato.editar(req.params.id);

    // Se houver erros no processo de edição
    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);  // Adiciona mensagens de erro às mensagens flash
      req.session.save(function () {
        return res.redirect(
          `http://localhost:3000/contato/index/${req.params.id}`
        );  // Redireciona para a página de detalhes do contato editado
      });
      return;
    } else {
      req.flash("success", "Seu contato foi editado com sucesso");  // Adiciona mensagem de sucesso às mensagens flash
      req.session.save(function () {
        return res.redirect(
          `http://localhost:3000/contato/index/${req.params.id}`
        );  // Redireciona para a página de detalhes do contato editado
      });
    }
  } catch (e) {
    console.log(e);  // Exibe o erro no console (pode ser removido em produção)
    return res.render("404");  // Renderiza a página de erro 404 em caso de exceção
  }
};

// Controlador para a rota '/contato/delete/:id'
exports.delete = async function (req, res) {
  try {
    // Cria uma nova instância da classe Contato, passando o corpo da requisição (req.body) como parâmetro
    const contato = new Contato(req.body);

    // Se não houver um parâmetro 'id' na requisição, renderiza a página de erro 404
    if (!req.params.id) return res.render("404");

    // Deleta um contato pelo ID fornecido
    const user = await contato.deletar(req.params.id);

    // Se o contato não for encontrado, renderiza a página de erro 404
    if (!user) return res.render("404");

    // Adiciona mensagem de sucesso às mensagens flash
    req.flash("success", "Seu contato foi deletado com sucesso");
    
    // Salva a sessão e redireciona para a página anterior
    req.session.save(function () {
      res.redirect(`back`);
      return;
    });
  } catch (e) {
    console.log(e);  // Exibe o erro no console (pode ser removido em produção)
  }
};