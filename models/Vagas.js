const mongoose = require('mongoose')

const VagasSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    nivel: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true,
    },
    candidato: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidato'
    }]
})

module.exports = Vagas = mongoose.model('vaga', VagasSchema)