// Importa o modelo de Login
const Login = require("../models/LoginModel");

// Controlador para a rota '/'
exports.index = async (req, res) => {
  // Verifica se o usuário já está logado
  if (req.session.user) {
    return res.render("login-logado");  // Se estiver logado, renderiza a página 'login-logado'
  } else {
    console.log(req.session.user);  // Exibe no console informações sobre a sessão do usuário (pode ser removido em produção)
    res.render("login");  // Se não estiver logado, renderiza a página 'login'
  }
};

// Controlador para a rota '/register'
exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);  // Cria uma instância do modelo de Login com os dados do corpo da requisição
    await login.registrar();  // Chama o método 'registrar' para criar uma nova conta

    // Se houver erros no processo de registro
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);  // Adiciona mensagens de erro às mensagens flash
      req.session.save(function () {
        return res.redirect("http://localhost:3000/login/index");  // Redireciona para a página de login
      });
      return;
    } else {
      req.flash("success", "Sua conta foi criada com sucesso");  // Adiciona mensagem de sucesso às mensagens flash
      req.session.save(function () {
        return res.redirect("http://localhost:3000/login/index");  // Redireciona para a página de login
      });
    }
  } catch (e) {
    console.log(e);  // Exibe o erro no console (pode ser removido em produção)
    return res.render("404");  // Renderiza a página de erro 404 em caso de exceção
  }
};

// Controlador para a rota '/login'
exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);  // Cria uma instância do modelo de Login com os dados do corpo da requisição
    await login.logar();  // Chama o método 'logar' para realizar o login

    // Se houver erros no processo de login
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);  // Adiciona mensagens de erro às mensagens flash
      req.session.save(function () {
        return res.redirect("http://localhost:3000/login/index");  // Redireciona para a página de login
      });
      return;
    } else {
      req.flash("success", "Você logou no sistema");  // Adiciona mensagem de sucesso às mensagens flash
      req.session.user = login.user;  // Armazena o usuário na sessão
      req.session.save(function () {
        return res.redirect("http://localhost:3000/login/index");  // Redireciona para a página de login
      });
    }
  } catch (e) {
    console.log(e);  // Exibe o erro no console (pode ser removido em produção)
    return res.render("404");  // Renderiza a página de erro 404 em caso de exceção
  }
};

// Controlador para a rota '/logout'
exports.logout = function (req, res) {
  req.session.destroy();  // Destroi a sessão do usuário
  res.redirect('/');  // Redireciona para a página inicial
};