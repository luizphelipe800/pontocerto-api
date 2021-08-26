const { Schema, model, Types } = require('../configs/mongoose')
const { hashSync, compareSync } = require('bcryptjs')

const UsuarioSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: String,
    funcao: { type: Number, required: true },
    expediente: {
        entrada: { type: String, required: true },
        saida: { type: String, required: true }
    },
    historico: [{
        type: Types.ObjectId,
        ref: 'pontos'
    }]
})

UsuarioSchema.methods.comparePassword = function(senha){
    return compareSync(senha, this.senha)
}

UsuarioSchema.pre('save', function(){
    this.senha = hashSync(this.senha, 8)
})

module.exports = model('usuarios', UsuarioSchema)