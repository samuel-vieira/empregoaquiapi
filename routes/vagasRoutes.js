const VagaController = require('../controllers/vagas')
const vagaController = new VagaController()

const passport = require('passport')

module.exports = app => {

    const rotasVaga = VagaController.rotas()

    app.route(rotasVaga.vagas)
        .get(passport.authenticate('bearer', {session: false}),vagaController.ListarVagas())
        .post(vagaController.InserirVaga())

    app.route(rotasVaga.delete)
        .delete(vagaController.DeletarVaga())
        .patch(vagaController.AtualizaVaga())
}