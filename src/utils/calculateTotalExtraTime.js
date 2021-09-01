const { DateTime } = require("luxon")

/**
 * @param {Array} historico 
 * @returns {Promise}
 */
 const calculateTotalExtraTime = historico => {
    return new Promise((resolve, reject) => {
        try {
            let totalHoras = 0
            let totalMinutos = 0

            historico.forEach(({ total }) => {
                const [ horas, minutos ] = total.split(':')
                totalHoras += horas.charAt(0) === '-' ? -Math.abs(horas) : parseInt(horas)
                totalMinutos += minutos.charAt(0) === '-' ? -Math.abs(minutos) : parseInt(minutos)
            })

            while(totalMinutos <= -60){
                totalMinutos += 60
                totalHoras -= 1
            }

            while(totalMinutos >= 60){
                totalMinutos -= 60
                totalHoras += 1
            }

            totalHoras = totalHoras < 10 && totalHoras > -10 ? `0${totalHoras}` : `${totalHoras}`
            totalMinutos = totalMinutos < 10 && totalMinutos > -10 ? `0${totalMinutos}` : `${totalMinutos}`
            return resolve(`${totalHoras}:${totalMinutos}`)
        } catch (error) {
            return reject(new Error(error.message))
        }
    })
}

module.exports = calculateTotalExtraTime