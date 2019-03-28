const compare = ({ command, expected, response }) => ({ command, expected, response, pass: expected.data === response })

module.exports.compare = compare
