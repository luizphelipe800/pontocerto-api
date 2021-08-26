const routes = require('express').Router()

const usuarios = require('./controllers/usuarios')
const sessions = require('./controllers/sessions')
const pontos = require('./controllers/pontos')

routes.post('/sessions', sessions.insert)

routes.get('/usuarios', usuarios.index)
routes.get('/usuarios/:uid', usuarios.find)
routes.post('/usuarios', usuarios.insert)
routes.put('/usuarios/:uid', usuarios.edit)
routes.delete('/usuarios/:uid', usuarios.remove)

routes.get('/pontos/:codigo', pontos.find)
routes.put('/pontos/:pid', pontos.edit)
routes.patch('/pontos/:pid', pontos.checkin)

module.exports = routes