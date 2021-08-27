const express = require('express')
const routes = require('./src/routes')
const passport = require('./src/middlewares/passport')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)
app.use(passport.initialize())

module.exports = app