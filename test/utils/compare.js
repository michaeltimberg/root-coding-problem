const compare = ({ command, expected, response }) => ({ command, expected, response, pass: expected === response })

module.exports.compare = compare
