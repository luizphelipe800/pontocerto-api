/**
 * 
 * @param {String} time tempo não formatado!
 * @returns {String} tempo formatado
 */

const formatTime = time => {
    let [horas, minutos] = time.split(':')

    if(minutos.includes('-')){
        minutos = minutos.slice(1, 3)
        if(!horas.includes('-')){
            horas = '-'+horas
        }
    }

    return [horas, minutos].join(':')
}

module.exports = formatTime