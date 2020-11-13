const Vagas = require('../models/Vagas')

class Vaga {

    static rotas() {
        return {
            vagas: '/Vagas',
            delete: '/Vagas/:id',
            update: '/Vagas/:id'
        }
    }

    ListarVagas() {
        return (req, res) => {
            Vagas.find()
             .then(vagas => res.json(vagas))
             .catch(erro => console.log(erro))
        }
    }

    InserirVaga() {
        return (req, res) => {
            const newVaga = req.body;

            Vagas.create(newVaga, (erro, data) => {
                if(erro) {
                    res.status(500).send(erro)
                } else {
                    res.status(201).send(data)
                }
            })
        }
    }

    DeletarVaga() {
        return (req, res) => {
            const id = req.params.id

            Vagas.findById(id)
                .then(vaga => {
                    vaga.delete()
                    res.send('Vaga excluida')
                })
                .catch(res.status(404).json({ success:false }))
        }
    }

    AtualizaVaga() {
        return (req, res) => {
            const id = req.params.id
            const valores = req.body

            Vagas.findOneAndUpdate(id, valores)
                .then(res.redirect('/Vagas'))
                .catch(erro => {
                    console.log('Erro ao Atualizar vaga')
                })
        }
    }
}

module.exports = Vaga