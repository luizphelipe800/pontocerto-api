const mongoose = require('mongoose')

mongoose.connect('mongodb://pontocerto-db:27017/pontocerto', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once('open', () => console.log('mongodb está de boa'))
mongoose.connection.on('error', () => console.log('deu xabu no mongodb'))

module.exports = mongoose