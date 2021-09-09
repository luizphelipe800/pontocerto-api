const { DateTime, Duration } = require('luxon')


/**
 * @param {[String]} times
 * @param {[String]} userTime 
 * @description um array com os horarios de ponto batido
 * @example ['07:00', '12:00', '13:00', '17:00']
 */

const calculateExtraTime = (times, userTime) => {
    return new Promise((resolve, reject) => {
        const normalDuration = calculateDuration([userTime[0], '12:00', '13:00', userTime[1]])
        const duration = calculateDuration(times)
    
        const diff = duration.minus(normalDuration)
    
        return resolve(diff.toFormat('hh:mm'))
    })
}

const calculateDuration = horarios => {
    const formato = 'hh:mm'

    let inicio = DateTime.fromFormat(horarios[0], formato)
    let fim = DateTime.fromFormat(horarios[3], formato)

    let worked = Duration.fromMillis(fim.diff(inicio).milliseconds)

    inicio = DateTime.fromFormat(horarios[1], formato)
    fim = DateTime.fromFormat(horarios[2], formato)

    let dinner = Duration.fromMillis(fim.diff(inicio).milliseconds)

    return worked.minus(dinner)
}

module.exports = calculateExtraTime