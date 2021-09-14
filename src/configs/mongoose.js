const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL_PRODUCTION, { useNewUrlParser: true, useUnifiedTopology: true })
//mongoose.connect(process.env.MONGO_URL_DEVELOPMENT, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once('open', () => console.log('mongodb está de boa'))
mongoose.connection.on('error', () => console.log('deu xabu no mongodb'))

module.exports = mongoose