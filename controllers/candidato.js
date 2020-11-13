const Candidatos = require('../models/Candidato')
const Vagas = require('../models/Vagas')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function criarToken(candidato) {
    const payload = {
        id: candidato._id
    }
    const token = jwt.sign(payload, process.env.JWT)
    return token
}

class Candidato {

    MostrarCandidato() {
        return async (req, res) => {
            const id = req.params.id

            await Candidatos.find({_id: id})
                .then(vaga => res.json(vaga))
                .catch(erro => res.status(404).json(erro))
        }
    }

    Adiciona() {
        return (req, res) => {
            const newCandidato = req.body
            const validaCpf = newCandidato.cpf

            Candidatos.findOne({cpf: validaCpf})
                .then(user => {
                    if(user) {
                        res.send('User already exists')
                    } else {
                        bcrypt.hash(newCandidato.password, 10)
                            .then(hash => {
                                newCandidato.password = hash

                                Candidatos.create(newCandidato, (erro, data) => {
                                    if(erro) {
                                        res.status(500).json(erro)
                                    } else {
                                        res.status(201).json(data)
                                    }
                                })
                            })
                            .catch(erro => res.status(500).json(erro))
                    }
                })           
        }
    }

    Remove() {
        return(req, res) =>{
            const id = req.params.id 
            Candidatos.findById(id)
                .then(candidato => {
                    candidato.delete()
                    res.send("candidato excluido")
                })
                .catch(erro => {
                    res.send('Candidato não Existe')
                })
        }
    }

    AtualizaCandidato() {
        return (req, res) => {
            const id = req.params.id
            const valores = req.body

            Candidatos.findOneAndUpdate(id, valores)
                .then(res.redirect('/Candidato/:id'))
                .catch(erro => res.status(404).send('Erro ao Atualizar Candidato'))
            
        }
    }

    Login() {
        return(req, res) => {
            const token = criarToken(req.user)
            res.set('Authenticate', token)
            console.log(token)
            res.redirect(301, '/Vagas')
        }
    }

    AplicarNaVaga() {
        return(req, res) => {
            const id_vaga = req.params.id

            Vagas.findById(id_vaga)
                .then(vaga => {
                    //vaga.candidato = req.user.id
                    console.log(vaga)
                })
        }
    }
}

module.exports = Candidato