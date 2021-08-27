const { Schema, model, Types } = require('../configs/mongoose')

const PontoSchema = new Schema({
    codigo: { type: String, required: true },
    usuarioId: { type: String, required: true },
    feriado: { type: Boolean, default: false },
    horarios: [String],
    total: { type: String, default: '00:00' },
    data: { type: String, required: true }
})

module.exports = model('pontos', PontoSchema)