const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Candidato = require('../models/Candidato')
const candidatoRoutes = require("../routes/candidatoRoutes")

passport.use(new LocalStrategy({
    usernameField: 'cpf',
    }, (cpf, password, done) => {
            Candidato.findOne({cpf: cpf}, async (erro, candidato) => {
                try{
                    console.log(candidato.password)
                    console.log(password)
                    if(!candidato) return done(null, false)
                    const validaSenha = await bcrypt.compare(password, candidato.password)
                    console.log(validaSenha)
                    if(!validaSenha) return done(null, false)
                    if(candidato) return done(null, candidato)
                } catch (erro) {
                    return done(null, false, {error: 'Candidato não Existe'})
                }
            })
        }
    )
)

passport.use(
    new BearerStrategy(
        (token, done) => {
            try {
                const payload = jwt.verify(token, process.env.JWT)
                Candidato.findOne({_id: payload.id}, (erro, candidato) => {
                    if(erro) {
                        done(erro, {error: 'Token não Encontrado'})
                    }
                    done(null, candidato)
                })    
            } catch (erro) {
                done(erro)
            }
}))

module.exports = passport
