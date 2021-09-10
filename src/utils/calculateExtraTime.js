const { DateTime, Duration } = require('luxon')


/**
 * @param {[String]} times
 * @param {[String]} userTime 
 * @description um array com os horarios de ponto batido
 * @example ['07:00', '12:00', '13:00', '17:00']
 */

const calculateExtraTime = (times, userTime) => {
    try {
        const padrao = [userTime[0], '12:00', '13:00', userTime[1]]
        const normalDuration = calculateDuration(padrao, padrao)
        const duration = calculateDuration(times, padrao)
    
        const diff = duration.minus(normalDuration)
    
        return diff.toFormat('hh:mm')
    } catch (error) {
        console.log(error)
    }
}

const calculateDuration = (horarios, padrao) => {
    try{
        const formato = 'hh:mm'
    
        let inicio = DateTime.fromFormat(horarios[0] || padrao[0], formato)
        let fim = DateTime.fromFormat(horarios[3] || padrao[3], formato)
    
        let worked = Duration.fromMillis(fim.diff(inicio).milliseconds)
    
        inicio = DateTime.fromFormat(horarios[1] || padrao[1], formato)
        fim = DateTime.fromFormat(horarios[2] || padrao[2], formato)
    
        let dinner = Duration.fromMillis(fim.diff(inicio).milliseconds)
    
        return worked.minus(dinner)
    }catch(error){
        console.log(error.message)
    }
}

module.exports = calculateExtraTime