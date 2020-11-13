const CandidatoController = require('../controllers/candidato')
const candidatoController = new CandidatoController()
const passport = require('passport')

module.exports = app => {

    app.route('/Candidato')
     .post(candidatoController.Adiciona())

    app.route('/Candidato/:id')
        .delete(candidatoController.Remove())
        .get(candidatoController.MostrarCandidato())

    app.route('/Login')
     .post(passport.authenticate('local', {session: false}), candidatoController.Login())
}