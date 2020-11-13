require('dotenv/config')

const express = require('express')
const consign = require('consign')
const Cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('../controllers/autenticacaoStrategy')

module.exports = () => {
    //app
    const app = express()

    //Usar variável de ambiente
    

    //Middleware
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended:false }))
    app.use(Cors())
    app.use(passport.initialize())
    app.use(passport.session())

    //rotas
    consign()
        .include('routes')
        .into(app)

    return app
}