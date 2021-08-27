const routes = require('express').Router()
const passport = require('./middlewares/passport')
const admin = require('./middlewares/admin')

const relatorios = require('./controllers/relatorios')
const usuarios = require('./controllers/usuarios')
const sessions = require('./controllers/sessions')
const pontos = require('./controllers/pontos')

routes.post('/sessions', sessions.insert)
routes.post('/usuarios', usuarios.insert)

routes.use(passport.authenticate('jwt', {session: false}))

routes.get('/usuarios', admin, usuarios.index)
routes.get('/usuarios/:uid', usuarios.find)
routes.put('/usuarios/:uid', admin, usuarios.edit)
routes.delete('/usuarios/:uid', admin, usuarios.remove)

routes.get('/pontos/:codigo', pontos.find)
routes.put('/pontos/:pid', admin, pontos.edit)
routes.patch('/pontos/:pid', pontos.checkin)

routes.get('/relatorios', relatorios.index)
routes.get('/relatorios/:uid', admin, relatorios.find)

module.exports = routes