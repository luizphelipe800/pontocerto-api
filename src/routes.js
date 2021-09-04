const routes = require('express').Router()
const json2xls = require('json2xls')
const passport = require('./middlewares/passport')
const admin = require('./middlewares/admin')

const relatorios = require('./controllers/relatorios')
const usuarios = require('./controllers/usuarios')
const sessions = require('./controllers/sessions')
const pontos = require('./controllers/pontos')
const { Router } = require('express')

routes.get('/', (req, res) => res.status(200).json('aplicação rodando...'))

routes.post('/sessions', sessions.insert)
routes.post('/usuarios', usuarios.insert)

routes.use(passport.authenticate('jwt', {session: false}))

routes.get('/usuarios', admin, usuarios.index)
routes.get('/usuarios/:uid', usuarios.find)
routes.put('/usuarios/:uid', usuarios.edit)
routes.delete('/usuarios/:uid', admin, usuarios.remove)

routes.get('/pontos', pontos.index)
routes.get('/pontos/:pid', pontos.find)
routes.put('/pontos/:pid', admin, pontos.edit)
routes.post('/pontos', pontos.checkin)

routes.get('/relatorios', relatorios.index)
routes.get('/relatorios/:uid', admin, relatorios.find)

routes.use(json2xls.middleware)
routes.post('/relatorios', admin, relatorios.download)

module.exports = routes