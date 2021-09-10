const { DateTime } = require("luxon")

/**
 * @param {Array} historico 
 * @returns {Array}
 */
const calculateTotalExtraTime = historico => {
	try {
		let totalHoras = 0
		let totalMinutos = 0
		historico.forEach(({ total }) => {
			if(total){
				const [horas, minutos] = total.split(':')
				totalHoras += horas.charAt(0) === '-' ? -Math.abs(horas) : parseInt(horas)
				totalMinutos += minutos.charAt(0) === '-' ? -Math.abs(minutos) : parseInt(minutos)
			}
		})
		while (totalMinutos <= -60) {
			totalMinutos += 60
			totalHoras -= 1
		}
		while (totalMinutos >= 60) {
			totalMinutos -= 60
			totalHoras += 1
		}
		totalHoras = totalHoras < 10 && totalHoras > -10 ? `0${totalHoras}` : `${totalHoras}`
		totalMinutos = totalMinutos < 10 && totalMinutos > -10 ? `0${totalMinutos}` : `${totalMinutos}`
		return `${totalHoras}:${totalMinutos}`
	} catch (error) {
		return (error.message)
	}
}

module.exports = calculateTotalExtraTime