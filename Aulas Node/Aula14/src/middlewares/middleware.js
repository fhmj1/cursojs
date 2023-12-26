//Exportando uma função middleware

exports.meuMiddlewareGlobal = (req, res, next) => {
    console.log('fasfafasaffsa')
    next()
}