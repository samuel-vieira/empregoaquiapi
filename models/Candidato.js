const mongoose = require('mongoose')

const CandidatoSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = Candidatos = mongoose.model('Candidato', CandidatoSchema)