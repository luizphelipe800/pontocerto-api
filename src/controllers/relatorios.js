const Usuarios = require('../models/usuarios')
const calculateTotalExtraTime = require('../utils/calculateTotalExtraTime')
const calculateExtraTime = require('../utils/calculateExtraTime')
const formatTime = require('../utils/formatTime')
const { DateTime } = require('luxon')

module.exports = {
    index: async (req, res) => {
        const { inicio, final } = req.query
        const format = 'yyyy-MM-dd'

        const usuario = await Usuarios.findOne({ email: req.user.email }).populate('historico')

        if(!usuario) return res.status(400).json('usuario não encontrado!')

        const { expediente: { entrada, saida } } = usuario
        
        let historico = usuario.historico

        historico = historico.map(ponto => {
            if(ponto.feriado || ponto.horarios.length === 0){
                return ponto
            }

            const total = calculateExtraTime(ponto.horarios, [entrada, saida])
            ponto.total = formatTime(total)
            
            return ponto
        })

        if(!inicio && !final) {
            const total = calculateTotalExtraTime(historico)
            return res.status(200).json({historico, total})
        }

        const dateInicio = DateTime.fromFormat(inicio, format)
        const dateFinal = DateTime.fromFormat(final, format)

        historico = historico.filter(ponto => {
            const pontoDate = DateTime.fromFormat(ponto.data, format)
            return dateInicio <= pontoDate && pontoDate <= dateFinal
        })

        const total = calculateExtraTime(historico, [entrada, saida])

        return res.status(200).json({ historico, total })
    },

    find: async (req, res) => {
        const { inicio, final } = req.query
        const { uid } = req.params
        const format = 'yyyy-MM-dd'

        const usuario = await Usuarios.findById(uid).populate('historico')

        if(!usuario) return res.status(400).json('usuario não encontrado!')

        const { expediente: { entrada, saida } } = usuario

        let historico = usuario.historico

        historico = historico.map(ponto => {
            if(ponto.feriado || ponto.horarios.length === 0){
                return ponto
            }

            const total = calculateExtraTime(ponto.horarios, [entrada, saida])
            ponto.total = formatTime(total)
            
            return ponto
        })

        if(!inicio && !final) {
            const total = calculateTotalExtraTime(historico)
            return res.status(200).json({ nome: usuario.nome, historico, total })
        }

        const dateInicio = DateTime.fromFormat(inicio, format)
        const dateFinal = DateTime.fromFormat(final, format)

        historico = historico.filter(ponto => {
            const pontoDate = DateTime.fromFormat(ponto.data, format)
            return dateInicio <= pontoDate && pontoDate <= dateFinal
        })

        const total = calculateTotalExtraTime(historico)

        return res.status(200).json({ nome: usuario.nome, historico, total })
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

                feriado = feriado ? 'sim' : 'não'

                return { data, ...horarios, folga: feriado, total }
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