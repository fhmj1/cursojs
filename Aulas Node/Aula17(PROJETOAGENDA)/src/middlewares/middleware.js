// Middleware global para configurar variáveis locais
exports.meuMiddlewareGlobal = (req, res, next) => {
  // Configura variáveis locais para mensagens de erro, sucesso e usuário atual
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.user = req.session.user;
  next(); // Chama a próxima função no ciclo da solicitação-resposta
};

// Middleware para lidar com erros CSRF
exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    // Se houver um erro CSRF, renderiza a página de erro 404
    res.render("404");
  }
  next(); // Chama a próxima função no ciclo da solicitação-resposta
};

// Middleware para adicionar um token CSRF às variáveis locais
exports.csrfMiddleware = (req, res, next) => {
  // Configura a variável local csrfToken com o token CSRF gerado
  res.locals.csrfToken = req.csrfToken();
  next(); // Chama a próxima função no ciclo da solicitação-resposta
};

// Middleware para verificar se o usuário está autenticado (logado)
exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    // Se o usuário não estiver autenticado, redireciona para a página inicial com uma mensagem de erro
    req.flash("errors", "Você precisa fazer login");
    req.session.save(function () {
      res.redirect("/");
    });
    return; // Encerra a execução do middleware
  }
  next(); // Chama a próxima função no ciclo da solicitação-resposta
};