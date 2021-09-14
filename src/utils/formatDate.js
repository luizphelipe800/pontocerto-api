/**
 * 
 * @param {String} date 
 */

const formatDate = date => {
    const [ year, month, day ] = date.split('-')
    return `${day}/${month}/${year}`
}

module.exports = formatDate