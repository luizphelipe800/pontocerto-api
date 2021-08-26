const Pontos = require('../models/pontos')
const Usuarios = require('../models/usuarios')

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

            if(ponto.horarios.length >= 4){
                return res.status(400).json('você já finalizou o expediente')
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
            const { horarios, feriado } = req.body
            await Pontos.findByIdAndUpdate(pid, { horarios, feriado })

            return res.status(200).json('ponto atualizado!')
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }
}