//Exportando as funções paginaInicial e trataPost do modulo homeController
exports.paginaInicial = (req, res) => {
  res.render("index", {
    titulo: "este será o titulo da pagina",
    numeros: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  });
  return;
};

exports.trataPost = (req, res) => {
  console.log(req.body);
  res.send(req.body.nome);
  return;
};
