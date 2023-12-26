//Exportando uma função middleware
exports.meuMiddlewareGlobal = (req, res, next) => {
  res.locals.umaVariavelLocal = "Este é o valor da variavel local";
  next();
};


