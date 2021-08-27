const routes = require('express').Router()
const passport = require('./middlewares/passport')

const relatorios = require('./controllers/relatorios')
const usuarios = require('./controllers/usuarios')
const sessions = require('./controllers/sessions')
const pontos = require('./controllers/pontos')

routes.post('/sessions', sessions.insert)
routes.post('/usuarios', usuarios.insert)

routes.use(passport.authenticate('jwt', {session: false}))

routes.get('/usuarios', usuarios.index)
routes.get('/usuarios/:uid', usuarios.find)
routes.put('/usuarios/:uid', usuarios.edit)
routes.delete('/usuarios/:uid', usuarios.remove)

routes.get('/pontos/:codigo', pontos.find)
routes.put('/pontos/:pid', pontos.edit)
routes.patch('/pontos/:pid', pontos.checkin)

routes.get('/relatorios', relatorios.index)
routes.get('/relatorios/:uid', relatorios.find)

module.exports = routes