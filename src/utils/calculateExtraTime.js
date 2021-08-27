const { DateTime, Duration } = require('luxon')


/**
 * @param {[String]} times
 * @description um array com os horarios de ponto batido
 * @example ['07:00', '12:00', '13:00', '17:00']
 */
const calculateExtraTime = times => {
    return new Promise((resolve, reject) => {
        const normalDuration = calculateDuration(['07:00', '12:00', '13:00', '17:00'])
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

console.log(calculateExtraTime(['07:00', '12:00', '13:30', '17:00']))

module.exports = calculateExtraTime