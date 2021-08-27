const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')

const Usuarios = require('../models/usuarios')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
}

passport.use(new Strategy(options, async (payload, done) => {
    try {
        const usuario = await Usuarios.findById(payload._id)
        if(!usuario) return done(null, false)
        return done(null, usuario)
    } catch (error) {  
        return done(error, false)
    }
}))

module.exports = passport