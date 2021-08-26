const { Schema, model, Types } = require('../configs/mongoose')

const PontoSchema = new Schema({
    codigo: { type: String, required: true },
    usuarioId: { Type: String, required: true },
    feriado: { type: Boolean, default: false },
    horarios: [String],
    total: String
})

module.exports = model('pontos', PontoSchema)