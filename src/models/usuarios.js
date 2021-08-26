const { Schema, model, Types } = require('../configs/mongoose')

const UsuarioSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: String,
    funcao: { Type: Number, required: true },
    expediente: {
        entrada: { type: String, required: true },
        saida: { type: String, required: true }
    },
    historico: [{
        type: Types.ObjectId,
        ref: 'pontos'
    }]
})

module.exports = model('usuarios', UsuarioSchema)