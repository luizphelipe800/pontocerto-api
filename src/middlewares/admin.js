module.exports = (req, res, next) => {
    const { funcao } = req.user

    if(funcao !== 1) return res.status(401).json('unauthorized!')
    next()
}