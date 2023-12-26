exports.paginaInicial = (req, res) => {
  res.render('index');
};

exports.trataPost = (req, res) => {
  console.log(req.body);
  res.send(req.body.nome);
};
