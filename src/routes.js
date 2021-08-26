const routes = require('express').Router()

const usuarios = require('./controllers/usuarios')
const sessions = require('./controllers/sessions')

routes.post('/sessions', sessions.insert)

routes.get('/usuarios', usuarios.index)
routes.get('/usuarios/:uid', usuarios.find)
routes.post('/usuarios', usuarios.insert)
routes.put('/usuarios/:uid', usuarios.edit)
routes.delete('/usuarios/:uid', usuarios.remove)

module.exports = routes