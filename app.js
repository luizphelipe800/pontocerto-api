const express = require('express')
const routes = require('./src/routes')
const passport = require('./src/middlewares/passport')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)
app.use(passport.initialize())

module.exports = app