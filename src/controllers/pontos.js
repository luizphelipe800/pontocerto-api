const Pontos = require('../models/pontos')
const Usuarios = require('../models/usuarios')

const { DateTime } = require('luxon')

const calculateExtraTime = require('../utils/calculateExtraTime')

module.exports = {
    index: async (req, res) => {
        try {
            const { _id: usuarioId } = req.user
            const currentDate = DateTime.fromJSDate(new Date()).toISODate()

            const ponto = await Pontos.findOne({ usuarioId, data: currentDate })
            return res.status(200).json(ponto)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    },
    find: async (req, res) => {
        try {
            const { pid } = req.params
            const ponto = await Pontos.findById(pid)

            return res.status(200).json(ponto)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    },

    checkin: async (req, res) => {
        try {
            const { horario } = req.body
            const { _id: usuarioId } = req.user
            const currentDate = DateTime.fromJSDate(new Date()).toISODate()

            const ponto = await Pontos.findOne({ usuarioId, data: currentDate })
            const usuario = await Usuarios.findById(usuarioId)
            const { expediente: { entrada, saida } } = usuario

            if(ponto.horarios.length >= 4){
                ponto.total = await calculateExtraTime(ponto.horarios, [entrada, saida])
                await ponto.save()

                return res.status(400).json(`seu expediente já terminou ${String.fromCodePoint(0x1F634)}`)
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

            const { usuarioId } = await Pontos.findById(pid)
            const usuario = await Usuarios.findById(usuarioId)
            const { expediente: { entrada, saida } } = usuario

            if(horarios){
                total = await calculateExtraTime(horarios, [entrada, saida])
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