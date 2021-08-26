const routes = require('express').Router()

routes.get('/', (req, res) => {
    return res.json('Tamo no ar')
})

module.exports = routes