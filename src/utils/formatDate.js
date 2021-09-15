/**
 * 
 * @param {Array} dates 
 */

const formatDate = dates => {
    const formatedDate = dates.map(date => {
        const [ year, month, day ] = date.data.split('-')
        return { ...date._doc, data: `${day}/${month}/${year}`}
    })
    return formatedDate
}

module.exports = formatDate