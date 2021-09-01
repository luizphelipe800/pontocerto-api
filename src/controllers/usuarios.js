const Usuarios = require('../models/usuarios')
const { hashSync, genSaltSync } = require('bcryptjs')

const salt = genSaltSync(8)

module.exports = {
    index: async (req, res) => {
        try {
            const usuarios = await Usuarios.find().populate('historico')
            return res.status(200).json(usuarios)
        }catch(error) {
            return res.status(400).json(error.message)
        }
    },
    find: async (req, res) => {
        try {
            const { uid } = req.params
            const usuario = await Usuarios.findById(uid).populate('historico')
            return res.status(200).json(usuario)
        }catch(error) {
            return res.status(400).json(error.message)
        }
    },
    insert: async (req, res) => {
        try {
            const hash = hashSync(req.body.senha, salt)
            const usuario = await Usuarios.create({...req.body, senha: hash})
            return res.status(201).json(usuario)
        }catch(error) {
            return res.status(400).json(error.message)
        }
    },
    edit: async (req, res) => {
        try {
            const { uid } = req.params 
            await Usuarios.findByIdAndUpdate(uid, { ...req.body })
            return res.status(200).json('usuario foi atualizado!')
        }catch(error) {
            return res.status(400).json(error.message)
        }
    },
    remove: async (req, res) => {
        try {
            const { uid } = req.params
            await Usuarios.findByIdAndDelete(uid)
            return res.status(200).json('usuario foi removido!')
        }catch(error) {
            return res.status(400).json(error.message)
        }
    }
}