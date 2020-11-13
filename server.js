const customExpress = require('./config/custom-express')
const mongoose = require('mongoose')
const mongoURI = require('./infra/conexao')

//App
const app = customExpress()

//Connecting BD
mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology:true
}).then(()=>console.log('Database Conected...'))
  .catch(err => console.log(err))

//Listenner
app.listen(4000, () => {
    console.log('Servidor Rodando na porta 4000')
})