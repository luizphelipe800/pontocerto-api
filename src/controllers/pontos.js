const Pontos = require('../models/pontos')
const Usuarios = require('../models/usuarios')

const calculateExtraTime = require('../utils/calculateExtraTime')

module.exports = {
    find: async (req, res) => {
        try {
            const { codigo } = req.params
            const ponto = await Pontos.findOne({ codigo })

            return res.status(200).json(ponto)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    },

    checkin: async (req, res) => {
        try {
            const { pid } = req.params
            const { horario } = req.body
            const ponto = await Pontos.findById(pid)
            const usuario = await Usuarios.findById(ponto.usuarioId)

            if(ponto.horarios.length >= 4){
                ponto.total = await calculateExtraTime(ponto.horarios)
                ponto.save()

                if(!usuario.historico.some(ponto => ponto._id === ponto._id)){
                    usuario.historico.push(ponto._id)
                    usuario.save()
                }

                return res.status(200).json('você finalizou o expediente')
            }

            ponto.horarios.push(horario)
            ponto.save()

            return res.status(200).json('ponto batido')
        } catch (error) {
            return res.status(400).json(error.message)
        }
    },

    edit: async (req, res) => {
        try {
            const { pid } = req.params
            let { horarios, feriado, total } = req.body

            if(horarios){
                total = await calculateExtraTime(horarios)
            }

            if(feriado){
                horarios = ['00:00', '00:00', '00:00', '00:00']
                total = '00:00'
            }

            const ponto = await Pontos.findByIdAndUpdate(pid, { horarios, feriado, total })

            return res.status(200).json('ponto atualizado')
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }
}