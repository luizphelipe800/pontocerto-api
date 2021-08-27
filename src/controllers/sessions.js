const Usuario = require('../models/usuarios')
const Ponto = require('../models/pontos')

const jwt = require('jsonwebtoken')
const { DateTime } = require('luxon')

module.exports = {
    insert: async (req, res) => {
        try{
            const { email, senha } = req.body
            const date = DateTime.fromJSDate(new Date()).toISODate()

            const usuario = await Usuario.findOne({ email })
            
            if(!usuario) return res.status(400).json('email não encontrado!')
            if(!usuario.compareSenha(senha)) return res.status(400).json('você errou a senha')

            const codigo = `${usuario._id}-${new Date().toLocaleDateString().split('/').join('-')}`

            let ponto = await Ponto.findOne({ codigo })

            if(!ponto){
                ponto = await Ponto.create({ codigo, usuarioId: usuario._id, data: date })
            }

            const token = jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET_KEY, { expiresIn: '2 days' })

            return res.status(200).json({ token, ponto })
        }catch(error){
            return res.status(400).json(error.message)
        }
    }
}