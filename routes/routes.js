//const CandidatoController = require('../controllers/candidato')
//const candidatoController = new CandidatoController()

const vagasRouter = require('./vagasRoutes')
const candidatoRouter = require('./candidatoRoutes')

module.exports = app => {

    vagasRouter(app)
    candidatoRouter(app)

    app.get('/', (req, res) => {
        res.send('Hello World')
    })
}