const Usuarios = require('../models/usuarios')
const { DateTime } = require('luxon')

module.exports = {
    index: async (req, res) => {
        const { inicio, final } = req.query
        const format = 'yyyy-MM-dd'

        const usuario = await Usuarios.findOne({ email: 'jane@email.com'}).populate('historico')

        if(!usuario) return res.status(400).json('usuario não encontrado!')
        
        const historico = usuario.historico

        if(!inicio && !final) return res.status(200).json(historico)

        const dateInicio = DateTime.fromFormat(inicio, format)
        const dateFinal = DateTime.fromFormat(final, format)

        const historicoFiltrado = historico.filter(ponto => {
            const pontoDate = DateTime.fromFormat(ponto.data, format)
            return dateInicio <= pontoDate && pontoDate <= dateFinal
        })

        return res.status(200).json(historicoFiltrado)
    },
    find: async (req, res) => {
        const { inicio, final } = req.query
        const { uid } = req.params
        const format = 'yyyy-MM-dd'

        const usuario = await Usuarios.findById(uid).populate('historico')

        if(!usuario) return res.status(400).json('usuario não encontrado!')

        const historico = usuario.historico

        if(!inicio && !final) return res.status(200).json(historico)

        const dateInicio = DateTime.fromFormat(inicio, format)
        const dateFinal = DateTime.fromFormat(final, format)

        const historicoFiltrado = historico.filter(ponto => {
            const pontoDate = DateTime.fromFormat(ponto.data, format)
            return dateInicio <= pontoDate <= dateFinal
        })

        return res.status(200).json(historicoFiltrado)
    }
}