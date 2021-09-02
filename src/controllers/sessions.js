const Usuario = require('../models/usuarios')
const Ponto = require('../models/pontos')

const jwt = require('jsonwebtoken')
const { DateTime } = require('luxon')

module.exports = {
    insert: async (req, res) => {
        try{
            const { email, senha } = req.body

            const usuario = await Usuario.findOne({ email })
            
            if(!usuario) return res.status(400).json(`acho que você errou o email ${String.fromCodePoint(0x1F615)}`)

            if(usuario.funcao == 1){
                if(!usuario.compareSenha(senha)) return res.status(400).json(`hmm sua senha está incorreta ${String.fromCodePoint(0x1F615)}`)
            }
            
            const usuarioId = usuario._id
            const date = DateTime.fromJSDate(new Date()).toISODate()

            let ponto = await Ponto.findOne({ usuarioId, data: date })

            if(!ponto){
                ponto = await Ponto.create({ usuarioId, data: date })
                usuario.historico.push(ponto._id)
                await usuario.save()
            }

            const token = jwt.sign({ _id: usuarioId }, process.env.JWT_SECRET_KEY, { expiresIn: '2 days' })
            const { funcao, nome } = usuario

            return res.status(200).json({ user: { nome, usuarioId, email, funcao}, token })
        }catch(error){
            return res.status(400).json(error.message)
        }
    }
}