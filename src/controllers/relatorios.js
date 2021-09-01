const Usuarios = require('../models/usuarios')
const { DateTime } = require('luxon')

module.exports = {
    index: async (req, res) => {
        const { inicio, final } = req.query
        const format = 'yyyy-MM-dd'

        const usuario = await Usuarios.findOne({ email: req.user.email }).populate('historico')

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

        if(!inicio || !final) return res.status(200).json(historico)

        const dateInicio = DateTime.fromFormat(inicio, format)
        const dateFinal = DateTime.fromFormat(final, format)

        const historicoFiltrado = historico.filter(ponto => {
            const pontoDate = DateTime.fromFormat(ponto.data, format)
            return dateInicio <= pontoDate && pontoDate <= dateFinal
        })

        console.log(historicoFiltrado)

        return res.status(200).json(historicoFiltrado)
    },

    download: async (req, res) => {
        try {
            const { dados } = req.body 

            const dadosExportados = dados.map(dado => {
                let { data, horarios, feriado, total } = dado
                horarios = {
                    entrada: horarios[0],
                    almoço: horarios[1],
                    retorno: horarios[2],
                    final: horarios[3]
                }

                feriado = feriado === 1 ? 'sim' : 'não'

                return { data, ...horarios, feriado, total }
            })

            const options = {}

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  	        res.setHeader("Content-Disposition", "attachment; filename=" + "banco.xls");
  	        
            return res.status(200).xls('dados.xls', dadosExportados, options)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }
}